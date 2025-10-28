import { error } from "@sveltejs/kit";
import { langs } from "$lib/langs.js";

export function load({ params }) {
    if (!langs.includes(params.lang)) {
        throw error(404, "Not Found");
    }

    return {
        lang: params.lang,
    };
}
