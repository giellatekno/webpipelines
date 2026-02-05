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
                    headers: [m.paradigm_person, m.paradigm_positive, m.paradigm_negative],
                    rows: [
                        { label: "mån", tags: ["Ind+Prs+Sg1", "Ind+Prs+ConNeg"], prefixes: ["", "iv"] },
                        { label: "dån", tags: ["Ind+Prs+Sg2", "Ind+Prs+ConNeg"], prefixes: ["", "i"] },
                        { label: "sån", tags: ["Ind+Prs+Sg3", "Ind+Prs+ConNeg"], prefixes: ["", "ij"], seperator: true },
                        { label: "måj", tags: ["Ind+Prs+Du1", "Ind+Prs+ConNeg"], prefixes: ["", "en"] },
                        { label: "dåj", tags: ["Ind+Prs+Du2", "Ind+Prs+ConNeg"], prefixes: ["", "æhppe"] },
                        { label: "såj", tags: ["Ind+Prs+Du3", "Ind+Prs+ConNeg"], prefixes: ["", "æbá"], seperator: true },
                        { label: "mij", tags: ["Ind+Prs+Pl1", "Ind+Prs+ConNeg"], prefixes: ["", "ep"] },
                        { label: "dij", tags: ["Ind+Prs+Pl2", "Ind+Prs+ConNeg"], prefixes: ["", "ehpit"] },
                        { label: "sij", tags: ["Ind+Prs+Pl3", "Ind+Prs+ConNeg"], prefixes: ["", "e"] },
                    ],
                },
                {
                    title: m.paradigm_perfect,
                    headers: [m.paradigm_person, m.paradigm_positive, m.paradigm_negative],
                    rows: [
                        { label: "mån", tags: ["PrfPrc", "PrfPrc"], prefixes: ["lav", "iv la"] },
                        { label: "dån", tags: ["PrfPrc", "PrfPrc"], prefixes: ["la", "i la"] },
                        { label: "sån", tags: ["PrfPrc", "PrfPrc"], prefixes: ["la", "ij la"], seperator: true },
                        { label: "måj", tags: ["PrfPrc", "PrfPrc"], prefixes: ["lin", "en la"] },
                        { label: "dåj", tags: ["PrfPrc", "PrfPrc"], prefixes: ["lihppe", "æhppe la"] },
                        { label: "såj", tags: ["PrfPrc", "PrfPrc"], prefixes: ["libá", "æbá la"], seperator: true },
                        { label: "mij", tags: ["PrfPrc", "PrfPrc"], prefixes: ["lip", "ep la"] },
                        { label: "dij", tags: ["PrfPrc", "PrfPrc"], prefixes: ["lihpit", "ehpit la"] },
                        { label: "sij", tags: ["PrfPrc", "PrfPrc"], prefixes: ["li", "e la"] },
                    ],
                },
                {
                    title: m.paradigm_preterite,
                    headers: [m.paradigm_person, m.paradigm_positive, m.paradigm_negative],
                    rows: [
                        { label: "mån", tags: ["Ind+Prt+Sg1", "Ind+Prt+ConNeg"], prefixes: ["", "ittjiv"] },
                        { label: "dån", tags: ["Ind+Prt+Sg2", "Ind+Prt+ConNeg"], prefixes: ["", "ittji"] },
                        { label: "sån", tags: ["Ind+Prt+Sg3", "Ind+Prt+ConNeg"], prefixes: ["", "ittij"], seperator: true },
                        { label: "måj", tags: ["Ind+Prt+Du1", "Ind+Prt+ConNeg"], prefixes: ["", "ejma"] },
                        { label: "dåj", tags: ["Ind+Prt+Du2", "Ind+Prt+ConNeg"], prefixes: ["", "ejda"] },
                        { label: "såj", tags: ["Ind+Prt+Du3", "Ind+Prt+ConNeg"], prefixes: ["", "ejga"], seperator: true },
                        { label: "mij", tags: ["Ind+Prt+Pl1", "Ind+Prt+ConNeg"], prefixes: ["", "ejma"] },
                        { label: "dij", tags: ["Ind+Prt+Pl2", "Ind+Prt+ConNeg"], prefixes: ["", "ejda"] },
                        { label: "sij", tags: ["Ind+Prt+Pl3", "Ind+Prt+ConNeg"], prefixes: ["", "etjin"] },
                    ],
                },
                {
                    title: m.paradigm_pluperfect,
                    headers: [m.paradigm_person, m.paradigm_positive, m.paradigm_negative],
                    rows: [
                        { label: "mån", tags: ["PrfPrc", "PrfPrc"], prefixes: ["lidjiv", "ittjiv la"] },
                        { label: "dån", tags: ["PrfPrc", "PrfPrc"], prefixes: ["lidji", "ittji la"] },
                        { label: "sån", tags: ["PrfPrc", "PrfPrc"], prefixes: ["lij", "ij la"], seperator: true },
                        { label: "måj", tags: ["PrfPrc", "PrfPrc"], prefixes: ["lijma", "ejma la"] },
                        { label: "dåj", tags: ["PrfPrc", "PrfPrc"], prefixes: ["lijda", "ejda la"] },
                        { label: "såj", tags: ["PrfPrc", "PrfPrc"], prefixes: ["lijga", "ejga la"], seperator: true },
                        { label: "mij", tags: ["PrfPrc", "PrfPrc"], prefixes: ["lijma", "ejma la"] },
                        { label: "dij", tags: ["PrfPrc", "PrfPrc"], prefixes: ["lijda", "ejdat la"] },
                        { label: "sij", tags: ["PrfPrc", "PrfPrc"], prefixes: ["lidjin", "etjin la"] },
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
                    headers: [m.paradigm_person, m.paradigm_positive, m.paradigm_negative],
                    rows: [
                        { label: "mån", tags: ["Cond+Prs+Sg1", "Cond+Prs+ConNeg"], prefixes: ["", "in"] },
                        { label: "dån", tags: ["Cond+Prs+Sg2", "Cond+Prs+ConNeg"], prefixes: ["", "it"] },
                        { label: "sån", tags: ["Cond+Prs+Sg3", "Cond+Prs+ConNeg"], prefixes: ["", "ij"], seperator: true },
                        { label: "måj", tags: ["Cond+Prs+Du1", "Cond+Prs+ConNeg"], prefixes: ["", "ean"] },
                        { label: "dåj", tags: ["Cond+Prs+Du2", "Cond+Prs+ConNeg"], prefixes: ["", "eahppi"] },
                        { label: "såj", tags: ["Cond+Prs+Du3", "Cond+Prs+ConNeg"], prefixes: ["", "eaba"], seperator: true },
                        { label: "mij", tags: ["Cond+Prs+Pl1", "Cond+Prs+ConNeg"], prefixes: ["", "eat"] },
                        { label: "dij", tags: ["Cond+Prs+Pl2", "Cond+Prs+ConNeg"], prefixes: ["", "ehpet"] },
                        { label: "sij", tags: ["Cond+Prs+Pl3", "Cond+Prs+ConNeg"], prefixes: ["", "eai"] },
                    ],
                },
                {
                    title: m.paradigm_perfect,
                    headers: [m.paradigm_person, m.paradigm_positive, m.paradigm_negative],
                    rows: [
                        { label: "mån", tags: ["PrfPrc", "PrfPrc"], prefixes: ["livččen", "in livčče"] },
                        { label: "dån", tags: ["PrfPrc", "PrfPrc"], prefixes: ["livččet", "it livčče"] },
                        { label: "sån", tags: ["PrfPrc", "PrfPrc"], prefixes: ["livččij", "ij livčče"], seperator: true },
                        { label: "måj", tags: ["PrfPrc", "PrfPrc"], prefixes: ["livččijme", "ean livčče"] },
                        { label: "dåj", tags: ["PrfPrc", "PrfPrc"], prefixes: ["livččijde", "eahppi livčče"] },
                        { label: "såj", tags: ["PrfPrc", "PrfPrc"], prefixes: ["livččijga", "eaba livčče"], seperator: true },
                        { label: "mij", tags: ["PrfPrc", "PrfPrc"], prefixes: ["livččijmet", "eat livčče"] },
                        { label: "dij", tags: ["PrfPrc", "PrfPrc"], prefixes: ["livččijdet", "ehpet livčče"] },
                        { label: "sij", tags: ["PrfPrc", "PrfPrc"], prefixes: ["livčče", "eai livčče"] },
                    ],
                },
            ],
        },
        {
            title: m.paradigm_imperative,
            validateRows: true,
            tables: [
                {
                    headers: [m.paradigm_person, m.paradigm_positive, m.paradigm_negative],
                    rows: [
                        { label: "mån", tags: ["Imprt+Sg1", "Imprt+ConNeg"], prefixes: ["", "allon"] },
                        { label: "dån", tags: ["Imprt+Sg2", "Imprt+ConNeg"], prefixes: ["", "ale"] },
                        { label: "sån", tags: ["Imprt+Sg3", "Imprt+ConNeg"], prefixes: ["", "allos"], seperator: true },
                        { label: "måj", tags: ["Imprt+Du1", "Imprt+ConNeg"], prefixes: ["", "allu"] },
                        { label: "dåj", tags: ["Imprt+Du2", "Imprt+ConNeg"], prefixes: ["", "allet"] },
                        { label: "såj", tags: ["Imprt+Du3", "Imprt+ConNeg"], prefixes: ["", "alloska"], seperator: true },
                        { label: "mij", tags: ["Imprt+Pl1", "Imprt+ConNeg"], prefixes: ["", "allot"] },
                        { label: "dij", tags: ["Imprt+Pl2", "Imprt+ConNeg"], prefixes: ["", "allet"] },
                        { label: "sij", tags: ["Imprt+Pl3", "Imprt+ConNeg"], prefixes: ["", "alloset"] },
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
                    headers: [m.paradigm_person, m.paradigm_positive, m.paradigm_negative],
                    rows: [
                        { label: "mån", tags: ["Pot+Prs+Sg1", "Pot+Prs+ConNeg"], prefixes: ["", "in"] },
                        { label: "dån", tags: ["Pot+Prs+Sg2", "Pot+Prs+ConNeg"], prefixes: ["", "it"] },
                        { label: "sån", tags: ["Pot+Prs+Sg3", "Pot+Prs+ConNeg"], prefixes: ["", "ij"], seperator: true },
                        { label: "måj", tags: ["Pot+Prs+Du1", "Pot+Prs+ConNeg"], prefixes: ["", "ean"] },
                        { label: "dåj", tags: ["Pot+Prs+Du2", "Pot+Prs+ConNeg"], prefixes: ["", "eahppi"] },
                        { label: "såj", tags: ["Pot+Prs+Du3", "Pot+Prs+ConNeg"], prefixes: ["", "eaba"], seperator: true },
                        { label: "mij", tags: ["Pot+Prs+Pl1", "Pot+Prs+ConNeg"], prefixes: ["", "eat"] },
                        { label: "dij", tags: ["Pot+Prs+Pl2", "Pot+Prs+ConNeg"], prefixes: ["", "ehpet"] },
                        { label: "sij", tags: ["Pot+Prs+Pl3", "Pot+Prs+ConNeg"], prefixes: ["", "eai"] },
                    ],
                },
                {
                    showIf: has_tags("Pot", "Prt"),
                    title: m.paradigm_preterite,
                    headers: [m.paradigm_person, m.paradigm_positive],
                    rows: [
                        { label: "mån", tags: ["Pot+Prt+Sg1"] },
                        { label: "dån", tags: ["Pot+Prt+Sg2"] },
                        { label: "sån", tags: ["Pot+Prt+Sg3"], seperator: true },
                        { label: "måj", tags: ["Pot+Prt+Du1"] },
                        { label: "dåj", tags: ["Pot+Prt+Du2"] },
                        { label: "såj", tags: ["Pot+Prt+Du3"], seperator: true },
                        { label: "mij", tags: ["Pot+Prt+Pl1"] },
                        { label: "dij", tags: ["Pot+Prt+Pl2"] },
                        { label: "sij", tags: ["Pot+Prt+Pl3"] },
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
                        { label: m.paradigm_presentparticiple, tags: ["PrsPrc"] },
                        { label: m.paradigm_verbgenitive, tags: ["VGen"] },
                        { label: m.paradigm_verbabessive, tags: ["VAbess"] },
                        { label: m.paradigm_supine, tags: ["Sup"] },
                    ],
                },
                {
                    title: m.paradigm_actioforms,
                    headers: [],
                    rows: [
                        { label: m.paradigm_actionominative, tags: ["Actio+Nom"] },
                        { label: m.paradigm_actiogenitive, tags: ["Actio+Gen"] },
                        { label: m.paradigm_actiolocative, tags: ["Actio+Loc"] },
                        { label: m.paradigm_actiocomitative, tags: ["Actio+Com"] },
                        { label: m.paradigm_actioessive, tags: ["Actio+Ess"] },
                    ],
                },
                {
                    title: m.paradigm_gerund,
                    headers: [m.paradigm_person, m.paradigm_singular, m.paradigm_dual, m.paradigm_plural],
                    rows: [
                        { label: m.paradigm_gerund, tags: ["Ger"], seperator: true, colspan: 3 },
                        { label: "1. Pers.", tags: ["Ger+PxSg1", "Ger+PxDu1", "Ger+PxPl1"] },
                        { label: "2. Pers.", tags: ["Ger+PxSg2", "Ger+PxDu2", "Ger+PxPl2"] },
                        { label: "3. Pers.", tags: ["Ger+PxSg3", "Ger+PxDu3", "Ger+PxPl3"] },
                    ],
                },
            ],
        },
    ],
};

export default schema;
