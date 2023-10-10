use std::io::Write;
use axum::{
    extract::Json,
    response::{Response, IntoResponse},
};
use crate::util::{
    get_langfile,
    gunzip,
    read_docx_text,
};
use crate::pipelines::run_pipeline_single_lang;
use tempfile::NamedTempFile;
use cmd_lib::run_fun;
use serde::Deserialize;
use http::StatusCode;
use base64::{engine::general_purpose, Engine as _};

const UE: StatusCode = StatusCode::UNPROCESSABLE_ENTITY;

pub fn lemma_count(input: String, lang: String) -> Result<String, String> {
    let tokdisamb = get_langfile(&lang, "tokeniser-disamb-gt-desc.pmhfst")
        .ok_or_else(|| format!("cannot find tokeniser-disamb-gt-desc.pmhfst \
            for language {}", lang))?;
    let disambcg = get_langfile(&lang, "disambiguator.cg3")
        .or_else(|| get_langfile(&lang, "disambiguator.bin"))
        .ok_or_else(|| format!("cannot find disambiguator.cg3 \
            for language {}", lang))?;

    let temp_file = NamedTempFile::new().map_err(|e| e.to_string())?;
    let path = temp_file.path();
    let _ = temp_file
        .as_file()
        .write_all(input.as_bytes())
        .map_err(|e| e.to_string())?;

    let cut_delim = "-d\"";
    let sed_trim_starting_whitespace = "s/^ *//";
    run_fun!(
        cat $path |
        hfst-tokenise -cg $tokdisamb |
        vislcg3 -g $disambcg |
        grep -v "^[\"]" |
        cut $cut_delim -f2 |
        uniq |
        grep -v "^[:]" |
        sort |
        uniq -c |
        sed $sed_trim_starting_whitespace |
        grep "[a-zæøåA-ZÆØÅ]" |
        sort -nr
    )

    .map_err(|e| e.to_string())
}

#[derive(Deserialize)]
pub struct InputBody {
    // text
    typ: String,
    lang: String,
    data: String,
}

pub async fn lemma_count_endpoint(
    Json(InputBody{ typ, lang, data }): Json<InputBody>) -> Response
{
    let text: String = match typ.as_str() {
        "text" => {
            data
        },
        "text+gz+b64" => {
            let Ok(data) = general_purpose::STANDARD.decode(data) else {
                return (UE, "could not base64 decode data").into_response();
            };
            let Some(data) = gunzip(data) else {
                return (UE, "failed to gunzip data").into_response();
            };
            let Ok(text) = String::from_utf8(data) else {
                return (UE, "text not valid utf-8").into_response();
            };
            text
        },
        "docx" => {
            let Ok(data) = general_purpose::STANDARD.decode(data) else {
                return (UE, "could not base64 decode data").into_response();
            };
            let Some(text) = read_docx_text(data) else {
                return (UE, "could not read docx file").into_response();
            };
            text
        }
        _ => return (UE, "'typ' field must be text, text+gz+b64 or docx").into_response(),
    };

    match run_pipeline_single_lang(lemma_count, text, lang).await {
        Ok(text) => (StatusCode::OK, text),
        Err(errmsg) => (StatusCode::INTERNAL_SERVER_ERROR, errmsg),
    }.into_response()
}

