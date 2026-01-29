import { m } from "$lib/paraglide/messages";
import type { LanguageSchema } from "../types";
import { buildVerbBlock } from "./helpers";

// prettier-ignore
const schema: LanguageSchema = {
    sections: [
        {
            title: m.paradigm_indicative,
            tables: [
                buildVerbBlock(m.paradigm_present, "Ind", "Prs", "ConNeg"),
                buildVerbBlock(m.paradigm_perfect, "Ind", "Prs", "PrfPrc", true),
                buildVerbBlock(m.paradigm_preterite, "Ind", "Prt", "ConNeg"),
                buildVerbBlock(m.paradigm_pluperfect, "Ind", "Prt", "PrfPrc", true),
            ],
        },
        {
            title: m.paradigm_imperative,
            tables: [
                {
                    strict: true,
                    headers: [m.paradigm_person, m.paradigm_positive, m.paradigm_imperative, m.paradigm_imperative],
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
