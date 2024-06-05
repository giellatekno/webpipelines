import { env } from "$env/dynamic/public";

export async function load({ url, params, fetch }) {
    const lang = params.lang;
    const query_params = url.searchParams;
    const q = query_params.get("q");

    if (q === null || q === "") {
        return {};
    }

    const backend_url = `${env.PUBLIC_API_ROOT}/disambiguate/${lang}/${q}`;
    let response;
    try {
        response = await fetch(backend_url);
    } catch (e) {
        console.error(e);
        return { error: "fetch() from api failed" };
    }

    let text = await response.text();
    const lines = text.split("\n");

    return { results: { lines } };
}
