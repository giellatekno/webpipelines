import { m } from "$lib/paraglide/messages";
import type { Table } from "../types";

export const SMJ_CASES = [
    { tag: "Nom", label: m.paradigm_nominative },
    { tag: "Acc", label: m.paradigm_accusative },
    { tag: "Gen", label: m.paradigm_genitive },
    { tag: "Ill", label: m.paradigm_illative },
    { tag: "Ine", label: m.paradigm_inessive },
    { tag: "Ela", label: m.paradigm_elative },
    { tag: "Com", label: m.paradigm_comitative },
    { tag: "Ess", label: m.paradigm_essive },
];

export const SMJ_DEFAULT_CASE_TABLE: Table = {
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

export const SMJ_PERSONS = [
    { tag: "Sg1", label: "mån", pxLabel: "muv" },
    { tag: "Sg2", label: "dån", pxLabel: "duv" },
    { tag: "Sg3", label: "sån", pxLabel: "suv" },
    { tag: "Du1", label: "måj", pxLabel: "munnu" },
    { tag: "Du2", label: "dåj", pxLabel: "dunnu" },
    { tag: "Du3", label: "såj", pxLabel: "sunnu" },
    { tag: "Pl1", label: "mij", pxLabel: "mijá" },
    { tag: "Pl2", label: "dij", pxLabel: "dijá" },
    { tag: "Pl3", label: "sij", pxLabel: "sijá" },
];
