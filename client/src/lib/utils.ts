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
