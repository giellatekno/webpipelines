import { m } from "$lib/paraglide/messages";
import { has_tags } from "../paradigm_utils";
import type { LanguageSchema } from "../types";
import { SME_CASES } from "./helpers";

const schema: LanguageSchema = {
    sections: [
        {
            title: m.paradigm_personal,
            tables: [
                {
                    showIf: has_tags("1"),
                    headers: [m.paradigm_case, m.paradigm_singular, m.paradigm_dual, m.paradigm_plural],
                    rows: SME_CASES.map((c) => ({
                        label: m.paradigm_nominative,
                        tags: [`Sg1+${c.tag}`, `Du1+${c.tag}`, `Pl1+${c.tag}`],
                    })),
                },
                {
                    showIf: has_tags("2"),
                    headers: [m.paradigm_case, m.paradigm_singular, m.paradigm_dual, m.paradigm_plural],
                    rows: SME_CASES.map((c) => ({
                        label: m.paradigm_nominative,
                        tags: [`Sg2+${c.tag}`, `Du2+${c.tag}`, `Pl2+${c.tag}`],
                    })),
                },
                {
                    showIf: has_tags("3"),
                    headers: [m.paradigm_case, m.paradigm_singular, m.paradigm_dual, m.paradigm_plural],
                    rows: SME_CASES.map((c) => ({
                        label: m.paradigm_nominative,
                        tags: [`Sg3+${c.tag}`, `Du3+${c.tag}`, `Pl3+${c.tag}`],
                    })),
                },
            ],
        },
    ],
};

export default schema;
