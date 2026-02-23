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

export function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
