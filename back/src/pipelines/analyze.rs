use std::collections::HashMap;
use axum::{
    extract::{Path, Query, State},
    response::{IntoResponse, Response, Json},
};
use http::StatusCode;
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
    Query(params): Query<HashMap<String, String>>,
) -> Response {
    let raw = match analyze_async(&string, &lang, true).await {
        Ok(raw) => raw,
        Err(e) => {
            return (StatusCode::INTERNAL_SERVER_ERROR, e).into_response();
        }
    };

    let fmt: &str = params.get("format").map(|s| s.as_str()).unwrap_or("text");

    match fmt {
        "text" => {
            (StatusCode::OK, raw).into_response()
        }
        "json" => {
            // asking for json also gives the raw (it's not a lot of data anyway)
            Json(serde_json::json!({
                "parsed": raw
                    .split('\n')
                    .filter_map(|line| line.parse::<crate::analysis::Analysis>().ok())
                    .filter(|analysis| analysis.lemma().len() > 0)
                    .map(|analysis| analysis.to_json())
                    .collect::<Vec<_>>(),
                "raw": raw,
            })).into_response()
        }
        _ => {
            let status = StatusCode::BAD_REQUEST;
            let msg = "unknown query arg 'format', choose text or json";
            (status, msg).into_response()
        }
    }
}

//use crate::AppState;
use axum::debug_handler;

#[debug_handler]
pub async fn analyze2_endpoint(
    Path(LangAndStringParams { lang, string }): Path<LangAndStringParams>,
    Query(params): Query<HashMap<String, String>>,
    //State(state): State<AppState>,
) -> Response {
    /*
    let analysis_files = state.analysis_files.lock().unwrap();
    let Some(tr) = analysis_files.get(&lang) else {
        return "no analyzer for that lang".into_response();
    };
    let lookups = tr.lookup(&string);

    let s = lookups
        .iter()
        .map(|(s, w)| format!("{s} {w:?}\n"))
        .collect::<String>();
    s.into_response()
    */
    "not implemented".into_response()
}
