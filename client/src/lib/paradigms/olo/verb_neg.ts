import { m } from "$lib/paraglide/messages";
import type { LanguageSchema } from "../types";

const schema: LanguageSchema = {
    sections: [
        {
            title: m.paradigm_indicative,
            tables: [
                {
                    headers: [m.paradigm_person, m.paradigm_empty],
                    rows: [
                        { label: "minä", tags: ["Sg1"] },
                        { label: "sinä", tags: ["Sg2"] },
                        { label: "hän", tags: ["Sg3"] },
                        { label: "me", tags: ["Pl1"] },
                        { label: "te", tags: ["Pl2"] },
                        { label: "he", tags: ["Pl3"] },
                    ],
                },
            ],
        },
        {
            title: m.paradigm_imperative,
            tables: [
                {
                    headers: [m.paradigm_person, m.paradigm_empty],
                    rows: [
                        { label: "minä", tags: ["Imprt+Sg1"] },
                        { label: "sinä", tags: ["Imprt+Sg2"] },
                        { label: "hän", tags: ["Imprt+Sg3"] },
                        { label: "me", tags: ["Imprt+Pl1"] },
                        { label: "te", tags: ["Imprt+Pl2"] },
                        { label: "he", tags: ["Imprt+Pl3"] },
                    ],
                },
            ],
        },
    ],
};

export default schema;
