import { m } from "$lib/paraglide/messages";
import { has_tags } from "../paradigm_utils";
import type { LanguageSchema } from "../types";
import { SMA_DEFAULT_CASE_TABLE } from "./helpers";

const schema: LanguageSchema = {
    sections: [
        {
            title: m.paradigm_positive,
            tables: [
                {
                    headers: [],
                    rows: [
                        {
                            label: m.paradigm_attribute,
                            tags: ["Attr"],
                        },
                    ],
                },
                SMA_DEFAULT_CASE_TABLE,
            ],
        },
        {
            title: m.paradigm_comparative,
            showIf: has_tags("Der/Comp"),
            tables: [
                {
                    headers: [],
                    rows: [
                        {
                            label: m.paradigm_attribute,
                            tags: ["Der/Comp+A+Attr"],
                        },
                    ],
                },

                {
                    headers: [
                        m.paradigm_case,
                        m.paradigm_singular,
                        m.paradigm_plural,
                    ],
                    rows: [
                        {
                            label: m.paradigm_nominative,
                            tags: ["Der/Comp+A+Sg+Nom", "Der/Comp+A+Pl+Nom"],
                        },
                        {
                            label: m.paradigm_accusative,
                            tags: ["Der/Comp+A+Sg+Acc", "Der/Comp+A+Pl+Acc"],
                        },
                        {
                            label: m.paradigm_genitive,
                            tags: ["Der/Comp+A+Sg+Gen", "Der/Comp+A+Pl+Gen"],
                        },
                        {
                            label: m.paradigm_illative,
                            tags: ["Der/Comp+A+Sg+Ill", "Der/Comp+A+Pl+Ill"],
                        },
                        {
                            label: m.paradigm_inessive,
                            tags: ["Der/Comp+A+Sg+Ine", "Der/Comp+A+Pl+Ine"],
                        },
                        {
                            label: m.paradigm_elative,
                            tags: ["Der/Comp+A+Sg+Ela", "Der/Comp+A+Pl+Ela"],
                        },
                        {
                            label: m.paradigm_comitative,
                            tags: ["Der/Comp+A+Sg+Com", "Der/Comp+A+Pl+Com"],
                        },
                        {
                            label: m.paradigm_essive,
                            tags: ["Der/Comp+A+Ess"],
                            colspan: 2,
                        },
                    ],
                },
            ],
        },
        {
            title: m.paradigm_superlative,
            showIf: has_tags("Der/Superl"),
            tables: [
                {
                    headers: [],
                    rows: [
                        {
                            label: m.paradigm_attribute,
                            tags: ["Der/Superl+A+Attr"],
                        },
                    ],
                },

                {
                    headers: [
                        m.paradigm_case,
                        m.paradigm_singular,
                        m.paradigm_plural,
                    ],
                    rows: [
                        {
                            label: m.paradigm_nominative,
                            tags: [
                                "Der/Superl+A+Sg+Nom",
                                "Der/Superl+A+Pl+Nom",
                            ],
                        },
                        {
                            label: m.paradigm_accusative,
                            tags: [
                                "Der/Superl+A+Sg+Acc",
                                "Der/Superl+A+Pl+Acc",
                            ],
                        },
                        {
                            label: m.paradigm_genitive,
                            tags: [
                                "Der/Superl+A+Sg+Gen",
                                "Der/Superl+A+Pl+Gen",
                            ],
                        },
                        {
                            label: m.paradigm_illative,
                            tags: [
                                "Der/Superl+A+Sg+Ill",
                                "Der/Superl+A+Pl+Ill",
                            ],
                        },
                        {
                            label: m.paradigm_inessive,
                            tags: [
                                "Der/Superl+A+Sg+Ine",
                                "Der/Superl+A+Pl+Ine",
                            ],
                        },
                        {
                            label: m.paradigm_elative,
                            tags: [
                                "Der/Superl+A+Sg+Ela",
                                "Der/Superl+A+Pl+Ela",
                            ],
                        },
                        {
                            label: m.paradigm_comitative,
                            tags: [
                                "Der/Superl+A+Sg+Com",
                                "Der/Superl+A+Pl+Com",
                            ],
                        },
                        {
                            label: m.paradigm_essive,
                            tags: ["Der/Superl+A+Ess"],
                            colspan: 2,
                        },
                    ],
                },
            ],
        },
    ],
};

export default schema;
