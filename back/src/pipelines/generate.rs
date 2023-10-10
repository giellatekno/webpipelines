use cmd_lib::run_fun;
use crate::util::get_langfile;
use crate::pipelines::run_pipeline_single_lang;
use axum::{
    response::{Response, IntoResponse},
    extract::Path,
};
use serde::Deserialize;
use http::StatusCode;
use cached::proc_macro::cached;

#[cached]
pub fn generate(input: String, lang: String) -> Result<String, String> {
    let langfile = get_langfile(&lang, "generator-gt-desc.hfstol")
        .ok_or_else(|| format!("language not supported \
            (generator-gt-desc.hfstol) doesn't exist for language {}", lang))?;

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
    }.into_response()
}

