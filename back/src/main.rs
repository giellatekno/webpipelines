mod analysis;
mod async_watcher;
mod langmodel_files;
mod pipelines;
mod timing;
mod util;

use crate::async_watcher::make_async_watcher;
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
use notify::Watcher;
use pipelines::{
    analyze::{analyze_endpoint, analyze2_endpoint}, dependency::dependency_endpoint,
    disambiguate::disambiguate_endpoint, generate::generate_endpoint,
    hyphenate::hyphenate_endpoint, lemma_count::lemma_count_endpoint, paradigm::paradigm_endpoint,
    transcribe::transcribe_endpoint, unknown_in_x_by_freq::unknown_in_x_by_freq_endpoint,
};
use std::{
    time::Duration,
    collections::HashMap,
    sync::{Arc, Mutex},
};
use timing::timing_middleware;
use tokio::{self, net::TcpListener};
use tower::{limit::ConcurrencyLimitLayer, ServiceBuilder};
use tower_http::{
    catch_panic::CatchPanicLayer,
    cors::CorsLayer,
    services::ServeDir,
    trace::{DefaultMakeSpan, DefaultOnResponse, TraceLayer},
    LatencyUnit,
};
use tracing::{error, info, Level};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

use crate::langmodel_files::LANGFILES;

/*
use hfst_rs::{HfstInputStream, HfstTransducer};

#[derive(Default)]
struct AppState {
    analysis_files: Arc<Mutex<HashMap<String, HfstTransducer>>>,
}

impl Clone for AppState {
    fn clone(&self) -> Self {
        Self {
            analysis_files: Arc::clone(&self.analysis_files),
        }
    }
}
*/

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

fn handle_panic(
    err: Box<dyn std::any::Any + Send + 'static>,
) -> http::Response<http_body_util::Full<bytes::Bytes>> {
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
        .body(http_body_util::Full::from(body))
        .unwrap()
}

#[tokio::main]
async fn main() {
    info!("starting webpipeline");
    dotenv::dotenv().ok();

    tracing_subscriber::registry()
        .with(
            console_subscriber::ConsoleLayer::builder()
                .retention(Duration::from_secs(30))
                .spawn(),
        )
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env().unwrap_or_else(|_| {
                // axum logs rejections from built-in extractors with the `axum::rejection`
                // target, at `TRACE` level. `axum::rejection=trace` enables showing those events
                "webpipeline=trace,tower_http=debug,axum::rejection=trace,tokio=debug,runtime=debug"
                    .into()
            }),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    // it's a Lazy OnceCell, which will exit() if the env var is not set when
    // reading it the first time (which is also part of the reason why we
    // print it out here - to actually read it, to run the check and exit
    // if it was not found..probably a better way to do this)
    info!("language folder: {}", &*WP_LANGFOLDER);

    // populate the hashmap of known files by reading the file system
    let num_files_total = langmodel_files::load_langfiles();
    info!("Found {} language files in total", num_files_total);

    let (mut debouncer, mut rx) = make_async_watcher(Duration::from_secs(2)).unwrap();
    let path = std::path::Path::new(&*WP_LANGFOLDER);
    debouncer
        .watcher()
        .watch(path, notify::RecursiveMode::Recursive)
        .unwrap();
    debouncer
        .cache()
        .add_root(path, notify::RecursiveMode::Recursive);

    let _filewatcher_jh = tokio::spawn(async move {
        while let Some(res) = rx.recv().await {
            match res {
                Ok(events) => {
                    for ev in events.iter() {
                        match ev.kind {
                            notify::EventKind::Create(_create_kind) => {
                                // create kind: any, file, folder, other
                                for path in ev.paths.iter() {
                                    langmodel_files::add_langfile(path);
                                }
                            }
                            notify::EventKind::Modify(modify_kind) => {
                                // TODO for _this_ filewatcher, we don't really
                                // care about modified language model files,
                                // because all pipelines read all language
                                // model files from disk on every request
                                // .... mostly - except the paradigms -
                                // but if there is a change or new paradigm-
                                // related file added, it would be easier to
                                // just restart the server.
                                match modify_kind {
                                    notify::event::ModifyKind::Name(rename_mode) => {
                                        // a file was renamed. This could be
                                        // a file is no longer watched, or a
                                        // file was copied in under a different
                                        // name, and got `mv`ed to be the correct
                                        // name
                                        match rename_mode {
                                            notify::event::RenameMode::To => {
                                                // notifier only knows TO,
                                                // which means `mv`ed INTO
                                                // WP_LANGFOLDER. Treat it same
                                                // as a file that was created.
                                                for path in ev.paths.iter() {
                                                    langmodel_files::add_langfile(path);
                                                }
                                            }
                                            notify::event::RenameMode::From => {
                                                // `mv`ed OUT of WP_LANGFOLDER
                                                // so, same as delete
                                                info!("renamed FROM");
                                                for path in ev.paths.iter() {
                                                    langmodel_files::remove_langfile(path);
                                                }
                                            }
                                            notify::event::RenameMode::Both => {
                                                // `mv`ed FROM inside TO inside,
                                                // so we need to check both
                                                // for deletion and removal
                                                info!("renamed, BOTH TO AND FROM");
                                                info!(paths = ?ev.paths, "paths");
                                            }
                                            _ => {
                                                // Any and Other ignored
                                            }
                                        }
                                    }
                                    _ => {
                                        // not interested in the other
                                        // modification kinds (Any, Data,
                                        // Metadata, Other)
                                    }
                                }
                            }
                            notify::EventKind::Remove(remove_kind) => {
                                // remove_kind can be Folder - in which
                                // case we want to remove the entire folder
                                // from watched - if it's a folder we
                                // care about
                                for path in ev.paths.iter() {
                                    langmodel_files::remove_langfile(path);
                                }
                            }
                            // We don't care about Access, Other, and Any
                            _ => {}
                        }
                    }
                }
                Err(errors) => {
                    error!("Errors from file watcher: {:?}", errors);
                }
            }
        }
    });

    /*
    let langfiles = LANGFILES.read().unwrap();
    let analyzers = langfiles.iter()
        .filter(|((_lang, file), _path)| file == "analyser-gt-desc.hfstol")
        .map(|((lang, _filename), path)| (lang, HfstInputStream::new(&path)))
        .filter_map(|(lang, input_stream_result)| match input_stream_result {
            Ok(input_stream) => Some((lang, input_stream)),
            Err(_) => None,
        })
        .map(|(lang, input_stream)| {
            (lang, input_stream.read_transducers())
        })
        .filter(|(_lang, transducers)| transducers.len() > 0)
        .map(|(lang, transducers)| {
            (
                lang.clone(),
                transducers.into_iter().nth(0).unwrap()
            )
        });
    let analysis_files = HashMap::from_iter(analyzers);

    info!("loaded {} analyzers", analysis_files.len());

    let shared_state = AppState {
        analysis_files: Arc::new(Mutex::new(analysis_files)),
    };
    */

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
        .route("/analyze2/:lang/:string", get(analyze2_endpoint))
        .with_state(shared_state)
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

    info!("binding and listening");

    let mut listenfd = ListenFd::from_env();

    let listener = match listenfd.take_tcp_listener(0).unwrap() {
        // if we are given a tcp listener on listen fd 0, we use that one
        Some(listener) => TcpListener::from_std(listener).unwrap(),
        // otherwise fall back to local listening
        None => TcpListener::bind("0.0.0.0:3000").await.unwrap(),
    };

    axum::serve(listener, app).await.unwrap();
}
