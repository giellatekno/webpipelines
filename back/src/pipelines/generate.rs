use crate::langmodel_files::get_langfile;
use crate::pipelines::run_pipeline_single_lang;
use axum::{
    extract::Path,
    response::{IntoResponse, Response},
};
use cmd_lib::run_fun;
use http::StatusCode;
use serde::Deserialize;
//use cached::proc_macro::cached;

pub fn generate(input: &str, lang: &str) -> Result<String, String> {
    let generate_gt_norm_hfstol =
        get_langfile(&lang, "generator-gt-norm.hfstol").ok_or_else(|| {
            format!(
                "language not supported \
                (generator-gt-norm.hfstol doesn't exist for language {})",
                lang
            )
        })?;

    let input = input.to_owned();
    run_fun!(
        echo $input |
        hfst-lookup -cg $generate_gt_norm_hfstol
    )
    .map_err(|e| e.to_string())
}

pub async fn generate_async(input: &str, lang: &str) -> Result<String, String> {
    let input = input.to_owned();
    let lang = lang.to_owned();
    tokio::task::spawn_blocking(move || generate(&input, &lang))
        .await
        .unwrap()
}

#[derive(Deserialize)]
pub struct LangAndStringParams {
    lang: String,
    string: String,
}

pub async fn generate_endpoint(
    Path(LangAndStringParams { lang, string }): Path<LangAndStringParams>,
) -> Response {
    match run_pipeline_single_lang(generate, &string, &lang).await {
        Ok(text) => (StatusCode::OK, text),
        Err(errmsg) => (StatusCode::UNPROCESSABLE_ENTITY, errmsg),
    }
    .into_response()
}
