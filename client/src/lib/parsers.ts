interface AnalyzeItem {
    lemma: string;
    pos: string;
    tags: string[];
    wordform: string;
}

export function analyze_parser(
    data: AnalyzeItem[] | undefined,
    result_format: string,
) {
    if (!data) return;

    if (result_format === "text") {
        // Groups results by wordform
        let grouped = Object.groupBy(data, ({ wordform }) => wordform);
        return Object.entries(grouped).map(([key, items]) => ({
            key: key,
            items: items as AnalyzeItem[],
        }));
    } else if (result_format === "json") {
        return JSON.stringify(data, null, 2);
    }
}

function parse_paradigm(text: string) {
    // TODO: Better parsing
    const lines = text.trim().split("\n");
    const results = {
        pos: "",
        conj_words: new Map(),
    };

    for (const line of lines) {
        const trimmed_line = line.trim();

        if (trimmed_line === "DIRECT HITS") {
            continue;
        }
        if (trimmed_line === "OTHER HITS") {
            break;
        }

        if (trimmed_line.length > 0) {
            const parts = trimmed_line.split("\t");

            if (parts.length >= 3) {
                const full_tag = parts[0];
                const conj_word = parts[1];

                const tag_parts = full_tag.split("+");
                const pos = tag_parts[1] || "";
                const tags = tag_parts.slice(2).join("+");

                if (results.pos === "") {
                    results.pos = pos;
                }

                results.conj_words.set(tags, conj_word);
            }
        }
    }
    return results;
}
