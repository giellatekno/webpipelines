use axum::{http::Request, middleware::Next, response::Response};
use std::time::{Duration, Instant};

pub async fn timing_middleware<B>(request: Request<B>, next: Next<B>) -> Response {
    let t0 = Instant::now();
    let mut response = next.run(request).await;
    let t1 = Instant::now();
    let duration = t1.duration_since(t0);
    let duration = duration.as_secs_f64();
    let duration = format!("req;desc=\"Request time\";dur={duration}");
    let duration = http::header::HeaderValue::from_str(&duration).unwrap();
    response.headers_mut().insert("Server-Timing", duration);
    response
}
