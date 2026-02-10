import type { ParsedParadigm } from "$lib/parsers";

export interface Row {
    label: string | Function;
    tags: string[];
    colspan?: number;
    prefixes?: string[];
    separator?: boolean;
}

export interface Table {
    tId?: string
    title?: Function;
    headers: Function[];
    rows: Row[];
    showIf?: (elem: ParsedParadigm) => boolean;
}

export interface Section {
    sId?: string
    title?: Function;
    tables: Table[];
    validateRows?: boolean; // Limit which rows to render based on first col of first table
    showIf?: (elem: ParsedParadigm) => boolean;
}

export interface LanguageSchema {
    sections: Section[];
}
