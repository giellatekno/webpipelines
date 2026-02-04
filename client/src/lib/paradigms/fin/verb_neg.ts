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
                        { label: "minä", tags: ["Act+Sg1"] },
                        { label: "sinä", tags: ["Act+Sg2"] },
                        { label: "hän", tags: ["Act+Sg3"] },
                        { label: "me", tags: ["Act+Pl1"] },
                        { label: "te", tags: ["Act+Pl2"] },
                        { label: "he", tags: ["Act+Pl3"] },
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
                        { label: "minä", tags: ["Act+Imprt+Sg1"] },
                        { label: "sinä", tags: ["Act+Imprt+Sg2"] },
                        { label: "hän", tags: ["Act+Imprt+Sg3"] },
                        { label: "me", tags: ["Act+Imprt+Pl1"] },
                        { label: "te", tags: ["Act+Imprt+Pl2"] },
                        { label: "he", tags: ["Act+Imprt+Pl3"] },
                    ],
                },
            ],
        },
    ],
};

export default schema;
