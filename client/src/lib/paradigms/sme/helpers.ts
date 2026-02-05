import { m } from "$lib/paraglide/messages";
import type { Table } from "../types";

export const SME_CASES = [
    { tag: "Nom", label: m.paradigm_nominative },
    { tag: "Acc", label: m.paradigm_accusative },
    { tag: "Gen", label: m.paradigm_genitive },
    { tag: "Ill", label: m.paradigm_illative },
    { tag: "Loc", label: m.paradigm_locative },
    { tag: "Com", label: m.paradigm_comitative },
    { tag: "Ess", label: m.paradigm_essive },
];

export const SME_DEFAULT_CASE_TABLE: Table = {
    headers: [m.paradigm_case, m.paradigm_singular, m.paradigm_plural],
    rows: [
        { label: m.paradigm_nominative, tags: ["Sg+Nom", "Pl+Nom"] },
        { label: m.paradigm_accusative, tags: ["Sg+Acc", "Pl+Acc"] },
        { label: m.paradigm_genitive, tags: ["Sg+Gen", "Pl+Gen"] },
        { label: m.paradigm_illative, tags: ["Sg+Ill", "Pl+Ill"] },
        { label: m.paradigm_locative, tags: ["Sg+Loc", "Pl+Loc"] },
        { label: m.paradigm_comitative, tags: ["Sg+Com", "Pl+Com"] },
        { label: m.paradigm_essive, tags: ["Ess"], colspan: 2 },
    ],
};

export const SME_PERSONS = [
    { tag: "Sg1", label: "mun/mon", pxLabel: "mu" },
    { tag: "Sg2", label: "don", pxLabel: "du" },
    { tag: "Sg3", label: "son/dat", pxLabel: "su" },
    { tag: "Du1", label: "moai", pxLabel: "munno" },
    { tag: "Du2", label: "doai", pxLabel: "dudno" },
    { tag: "Du3", label: "soai", pxLabel: "sudno" },
    { tag: "Pl1", label: "mii", pxLabel: "min" },
    { tag: "Pl2", label: "dii", pxLabel: "din" },
    { tag: "Pl3", label: "sii/dat", pxLabel: "sin" },
];
