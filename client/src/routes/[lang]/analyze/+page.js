import { env } from "$env/dynamic/public";

export async function load(event) {
    const url = event.url;
    const params = event.params;
    const fetch = event.fetch;

    const lang = params.lang;
    const query_params = url.searchParams;
    const q = query_params.get("q");

    if (q === null || q === "") {
        return {};
    }

    let response;
    const backend_route = `${env.PUBLIC_API_ROOT}/analyze/${lang}/${q}?format=json`;
    try {
        response = await fetch(backend_route);
    } catch (e) {
        console.error(`tried backend url: ${backend_route}`);
        console.error(e);
        return { error: "fetch() from api failed" };
    }

    return { results: { ...await response.json() } };
}
