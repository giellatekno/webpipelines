import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import intl from "svelte-intl-precompile/sveltekit-plugin";
import { defineConfig } from "vite";

export default defineConfig({
    server: {
        // needed for the local nginx to see the dev server
        host: "0.0.0.0",
    },
    plugins: [tailwindcss(), intl("locales"), sveltekit()],
});
