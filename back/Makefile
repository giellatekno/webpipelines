.PHONY: help
help:
	@echo "Available commands:"
	@echo "dev - run development build locally"
	@echo "build - just cargo build --release"
	@echo "image - use podman to build the image"
	@echo "push-gtlab - push the built image to the azure lab subscription (gtlab)"
	@echo "runlocal - run the built image, using local settings"
	@echo "stop - stop the locally running container"
	@echo "export - export the built image to webpipelineapi.tar.gz"
	@echo "upload - upload webpipelineapi.tar.gz to gtweb (read docs there on how to import and run)"

.PHONY: dev
dev:
	RUST_BACKTRACE=1 systemfd --no-pid -s http::3000 -- cargo watch -x run

.PHONY: build
build:
	cargo build --release --target-dir target

.PHONY: image
image: target/release/webpipeline
	podman build -t webpipelineapi -f Dockerfile .

.PHONY: runlocal
runlocal:
	podman run \
		--name webpipelineapi \
		--detach \
		--init \
		--stop-signal=SIGINT \
		--rm \
		-p 3001:3000 \
		--env WP_LANGFOLDER=/langs \
		-v /usr/share/giella:/langs \
		webpipelineapi

.PHONY: stoplocal
stoplocal:
	podman stop webpipelineapi

.PHONY: push-gtlab
push-gtlab:
	podman tag webpipelineapi gtlabcontainerregistry.azurecr.io/webpipelineapi
	podman push gtlabcontainerregistry.azurecr.io/webpipelineapi

.PHONY: export
export:
	podman save -o webpipelineapi.tar webpipelineapi
	gzip -f webpipelineapi.tar

.PHONY: upload
upload:
	scp webpipelineapi.tar.gz gtweb.uit.no:/home/anders/webpipelineapi.tar.gz
