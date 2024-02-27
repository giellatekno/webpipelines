use crate::pipelines::run_pipeline_single_lang;
use crate::langmodel_files::get_langfile;
use axum::{
    extract::Path,
    response::{IntoResponse, Response},
};
use cached::proc_macro::cached;
use cmd_lib::run_fun;
use http::StatusCode;
use serde::Deserialize;

#[cached]
pub fn generate(input: String, lang: String) -> Result<String, String> {
    let langfile = get_langfile(&lang, "generator-gt-norm.hfstol").ok_or_else(|| {
        format!(
            "language not supported \
            (generator-gt-norm.hfstol doesn't exist for language {})",
            lang
        )
    })?;

    run_fun!(
        echo $input |
        hfst-lookup -cg $langfile
    )
    .map_err(|e| e.to_string())
}

#[derive(Deserialize)]
pub struct LangAndStringParams {
    lang: String,
    string: String,
}

pub async fn generate_endpoint(
    Path(LangAndStringParams { lang, string }): Path<LangAndStringParams>,
) -> Response {
    match run_pipeline_single_lang(generate, string, lang).await {
        Ok(text) => (StatusCode::OK, text),
        Err(errmsg) => (StatusCode::UNPROCESSABLE_ENTITY, errmsg),
    }
    .into_response()
}
