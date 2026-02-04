import { m } from "$lib/paraglide/messages";
import { has_tags } from "../paradigm_utils";
import type { LanguageSchema } from "../types";
import { FKV_DEFAULT_CASE_TABLE, CASES } from "./helpers";

const schema: LanguageSchema = {
    sections: [
        {
            title: m.paradigm_positive,
            tables: [FKV_DEFAULT_CASE_TABLE],
        },
        {
            title: m.paradigm_comparative,
            showIf: has_tags("Compar"),
            tables: [
                {
                    headers: [
                        m.paradigm_case,
                        m.paradigm_singular,
                        m.paradigm_plural,
                    ],
                    rows: CASES.map((c) => ({
                        label: c.label,
                        tags: [`Sg+Compar+${c.tag}`, `Pl+Compar+${c.tag}`],
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
                        tags: [`Sg+Superl+${c.tag}`, `Pl+Superl+${c.tag}`],
                    })),
                },
            ],
        },
    ],
};

export default schema;
