import { m } from "$lib/paraglide/messages";
import type { LanguageSchema } from "../types";

const schema: LanguageSchema = {
    sections: [
        {
            title: m.paradigm_reciprocal,
            tables: [
                {
                    headers: [m.paradigm_case, m.paradigm_singular, m.paradigm_plural],
                    rows: [
                        { label: m.paradigm_accusative, tags: ["Sg+Acc", "Pl+Acc"] },
                        { label: m.paradigm_genitive, tags: ["Sg+Gen", ""] },
                        { label: m.paradigm_illative, tags: ["Sg+Ill", ""] },
                        { label: m.paradigm_elative, tags: ["Sg+Ela", ""] },
                        { label: m.paradigm_comitative, tags: ["Sg+Com", ""] },
                    ],
                },
            ],
        },
    ],
};

export default schema;
