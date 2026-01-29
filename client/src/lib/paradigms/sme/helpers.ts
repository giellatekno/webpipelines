import { m } from "$lib/paraglide/messages";
import type { TableBlock } from "../types";

export const SME_DEFAULT_CASE_TABLE: TableBlock = {
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
            label: m.paradigm_locative,
            tags: ["Sg+Loc", "Pl+Loc"],
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
    { label: "mun/mon", pxLabel: "mu", tag: "Sg1", neg: "in", auxPrs: "lean", auxPrt: "ledjen", cond: "livččen" },
    { label: "don", pxLabel: "du", tag: "Sg2", neg: "it", auxPrs: "leat", auxPrt: "ledjet", cond: "livččet" },
    { label: "son/dat", pxLabel: "su", tag: "Sg3", neg: "ii", auxPrs: "lea", auxPrt: "lei", cond: "livččii" },
    { label: "moai", pxLabel: "munno", tag: "Du1", neg: "ean", auxPrs: "letne", auxPrt: "leimme", cond: "livččiime" },
    { label: "doai", pxLabel: "dudno", tag: "Du2", neg: "eahppi", auxPrs: "leahppi", auxPrt: "leidde", cond: "livččiide" },
    { label: "soai", pxLabel: "sudno", tag: "Du3", neg: "eaba", auxPrs: "leaba", auxPrt: "leigga", cond: "livččiiga" },
    { label: "mii", pxLabel: "min", tag: "Pl1", neg: "eat", auxPrs: "leat", auxPrt: "leimmet", cond: "livččiimet" },
    { label: "dii", pxLabel: "din", tag: "Pl2", neg: "ehpet", auxPrs: "lehpet", auxPrt: "leiddet", cond: "livččiidet" },
    { label: "sii/dat", pxLabel: "sin", tag: "Pl3", neg: "eai", auxPrs: "leat", auxPrt: "ledje", cond: "livčče" },
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
                if (mood === "Ind")
                    auxStem = tense === "Prs" ? p.auxPrs : p.auxPrt;
                if (mood === "Cond") auxStem = p.cond;
            }

            const negAux =
                mood === "Cond" ? "livčče" : tense === "Prs" ? "leat" : "lean";

            return {
                label: p.label,
                tags: [
                    isPerfect ? mainTag : `${mood}+${tense}+${p.tag}`,
                    mainTag,
                ],
                prefixes: [auxStem, isPerfect ? `${p.neg} ${negAux}` : p.neg],
            };
        }),
    };
}

export function generatePronounTable(persTag: string) {
    return {
        showIf: has_tags("Sg1"),
        headers: [m.paradigm_case, m.paradigm_singular],
        rows: [
            {
                label: m.paradigm_nominative,
                tags: ["Sg1+Nom"],
            },
            {
                label: m.paradigm_accusative,
                tags: ["Sg1+Acc"],
            },
            {
                label: m.paradigm_genitive,
                tags: ["Sg1+Gen"],
            },
            {
                label: m.paradigm_illative,
                tags: ["Sg1+Ill"],
            },
            {
                label: m.paradigm_inessive,
                tags: ["Sg1+Ine"],
            },
            {
                label: m.paradigm_elative,
                tags: ["Sg1+Ela"],
            },
            {
                label: m.paradigm_comitative,
                tags: ["Sg1+Com"],
            },
        ],
    };
}
