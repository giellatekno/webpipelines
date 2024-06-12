use itertools::Itertools;
use once_cell::sync::Lazy;
use std::collections::{HashMap, HashSet};

use axum::{
    extract::{Path, Query},
    response::{IntoResponse, Response},
};
use http::StatusCode;
use serde::{de::IntoDeserializer, Deserialize, Serialize};
use tokio::sync::RwLock;
use tokio::{fs::File, io::AsyncReadExt};

use tracing::trace;

use crate::analysis::{analyze_async, Analysis};
use crate::langmodel_files::get_langfile;
//use crate::pipelines::run_pipeline_single_lang;
//use cached::proc_macro::cached;

use crate::pipelines::generate::generate_async;

#[derive(Deserialize)]
pub struct LangAndStringParams {
    lang: String,
    string: String,
}

#[derive(Deserialize, Serialize, Debug, PartialEq, Eq, Hash, Clone, Copy)]
enum ParadigmSize {
    #[serde(rename = "minimal")]
    Minimal,
    #[serde(rename = "standard")]
    Standard,
    #[serde(rename = "full")]
    Full,
}

impl std::fmt::Display for ParadigmSize {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        self.serialize(f)
    }
}

#[derive(Deserialize, Serialize, Debug, PartialEq, Eq, Hash, Clone, Copy)]
enum Pos {
    #[serde(alias = "any")]
    Any,
    #[serde(alias = "a")]
    A,
    #[serde(alias = "n")]
    N,
    #[serde(alias = "v")]
    V,
    #[serde(alias = "adv")]
    Adv,
    #[serde(alias = "num")]
    Num,
    #[serde(alias = "pron")]
    Pron,
}

// rustc: conflicting implementations of trait `TryFrom<&str>` for type `Pos`
// conflicting implementation in crate `core`:
// - impl<T, U> TryFrom<U> for T
//   where U: Into<T>; [E0119]
/*
impl std::convert::TryFrom<&str> for Pos {
    type Error = serde::de::value::Error;
    fn try_from(value: &str) -> Result<Self, Self::Error> {
        Self::deserialize(value.into_deserializer())
    }
}
*/

impl std::convert::From<&str> for Pos {
    fn from(value: &str) -> Self {
        Self::deserialize::<serde::de::value::StrDeserializer<'_, serde::de::value::Error>>(
            value.into_deserializer(),
        )
        .unwrap_or(Pos::Any)
        //Self::try_from(value).unwrap_or(Pos::Any)
    }
}

impl std::fmt::Display for Pos {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        self.serialize(f)
    }
}

#[derive(Deserialize, Debug, PartialEq, Eq, Hash, Clone, Copy)]
enum Format {
    #[serde(alias = "json")]
    Json,
    #[serde(alias = "text")]
    Text,
}

#[derive(Deserialize)]
pub struct QueryParams {
    size: Option<ParadigmSize>,
    pos: Option<Pos>,
    format: Option<Format>,
}

pub async fn paradigm_endpoint(
    Path(LangAndStringParams { lang, string }): Path<LangAndStringParams>,
    Query(query_params): Query<QueryParams>,
) -> Response {
    let pos = query_params.pos.unwrap_or(Pos::Any);
    let size = query_params.size.unwrap_or(ParadigmSize::Standard);
    let format = query_params.format.unwrap_or(Format::Text);

    let analyses_raw = match analyze_async(&string, &lang, false).await {
        Ok(analyses) => analyses,
        Err(e) => return format!("{}", e).into_response(),
    };

    let analyses = crate::analysis::analyses_raw_to_vec(&analyses_raw);
    let (mut direct, mut other) = find_poses_from_analyses(&analyses, string);

    if pos != Pos::Any {
        direct.retain(|(_lemma, found_pos)| *found_pos == pos);
        other.retain(|(_lemma, found_pos)| *found_pos == pos);
    }

    let mut results = vec![];
    let mut errors = vec![];
    // TODO this is just for debugging
    results.push(String::from("DIRECT HITS"));
    for (lemma, pos) in direct {
        match all_paradigms(lemma, &lang, pos, size).await {
            Ok(result) => results.push(result),
            Err(e) => errors.push(e),
        };
    }
    // TODO this is just for debugging
    results.push(String::from("OTHER HITS"));
    for (lemma, pos) in other {
        match all_paradigms(lemma, &lang, pos, size).await {
            Ok(result) => results.push(result),
            Err(e) => errors.push(e),
        };
    }

    if results.len() > 0 {
        (StatusCode::OK, results.join("\n")).into_response()
    } else {
        (StatusCode::INTERNAL_SERVER_ERROR, errors.join("\n")).into_response()
    }
}

