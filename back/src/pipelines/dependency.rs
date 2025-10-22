use crate::langmodel_files::get_langfile;
use crate::pipelines::run_pipeline_single_lang;
use axum::{
    extract::Path,
    response::{IntoResponse, Response},
};
use cached::proc_macro::cached;
use cmd_lib::run_fun;
use http::StatusCode;
use serde::Deserialize;

//#[cached]
pub fn dependency(input: &str, lang: &str) -> Result<String, String> {
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
            (disambiguator.[cg3|bin] not found for language {})",
                lang
            )
        })?;
    let korp_cg3 = get_langfile(&lang, "korp.cg3")
        .or_else(|| get_langfile(&lang, "functions.bin"))
        .ok_or_else(|| {
            format!(
                "language not supported \
            (korp.cg3 AND functions.bin not found for language {})",
                lang
            )
        })?;
    let dependency_cg3 = get_langfile(&lang, "dependency.cg3")
        .or_else(|| get_langfile(&lang, "dependency.bin"))
        .ok_or_else(|| {
            format!(
                "language not supported \
            (dependency.cg3 not found for language {})",
                lang
            )
        })?;

    let use_weight = match lang {
        "rus" => true,
        //"nob" => true,
        _ => false,
    };

    let tokenize_params = if use_weight { "-cg" } else { "-cgW" };

    run_fun!(
        echo $input |
        hfst-tokenize $tokenize_params $tokdisamb |
        vislcg3 -g $disambiguator_cg3 |
        vislcg3 -g $korp_cg3 |
        vislcg3 -g $dependency_cg3
    )
    .map_err(|e| e.to_string())
}

#[derive(Deserialize)]
pub struct LangAndStringParams {
    lang: String,
    string: String,
}

pub async fn dependency_endpoint(
    Path(LangAndStringParams { lang, string }): Path<LangAndStringParams>,
) -> Response {
    match run_pipeline_single_lang(dependency, &string, &lang).await {
        Ok(text) => (StatusCode::OK, text),
        Err(errmsg) => (StatusCode::UNPROCESSABLE_ENTITY, errmsg),
    }
    .into_response()
}
