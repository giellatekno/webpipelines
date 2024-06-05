## Webpipeline

`Webpipeline` is the project name for the replacement of the "old cgi-bin"
scripts, used for running various lingustic pipelines on a web server, for
clients.

The old ones was written in perl, running through cgi-bin, with perl generating
simple websites directly for the response. This new one splits up the
functionality in an `api` part, and a `front-end` part. The API will run on
the server, and run the actual pipelines, and provide simple text-based (or
some serialization format)-based replies, which the front-end will use.

The API is written in Rust, using the Axum web api framework. The built binary
is run through a container which contains the required hfst- and cg3- tools
built into it, while getting `.hfst`'s and other language model files mapped
into it from volumes.

The front-end is written in Svelte, with SvelteKit, hosted as a standalone node
project, run from a simple node-based docker image.


## Where

The API is in `back/`. The main front-end is in `client/`, while a simpler
frontend used only for `lemmalist` and `unknown-lemmas-in-dict` is in `front/`.


## How

In each directory, there is a `Makefile`, to simplify running commands.
Running `make` (or `make help`) will show a list of commands.

An binary executable filed is required in `back/`, called `back/lookup`, for
running the `lemmalist` and `unknown-lemmas-in-dict` endpoints. It is _not_
under source control.
