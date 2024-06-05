import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const dev = process.env.NODE_ENV == "development";
const prod = process.env.NODE_ENV == "production";
let base;
if (prod) {
    base = "/webpipeline";
} else {
    if (process.env.XX_BASE) {
        base = process.env.XX_BASE;
    } else {
        base = "";
    }
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess()],

	kit: {
        alias: {
            "$components": "src/components",
            "$assets": "src/assets",
        },
        paths: {
            base,
            //base: dev ? "" : "/webpipeline",
        },

		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
	}
};

export default config;