//#[cached(size = 15, time = 10, time_refresh = true)]
async fn all_paradigms(
    input_lemma: &str,
    lang: &str,
    pos: Pos,
    size: ParadigmSize,
) -> Result<String, String> {
    let paradigm_file = get_paradigmfile(lang, size, pos).await?;
    let pos = &pos.to_string();

    let generator_input = paradigm_file
        .lines()
        .filter(|para| para.starts_with(pos))
        .map(|para| format!("{input_lemma}+{para}"))
        .join("\n");

    let t0 = std::time::Instant::now();
    let output_lines = generate_async(&generator_input, lang).await?;
    trace!("generating took: {}ms", t0.elapsed().as_millis());
    let output_lines = output_lines
        .split('\n')
        .filter(|line| line.len() > 0)
        .filter(|line| !line.ends_with("inf"))
        .map(|line| line.to_string())
        .join("\n");
    Ok(output_lines)
}

fn is_derivation(tags: &str) -> bool {
    tags.contains("Der")
}

fn is_compound(tags: &str) -> bool {
    // from original source (smi.cgi)
    // if tags contains a '#', and does not start with something else than '+'
    // followed by '#', in that case it is a compound
    // if ($anl =~/\#/ && $anl !~ /^[^\+]+\#[^\#]+$/) {
    !tags.starts_with("+#") && tags.contains("#")
}

async fn read_gramfile(gramfile: std::path::PathBuf) -> Result<Vec<String>, String> {
    let mut file = File::open(gramfile).await.map_err(|e| e.to_string())?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)
        .await
        .map_err(|e| e.to_string())?;

    Ok(contents
        .lines()
        .map(|line| line.trim())
        .filter(|line| line.len() > 0)
        .filter(|line| !line.starts_with(&['#', '%', '$']))
        .map(|line| line.to_string())
        .collect::<Vec<String>>())
}

/// Read and parse the tagfile (a file named "korpustags.txt"),
/// given as a PathBuf to the full path in the `tagfile` argument.
/// Return a hashmap of "tag class" to list of tags, for example:
///   "Wordclass" => ["N", "A", "V", "Adv", ...]
///   "Person-Number" => ["Sg1", "Sg2", "Sg3", "Du1", ...]
///   "Transitivity" => ["TV", "IV"]
///   "Infinite" => ["Inf", "PrfPrc", "PrsPrc", "Sup", "VGen", ...]
async fn read_tagfile(tagfile: std::path::PathBuf) -> Result<HashMap<String, Vec<String>>, String> {
    let mut file = File::open(tagfile).await.map_err(|e| e.to_string())?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)
        .await
        .map_err(|e| e.to_string())?;

    let mut m: HashMap<String, Vec<String>> = HashMap::new();
    let mut current_vec = vec![];

    contents
        .lines()
        .map(|line| line.trim())
        .filter(|line| line.len() > 0)
        .filter(|line| !line.starts_with(&['%', '$']))
        .filter(|line| !line.contains('='))
        .for_each(|line| {
            if line.starts_with('#') {
                m.insert(line[1..].to_owned(), current_vec.clone());
                current_vec.clear();
            } else {
                // slice up to the first tab, or space, or if there is no
                // tab or space, then until the end of line
                let i = line.find(['\t', ' ']).unwrap_or(line.len());
                let word = line[0..i].to_owned();
                current_vec.push(word);
            }
        });

    Ok(m)
}

struct Hit {
    lemma_match: bool,
    rank: u32,
}

