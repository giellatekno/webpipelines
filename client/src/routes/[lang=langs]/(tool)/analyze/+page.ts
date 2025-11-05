import { env } from "$env/dynamic/public";
import { convert_searchtext } from "$lib/utils";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, url, fetch }) => {
    const lang = params.lang;
    const query_params = url.searchParams;
    const q = query_params.get("q");

    interface Result {
        q: string | null;
        results?: {
            parsed: [
                {
                    lemma: string;
                    pos: string;
                    tags: string[];
                    wordform: string;
                },
            ];
            raw: string;
        };
        error?: string;
    }

    const result: Result = { q };

    if (q === null || q === "") {
        return result;
    }
    let converted_q = convert_searchtext(q, lang);

    let response;
    const backend_route = `${env.PUBLIC_API_ROOT}/analyze/${lang}/${converted_q}?format=json`;
    try {
        response = await fetch(backend_route);
    } catch (e) {
        console.error(`tried backend url: ${backend_route}`);
        console.error(e);
        result.error = "fetch() from api failed";
        return result;
    }

    result.results = { ...(await response.json()) };
    console.log(result.results);
    return result;
};
