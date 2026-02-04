import { m } from "$lib/paraglide/messages";
import { has_tags } from "../paradigm_utils";
import type { LanguageSchema } from "../types";
import { FIT_DEFAULT_CASE_TABLE, CASES } from "./helpers";

const schema: LanguageSchema = {
    sections: [
        {
            title: m.paradigm_positive,
            tables: [FIT_DEFAULT_CASE_TABLE],
        },
        {
            title: m.paradigm_comparative,
            showIf: has_tags("Comp"),
            tables: [
                {
                    headers: [
                        m.paradigm_case,
                        m.paradigm_singular,
                        m.paradigm_plural,
                    ],
                    rows: CASES.map((c) => ({
                        label: c.label,
                        tags: [`Comp+Sg+${c.tag}`, `Comp+Pl+${c.tag}`],
                    })),
                },
            ],
        },
        {
            title: m.paradigm_superlative,
            showIf: has_tags("Superl"),
            tables: [
                {
                    headers: [
                        m.paradigm_case,
                        m.paradigm_singular,
                        m.paradigm_plural,
                    ],
                    rows: CASES.map((c) => ({
                        label: c.label,
                        tags: [`Superl+Sg+${c.tag}`, `Superl+Pl+${c.tag}`],
                    })),
                },
            ],
        },
    ],
};

export default schema;
