import type { ParsedParadigm } from "$lib/parsers";

export function get_entry(tags: string, elem: ParsedParadigm) {
    const wordforms = elem.wordforms.get(tags);
    if (!wordforms) return "—";
    return Array.from(wordforms);
}

export function has_tags(...needed: string[]) {
    return (elem: ParsedParadigm) => {
        const keys = Array.from(elem.wordforms.keys());
        return keys.some((tag) => needed.every((n) => tag.includes(n)));
    };
}

export function lacks_tags(...excluded: string[]) {
    return (elem: ParsedParadigm) => {
        const keys = Array.from(elem.wordforms.keys());
        return keys.every((tag) => excluded.every((n) => !tag.includes(n)));
    };
}
