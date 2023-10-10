.PHONY: help
help:
	@echo "Available commands:"
	@echo "run - run locally"
	@echo "build - build locally, then build container"
	@echo "runlocal - run the built image, using local settings"
	@echo "stop - stop the locally running container"
	@echo "export - export the built image to webpipeline-back.tar.gz"
	@echo "upload - upload webpipeline-back.tar.gz to gtweb (read docs there on how to import and run)"

.PHONY: run
run:
	RUST_BACKTRACE=1 systemfd --no-pid -s http::3000 -- cargo watch -x run

.PHONY: build
build:
	cargo build --release
	podman build -t webpipeline-back -f Dockerfile .

.PHONY: runlocal
runlocal:
	podman run \
		--name webpipeline-back \
		--detach \
		--init \
		--stop-signal=SIGINT \
		--rm \
		-p 8081:3000 \
		--env WP_LANGFOLDER=/langs \
		-v /usr/share/giella:/langs \
		webpipeline-back

.PHONY: stop
stop:
	podman stop webpipeline-back

.PHONY: export
export:
	podman save -o webpipeline-back.tar webpipeline-back
	gzip webpipeline-back.tar

.PHONY: upload
upload:
	scp webpipeline-back.tar.gz gtweb.uit.no:/home/anders/webpipeline-back.tar.gz
