.PHONY: help
help:
	@echo "Available commands:"
	@echo "dev - run development build locally"
	@echo "build - just cargo build --release"
	@echo "image - use podman to build the image"
	@echo "push-gtlab - push the built image to the azure lab subscription (gtlab)"
	@echo "runlocal - run the built image, using local settings"
	@echo "stoplocal - stop the locally running container"
	@echo "export - export the built image to webpipeline-client.tar.gz"
	@echo "push-gtweb - upload webpipeline-client.tar.gz to gtweb (read docs there on how to import and run)"

.PHONY: dev
dev:
	PUBLIC_API_ROOT=http://localhost:3000 pnpm run dev

.PHONY: build
build:
	pnpm run build

.PHONY: build-gtweb
build-gtweb:
	SK_BASE=/webpipeline pnpm run build

.PHONY: image
image:
	podman build -t webpipeline-client -f Dockerfile .

.PHONY: runlocal
runlocal:
	podman run \
		--name webpipeline-client \
		--detach \
		--init \
		--stop-signal=SIGINT \
		--rm \
		-p 5173:3000 \
		--env PUBLIC_API_ROOT=http://localhost:3000 \
		--env ORIGIN=http://localhost:5173 \
		webpipeline-client

.PHONY: stoplocal
stoplocal:
	podman stop webpipeline-client

.PHONY: push-labacr
push-labacr:
	podman tag webpipeline-client gtlabcontainerregistry.azurecr.io/webpipeline-client
	podman push gtlabcontainerregistry.azurecr.io/webpipeline-client

.PHONY: export
export:
	podman save -o webpipeline-client.tar webpipeline-client
	gzip -f webpipeline-client.tar

.PHONY: push-gtweb
push-gtweb: webpipeline-client.tar.gz
	scp webpipeline-client.tar.gz gtweb.uit.no:/home/anders/webpipeline-client.tar.gz
