import { env } from "$env/dynamic/public";

export async function load({ url, params, fetch }) {
    const { lang } = params;
    const { searchParams: search_params } = url;
    const word = search_params.get("word");
    if (word == null || word.length == 0) {
        return {};
    }
    const size = search_params.get("size") || "standard";
    const pos = search_params.get("pos") || "Any";

    const api_path = `paradigm/${lang}/${word}`;
    const api_url = `${env.PUBLIC_API_ROOT}/${api_path}?size=${size}&pos=${pos}`;

    console.log(api_url);

    let response;
    try {
        response = await fetch(api_url);
    } catch (e) {
        console.error(e);
        return { error: "fetch() from api failed" };
    }

    let text = await response.text();
    text = text.replaceAll("\n", "<br>");

    return { results: { text }};
}