/// Given a sequence of Analyses, produce two HashSets of (lemma, pos)-tuples,
/// one where the lemma matches the word_form given, and one where it doesn't.
fn find_poses_from_analyses<'a, T>(
    analyses: &[Analysis],
    word_form: T,
) -> (HashSet<(&str, Pos)>, HashSet<(&str, Pos)>)
where
    T: AsRef<str>,
{
    // TODO: This gives all poses. There is no ranking of which is most likely.
    // We want to guess the most likely pos
    let mut direct_hits = HashSet::new();
    let mut other_hits = HashSet::new();

    // searched for (word_form): vieso  (conjugation of viessu)
    // wordform,  lemma,  pos,  tags
    // vieso   viessut+V+IV+Imprt+ConNeg   0,000000
    // vieso   viessut+V+IV+Imprt+Sg2   0,000000
    // vieso   viessut+V+IV+Ind+Prs+ConNeg   0,000000
    // vieso   viessu+N+Sg+Gen+Allegro   0,000000

    for analysis in analyses.iter() {
        // If input wordform matches lemma from analysis directly, then
        // add (lemma, pos) to `direct` hits, otherwise it's an `other` hit
        if word_form.as_ref() == analysis.lemma() {
            direct_hits.insert((analysis.lemma(), analysis.pos().into()));
        } else {
            other_hits.insert((analysis.lemma(), analysis.pos().into()));
        }

        if analysis.is_derivation() {
            // higher "rank" here?
        } else {
            if analysis.is_compund() {
                // higher "rank" here?
            } else {
                // a bit lower "rank" here?
            }
        }
    }

    (direct_hits, other_hits)
}

// (lang, size, pos) => Either Ok with paradigm_file (string), or Err with
// error message string
static PARADIGM_FILES: Lazy<RwLock<HashMap<(String, ParadigmSize, Pos), Result<String, String>>>> =
    Lazy::new(|| {
        let m = HashMap::with_capacity(16);
        RwLock::new(m)
    });

/// Get the paradigm file for a 3-tuple of (lang, size, pos)
/// From a cache
async fn get_paradigmfile(lang: &str, size: ParadigmSize, pos: Pos) -> Result<String, String> {
    let key = (lang.to_owned(), size, pos);
    let guard = PARADIGM_FILES.read().await;
    match guard.get(&key) {
        Some(paradigm_file) => paradigm_file.clone(),
        None => {
            drop(guard);
            let paradigm_file = generate_paradigm_file(lang, size).await;
            let mut guard = PARADIGM_FILES.write().await;
            guard.insert(key, paradigm_file.clone());
            paradigm_file
        }
    }
}

/// Generate the file of all paradigms
async fn generate_paradigm_file(lang: &str, size: ParadigmSize) -> Result<String, String> {
    let paradigm_text_file = format!("paradigm_{size}.{lang}.txt");
    let gramfile = get_langfile(&lang, &paradigm_text_file).ok_or_else(|| {
        format!("language not supported ({paradigm_text_file} doesn't exist for language {lang})\n")
    })?;
    let korpustags_file = format!("korpustags.{lang}.txt");
    let tagfile = get_langfile(&lang, &korpustags_file).ok_or_else(|| {
        format!("language not supported ({korpustags_file} doesn't exist for language {lang})\n")
    })?;

    let gram_entries = read_gramfile(gramfile).await?;
    let tagmap = read_tagfile(tagfile).await?;

    Ok(expand_gram_entries(gram_entries, tagmap))
}

fn expand_gram_entries(
    // N+Stemtype?+Case+...
    grammar_entries: Vec<String>,
    // Stemtype = [A, B, C] ...
    tagmap: HashMap<String, Vec<String>>,
) -> String {
    let mut out = vec![];

    for entry in grammar_entries {
        let mut splits = entry.split('+');
        let pos = splits.next().unwrap();
        let classes = splits.map(|mut split| {
            let mut v = vec![];

            if let Some(stripped) = split.strip_suffix('?') {
                v.push("".to_owned());
                split = stripped;
            }

            match tagmap.get(split) {
                Some(s) => v.extend(s.iter().map(|s| s.clone())),
                None => v.push(split.to_owned()),
            };

            v
        });

        out.extend(
            classes
                .into_iter()
                .multi_cartesian_product()
                .map(|tags_vec| {
                    let tags_s = tags_vec.iter().filter(|s| s.len() > 0).join("+");
                    format!("{pos}+{tags_s}")
                }),
        );
    }

    out.join("\n")
}
