# FROM docker.io/library/rust:1.67 as builder
# WORKDIR /usr/src/myapp
# COPY . .
# RUN cargo install --path .
FROM debian:sid-slim
RUN apt-get update && apt-get install -y libc6 curl
RUN curl https://apertium.projectjj.com/apt/install-nightly.sh | bash
RUN apt-get install -y antiword cg3 hfst
RUN rm -rf /var/lib/apt/lists/*
COPY lookup /usr/local/bin/lookup
COPY target/release/webpipeline /usr/local/bin/webpipeline
COPY assets /var/assets
WORKDIR /var
CMD ["webpipeline"]
