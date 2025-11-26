import { env } from "$env/dynamic/public";
import { tools_for } from "$lib/langs";
import { convert_searchtext } from "$lib/utils";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ url, params, fetch }) => {
    if (!tools_for[params.lang].includes("generate")) {
        error(404, "Not Found");
    }
    const lang = params.lang;
    const query_params = url.searchParams;
    const q = query_params.get("q");

    if (q === null || q === "") {
        return {};
    }
    let converted_q = convert_searchtext(q, lang);

    const backend_url = `${env.PUBLIC_API_ROOT}/generate/${lang}/${converted_q}`;
    let response;
    try {
        response = await fetch(backend_url);
    } catch (e) {
        console.error(e);
        return { error: "fetch() from api failed" };
    }

    const text = await response.text();
    const generated = text
        .split("\n")
        .filter((line) => line.length > 0)
        .map((line) => line.split("\t"))
        .filter((splits) => splits[2] !== "inf")
        .map((splits) => splits[1]);

    return { q: q, results: { generated } };
};
