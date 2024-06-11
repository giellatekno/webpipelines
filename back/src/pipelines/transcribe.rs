use axum::{
    extract::Path,
    response::{IntoResponse, Response},
};
use cmd_lib::run_fun;
use http::StatusCode;
use serde::Deserialize;

use crate::langmodel_files::get_langfile;
use crate::pipelines::run_pipeline_single_lang;
//use cached::proc_macro::cached;

pub fn transcribe(input: &str, lang: &str) -> Result<String, String> {
    let txt2ipa = get_langfile(&lang, "txt2ipa.lookup.hfstol").ok_or_else(|| {
        format!(
            "language not supported \
            (txt2ipa.lookup.hfstol doesn't exist for language {})",
            lang
        )
    })?;

    run_fun!(
        echo -e "$input" |
        hfst-lookup -q $txt2ipa
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
    match run_pipeline_single_lang(transcribe, &string, &lang).await {
        Ok(text) => (StatusCode::OK, text),
        Err(errmsg) => (StatusCode::INTERNAL_SERVER_ERROR, errmsg),
    }
    .into_response()
}
