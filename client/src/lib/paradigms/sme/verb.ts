import { m } from "$lib/paraglide/messages";
import { has_tags } from "../paradigm_utils";
import type { LanguageSchema } from "../types";
import { generateVerbBlock } from "./helpers";

// prettier-ignore
const schema: LanguageSchema = {
    sections: [
        {
            title: m.paradigm_indicative,
            validateRows: true,
            tables: [
                generateVerbBlock(m.paradigm_present, "Ind", "Prs", "Ind+Prs+ConNeg"),
                generateVerbBlock(m.paradigm_perfect, "Ind", "Prs", "PrfPrc", true),
                generateVerbBlock(m.paradigm_preterite, "Ind", "Prt", "Ind+Prt+ConNeg"),
                generateVerbBlock(m.paradigm_pluperfect, "Ind", "Prt", "PrfPrc", true),
            ],
        },
        {
            title: m.paradigm_conditional,
            validateRows: true,
            tables: [
                generateVerbBlock(m.paradigm_present, "Cond", "Prs", "Cond+Prs+ConNeg"),
                generateVerbBlock(m.paradigm_perfect, "Cond", "Prs", "PrfPrc", true),
            ],
        },
        {
            title: m.paradigm_imperative,
            validateRows: true,
            tables: [
                {
                    headers: [m.paradigm_person, m.paradigm_positive, m.paradigm_negative],
                    rows: [
                        { label: "mun/mon", tags: ["Imprt+Sg1", "Imprt+ConNeg"], prefixes: ["", "allon"] },
                        { label: "don", tags: ["Imprt+Sg2", "Imprt+ConNeg"], prefixes: ["", "ale"] },
                        { label: "son/dat", tags: ["Imprt+Sg3", "Imprt+ConNeg"], prefixes: ["", "allos"] },
                        { label: "moai", tags: ["Imprt+Du1", "Imprt+ConNeg"], prefixes: ["", "allu"] },
                        { label: "doai", tags: ["Imprt+Du2", "Imprt+ConNeg"], prefixes: ["", "allet"] },
                        { label: "soai", tags: ["Imprt+Du3", "Imprt+ConNeg"], prefixes: ["", "alloska"] },
                        { label: "mii", tags: ["Imprt+Pl1", "Imprt+ConNeg"], prefixes: ["", "allot"] },
                        { label: "dii", tags: ["Imprt+Pl2", "Imprt+ConNeg"], prefixes: ["", "allet"] },
                        { label: "sii/dat", tags: ["Imprt+Pl3", "Imprt+ConNeg"], prefixes: ["", "alloset"] },
                    ],
                },
            ],
        },
        {
            title: m.paradigm_potential,
            validateRows: true,
            tables: [
                generateVerbBlock(m.paradigm_present, "Pot", "Prs", "Pot+Prs+ConNeg"),
                {
                    showIf: has_tags("Pot", "Prt"),
                    title: m.paradigm_preterite,
                    headers: [m.paradigm_person, m.paradigm_empty],
                    rows: [
                        { label: "mun/mon", tags: ["Pot+Prt+Sg1"] },
                        { label: "don", tags: ["Pot+Prt+Sg2"] },
                        { label: "son/dat", tags: ["Pot+Prt+Sg3"] },
                        { label: "moai", tags: ["Pot+Prt+Du1"] },
                        { label: "doai", tags: ["Pot+Prt+Du2"] },
                        { label: "soai", tags: ["Pot+Prt+Du3"] },
                        { label: "mii", tags: ["Pot+Prt+Pl1"] },
                        { label: "dii", tags: ["Pot+Prt+Pl2"] },
                        { label: "sii/dat", tags: ["Pot+Prt+Pl3"] },
                        
                    ]
                }
            ]
        },
        {
            title: m.paradigm_nonfinite,
            tables: [
                {
                    headers: [],
                    rows: [
                        { label: m.paradigm_infinite, tags: ["Inf"] },
                        { label: m.paradigm_perfectparticiple, tags: ["PrfPrc"] },
                        { label: m.paradigm_presentparticiple, tags: ["PrsPrc"] },
                        { label: m.paradigm_verbgenitive, tags: ["VGen"] },
                        { label: m.paradigm_verbabessive, tags: ["VAbess"] },
                        { label: m.paradigm_supine, tags: ["Sup"] },
                    ]
                },
                {
                    title: () => {return "Actio forms"},
                    headers: [],
                    rows: [
                        { label: m.paradigm_actionominative, tags: ["Actio+Nom"] },
                        { label: m.paradigm_actiogenitive, tags: ["Actio+Gen"] },
                        { label: m.paradigm_actiolocative, tags: ["Actio+Loc"] },
                        { label: m.paradigm_actiocomitative, tags: ["Actio+Com"] },
                        { label: m.paradigm_actioessive, tags: ["Actio+Ess"] },

                    ]
                },
                {
                    title: m.paradigm_gerund,
                    headers: [],
                    rows: [
                        { label: m.paradigm_gerund, tags: ["Ger"] },
                        { label: "mun/mon", tags: ["Ger+PxSg1"] },
                        { label: "don", tags: ["Ger+PxSg2"] },
                        { label: "son/dat", tags: ["Ger+PxSg3"] },
                        { label: "moai", tags: ["Ger+PxDu1"] },
                        { label: "doai", tags: ["Ger+PxDu2"] },
                        { label: "soai", tags: ["Ger+PxDu3"] },
                        { label: "mii", tags: ["Ger+PxPl1"] },
                        { label: "dii", tags: ["Ger+PxPl2"] },
                        { label: "sii/dat", tags: ["Ger+PxPl3"] },
                    ]
                },
                // {
                //     headers: [m.paradigm_owner]
                // }
            ]
        },
    ],
};

export default schema;
