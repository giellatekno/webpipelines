mod pipelines;
mod util;

use dotenv;
use tokio::{self, net::TcpListener};
use listenfd::ListenFd;
use pipelines::{
    analyze::analyze_endpoint,
    generate::generate_endpoint,
    unknown_in_x_by_freq::unknown_in_x_by_freq_endpoint,
    dependency::dependency_endpoint,
    hyphenate::hyphenate_endpoint,
    paradigm::paradigm_endpoint,
    lemma_count::lemma_count_endpoint,
    transcribe::transcribe_endpoint,
};
use axum::{
    extract::DefaultBodyLimit,
    routing::{get, post},
    error_handling::HandleErrorLayer,
    Router, response::{Response, IntoResponse}, BoxError,
};
use tower::{
    limit::ConcurrencyLimitLayer,
    ServiceBuilder
};
use tower_http::{
    LatencyUnit,
    services::ServeDir,
    catch_panic::CatchPanicLayer,
    cors::CorsLayer,
    trace::{TraceLayer, DefaultMakeSpan, DefaultOnResponse},
};
use tracing::Level;
use tracing_subscriber::{
    layer::SubscriberExt,
    util::SubscriberInitExt,
};
use crate::util::WP_LANGFOLDER;


async fn handle_error(err: BoxError) -> Response {
    if err.is::<tower::timeout::error::Elapsed>() {
        (http::StatusCode::REQUEST_TIMEOUT, "request took too long").into_response()
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
            tracing_subscriber::EnvFilter::try_from_default_env().unwrap_or_else(|_| {
                // axum logs rejections from built-in extractors with the `axum::rejection`
                // target, at `TRACE` level. `axum::rejection=trace` enables showing those events
                "webpipeline=debug,tower_http=debug,axum::rejection=trace".into()
            }),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    // it's a Lazy OnceCell, which will exit() if the env var is not set when
    // reading it the first time (which is also part of the reason why we
    // print it out here - to actually read it, to run the check and exit
    // if it was not found..probably a better way to do this)
    println!("language folder: {}", &*WP_LANGFOLDER);

    let app = Router::new()
        .route("/unknown-lemmas-in-dict", post(unknown_in_x_by_freq_endpoint))
        .layer(
            ServiceBuilder::new()
                .layer(HandleErrorLayer::new(handle_error))
                .load_shed()
                .concurrency_limit(2)
                //.timeout(Duration::from_secs(2))
        )
        .route("/lemma-count", post(lemma_count_endpoint))
        .route("/analyze/:lang/:string", get(analyze_endpoint))
        .route("/dependency/:lang/:string", get(dependency_endpoint))
        .route("/generate/:lang/:string", get(generate_endpoint))
        .route("/hyphenate/:lang/:string", get(hyphenate_endpoint))
        .route("/transcribe/:lang/:string", get(transcribe_endpoint))
        .route("/paradigm/:lang/:string", get(paradigm_endpoint))

        // global concurrency limit (applies to all paths)
        // does NOT have load_shed, so will queue requests (requests are
        // technically blocked on an async semaphore, so I guess there's
        // no strict queue in the "first-come-first-serve" sense)
        .layer(ConcurrencyLimitLayer::new(10))
        .layer(CatchPanicLayer::custom(handle_panic))
        .layer(TraceLayer::new_for_http()
                   .make_span_with(
                       DefaultMakeSpan::new().include_headers(false)
                    )
                    .on_response(
                        DefaultOnResponse::new()
                            .level(Level::INFO)
                            .latency_unit(LatencyUnit::Millis)
                    )
        )
        .layer(
            ServiceBuilder::new()
               .layer(CorsLayer::very_permissive())
        )
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
    let listener = listener.into_std().expect("tokio tcp listener to std listener ok");

    axum::Server::from_tcp(listener).unwrap()
        .serve(app.into_make_service())
        .await.unwrap();
}
