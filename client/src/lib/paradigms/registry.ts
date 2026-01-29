type SchemaLoader = (pos: string, subclass: string) => Promise<any>;

const registry: Record<string, SchemaLoader> = {
    sme: (p, s) => import("./sme").then((m) => m.getSmeSchema(p, s)),
    sma: (l, p) => import("./sma").then((m) => m.getSmaSchema(l, p)),
    fkv: (l, p) => import("./fkv").then((m) => m.getFkvSchema(l, p)),
};

export async function getParadigmSchema(
    lang: string,
    pos: string,
    subclass: string,
) {
    const loader = registry[lang];
    if (!loader) return null;
    return await loader(pos, subclass);
}

export function hasParadigmSchema(lang: string | undefined) {
    if (!lang) return false;
    return Object.keys(registry).includes(lang);
}
