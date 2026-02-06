import { m } from "$lib/paraglide/messages";
import type { Table } from "../types";

export const SMN_CASES = [
    { tag: "Nom", label: m.paradigm_nominative },
    { tag: "Acc", label: m.paradigm_accusative },
    { tag: "Gen", label: m.paradigm_genitive },
    { tag: "Ill", label: m.paradigm_illative },
    { tag: "Loc", label: m.paradigm_locative },
    { tag: "Com", label: m.paradigm_comitative },
    { tag: "Abe", label: m.paradigm_abessive },
    { tag: "Ess", label: m.paradigm_essive },
    { tag: "Par", label: m.paradigm_partitive },
];

export const SMN_DEFAULT_CASE_TABLE: Table = {
    headers: [m.paradigm_case, m.paradigm_singular, m.paradigm_plural],
    rows: [
        { label: m.paradigm_nominative, tags: ["Sg+Nom", "Pl+Nom"] },
        { label: m.paradigm_accusative, tags: ["Sg+Acc", "Pl+Acc"] },
        { label: m.paradigm_genitive, tags: ["Sg+Gen", "Pl+Gen"] },
        { label: m.paradigm_illative, tags: ["Sg+Ill", "Pl+Ill"] },
        { label: m.paradigm_locative, tags: ["Sg+Loc", "Pl+Loc"] },
        { label: m.paradigm_comitative, tags: ["Sg+Com", "Pl+Com"] },
        { label: m.paradigm_abessive, tags: ["Sg+Abe", "Pl+Abe"] },
        { label: m.paradigm_essive, tags: ["Ess"], colspan: 2 },
        { label: m.paradigm_partitive, tags: ["Par"], colspan: 2 },
    ],
};

export const SMN_PERSONS = [
    { tag: "Sg1", label: "mun", pxLabel: "mu" },
    { tag: "Sg2", label: "tun", pxLabel: "du" },
    { tag: "Sg3", label: "sun", pxLabel: "su" },
    { tag: "Du1", label: "muoi", pxLabel: "munnuu" },
    { tag: "Du2", label: "duoi", pxLabel: "dunnuu" },
    { tag: "Du3", label: "suoi", pxLabel: "sunnuu" },
    { tag: "Pl1", label: "mij", pxLabel: "mii" },
    { tag: "Pl2", label: "dij", pxLabel: "dii" },
    { tag: "Pl3", label: "sij", pxLabel: "sii" },
];
