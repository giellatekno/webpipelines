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
                        { label: "mun", tags: ["Ind+Sg1"] },
                        { label: "tun", tags: ["Ind+Sg2"] },
                        { label: "sun", tags: ["Ind+Sg3"] },
                        { label: "muoi", tags: ["Ind+Du1"] },
                        { label: "tuoi", tags: ["Ind+Du2"] },
                        { label: "suoi", tags: ["Ind+Du3"] },
                        { label: "mij", tags: ["Ind+Pl1"] },
                        { label: "tij", tags: ["Ind+Pl2"] },
                        { label: "sij", tags: ["Ind+Pl3"] },
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
                        { label: "mun", tags: ["Imprt+Sg1"] },
                        { label: "tun", tags: ["Imprt+Sg2"] },
                        { label: "sun", tags: ["Imprt+Sg3"] },
                        { label: "muoi", tags: ["Imprt+Du1"] },
                        { label: "tuoi", tags: ["Imprt+Du2"] },
                        { label: "suoi", tags: ["Imprt+Du3"] },
                        { label: "mij", tags: ["Imprt+Pl1"] },
                        { label: "dij", tags: ["Imprt+Pl2"] },
                        { label: "sij", tags: ["Imprt+Pl3"] },
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
                        { label: "mun", tags: ["Sup+Sg1"] },
                        { label: "tun", tags: ["Sup+Sg2"] },
                        { label: "sun", tags: ["Sup+Sg3"] },
                        { label: "muoi", tags: ["Sup+Du1"] },
                        { label: "tuoi", tags: ["Sup+Du2"] },
                        { label: "suoi", tags: ["Sup+Du3"] },
                        { label: "mij", tags: ["Sup+Pl1"] },
                        { label: "dij", tags: ["Sup+Pl2"] },
                        { label: "sij", tags: ["Sup+Pl3"] },
                    ],
                },
            ],
        },
    ],
};

export default schema;
