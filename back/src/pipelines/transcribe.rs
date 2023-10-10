use axum::{
    extract::Path,
    response::{Response, IntoResponse},
};
use cmd_lib::run_fun;
use serde::Deserialize;
use http::StatusCode;

use crate::util::get_langfile;
use crate::pipelines::run_pipeline_single_lang;
use cached::proc_macro::cached;

#[cached]
pub fn transcribe(input: String, lang: String) -> Result<String, String> {
    let txt2ipa = get_langfile(&lang, "txt2ipa.lookup.hfstol")
        .ok_or_else(|| format!("language not supported \
            (txt2ipa.lookup.hfstol doesn't exist for language {}", lang))?;

    run_fun!(
        echo $input |
        hfst-tokenize -q $txt2ipa
    )
    .map_err(|e| e.to_string())
}

#[derive(Deserialize)]
pub struct LangAndStringParams {
    lang: String,
    string: String,
}

pub async fn transcribe_endpoint(
    Path(LangAndStringParams { lang, string }): Path<LangAndStringParams>,
) -> Response {
    match run_pipeline_single_lang(transcribe, string, lang).await {
        Ok(text) => (StatusCode::OK, text),
        Err(errmsg) => (StatusCode::INTERNAL_SERVER_ERROR, errmsg),
    }.into_response()
}


