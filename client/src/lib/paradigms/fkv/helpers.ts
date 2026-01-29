import { m } from "$lib/paraglide/messages";
import { has_tags } from "../paradigm_utils";
import type { TableBlock } from "../types";

export const CASES = [
    { tag: "Nom", label: m.paradigm_nominative },
    { tag: "Gen", label: m.paradigm_genitive },
    { tag: "Par", label: m.paradigm_partitive },
    { tag: "Ine", label: m.paradigm_inessive },
    { tag: "Ill", label: m.paradigm_illative },
    { tag: "Ela", label: m.paradigm_elative },
    { tag: "Ade", label: m.paradigm_adessive },
    { tag: "All", label: m.paradigm_allative },
    { tag: "Abl", label: m.paradigm_ablative },
    { tag: "Abe", label: m.paradigm_abessive },
    { tag: "Ess", label: m.paradigm_essive },
    { tag: "Tra", label: m.paradigm_translative },
    { tag: "Com", label: m.paradigm_comitative },
];

export const FKV_DEFAULT_CASE_TABLE: TableBlock = {
    headers: [m.paradigm_case, m.paradigm_singular, m.paradigm_plural],
    rows: CASES.map((c) => ({
        label: c.label,
        tags: [`Sg+${c.tag}`, `Pl+${c.tag}`],
    })),
};

// prettier-ignore
const PERSONS = [
    { label: "mie", pxLabel: "minun", tag: "Sg1", negPrs: "en", auxPrs: "olen", auxPrt: "olin", auxCond: "olisin" },
    { label: "sie", pxLabel: "sinun", tag: "Sg2", negPrs: "et", auxPrs: "olet", auxPrt: "olit", auxCond: "olisit" },
    { label: "hän/se", pxLabel: "hänen/sen", tag: "Sg3", negPrs: "ei", auxPrs: "oon", auxPrt: "oli", auxCond: "olis" },
    { label: "met", pxLabel: "meiđän", tag: "Pl1", negPrs: "emmä", auxPrs: "olema", auxPrt: "olima", auxCond: "olisimma" },
    { label: "tet", pxLabel: "teiđän", tag: "Pl2", negPrs: "että", auxPrs: "oletta", auxPrt: "olitta", auxCond: "olisitta" },
    { label: "het/net", pxLabel: "heiđän/niitten", tag: "Pl3", negPrs: "ei", auxPrs: "oon", auxPrt: "olthiin/olit", auxCond: "oltais" },
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
                prefixes: [auxStem, isPerfect ? negAux : p.negPrs],
            };
        }),
    };
}

export function generatePronounTable(persTag: string): TableBlock {
    return {
        showIf: has_tags(persTag),
        headers: [m.paradigm_case, m.paradigm_empty],
        rows: CASES.map((c) => ({
            label: c.label,
            tags: [`${persTag}+${c.tag}`],
        })),
    };
}
