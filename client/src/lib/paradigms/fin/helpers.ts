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

export const FIN_DEFAULT_CASE_TABLE: TableBlock = {
    headers: [m.paradigm_case, m.paradigm_singular, m.paradigm_plural],
    rows: CASES.map((c) => ({
        label: c.label,
        tags: [`Sg+${c.tag}`, `Pl+${c.tag}`],
    })),
};

export function generatePronounBlock(persTag: string): TableBlock {
    return {
        showIf: has_tags(persTag),
        headers: [m.paradigm_case, m.paradigm_empty],
        rows: CASES.map((c) => ({
            label: c.label,
            tags: [`${persTag}+${c.tag}`],
        })),
    };
}
