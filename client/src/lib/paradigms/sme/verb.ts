import { m } from "$lib/paraglide/messages";
import { has_tags } from "../paradigm_utils";
import type { LanguageSchema } from "../types";

const schema: LanguageSchema = {
    sections: [
        {
            title: m.paradigm_indicative,
            validateRows: true,
            tables: [
                {
                    title: m.paradigm_present,
                    headers: [
                        m.paradigm_person,
                        m.paradigm_positive,
                        m.paradigm_negative,
                    ],
                    rows: [
                        {
                            label: "mun/mon",
                            tags: ["Ind+Prs+Sg1", "Ind+Prs+ConNeg"],
                            prefixes: ["", "in"],
                        },
                        {
                            label: "don",
                            tags: ["Ind+Prs+Sg2", "Ind+Prs+ConNeg"],
                            prefixes: ["", "it"],
                        },
                        {
                            label: "son/dat",
                            tags: ["Ind+Prs+Sg3", "Ind+Prs+ConNeg"],
                            prefixes: ["", "ii"],
                        },
                        {
                            label: "moai",
                            tags: ["Ind+Prs+Du1", "Ind+Prs+ConNeg"],
                            prefixes: ["", "ean"],
                        },
                        {
                            label: "doai",
                            tags: ["Ind+Prs+Du2", "Ind+Prs+ConNeg"],
                            prefixes: ["", "eahppi"],
                        },
                        {
                            label: "soai",
                            tags: ["Ind+Prs+Du3", "Ind+Prs+ConNeg"],
                            prefixes: ["", "eaba"],
                        },
                        {
                            label: "mii",
                            tags: ["Ind+Prs+Pl1", "Ind+Prs+ConNeg"],
                            prefixes: ["", "eat"],
                        },
                        {
                            label: "dii",
                            tags: ["Ind+Prs+Pl2", "Ind+Prs+ConNeg"],
                            prefixes: ["", "ehpet"],
                        },
                        {
                            label: "sii/dat",
                            tags: ["Ind+Prs+Pl3", "Ind+Prs+ConNeg"],
                            prefixes: ["", "eai"],
                        },
                    ],
                },
                {
                    title: m.paradigm_perfect,
                    headers: [
                        m.paradigm_person,
                        m.paradigm_positive,
                        m.paradigm_negative,
                    ],
                    rows: [
                        {
                            label: "mun/mon",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["lean", "in leat"],
                        },
                        {
                            label: "don",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["leat", "it leat"],
                        },
                        {
                            label: "son/dat",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["lea", "ii leat"],
                        },
                        {
                            label: "moai",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["letne", "ean leat"],
                        },
                        {
                            label: "doai",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["leahppi", "eahppi leat"],
                        },
                        {
                            label: "soai",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["leaba", "eaba leat"],
                        },
                        {
                            label: "mii",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["leat", "eat leat"],
                        },
                        {
                            label: "dii",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["lehpet", "ehpet leat"],
                        },
                        {
                            label: "sii/dat",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["leat", "eai leat"],
                        },
                    ],
                },
                {
                    title: m.paradigm_preterite,
                    headers: [
                        m.paradigm_person,
                        m.paradigm_positive,
                        m.paradigm_negative,
                    ],
                    rows: [
                        {
                            label: "mun/mon",
                            tags: ["Ind+Prt+Sg1", "Ind+Prt+ConNeg"],
                            prefixes: ["", "in"],
                        },
                        {
                            label: "don",
                            tags: ["Ind+Prt+Sg2", "Ind+Prt+ConNeg"],
                            prefixes: ["", "it"],
                        },
                        {
                            label: "son/dat",
                            tags: ["Ind+Prt+Sg3", "Ind+Prt+ConNeg"],
                            prefixes: ["", "ii"],
                        },
                        {
                            label: "moai",
                            tags: ["Ind+Prt+Du1", "Ind+Prt+ConNeg"],
                            prefixes: ["", "ean"],
                        },
                        {
                            label: "doai",
                            tags: ["Ind+Prt+Du2", "Ind+Prt+ConNeg"],
                            prefixes: ["", "eahppi"],
                        },
                        {
                            label: "soai",
                            tags: ["Ind+Prt+Du3", "Ind+Prt+ConNeg"],
                            prefixes: ["", "eaba"],
                        },
                        {
                            label: "mii",
                            tags: ["Ind+Prt+Pl1", "Ind+Prt+ConNeg"],
                            prefixes: ["", "eat"],
                        },
                        {
                            label: "dii",
                            tags: ["Ind+Prt+Pl2", "Ind+Prt+ConNeg"],
                            prefixes: ["", "ehpet"],
                        },
                        {
                            label: "sii/dat",
                            tags: ["Ind+Prt+Pl3", "Ind+Prt+ConNeg"],
                            prefixes: ["", "eai"],
                        },
                    ],
                },
                {
                    title: m.paradigm_pluperfect,
                    headers: [
                        m.paradigm_person,
                        m.paradigm_positive,
                        m.paradigm_negative,
                    ],
                    rows: [
                        {
                            label: "mun/mon",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["ledjen", "in lean"],
                        },
                        {
                            label: "don",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["ledjet", "it lean"],
                        },
                        {
                            label: "son/dat",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["lei", "ii lean"],
                        },
                        {
                            label: "moai",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["leimme", "ean lean"],
                        },
                        {
                            label: "doai",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["leidde", "eahppi lean"],
                        },
                        {
                            label: "soai",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["leigga", "eaba lean"],
                        },
                        {
                            label: "mii",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["leimmet", "eat lean"],
                        },
                        {
                            label: "dii",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["leiddet", "ehpet lean"],
                        },
                        {
                            label: "sii/dat",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["ledje", "eai lean"],
                        },
                    ],
                },
            ],
        },
        {
            title: m.paradigm_conditional,
            validateRows: true,
            tables: [
                {
                    title: m.paradigm_present,
                    headers: [
                        m.paradigm_person,
                        m.paradigm_positive,
                        m.paradigm_negative,
                    ],
                    rows: [
                        {
                            label: "mun/mon",
                            tags: ["Cond+Prs+Sg1", "Cond+Prs+ConNeg"],
                            prefixes: ["", "in"],
                        },
                        {
                            label: "don",
                            tags: ["Cond+Prs+Sg2", "Cond+Prs+ConNeg"],
                            prefixes: ["", "it"],
                        },
                        {
                            label: "son/dat",
                            tags: ["Cond+Prs+Sg3", "Cond+Prs+ConNeg"],
                            prefixes: ["", "ii"],
                        },
                        {
                            label: "moai",
                            tags: ["Cond+Prs+Du1", "Cond+Prs+ConNeg"],
                            prefixes: ["", "ean"],
                        },
                        {
                            label: "doai",
                            tags: ["Cond+Prs+Du2", "Cond+Prs+ConNeg"],
                            prefixes: ["", "eahppi"],
                        },
                        {
                            label: "soai",
                            tags: ["Cond+Prs+Du3", "Cond+Prs+ConNeg"],
                            prefixes: ["", "eaba"],
                        },
                        {
                            label: "mii",
                            tags: ["Cond+Prs+Pl1", "Cond+Prs+ConNeg"],
                            prefixes: ["", "eat"],
                        },
                        {
                            label: "dii",
                            tags: ["Cond+Prs+Pl2", "Cond+Prs+ConNeg"],
                            prefixes: ["", "ehpet"],
                        },
                        {
                            label: "sii/dat",
                            tags: ["Cond+Prs+Pl3", "Cond+Prs+ConNeg"],
                            prefixes: ["", "eai"],
                        },
                    ],
                },
                {
                    title: m.paradigm_perfect,
                    headers: [
                        m.paradigm_person,
                        m.paradigm_positive,
                        m.paradigm_negative,
                    ],
                    rows: [
                        {
                            label: "mun/mon",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["livččen", "in livčče"],
                        },
                        {
                            label: "don",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["livččet", "it livčče"],
                        },
                        {
                            label: "son/dat",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["livččii", "ii livčče"],
                        },
                        {
                            label: "moai",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["livččiime", "ean livčče"],
                        },
                        {
                            label: "doai",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["livččiide", "eahppi livčče"],
                        },
                        {
                            label: "soai",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["livččiiga", "eaba livčče"],
                        },
                        {
                            label: "mii",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["livččiimet", "eat livčče"],
                        },
                        {
                            label: "dii",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["livččiidet", "ehpet livčče"],
                        },
                        {
                            label: "sii/dat",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["livčče", "eai livčče"],
                        },
                    ],
                },
            ],
        },
        {
            title: m.paradigm_imperative,
            validateRows: true,
            tables: [
                {
                    headers: [
                        m.paradigm_person,
                        m.paradigm_positive,
                        m.paradigm_negative,
                    ],
                    rows: [
                        {
                            label: "mun/mon",
                            tags: ["Imprt+Sg1", "Imprt+ConNeg"],
                            prefixes: ["", "allon"],
                        },
                        {
                            label: "don",
                            tags: ["Imprt+Sg2", "Imprt+ConNeg"],
                            prefixes: ["", "ale"],
                        },
                        {
                            label: "son/dat",
                            tags: ["Imprt+Sg3", "Imprt+ConNeg"],
                            prefixes: ["", "allos"],
                        },
                        {
                            label: "moai",
                            tags: ["Imprt+Du1", "Imprt+ConNeg"],
                            prefixes: ["", "allu"],
                        },
                        {
                            label: "doai",
                            tags: ["Imprt+Du2", "Imprt+ConNeg"],
                            prefixes: ["", "allet"],
                        },
                        {
                            label: "soai",
                            tags: ["Imprt+Du3", "Imprt+ConNeg"],
                            prefixes: ["", "alloska"],
                        },
                        {
                            label: "mii",
                            tags: ["Imprt+Pl1", "Imprt+ConNeg"],
                            prefixes: ["", "allot"],
                        },
                        {
                            label: "dii",
                            tags: ["Imprt+Pl2", "Imprt+ConNeg"],
                            prefixes: ["", "allet"],
                        },
                        {
                            label: "sii/dat",
                            tags: ["Imprt+Pl3", "Imprt+ConNeg"],
                            prefixes: ["", "alloset"],
                        },
                    ],
                },
            ],
        },
        {
            title: m.paradigm_potential,
            validateRows: true,
            tables: [
                {
                    title: m.paradigm_present,
                    headers: [
                        m.paradigm_person,
                        m.paradigm_positive,
                        m.paradigm_negative,
                    ],
                    rows: [
                        {
                            label: "mun/mon",
                            tags: ["Pot+Prs+Sg1", "Pot+Prs+ConNeg"],
                            prefixes: ["", "in"],
                        },
                        {
                            label: "don",
                            tags: ["Pot+Prs+Sg2", "Pot+Prs+ConNeg"],
                            prefixes: ["", "it"],
                        },
                        {
                            label: "son/dat",
                            tags: ["Pot+Prs+Sg3", "Pot+Prs+ConNeg"],
                            prefixes: ["", "ii"],
                        },
                        {
                            label: "moai",
                            tags: ["Pot+Prs+Du1", "Pot+Prs+ConNeg"],
                            prefixes: ["", "ean"],
                        },
                        {
                            label: "doai",
                            tags: ["Pot+Prs+Du2", "Pot+Prs+ConNeg"],
                            prefixes: ["", "eahppi"],
                        },
                        {
                            label: "soai",
                            tags: ["Pot+Prs+Du3", "Pot+Prs+ConNeg"],
                            prefixes: ["", "eaba"],
                        },
                        {
                            label: "mii",
                            tags: ["Pot+Prs+Pl1", "Pot+Prs+ConNeg"],
                            prefixes: ["", "eat"],
                        },
                        {
                            label: "dii",
                            tags: ["Pot+Prs+Pl2", "Pot+Prs+ConNeg"],
                            prefixes: ["", "ehpet"],
                        },
                        {
                            label: "sii/dat",
                            tags: ["Pot+Prs+Pl3", "Pot+Prs+ConNeg"],
                            prefixes: ["", "eai"],
                        },
                    ],
                },
                {
                    showIf: has_tags("Pot", "Prt"),
                    title: m.paradigm_preterite,
                    headers: [m.paradigm_person, m.paradigm_positive],
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
                        {
                            label: m.paradigm_perfectparticiple,
                            tags: ["PrfPrc"],
                        },
                        {
                            label: m.paradigm_presentparticiple,
                            tags: ["PrsPrc"],
                        },
                        { label: m.paradigm_verbgenitive, tags: ["VGen"] },
                        { label: m.paradigm_verbabessive, tags: ["VAbess"] },
                        { label: m.paradigm_supine, tags: ["Sup"] },
                    ],
                },
                {
                    title: () => {
                        return "Actio forms";
                    },
                    headers: [],
                    rows: [
                        {
                            label: m.paradigm_actionominative,
                            tags: ["Actio+Nom"],
                        },
                        {
                            label: m.paradigm_actiogenitive,
                            tags: ["Actio+Gen"],
                        },
                        {
                            label: m.paradigm_actiolocative,
                            tags: ["Actio+Loc"],
                        },
                        {
                            label: m.paradigm_actiocomitative,
                            tags: ["Actio+Com"],
                        },
                        { label: m.paradigm_actioessive, tags: ["Actio+Ess"] },
                    ],
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
                    ],
                },
                // {
                //     headers: [m.paradigm_owner]
                // }
            ],
        },
    ],
};

export default schema;
