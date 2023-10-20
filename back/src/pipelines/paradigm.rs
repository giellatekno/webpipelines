use itertools::Itertools;
use once_cell::sync::Lazy;
use std::collections::{hash_map::Entry, HashMap};

use axum::{
    extract::{Path, Query},
    response::{IntoResponse, Response},
};
use cmd_lib::run_fun;
use http::StatusCode;
use serde::Deserialize;
use tokio::sync::RwLock;
use tokio::{fs::File, io::AsyncReadExt};

use crate::util::get_langfile;
//use crate::pipelines::run_pipeline_single_lang;
use cached::proc_macro::cached;

#[derive(Deserialize)]
pub struct LangAndStringParams {
    lang: String,
    string: String,
}

#[derive(Deserialize, Debug, PartialEq, Eq, Hash, Clone, Copy)]
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
        let s = match self {
            ParadigmSize::Minimal => "minimal",
            ParadigmSize::Standard => "standard",
            ParadigmSize::Full => "full",
        };
        f.write_str(s)
    }
}

#[derive(Deserialize, Debug, PartialEq, Eq, Hash, Clone, Copy)]
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

impl Pos {
    fn is_any(&self) -> bool {
        *self == Pos::Any
    }

    /// Is the Pos specified, i.e. is it NOT Any
    fn is_specific(&self) -> bool {
        !self.is_any()
    }
}

impl std::fmt::Display for Pos {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match *self {
            Pos::Any => f.write_str("any"),
            Pos::A => f.write_str("A"),
            Pos::N => f.write_str("N"),
            Pos::V => f.write_str("V"),
            Pos::Adv => f.write_str("adv"),
            Pos::Num => f.write_str("num"),
            Pos::Pron => f.write_str("pron"),
        }
    }
}

#[derive(Deserialize)]
pub struct QueryParams {
    size: Option<ParadigmSize>,
    pos: Option<Pos>,
}

pub async fn paradigm_endpoint(
    Path(LangAndStringParams { lang, string }): Path<LangAndStringParams>,
    Query(query_params): Query<QueryParams>,
) -> Response {
    let pos = query_params.pos.unwrap_or(Pos::Any);
    let size = query_params.size.unwrap_or(ParadigmSize::Standard);

    match get_paradigmfile(lang.as_str(), size, pos).await {
        Ok(paradigm_file) => match paradigm(paradigm_file, lang, string, pos).await {
            Ok(result) => (StatusCode::OK, result),
            Err(err) => (StatusCode::INTERNAL_SERVER_ERROR, err.to_string()),
        },
        Err(err_message) => (StatusCode::NOT_FOUND, err_message),
    }
    .into_response()
}

