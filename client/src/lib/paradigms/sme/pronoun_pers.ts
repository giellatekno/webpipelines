import { m } from "$lib/paraglide/messages";
import { has_tags } from "../paradigm_utils";
import type { LanguageSchema } from "../types";

const schema: LanguageSchema = {
    sections: [
        {
            title: m.paradigm_personal,
            tables: [
                {
                    showIf: has_tags("Sg1"),
                    headers: [m.paradigm_case, m.paradigm_singular],
                    rows: [
                        {
                            label: m.paradigm_nominative,
                            tags: ["Sg1+Nom"],
                        },
                        {
                            label: m.paradigm_accusative,
                            tags: ["Sg1+Acc"],
                        },
                        {
                            label: m.paradigm_genitive,
                            tags: ["Sg1+Gen"],
                        },
                        {
                            label: m.paradigm_illative,
                            tags: ["Sg1+Ill"],
                        },
                        {
                            label: m.paradigm_inessive,
                            tags: ["Sg1+Ine"],
                        },
                        {
                            label: m.paradigm_elative,
                            tags: ["Sg1+Ela"],
                        },
                        {
                            label: m.paradigm_comitative,
                            tags: ["Sg1+Com"],
                        },
                    ],
                },
                {
                    showIf: has_tags("2"),
                    headers: [
                        m.paradigm_case,
                        m.paradigm_singular,
                        m.paradigm_dual,
                        m.paradigm_plural,
                    ],
                    rows: [
                        {
                            label: m.paradigm_nominative,
                            tags: ["Sg2+Nom", "Du2+Nom", "Pl2+Nom"],
                        },
                        {
                            label: m.paradigm_accusative,
                            tags: ["Sg2+Acc", "Du2+Acc", "Pl2+Acc"],
                        },
                        {
                            label: m.paradigm_genitive,
                            tags: ["Sg2+Gen", "Du2+Gen", "Pl2+Gen"],
                        },
                        {
                            label: m.paradigm_illative,
                            tags: ["Sg2+Ill", "Du2+Ill", "Pl2+Ill"],
                        },
                        {
                            label: m.paradigm_locative,
                            tags: ["Sg2+Loc", "Du2+Loc", "Pl2+Loc"],
                        },
                        {
                            label: m.paradigm_comitative,
                            tags: ["Sg2+Com", "Du2+Com", "Pl2+Com"],
                        },
                        {
                            label: m.paradigm_essive,
                            tags: ["Sg2+Ess", "Du2+Ess", "Pl2+Ess"],
                        },
                    ],
                },
                {
                    showIf: has_tags("3"),
                    headers: [
                        m.paradigm_case,
                        m.paradigm_singular,
                        m.paradigm_dual,
                        m.paradigm_plural,
                    ],
                    rows: [
                        {
                            label: m.paradigm_nominative,
                            tags: ["Sg3+Nom", "Du3+Nom", "Pl3+Nom"],
                        },
                        {
                            label: m.paradigm_accusative,
                            tags: ["Sg3+Acc", "Du3+Acc", "Pl3+Acc"],
                        },
                        {
                            label: m.paradigm_genitive,
                            tags: ["Sg3+Gen", "Du3+Gen", "Pl3+Gen"],
                        },
                        {
                            label: m.paradigm_illative,
                            tags: ["Sg3+Ill", "Du3+Ill", "Pl3+Ill"],
                        },
                        {
                            label: m.paradigm_locative,
                            tags: ["Sg3+Loc", "Du3+Loc", "Pl3+Loc"],
                        },
                        {
                            label: m.paradigm_comitative,
                            tags: ["Sg3+Com", "Du3+Com", "Pl3+Com"],
                        },
                        {
                            label: m.paradigm_essive,
                            tags: ["Sg3+Ess", "Du3+Ess", "Pl3+Ess"],
                        },
                    ],
                },
            ],
        },
    ],
};

export default schema;
