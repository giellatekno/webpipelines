.PHONY: help
help:
	@echo "Available commands:"
	@echo "dev - run development build locally"
	@echo "build - just cargo build --release"
	@echo "image - use podman to build the image"
	@echo "push-gtlab - push the built image to the azure lab subscription (gtlab)"
	@echo "runlocal - run the built image, using local settings"
	@echo "stoplocal - stop the locally running container"
	@echo "export - export the built image to webpipelineapi.tar.gz"
	@echo "push-gtweb - upload webpipelineapi.tar.gz to gtweb (read docs there on how to import and run)"

.PHONY: dev
dev:
	PUBLIC_API_ROOT=http://localhost:3000 pnpm run dev

.PHONY: build
build:
	pnpm run build

.PHONY: image
image:
	podman build -t webpipelineclient -f Dockerfile .

.PHONY: runlocal
runlocal:
	podman run \
		--name webpipelineclient \
		--detach \
		--init \
		--stop-signal=SIGINT \
		--rm \
		-p 5173:3000 \
		--env PUBLIC_API_ROOT=http://localhost:3000 \
		--env ORIGIN=http://localhost:5173 \
		webpipelineclient

.PHONY: stoplocal
stoplocal:
	podman stop webpipelineclient

.PHONY: push-gtlab
push-gtlab:
	podman tag webpipelineclient gtlabcontainerregistry.azurecr.io/webpipelineclient
	podman push gtlabcontainerregistry.azurecr.io/webpipelineclient

.PHONY: export
export:
	podman save -o webpipelineclient.tar webpipelineclient
	gzip -f webpipelineclient.tar

.PHONY: push-gtweb
push-gtweb: webpipelineclient.tar.gz
	scp webpipelineclient.tar.gz gtweb.uit.no:/home/anders/webpipelineclient.tar.gz
