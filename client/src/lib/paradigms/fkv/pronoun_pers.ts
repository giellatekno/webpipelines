import { m } from "$lib/paraglide/messages";
import { has_tags } from "../paradigm_utils";
import type { LanguageSchema } from "../types";
import { CASES } from "./helpers";

const schema: LanguageSchema = {
    sections: [
        {
            title: m.paradigm_personal,
            tables: [
                {
                    showIf: has_tags("Sg1"),
                    headers: [m.paradigm_case, m.paradigm_singular],
                    rows: CASES.map((c) => ({
                        label: c.label,
                        tags: [`Sg1+${c.tag}`],
                    })),
                },
                {
                    showIf: has_tags("Sg2"),
                    headers: [m.paradigm_case, m.paradigm_singular],
                    rows: CASES.map((c) => ({
                        label: c.label,
                        tags: [`Sg2+${c.tag}`],
                    })),
                },
                {
                    showIf: has_tags("Sg3"),
                    headers: [m.paradigm_case, m.paradigm_singular],
                    rows: CASES.map((c) => ({
                        label: c.label,
                        tags: [`Sg3+${c.tag}`],
                    })),
                },
                {
                    showIf: has_tags("Pl1"),
                    headers: [m.paradigm_case, m.paradigm_plural],
                    rows: CASES.map((c) => ({
                        label: c.label,
                        tags: [`Pl1+${c.tag}`],
                    })),
                },
                {
                    showIf: has_tags("Pl2"),
                    headers: [m.paradigm_case, m.paradigm_plural],
                    rows: CASES.map((c) => ({
                        label: c.label,
                        tags: [`Pl2+${c.tag}`],
                    })),
                },
                {
                    showIf: has_tags("Pl3"),
                    headers: [m.paradigm_case, m.paradigm_plural],
                    rows: CASES.map((c) => ({
                        label: c.label,
                        tags: [`Pl3+${c.tag}`],
                    })),
                },
            ],
        },
    ],
};

export default schema;
