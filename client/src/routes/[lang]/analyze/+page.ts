import { env } from "$env/dynamic/public";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, url, fetch }) => {
    const lang = params.lang;
    const query_params = url.searchParams;
    const q = query_params.get("q");

    interface Output {
        q: string | null;
        results?: object;
        error?: string;
    }

    const output: Output = { q, results: undefined, error: undefined };

    if (q === null || q === "") {
        return output;
    }

    let response;
    const backend_route = `${env.PUBLIC_API_ROOT}/analyze/${lang}/${q}?format=json`;
    try {
        response = await fetch(backend_route);
    } catch (e) {
        console.error(`tried backend url: ${backend_route}`);
        console.error(e);
        output.error = "fetch() from api failed";
        return output;
    }

    output.results = { ...(await response.json()) };
    return output;
};
