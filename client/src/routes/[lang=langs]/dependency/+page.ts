import { env } from "$env/dynamic/public";
import { dependency_parser } from "$lib/parsers";
import { convert_searchtext } from "$lib/utils";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { tools_for } from "$lib/langs";

export const load: PageLoad = async ({ url, params, fetch }) => {
    if (!tools_for[params.lang].includes("dependency")) {
        error(404, "Not Found");
    }
    const lang = params.lang;
    const query_params = url.searchParams;
    const q = query_params.get("q");

    if (q === null || q === "") {
        return {};
    }
    let converted_q = convert_searchtext(q, lang);

    const backend_url = `${env.PUBLIC_API_ROOT}/dependency/${lang}/${converted_q}`;
    let response;
    try {
        response = await fetch(backend_url);
    } catch (e) {
        console.error(`fetching from api (${backend_url}) failed`);
        console.error(e);
        return { error: "fetch failed" };
    }

    const text = await response.text();
    const data = dependency_parser(text);

    return { q: q, results: data };
};
