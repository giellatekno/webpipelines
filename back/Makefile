.PHONY: help
help:
	@echo "Available commands:"
	@echo "dev - run development build locally"
	@echo "build - just cargo build --release"
	@echo "image - use podman to build the image"
	@echo "runlocal - run the container locally"
	@echo "stop - stop the locally running container"
	@echo "bap - build and push (to labacr)"
	@echo "push-labacr - push the built image to the azure lab subscription (gtlab)"
	@echo "runlocal - run the built image, using local settings"
	@echo "export - export the built image to webpipeline-api.tar.gz"
	@echo "push-gtweb - upload webpipeline-api.tar.gz to gtweb (read docs there on how to import and run)"

.PHONY: dev
dev:
	RUSTFLAGS="--cfg tokio_unstable" RUST_BACKTRACE=1 systemfd --no-pid -s http::3000 -- cargo watch -x run
#	LD_LIBRARY_PATH=/home/anders/projects/cpp_library_to_rust_demo/some_cpplib/ RUST_BACKTRACE=1 systemfd --no-pid -s http::3000 -- cargo watch -x run

.PHONY: build
build:
	RUSTFLAGS="--cfg tokio_unstable" cargo build --release --target-dir target

.PHONY: image
image: target/release/webpipeline
	podman build -t webpipeline-api -f Dockerfile .

.PHONY: runlocal
runlocal:
	podman run \
		--name webpipeline-api \
		--detach \
		--init \
		--stop-signal=SIGINT \
		--rm \
		-p 3001:3000 \
		--env WP_LANGFOLDER=/langs \
		-v /usr/share/giella:/langs \
		webpipeline-api

.PHONY: bap
bap:
	RUSTFLAGS="--cfg tokio_unstable" cargo build --release --target-dir target
	podman build -t webpipeline-api -f Dockerfile .
	podman tag webpipeline-api gtlabcontainerregistry.azurecr.io/webpipeline-api
	podman push gtlabcontainerregistry.azurecr.io/webpipeline-api

.PHONY: stoplocal
stoplocal:
	podman stop webpipeline-api

.PHONY: push-labacr
push-labacr:
	podman tag webpipeline-api gtlabcontainerregistry.azurecr.io/webpipeline-api
	podman push gtlabcontainerregistry.azurecr.io/webpipeline-api
