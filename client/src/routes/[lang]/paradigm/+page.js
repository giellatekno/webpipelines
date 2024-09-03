import { env } from "$env/dynamic/public";
import { error } from "@sveltejs/kit";

export async function load({ url, params, fetch }) {
    console.log("routes/[lang]/paradigm/+page.js :: load()");
    const { lang } = params;
    const { searchParams: search_params } = url;
    const word = search_params.get("word") || "";
    const size = search_params.get("size") || "standard";
    const pos = search_params.get("pos") || "any";

    let load_response = { size, pos, word };

    console.assert(typeof word === "string");

    if (word.length == 0) {
        return load_response;
    }

    const api_path = `paradigm/${lang}/${word}`;
    const api_url = `${env.PUBLIC_API_ROOT}/${api_path}?size=${size}&pos=${pos}`;

    let response;
    try {
        response = await fetch(api_url);
    } catch (e) {
        console.error(e);
        load_response.error = "fetch() from api failed";
        return load_response;
    }

    let text = await response.text();
    text = text.replaceAll("\n", "<br>");

    load_response.results = { text };
    return load_response;
    //return { results: { text } };
}
