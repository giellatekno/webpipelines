import { m } from "$lib/paraglide/messages";
import { has_tags } from "../paradigm_utils";
import type { Table } from "../types";

export const SMA_CASES = [
    { tag: "Nom", label: m.paradigm_nominative },
    { tag: "Acc", label: m.paradigm_accusative },
    { tag: "Gen", label: m.paradigm_genitive },
    { tag: "Ill", label: m.paradigm_illative },
    { tag: "Ine", label: m.paradigm_inessive },
    { tag: "Ela", label: m.paradigm_elative },
    { tag: "Com", label: m.paradigm_comitative },
    { tag: "Ess", label: m.paradigm_essive },
];
export const SMA_DEFAULT_CASE_TABLE: Table = {
    headers: [m.paradigm_case, m.paradigm_singular, m.paradigm_plural],
    rows: [
        { label: m.paradigm_nominative, tags: ["Sg+Nom", "Pl+Nom"] },
        { label: m.paradigm_accusative, tags: ["Sg+Acc", "Pl+Acc"] },
        { label: m.paradigm_genitive, tags: ["Sg+Gen", "Pl+Gen"] },
        { label: m.paradigm_illative, tags: ["Sg+Ill", "Pl+Ill"] },
        { label: m.paradigm_inessive, tags: ["Sg+Ine", "Pl+Ine"] },
        { label: m.paradigm_elative, tags: ["Sg+Ela", "Pl+Ela"] },
        { label: m.paradigm_comitative, tags: ["Sg+Com", "Pl+Com"] },
        { label: m.paradigm_essive, tags: ["Ess"], colspan: 2 },
    ],
};

export const SMA_PERSONS = [
    { tag: "Sg1", label: "manne", pxLabel: "mov", negPrs: "im", negPrt: "idtjim", auxPrs: "leam", auxPrt: "lim" },
    { tag: "Sg2", label: "datne", pxLabel: "dov", negPrs: "ih", negPrt: "idtjih", auxPrs: "leah", auxPrt: "lih" },
    { tag: "Sg3", label: "dïhte", pxLabel: "dïsse", negPrs: "ij", negPrt: "idtji", auxPrs: "lea", auxPrt: "lij" },
    { tag: "Du1", label: "månnoeh", pxLabel: "monnen", negPrs: "ean", negPrt: "idtjimen", auxPrs: "lean", auxPrt: "limen" },
    { tag: "Du2", label: "dåtnoeh", pxLabel: "dotnen", negPrs: "idien", negPrt: "idtjiden", auxPrs: "lidien", auxPrt: "liden" },
    { tag: "Du3", label: "dah guaktah", pxLabel: "daj", negPrs: "eakan", negPrt: "idtjigan", auxPrs: "lægan", auxPrt: "ligan" },
    { tag: "Pl1", label: "mijjieh", pxLabel: "mijjen", negPrs: "ibie", negPrt: "idtjimh", auxPrs: "libie", auxPrt: "limh" },
    { tag: "Pl2", label: "dijjieh", pxLabel: "dijjen", negPrs: "idie", negPrt: "idtjidh", auxPrs: "lidie", auxPrt: "lidh" },
    { tag: "Pl3", label: "dah", pxLabel: "daj", negPrs: "eah", negPrt: "idtjin", auxPrs: "leah", auxPrt: "lin" },
];

export function generateReflexiveBlock(caseName: Function, caseTag: string) {
    return {
        title: caseName,
        headers: [m.paradigm_person, m.paradigm_empty],
        rows: PERSONS.map((pers, i) => ({
            label: pers.label,
            tags: [`${caseTag}+Px${pers.tag}`],
        })),
    };
}

export function generatePronounBlock(persTag: string): TableBlock {
    return {
        showIf: has_tags(persTag),
        headers: [m.paradigm_case, m.paradigm_empty],
        rows: [
            {
                label: m.paradigm_nominative,
                tags: [`${persTag}+Nom`],
            },
            {
                label: m.paradigm_accusative,
                tags: [`${persTag}+Acc`],
            },
            {
                label: m.paradigm_genitive,
                tags: [`${persTag}+Gen`],
            },
            {
                label: m.paradigm_illative,
                tags: [`${persTag}+Ill`],
            },
            {
                label: m.paradigm_inessive,
                tags: [`${persTag}+Ine`],
            },
            {
                label: m.paradigm_elative,
                tags: [`${persTag}+Ela`],
            },
            {
                label: m.paradigm_comitative,
                tags: [`${persTag}+Com`],
            },
        ],
    };
}
