use axum::{
    extract::Path,
    response::{IntoResponse, Response},
};
use cmd_lib::run_fun;
use http::StatusCode;
use serde::Deserialize;

use crate::langmodel_files::get_langfile;
use crate::pipelines::run_pipeline_single_lang;
use cached::proc_macro::cached;

//#[cached]
pub fn hyphenate(input: &str, lang: &str) -> Result<String, String> {
    let hyphenate_hfstol = get_langfile(&lang, "hyphenator-gt-desc.hfstol").ok_or_else(|| {
        format!(
            "language not supported \
            (hyphenator-gt-desc.hfstol doesn't exist for language {}",
            lang
        )
    })?;

    run_fun!(
        echo $input |
        hfst-lookup -q $hyphenate_hfstol
    )
    .map_err(|e| e.to_string())
}

#[derive(Deserialize)]
pub struct LangAndStringParams {
    lang: String,
    string: String,
}

pub async fn hyphenate_endpoint(
    Path(LangAndStringParams { lang, string }): Path<LangAndStringParams>,
) -> Response {
    match run_pipeline_single_lang(hyphenate, &string, &lang).await {
        Ok(text) => (StatusCode::OK, text),
        Err(errmsg) => (StatusCode::UNPROCESSABLE_ENTITY, errmsg),
    }
    .into_response()
}
