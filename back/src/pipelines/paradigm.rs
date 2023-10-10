use std::collections::HashMap;

use axum::{
    extract::{Path, Query},
    response::{Response, IntoResponse},
};
use cmd_lib::run_fun;
use serde::Deserialize;
use http::StatusCode;
use tokio::{fs::File, io::AsyncReadExt};

use crate::util::get_langfile;
//use crate::pipelines::run_pipeline_single_lang;
use cached::proc_macro::cached;

#[derive(Deserialize)]
pub struct LangAndStringParams {
    lang: String,
    string: String,
}

#[derive(Deserialize)]
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

#[derive(Deserialize)]
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

    let vars = format!("lang={lang}, string={string}, pos={pos}, size={size}");
    let msg = format!("paradigm not yet implemented ({vars})");
    (StatusCode::NOT_IMPLEMENTED, msg).into_response()
    //match run_pipeline_single_lang(paradigm, string, lang).await {
    //    Ok(text) => (StatusCode::OK, text),
    //    Err(errmsg) => (StatusCode::UNPROCESSABLE_ENTITY, errmsg),
    //}.into_response()
    //
}

#[cached]
pub fn paradigm(input: String, lang: String) -> Result<String, String> {
    let tokdisamb = get_langfile(&lang, "tokeniser-disamb-gt-desc.pmhfst")
        .ok_or_else(|| format!("language not supported \
            (tokeniser-disamb-gt-desc.pmhfst doesn't exist for language {}", lang))?;
    let analyzer_gt_desc_hfstol = get_langfile(&lang, "analyser-gt-desc.hfstol")
        .ok_or_else(|| format!("language not supported \
            (analyser-gt-desc.hfstol doesn't exist for language {}", lang))?;

    let _words = run_fun!(
        echo $input |
        hfst-tokenize -q --beam=0 $tokdisamb |
        hfst-lookup -q --beam=0 $analyzer_gt_desc_hfstol
    )
    .map_err(|e| e.to_string())?;

    //generate_paradigm(words);
    Ok("".into())
}

fn _generate_paradigm(
    analyses: Vec<String>,
    _lang: String,
    pos: Pos,
    _size: ParadigmSize,
) -> Result<String, String> {
    // fast path: specific pos was given
    if let Pos::Any = pos {
        //let paradigmfile = 0;
        //return call_para(analyses, lang, paradigmfile);
    }

    let _poses = _find_poses_from_analyses(analyses);
    //let paradigmfile = get_paradigmfile(lang, size, pos);
    // ...

    Ok("k".into())
}

async fn _read_gramfile(gramfile: std::path::PathBuf) -> Result<Vec<String>, String> {
    let mut file = File::open(gramfile).await.map_err(|e| e.to_string())?;
    let mut contents = String::new();
    file.read_to_string(&mut contents).await.map_err(|e| e.to_string())?;

    Ok(contents
        .lines()
        .map(|line| line.trim())
        .filter(|line| line.len() > 0)
        .filter(|line| !line.starts_with(&['#', '%', '$']))
        .map(|line| line.to_owned())
        .collect::<Vec<_>>())
}

async fn _read_tagfile(tagfile: std::path::PathBuf)
    -> Result<HashMap<String, Vec<String>>, String>
{
    let mut file = File::open(tagfile).await.map_err(|e| e.to_string())?;
    let mut contents = String::new();
    file.read_to_string(&mut contents).await.map_err(|e| e.to_string())?;

    // TODO /home/anders/projects/fst-web-interface/api/src/toolspecs/paradigm.py
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
                let i = line.find('\t').unwrap();
                let word = line[0..i].to_owned();
                current_vec.push(word);
            }
        });

    Ok(m)
}

async fn _generate_taglist(lang: String) -> Result<String, String> {
    // let gramfile = get_langfile(&lang, "paradigm...".to_string())
    //     .ok_or_else(|| format!("language not supported \
    //         (paradigm... doesn't exist for language {}", lang))?;
    // let tagfile = get_langfile(&lang, "tagfile...".to_string())
    //     .ok_or_else(|| format!("language not supported \
    //         (tagfile... doesn't exist for language {}", lang))?;

    //let gram_entries = read_gramfile(gramfile).await?;
    //let tags = read_tagfile(tagfile).await?;
    Ok(lang)
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

fn _determine_is_derivation(tags: &str) -> bool {
    tags.contains("Der")
}

fn _determine_is_compound(tags: &str) -> bool {
    tags.contains('#') && !tags.starts_with(&['+', '#'])
}
