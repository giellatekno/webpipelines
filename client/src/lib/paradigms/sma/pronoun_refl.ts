import { m } from "$lib/paraglide/messages";
import type { LanguageSchema } from "../types";
import { generateReflexiveBlock } from "./helpers";

const schema: LanguageSchema = {
    sections: [
        {
            title: m.paradigm_reflexive,
            tables: [
                {
                    title: m.paradigm_nominative,
                    headers: [m.paradigm_number, m.paradigm_empty],
                    rows: [
                        { label: m.paradigm_singular, tags: ["Sg+Nom"] },
                        { label: m.paradigm_dual, tags: ["Du+Nom"] },
                        { label: m.paradigm_plural, tags: ["Pl+Nom"] },
                    ],
                },
                generateReflexiveBlock(m.paradigm_accusative, "Acc"),
                generateReflexiveBlock(m.paradigm_genitive, "Gen"),
                generateReflexiveBlock(m.paradigm_illative, "Ill"),
                generateReflexiveBlock(m.paradigm_inessive, "Ine"),
                generateReflexiveBlock(m.paradigm_elative, "Ela"),
                generateReflexiveBlock(m.paradigm_comitative, "Com"),
            ],
        },
    ],
};

export default schema;
