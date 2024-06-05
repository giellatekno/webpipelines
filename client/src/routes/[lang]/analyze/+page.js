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
    const backend_route = `${env.PUBLIC_API_ROOT}/analyze/${lang}/${q}`;
    try {
        response = await fetch(backend_route);
    } catch (e) {
        console.error(`tried backend url: ${backend_route}`);
        console.error(e);
        return { error: "fetch() from api failed" };
    }

    const text = await response.text();
    const analyses = text
        .split("\n")
        .filter(line => line.length > 0)
        .map(line => line.split("\t"))
        .filter(splits => splits[2] !== "inf")
        .map(splits => splits[1]);

    return { results: { analyses } };
}
