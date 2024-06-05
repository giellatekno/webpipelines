use axum::{
    extract::Path,
    response::{IntoResponse, Response},
};
use http::StatusCode;
use itertools::Itertools;
use serde::Deserialize;

use crate::analysis::analyze_async;
//use cached::proc_macro::cached;

#[derive(Deserialize)]
pub struct LangAndStringParams {
    lang: String,
    string: String,
}

pub async fn analyze_endpoint(
    Path(LangAndStringParams { lang, string }): Path<LangAndStringParams>,
) -> Response {
    let analyses_vec = match analyze_async(&string, &lang, true).await {
        Ok(analyses_vec) => analyses_vec,
        Err(e) => {
            return (StatusCode::UNPROCESSABLE_ENTITY, e).into_response();
        }
    };
    let out = analyses_vec
        .into_iter()
        .map(|analysis| analysis.line)
        .join("\n");
    (StatusCode::OK, out).into_response()
}
