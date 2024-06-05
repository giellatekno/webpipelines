import adapter from '@sveltejs/adapter-node';

const dev = process.env.NODE_ENV == "development";
const prod = process.env.NODE_ENV == "production";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
        paths: {
            base: dev ? "" : "/webpipeline-simple",
        },
	}
};

export default config;
