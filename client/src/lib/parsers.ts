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

export function hyphenate_parser(data: string) {
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

interface ParadigmItem {
    lemma: string;
    pos: string;
    tags: string[];
    wordform: string;
    weight: number;
}

interface ParadigmResults {
    results: ParadigmItem[][];
    other_forms?: string[];
}

export interface ParsedParadigm {
    lemma: string;
    pos: string;
    subclass: string;
    wordforms: Map<string, Set<string>>;
}

export function paradigm_parser(objs: ParadigmResults) {
    const subclasses = [
        "Prop",
        "G3",
        "G7",
        "NomAg",
        "Pers",
        "Rel",
        "Interr",
        "Dem",
        "Indef",
        "Refl",
        "Recipr",
    ];

    const result: { [key: string]: ParsedParadigm } = {};

    for (const entry of objs.results) {
        for (const obj of entry) {
            const lemma = obj.lemma;
            const wordform = obj.wordform;
            const pos = obj.pos;
            let subclass = "";
            let tags;
            if (subclasses.includes(obj.tags[0])) {
                subclass = obj.tags[0];
                tags = obj.tags.slice(1).join("+");
            } else {
                tags = obj.tags.join("+");
            }

            const identifier = subclass
                ? `${lemma}+${pos}+${subclass}`
                : `${lemma}+${pos}`;
            if (!result[identifier]) {
                result[identifier] = {
                    lemma: lemma,
                    pos: pos,
                    subclass: subclass,
                    wordforms: new Map([[tags, new Set()]]),
                };
            }

            if (result[identifier].wordforms.has(tags)) {
                const cur_set = result[identifier].wordforms.get(tags);
                // NOTE: What happens if there is an error? Can it even happen?
                if (cur_set) {
                    cur_set.add(wordform);
                }
            } else {
                result[identifier].wordforms.set(tags, new Set([wordform]));
            }
        }
    }
    return result;
}