#[cached]
async fn paradigm(
    paradigm_file: String,
    lang: String,
    input: String,
    pos: Pos,
) -> Result<String, String> {
    let tokdisamb = get_langfile(&lang, "tokeniser-disamb-gt-desc.pmhfst").ok_or_else(|| {
        format!(
            "language not supported \
            (tokeniser-disamb-gt-desc.pmhfst doesn't exist for language {}",
            lang
        )
    })?;
    let analyzer_gt_desc_hfstol =
        get_langfile(&lang, "analyser-gt-desc.hfstol").ok_or_else(|| {
            format!(
                "language not supported \
            (analyser-gt-desc.hfstol doesn't exist for language {}",
                lang
            )
        })?;
    let generator_gt_norm_hfstol =
        get_langfile(&lang, "generator-gt-norm.hfstol").ok_or_else(|| {
            format!(
                "language not supported \
            (generator-gt-norm.hfstol doesn't exist for language {}",
                lang
            )
        })?;

    let analyses = tokio::task::spawn_blocking(move || {
        run_fun!(
            echo $input |
            hfst-tokenize -q --beam=0 $tokdisamb |
            hfst-lookup -q --beam=0 $analyzer_gt_desc_hfstol
        )
        .map_err(|e| e.to_string())
    })
    .await
    .map_err(|e| e.to_string())??;

    // Fast path: specific Pos requested
    if pos.is_specific() {
        let word = analyses
            .lines()
            .filter_map(|line| {
                let splits = line.split('\t').collect::<Vec<_>>();
                if splits.len() == 3 {
                    Some(splits[0])
                } else {
                    None
                }
            })
            .take(1)
            .next()
            .unwrap();

        let generator_input = paradigm_file
            .lines()
            .map(|para| format!("{word}+{para}"))
            .join("\n");

        let generate_results = tokio::task::spawn_blocking(move || {
            run_fun!(
                echo $generator_input |
                hfst-lookup -q $generator_gt_norm_hfstol
            )
            .map_err(|e| e.to_string())
        })
        .await
        .map_err(|e| e.to_string())??;

        let results = generate_results
            .split('\n')
            .filter(|line| line.len() > 0)
            .filter(|line| !line.ends_with("inf"))
            .join("\n");

        Ok(results)
    } else {
        // Slow path: pos == any, so we must find paradigms for all poses,
        // and determine (guess) which is the best one to show first in results
        //let _poses = _find_poses_from_analyses(analyses);

        Ok("specific pos (!=Any) not implemented".into())
    }
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

fn _find_poses_from_analyses(analyses: Vec<String>) {
    let _ = analyses;
    //for line in analyses {
    //    if let [lemma, tags, weight] = &line.split('\t').collect::<Vec<_>>()[..] {
    //        let is_derivation = determine_is_derivation(tags);
    //        let is_compound = determine_is_compound(tags);

    //        match (is_derivation, is_compound) {
    //            (false, false) => {
    //                // neither a derivation, nor a compound
    //                if let [lemma, pos, _] = &tags.split('+').collect::<Vec<_>>()[..] {
    //                }
    //            },
    //            (false, true) => {
    //                //not a derivation, but is a compound
    //            },
    //            (true, _) => {
    //                // is a derivation, compound unkonwn but doesn't matter
    //            }
    //        }
    //    }
    //}
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

    // TODO I should be able to just do read() here, so that more tasks can
    // read from the HashMap at the same time. Ideally, if it tries to read,
    // but finds a vacant spot, then it needs to re-aquire the lock with write
    // to be able to mutate the hashmap.
    let mut guard = PARADIGM_FILES.write().await;
    let entry = guard.entry(key.clone());
    match entry {
        Entry::Occupied(entry) => entry.get().clone(),
        Entry::Vacant(vacant_entry) => {
            let paradigm_file = generate_paradigm_file(lang, size).await;
            let s = match &paradigm_file {
                Ok(s) => s.to_string(),
                Err(s) => s.to_owned(),
            };
            vacant_entry.insert(paradigm_file.clone());
            paradigm_file
        }
    }
}

/// Generate the file of all paradigms
async fn generate_paradigm_file(lang: &str, size: ParadigmSize) -> Result<String, String> {
    let paradigm_text_file = format!("paradigm_{size}.txt");
    let gramfile = get_langfile(&lang, &paradigm_text_file).ok_or_else(|| {
        format!("language not supported ({paradigm_text_file} doesn't exist for language {lang}")
    })?;
    let tagfile = get_langfile(&lang, "korpustags.txt").ok_or_else(|| {
        format!("language not supported (korpustags.txt doesn't exist for language {lang}")
    })?;

    let gram_entries = read_gramfile(gramfile).await?;
    let tagmap = read_tagfile(tagfile).await?;

    Ok(expand_gram_entries(gram_entries, tagmap).join("\n"))
}

fn _determine_is_derivation(tags: &str) -> bool {
    tags.contains("Der")
}

fn _determine_is_compound(tags: &str) -> bool {
    tags.contains('#') && !tags.starts_with(&['+', '#'])
}

fn expand_gram_entries(
    // N+Stemtype?+Case+...
    grammar_entries: Vec<String>,
    // Stemtype = [A, B, C] ...
    tagmap: HashMap<String, Vec<String>>,
) -> Vec<String> {
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

    out
}
