.PHONY: help
help:
	@echo "Available commands:"
	@echo "dev - run locally (pnpm run dev)"
	@echo "buildlocal - build image with local settings"
	@echo "runlocal - run the built image, using local settings"
	@echo "buildprod - build image with prod settings"
	@echo "stop - stop the locally running container"
	@echo "export - export the built image to webpipeline-front.tar.gz"
	@echo "upload - upload webpipeline-front.tar.gz to gtweb (read docs there on how to import and run)"

.PHONY: dev
dev:
	pnpm run dev

.PHONY: buildlocal
buildlocal:
	ORIGIN=127.0.0.1/webpipeline pnpm run build
	podman build -f Dockerfile -t webpipeline-front

.PHONY: runlocal
runlocal:
	podman run --init --rm --detach --stop-signal=SIGINT \
		--name=webpipelinefront \
		--env PUBLIC_BACKEND_URL=127.0.0.1:3000 \
		-p 8080:3000 \
		webpipeline-front

.PHONY: stop
stop:
	podman stop webpipeline-front

.PHONY: buildprod
buildprod:
	ORIGIN=http://gtweb.uit.no/webpipeline pnpm run build
	podman build -f Dockerfile -t webpipeline-front

.PHONY: export
export:
	podman save -o webpipeline-front.tar webpipeline-front
	gzip webpipeline-front.tar

.PHONY: upload
upload:
	scp webpipeline-front.tar.gz gtweb.uit.no:/home/anders/webpipeline-front.tar.gz


# Update #1: (Originally part of build, but this takes a long time...)
# Update #2: Yeah, it's broken. Workaround: delete node_modules, `npm i`,
#   then delete node_modules again, and do `pnpm i` (which is fast anyway)
# only generate package-lock.json from package.json,
# without actually installing stuff into node_modules
# (that's taken care of by pnpm)
# Thank you,
# https://github.com/orgs/pnpm/discussions/3367#discussioncomment-2919171
#
#make-package-lock:
#npm i --package-lock-only

