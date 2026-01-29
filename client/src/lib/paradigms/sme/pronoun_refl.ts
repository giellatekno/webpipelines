import { m } from "$lib/paraglide/messages";
import type { LanguageSchema } from "../types";
import { generateReflexiveSection } from "./helpers";

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
                generateReflexiveSection(m.paradigm_accusative, "Acc"),
                generateReflexiveSection(m.paradigm_genitive, "Gen"),
                generateReflexiveSection(m.paradigm_illative, "Ill"),
                generateReflexiveSection(m.paradigm_locative, "Loc"),
                generateReflexiveSection(m.paradigm_comitative, "Com"),
                generateReflexiveSection(m.paradigm_essive, "Ess"),
                {
                    headers: [],
                    rows: [{ label: m.paradigm_essive, tags: ["Ess"] }],
                },
            ],
        },
    ],
};

export default schema;
