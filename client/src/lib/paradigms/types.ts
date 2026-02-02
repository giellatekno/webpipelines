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
    showIf?: (elem: ParsedParadigm) => boolean;
}

export interface TableSection {
    title: Function;
    tables: TableBlock[];
    validateRows?: boolean; // Limit which rows to render based on first row
    showIf?: (elem: ParsedParadigm) => boolean;
}

export interface LanguageSchema {
    sections: TableSection[];
}
