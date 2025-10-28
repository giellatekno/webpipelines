import { env } from "$env/dynamic/public";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ url, params, fetch }) => {
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
        results?: {
            text: string;
        };
    }
    let load_response: LoadResponse = { size, pos, word };

    console.assert(typeof word === "string");

    if (word.length == 0) {
        return load_response;
    }

    const api_path = `paradigm/${lang}/${word}`;
    const api_url = `${env.PUBLIC_API_ROOT}/${api_path}?size=${size}&pos=${pos}`;

    let response;
    try {
        console.log("Fetching from API:", api_url);
        response = await fetch(api_url);
    } catch (e) {
        console.error(e);
        load_response.error = "fetch() from api failed";
        return load_response;
    }

    let text = await response.text();
    // text = text.replaceAll("\n", "<br>");

    // console.log(text);
    load_response.results = { text };
    return load_response;
    //return { results: { text } };
};
