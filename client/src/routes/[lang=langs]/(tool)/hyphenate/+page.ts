import { env } from "$env/dynamic/public";
import { hyphenate_parser } from "$lib/parsers";
import { convert_searchtext } from "$lib/utils";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ url, params, fetch }) => {
    const lang = params.lang;
    const query_params = url.searchParams;
    const q = query_params.get("q");

    if (q === null || q === "") {
        return {};
    }

    let converted_q = convert_searchtext(q, lang);

    const backend_url = `${env.PUBLIC_API_ROOT}/hyphenate/${lang}/${converted_q}`;
    let response;
    try {
        response = await fetch(backend_url);
    } catch (e) {
        console.error(e);
        return { error: "fetch() from api failed" };
    }

    const text = await response.text();
    // const lines = text.split("\n");
    const hyphenated = hyphenate_parser(text);

    return { q: q, results: { hyphenated } };
};
