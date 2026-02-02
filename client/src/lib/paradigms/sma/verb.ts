import { m } from "$lib/paraglide/messages";
import type { LanguageSchema } from "../types";
import { generateVerbBlock } from "./helpers";

// prettier-ignore
const schema: LanguageSchema = {
    sections: [
        {
            title: m.paradigm_indicative,
            validateRows: true,
            tables: [
                generateVerbBlock(m.paradigm_present, "Ind", "Prs", "ConNeg"),
                generateVerbBlock(m.paradigm_perfect, "Ind", "Prs", "PrfPrc", true),
                generateVerbBlock(m.paradigm_preterite, "Ind", "Prt", "ConNeg"),
                generateVerbBlock(m.paradigm_pluperfect, "Ind", "Prt", "PrfPrc", true),
            ],
        },
        {
            title: m.paradigm_imperative,
            validateRows: true,
            tables: [
                {
                    headers: [m.paradigm_person, m.paradigm_positive, m.paradigm_imperative_i, m.paradigm_imperative_ii],
                    rows: [
                        { label: "manne", tags: ["Imprt+Sg1", "ConNeg", "ConNeg"], prefixes: ["", "aelliem", "ollem"] },
                        { label: "datne", tags: ["Imprt+Sg2", "ConNeg", "ConNeg"], prefixes: ["", "aellieh", "ollh"] },
                        { label: "dïhte", tags: ["Imprt+Sg3", "ConNeg", "ConNeg"], prefixes: ["", "aellies", "olles"] },
                        { label: "månnoeh", tags: ["Imprt+Du1", "ConNeg", "ConNeg"], prefixes: ["", "aellien", "ollen"] },
                        { label: "dåtnoeh", tags: ["Imprt+Du2", "ConNeg", "ConNeg"], prefixes: ["", "aelleden", "olleden"] },
                        { label: "dah guaktah", tags: ["Imprt+Du3", "ConNeg", "ConNeg"], prefixes: ["", "aellies", "olles"] },
                        { label: "mijjieh", tags: ["Imprt+Pl1", "ConNeg", "ConNeg"], prefixes: ["", "aellebe", "ollebe"] },
                        { label: "dijjieh", tags: ["Imprt+Pl2", "ConNeg", "ConNeg"], prefixes: ["", "aellede", "ollede"] },
                        { label: "dah", tags: ["Imprt+Pl3", "ConNeg", "ConNeg"], prefixes: ["", "aellies", "olles"] },
                    ],
                },
            ],
        },
        {
            title: m.paradigm_nonfinite,
            tables: [
                {
                    headers: [],
                    rows: [
                        { label: m.paradigm_infinite, tags: ["Inf"] },
                        { label: m.paradigm_perfectparticiple, tags: ["PrfPrc"] },
                        { label: m.paradigm_verbgenitive, tags: ["VGen"] },
                        { label: m.paradigm_gerund, tags: ["Ger"] },
                    ]
                },
            ]
        },
    ],
};

export default schema;
