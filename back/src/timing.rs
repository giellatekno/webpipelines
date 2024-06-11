use axum::{extract::Request, middleware::Next, response::Response};
use http::HeaderValue;
use std::time::Instant;

pub async fn timing_middleware(request: Request, next: Next) -> Response {
    let t0 = Instant::now();
    let mut response = next.run(request).await;
    let duration = Instant::now().duration_since(t0).as_secs_f64();
    let duration = format!("req;desc=\"Request time\";dur={duration}");
    let duration = HeaderValue::from_str(&duration).unwrap();
    response.headers_mut().insert("Server-Timing", duration);
    response
}
