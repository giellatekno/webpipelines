import type { ParsedParadigm } from "$lib/parsers";

export interface Row {
    label: string | Function;
    tags: string[];
    colspan?: number;
    prefixes?: string[];
}

export interface TableBlock {
    title?: Function;
    headers: Function[];
    rows: Row[];
    strict?: boolean; // Only render full row if first element is present. (e.g. imperative)
    showIf?: (elem: ParsedParadigm) => boolean;
}

export interface TableSection {
    title: Function;
    tables: TableBlock[];
    showIf?: (elem: ParsedParadigm) => boolean;
}

export interface LanguageSchema {
    sections: TableSection[];
}
