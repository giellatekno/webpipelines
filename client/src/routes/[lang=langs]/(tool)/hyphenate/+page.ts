import { env } from "$env/dynamic/public";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ url, params, fetch }) => {
    const lang = params.lang;
    const query_params = url.searchParams;
    const q = query_params.get("q");

    if (q === null || q === "") {
        return {};
    }

    const backend_url = `${env.PUBLIC_API_ROOT}/hyphenate/${lang}/${q}`;
    let response;
    try {
        response = await fetch(backend_url);
    } catch (e) {
        console.error(e);
        return { error: "fetch() from api failed" };
    }

    const text = await response.text();
    // const lines = text.split("\n");
    const hyphenated = parse_hyphenate(text);

    function parse_hyphenate(data: string) {
        const results = new Map();
        const lines = data.trim().split("\n");

        for (const line of lines) {
            const trimmed_line = line.trim();

            if (trimmed_line.length > 0) {
                const parts = trimmed_line.split("\t");

                const input_word = parts[0];
                const hyphenated_word = parts[1];
                const score = parseFloat(parts[2]);

                const variation = {
                    hyphenated_word: hyphenated_word,
                    score: score,
                };

                if (!results.has(input_word)) {
                    results.set(input_word, {
                        input_word: input_word,
                        variations: [],
                    });
                }

                const entry = results.get(input_word);

                entry.variations.push(variation);
            }
        }
        return Array.from(results.values());
    }

    return { q: q, results: { hyphenated } };
};
