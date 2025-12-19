import { env } from "$env/dynamic/public";
import { tools_for } from "$lib/langs";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ url, params, fetch }) => {
    if (!tools_for[params.lang].includes("paradigm")) {
        error(404, "Not Found");
    }
    console.log("routes/[lang]/paradigm/+page.js :: load()");
    const lang = params.lang;
    const search_params = url.searchParams;
    const word = search_params.get("word") || "";
    const size = search_params.get("size") || "standard";
    const pos = search_params.get("pos") || "any";

    interface LoadResponse {
        size: string;
        pos: string;
        word: string;
        error?: string;
        results?: Object[];
    }
    let load_response: LoadResponse = { size, pos, word };

    console.assert(typeof word === "string");

    if (word.length == 0) {
        return load_response;
    }

    const api_path = `paradigm/${lang}/${word}`;
    const api_url = `${env.PUBLIC_API_ROOT}/${api_path}?size=${size}&pos=${pos}&format=json`;

    try {
        console.log("Fetching from API:", api_url);
        const response = await fetch(api_url);

        if (!response.ok) {
            load_response.error = `non-200 from API: ${response.status}`;
            return load_response;
        }
        try {
            load_response.results = { ...(await response.json()) };
        } catch (e) {
            console.error(e);
            load_response.error = `Response is not JSON: ${e}`;
        }
    } catch (e) {
        console.error(e);
        load_response.error = "fetch() from API failed";
    }
    return load_response;
};
