import type { ParsedParadigm } from "./parsers";

export const POS_TAGS: string[] = [
    "A",
    "Adv",
    "CC",
    "CS",
    "Det",
    "Interj",
    "N",
    "Num",
    "Pcle",
    "Phrase",
    "Po",
    "Pr",
    "Pron",
    "Prop",
    "V",
];

export async function copy_text(text: string) {
    try {
        await navigator.clipboard.writeText(text);
    } catch (err) {
        console.error("Failed to copy: ", err);
    }
}

export function convert_searchtext(text: string, lang: string) {
    let res;
    if (lang === "sme") {
        res = text
            .replaceAll("a1", "á")
            .replaceAll("c1", "č")
            .replaceAll("d1", "đ")
            .replaceAll("n1", "ŋ")
            .replaceAll("s1", "š")
            .replaceAll("t1", "ŧ")
            .replaceAll("z1", "ž");
        return res;
    }
    return text;
}

export function get_usage(lang: string | undefined, $t: (_: string) => string) {
    const lang_specific = $t(`usage.${lang}`);
    if (lang_specific !== `usage.${lang}`) {
        return lang_specific;
    } else {
        return "";
        // const fallback = $t("usage");
        // return fallback;
    }
}

export function get_word(tags: string, elem: ParsedParadigm) {
    const wordforms = elem.wordforms.get(tags);
    return wordforms ? Array.from(wordforms).join(", ") : "—";
}
