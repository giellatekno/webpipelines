import { m } from "$lib/paraglide/messages";
import type { LanguageSchema } from "../types";

const schema: LanguageSchema = {
    sections: [
        {
            title: m.paradigm_indicative,
            tables: [
                {
                    title: m.paradigm_present,
                    headers: [m.paradigm_person, m.paradigm_empty],
                    rows: [
                        { label: "mun/mon", tags: ["Ind+Prs+Sg1"] },
                        { label: "don", tags: ["Ind+Prs+Sg2"] },
                        { label: "son/dat", tags: ["Ind+Prs+Sg3"] },
                        { label: "moai", tags: ["Ind+Prs+Du1"] },
                        { label: "doai", tags: ["Ind+Prs+Du2"] },
                        { label: "soai", tags: ["Ind+Prs+Du3"] },
                        { label: "mii", tags: ["Ind+Prs+Pl1"] },
                        { label: "dii", tags: ["Ind+Prs+Pl2"] },
                        { label: "sii/dat", tags: ["Ind+Prs+Pl3"] },
                    ],
                },
                {
                    title: m.paradigm_preterite,
                    headers: [m.paradigm_person, m.paradigm_empty],
                    rows: [
                        { label: "mun/mon", tags: ["Ind+Prt+Sg1"] },
                        { label: "don", tags: ["Ind+Prt+Sg2"] },
                        { label: "son/dat", tags: ["Ind+Prt+Sg3"] },
                        { label: "moai", tags: ["Ind+Prt+Du1"] },
                        { label: "doai", tags: ["Ind+Prt+Du2"] },
                        { label: "soai", tags: ["Ind+Prt+Du3"] },
                        { label: "mii", tags: ["Ind+Prt+Pl1"] },
                        { label: "dii", tags: ["Ind+Prt+Pl2"] },
                        { label: "sii/dat", tags: ["Ind+Prt+Pl3"] },
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
                        { label: "mun/mon", tags: ["Imprt+Sg1"] },
                        { label: "don", tags: ["Imprt+Sg2"] },
                        { label: "son/dat", tags: ["Imprt+Sg3"] },
                        { label: "moai", tags: ["Imprt+Du1"] },
                        { label: "doai", tags: ["Imprt+Du2"] },
                        { label: "soai", tags: ["Imprt+Du3"] },
                        { label: "mii", tags: ["Imprt+Pl1"] },
                        { label: "dii", tags: ["Imprt+Pl2"] },
                        { label: "sii/dat", tags: ["Imprt+Pl3"] },
                    ],
                },
                {
                    headers: [m.paradigm_person, m.paradigm_empty],
                    rows: [
                        { label: "mun/mon", tags: ["Imprt+Sg1"] },
                        { label: "don", tags: ["Imprt+Sg2"] },
                        { label: "son/dat", tags: ["Imprt+Sg3"] },
                        { label: "moai", tags: ["Imprt+Du1"] },
                        { label: "doai", tags: ["Imprt+Du2"] },
                        { label: "soai", tags: ["Imprt+Du3"] },
                        { label: "mii", tags: ["Imprt+Pl1"] },
                        { label: "dii", tags: ["Imprt+Pl2"] },
                        { label: "sii/dat", tags: ["Imprt+Pl3"] },
                    ],
                },
            ],
        },
        {
            title: m.paradigm_supine,
            tables: [
                {
                    headers: [m.paradigm_person, m.paradigm_empty],
                    rows: [
                        { label: "mun/mon", tags: ["Sup+Sg1"] },
                        { label: "don", tags: ["Sup+Sg2"] },
                        { label: "son/dat", tags: ["Sup+Sg3"] },
                        { label: "moai", tags: ["Sup+Du1"] },
                        { label: "doai", tags: ["Sup+Du2"] },
                        { label: "soai", tags: ["Sup+Du3"] },
                        { label: "mii", tags: ["Sup+Pl1"] },
                        { label: "dii", tags: ["Sup+Pl2"] },
                        { label: "sii/dat", tags: ["Sup+Pl3"] },
                    ],
                },
            ],
        },
    ],
};

export default schema;
