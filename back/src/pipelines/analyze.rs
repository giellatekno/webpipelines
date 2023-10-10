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
pub fn analyze(input: String, lang: String) -> Result<String, String> {
    let tokdisamb = get_langfile(&lang, "tokeniser-disamb-gt-desc.pmhfst")
        .ok_or_else(|| format!("language not supported \
            (tokeniser-disamb-gt-desc.pmhfst doesn't exist for language {}", lang))?;
    let analyzer_gt_desc_hfstol = get_langfile(&lang, "analyser-gt-desc.hfstol")
        .ok_or_else(|| format!("language not supported \
            (analyser-gt-desc.hfstol doesn't exist for language {}", lang))?;

    run_fun!(
        echo $input |
        hfst-tokenize -q $tokdisamb |
        hfst-lookup -q $analyzer_gt_desc_hfstol
    )
    .map_err(|e| e.to_string())
}

#[derive(Deserialize)]
pub struct LangAndStringParams {
    lang: String,
    string: String,
}

pub async fn analyze_endpoint(
    Path(LangAndStringParams { lang, string }): Path<LangAndStringParams>,
) -> Response {
    match run_pipeline_single_lang(analyze, string, lang).await {
        Ok(text) => (StatusCode::OK, text),
        Err(errmsg) => (StatusCode::UNPROCESSABLE_ENTITY, errmsg),
    }.into_response()
}

