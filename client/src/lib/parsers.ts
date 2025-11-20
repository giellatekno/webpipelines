interface AnalyzeItem {
    lemma: string;
    pos: string;
    tags: string[];
    wordform: string;
}

export function analyze_parser(data: AnalyzeItem[] | undefined) {
    if (!data) return;

    // Groups results by wordform
    let grouped = Object.groupBy(data, ({ wordform }) => wordform);
    return Object.entries(grouped).map(([key, items]) => ({
        key: key,
        items: items as AnalyzeItem[],
    }));
}

export interface ParsedDependency {
    wordform: string;
    lemma: string;
    verbtype: string;
    tags: string;
    syntax: string;
    relation: string;
}

export function dependency_parser(data: string) {
    const results: ParsedDependency[] = [];

    console.log(data);
    const lines = data
        .trim()
        .split("\n")
        .map((l) => l.trim());

    const analysis_re = new RegExp(
        /"([^\s]+)" (<[^\s]+>)?(?: )?([^@]+) (@[^\s]+) (#[^\s]+)/,
    );

    for (const [i, line] of lines.entries()) {
        if (!line.match(/"<[^\s]+>"/)) continue;

        const word = line.slice(2, line.length - 2);

        const analysis = analysis_re.exec(lines[i + 1]);

        if (analysis !== null) {
            results.push({
                wordform: word,
                lemma: analysis[1],
                verbtype: analysis[2] ?? "",
                tags: analysis[3],
                syntax: analysis[4],
                relation: analysis[5],
            });
        }
    }
    // console.log(results);
    return results;
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
    // console.log(objs);
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
