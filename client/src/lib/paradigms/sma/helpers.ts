import { m } from "$lib/paraglide/messages";
import { has_tags } from "../paradigm_utils";
import type { TableBlock } from "../types";

export const SMA_DEFAULT_CASE_TABLE: TableBlock = {
    headers: [m.paradigm_case, m.paradigm_singular, m.paradigm_plural],
    rows: [
        {
            label: m.paradigm_nominative,
            tags: ["Sg+Nom", "Pl+Nom"],
        },
        {
            label: m.paradigm_accusative,
            tags: ["Sg+Acc", "Pl+Acc"],
        },
        {
            label: m.paradigm_genitive,
            tags: ["Sg+Gen", "Pl+Gen"],
        },
        {
            label: m.paradigm_illative,
            tags: ["Sg+Ill", "Pl+Ill"],
        },
        {
            label: m.paradigm_inessive,
            tags: ["Sg+Ine", "Pl+Ine"],
        },
        {
            label: m.paradigm_elative,
            tags: ["Sg+Ela", "Pl+Ela"],
        },
        {
            label: m.paradigm_comitative,
            tags: ["Sg+Com", "Pl+Com"],
        },
        { label: m.paradigm_essive, tags: ["Ess"], colspan: 2 },
    ],
};

// prettier-ignore
const PERSONS = [
    { label: "manne", pxLabel: "mov", tag: "Sg1", negPrs: "im", negPrt: "idtjim", auxPrs: "leam", auxPrt: "lim" },
    { label: "datne", pxLabel: "dov", tag: "Sg2", negPrs: "ih", negPrt: "idtjih", auxPrs: "leah", auxPrt: "lih" },
    { label: "dïhte", pxLabel: "dïsse", tag: "Sg3", negPrs: "ij", negPrt: "idtji", auxPrs: "lea", auxPrt: "lij" },
    { label: "månnoeh", pxLabel: "monnen", tag: "Du1", negPrs: "ean", negPrt: "idtjimen", auxPrs: "lean", auxPrt: "limen" },
    { label: "dåtnoeh", pxLabel: "dotnen", tag: "Du2", negPrs: "idien", negPrt: "idtjiden", auxPrs: "lidien", auxPrt: "liden" },
    { label: "dah guaktah", pxLabel: "daj", tag: "Du3", negPrs: "eakan", negPrt: "idtjigan", auxPrs: "lægan", auxPrt: "ligan" },
    { label: "mijjieh", pxLabel: "mijjen", tag: "Pl1", negPrs: "ibie", negPrt: "idtjimh", auxPrs: "libie", auxPrt: "limh" },
    { label: "dijjieh", pxLabel: "dijjen", tag: "Pl2", negPrs: "idie", negPrt: "idtjidh", auxPrs: "lidie", auxPrt: "lidh" },
    { label: "dah", pxLabel: "daj", tag: "Pl3", negPrs: "eah", negPrt: "idtjin", auxPrs: "leah", auxPrt: "lin" },
];

export function generatePossessiveSection(
    caseName: Function,
    caseTag: string,
): TableBlock {
    if (caseTag !== "Ess") {
        return {
            title: caseName,
            headers: [m.paradigm_owner, m.paradigm_singular, m.paradigm_plural],
            rows: PERSONS.map((pers, i) => ({
                label: pers.pxLabel,
                tags: [
                    `Sg+${caseTag}+Px${pers.tag}`,
                    `Pl+${caseTag}+Px${pers.tag}`,
                ],
                // sep: i === 2 || i === 5, // Add separator after Su and Sudno
            })),
        };
    } else {
        return {
            title: caseName,
            headers: [m.paradigm_owner, m.paradigm_empty],
            rows: PERSONS.map((pers, i) => ({
                label: pers.pxLabel,
                tags: [`${caseTag}+Px${pers.tag}`],
                // sep: i === 2 || i === 5, // Add separator after Su and Sudno
            })),
        };
    }
}

export function generateReflexiveSection(caseName: Function, caseTag: string) {
    return {
        title: caseName,
        headers: [m.paradigm_person, m.paradigm_empty],
        rows: PERSONS.map((pers, i) => ({
            label: pers.label,
            tags: [`${caseTag}+Px${pers.tag}`],
        })),
    };
}

export function buildVerbBlock(
    title: Function,
    mood: string,
    tense: string,
    mainTag: string,
    isPerfect = false,
): TableBlock {
    return {
        title,
        headers: [m.paradigm_person, m.paradigm_positive, m.paradigm_negative],
        rows: PERSONS.map((p) => {
            let auxStem = "";
            if (isPerfect) {
                auxStem = tense === "Prs" ? p.auxPrs : p.auxPrt;
            }

            const negAux =
                tense === "Prs"
                    ? `${p.negPrs} leah`
                    : `${p.negPrs} ${p.auxPrt}`;

            return {
                label: p.label,
                tags: [
                    isPerfect ? mainTag : `${mood}+${tense}+${p.tag}`,
                    mainTag,
                ],
                prefixes: [
                    auxStem,
                    isPerfect ? negAux : tense === "Prs" ? p.negPrs : p.negPrt,
                ],
            };
        }),
    };
}

export function generatePronounTable(persTag: string): TableBlock {
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
