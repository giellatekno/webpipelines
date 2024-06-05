use crate::langmodel_files::get_langfile;
use crate::pipelines::run_pipeline_single_lang;
use axum::{
    extract::Path,
    response::{IntoResponse, Response},
};
//use cached::proc_macro::cached;
use cmd_lib::run_fun;
use http::StatusCode;
use serde::Deserialize;

//#[cached]
pub fn disambiguate(input: &str, lang: &str) -> Result<String, String> {
    let tokdisamb = get_langfile(&lang, "tokeniser-disamb-gt-desc.pmhfst").ok_or_else(|| {
        format!(
            "language not supported \
            (tokeniser-disamb-gt-desc.pmhfst doesn't exist for language {}",
            lang
        )
    })?;
    let disambiguator_cg3 = get_langfile(&lang, "disambiguator.cg3")
        .or_else(|| get_langfile(&lang, "disambiguator.bin"))
        .ok_or_else(|| {
            format!(
                "language not supported \
            (disambiguator.cg3 not found for language {})",
                lang
            )
        })?;

    run_fun!(
        echo $input |
        hfst-tokenize -cg $tokdisamb |
        vislcg3 -g $disambiguator_cg3
    )
    .map_err(|e| e.to_string())
}

#[derive(Deserialize)]
pub struct LangAndStringParams {
    lang: String,
    string: String,
}

pub async fn disambiguate_endpoint(
    Path(LangAndStringParams { lang, string }): Path<LangAndStringParams>,
) -> Response {
    match run_pipeline_single_lang(disambiguate, &string, &lang).await {
        Ok(text) => (StatusCode::OK, text),
        Err(errmsg) => (StatusCode::UNPROCESSABLE_ENTITY, errmsg),
    }
    .into_response()
}
