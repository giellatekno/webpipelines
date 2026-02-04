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
                        { label: "mie", tags: ["Act+Sg1"] },
                        { label: "sie", tags: ["Act+Sg2"] },
                        { label: "hän/se", tags: ["Act+Sg3"] },
                        { label: "met", tags: ["Act+Pl1"] },
                        { label: "tet", tags: ["Act+Pl2"] },
                        { label: "het/net", tags: ["Act+Pl3"] },
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
                        { label: "mie", tags: ["Act+Imprt+Sg1"] },
                        { label: "sie", tags: ["Act+Imprt+Sg2"] },
                        { label: "hän/se", tags: ["Act+Imprt+Sg3"] },
                        { label: "met", tags: ["Act+Imprt+Pl1"] },
                        { label: "tet", tags: ["Act+Imprt+Pl2"] },
                        { label: "het/net", tags: ["Act+Imprt+Pl3"] },
                    ],
                },
            ],
        },
    ],
};

export default schema;
