mod pipelines;
mod util;
mod timing;
mod langmodel_files;

use std::time::Duration;

use timing::timing_middleware;
use crate::langmodel_files::WP_LANGFOLDER;
use axum::{
    error_handling::HandleErrorLayer,
    extract::DefaultBodyLimit,
    response::{IntoResponse, Response},
    routing::{get, post},
    BoxError, Router,
};
use dotenv;
use listenfd::ListenFd;
use pipelines::{
    analyze::analyze_endpoint,
    dependency::dependency_endpoint,
    disambiguate::disambiguate_endpoint,
    generate::generate_endpoint,
    hyphenate::hyphenate_endpoint,
    lemma_count::lemma_count_endpoint,
    paradigm::paradigm_endpoint,
    transcribe::transcribe_endpoint,
    unknown_in_x_by_freq::unknown_in_x_by_freq_endpoint,
};
use tokio::{self, net::TcpListener};
use tower::{limit::ConcurrencyLimitLayer, ServiceBuilder};
use tower_http::{
    catch_panic::CatchPanicLayer,
    cors::CorsLayer,
    services::ServeDir,
    trace::{DefaultMakeSpan, DefaultOnResponse, TraceLayer},
    LatencyUnit,
};
use tracing::{info, Level};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

async fn handle_error(err: BoxError) -> Response {
    if err.is::<tower::timeout::error::Elapsed>() {
        (
            http::StatusCode::REQUEST_TIMEOUT,
            "Handling the request took too long",
        )
            .into_response()
    } else if err.is::<tower::load_shed::error::Overloaded>() {
        (http::StatusCode::SERVICE_UNAVAILABLE, "service is busy").into_response()
    } else {
        (http::StatusCode::INTERNAL_SERVER_ERROR, "unhandled error").into_response()
    }
}

fn handle_panic(err: Box<dyn std::any::Any + Send + 'static>) -> Response<hyper::Body> {
    println!("handle_panic() !!");

    let details = if let Some(s) = err.downcast_ref::<String>() {
        s.clone()
    } else if let Some(s) = err.downcast_ref::<&str>() {
        s.to_string()
    } else {
        "Unknown panic message".to_string()
    };

    let body = serde_json::json!({
        "error": {
            "kind": "panic",
            "details": details,
        }
    });
    let body = serde_json::to_string(&body).unwrap();

    Response::builder()
        .status(http::StatusCode::INTERNAL_SERVER_ERROR)
        .header(http::header::CONTENT_TYPE, "application/json")
        .body(hyper::Body::from(body))
        .unwrap()
}

#[tokio::main]
async fn main() {
    dotenv::dotenv().ok();

    tracing_subscriber::registry()
        .with(
            console_subscriber::ConsoleLayer::builder()
                .retention(Duration::from_secs(30))
                .spawn()
        )
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env().unwrap_or_else(|_| {
                // axum logs rejections from built-in extractors with the `axum::rejection`
                // target, at `TRACE` level. `axum::rejection=trace` enables showing those events
                "webpipeline=trace,tower_http=debug,axum::rejection=trace,tokio=debug,runtime=debug".into()
            }),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    // it's a Lazy OnceCell, which will exit() if the env var is not set when
    // reading it the first time (which is also part of the reason why we
    // print it out here - to actually read it, to run the check and exit
    // if it was not found..probably a better way to do this)
    println!("language folder: {}", &*WP_LANGFOLDER);

    // populate the hashmap of known files by reading the file system
    let num_files_total = langmodel_files::load_langfiles();
    info!("Found {} language files in total", num_files_total);

    let app = Router::new()
        .route(
            "/unknown-lemmas-in-dict",
            post(unknown_in_x_by_freq_endpoint),
        )
        .layer(
            ServiceBuilder::new()
                .layer(HandleErrorLayer::new(handle_error))
                .load_shed()
                .concurrency_limit(2), //.timeout(Duration::from_secs(2))
        )
        .route("/lemma-count", post(lemma_count_endpoint))
        .layer(
            ServiceBuilder::new()
                .layer(HandleErrorLayer::new(handle_error))
                .timeout(Duration::from_secs(60)),
        )
        .route("/analyze/:lang/:string", get(analyze_endpoint))
        .route("/dependency/:lang/:string", get(dependency_endpoint))
        .route("/disambiguate/:lang/:string", get(disambiguate_endpoint))
        .route("/generate/:lang/:string", get(generate_endpoint))
        .route("/hyphenate/:lang/:string", get(hyphenate_endpoint))
        .route("/transcribe/:lang/:string", get(transcribe_endpoint))
        .route("/paradigm/:lang/:string", get(paradigm_endpoint))
        .route("/info", get(langmodel_files::endpoint_info_all))
        // global concurrency limit (applies to all paths)
        // does NOT have load_shed, so will queue requests (requests are
        // technically blocked on an async semaphore, so I guess there's
        // no strict queue in the "first-come-first-serve" sense)
        .layer(axum::middleware::from_fn(timing_middleware))
        .layer(ConcurrencyLimitLayer::new(10))
        .layer(CatchPanicLayer::custom(handle_panic))
        .layer(
            TraceLayer::new_for_http()
                .make_span_with(DefaultMakeSpan::new().include_headers(false))
                .on_response(
                    DefaultOnResponse::new()
                        .level(Level::INFO)
                        .latency_unit(LatencyUnit::Millis),
                ),
        )
        .layer(ServiceBuilder::new().layer(CorsLayer::very_permissive()))
        // We'll just let the revproxy decide when request bodies are too big
        .layer(DefaultBodyLimit::disable())
        .nest_service("/", ServeDir::new("assets"));

    eprintln!("starting webpipeline");

    let mut listenfd = ListenFd::from_env();

    let listener = match listenfd.take_tcp_listener(0).unwrap() {
        // if we are given a tcp listener on listen fd 0, we use that one
        Some(listener) => TcpListener::from_std(listener).unwrap(),
        // otherwise fall back to local listening
        None => TcpListener::bind("0.0.0.0:3000").await.unwrap(),
    };

    // anders: axum::Server::from_tcp() takes a std::net::TcpListener,
    // not a tokio::net::TcpListener..
    let listener = listener
        .into_std()
        .expect("tokio tcp listener to std listener ok");

    axum::Server::from_tcp(listener)
        .unwrap()
        .serve(app.into_make_service())
        .await
        .unwrap();
}
