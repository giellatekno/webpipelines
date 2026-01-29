import type { ParsedParadigm } from "$lib/parsers";

// export const header_color: Record<string, string> = {
//     Prs: "bg-yellow-800/20",
//     Prf: "bg-purple-800/20",
//     Prt: "bg-green-800/20",
//     PluPrf: "bg-red-800/20",
//     Imprt: "bg-yellow-800/20",
//     ImprtII: "bg-purple-800/20",
// };

export function get_entry(tags: string, elem: ParsedParadigm) {
    const wordforms = elem.wordforms.get(tags);
    if (!wordforms) return "—";
    return Array.from(wordforms).join("<br>");
}

export function has_tags(...needed: string[]) {
    return (elem: ParsedParadigm) => {
        const keys = Array.from(elem.wordforms.keys());
        return keys.some((tag) => needed.every((n) => tag.includes(n)));
    };
}
