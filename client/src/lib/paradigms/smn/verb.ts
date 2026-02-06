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
                        { label: "mun", tags: ["Ind+Prs+Sg1", "Ind+Prs+ConNeg"], prefixes: ["", "jiem"] },
                        { label: "tun", tags: ["Ind+Prs+Sg2", "Ind+Prs+ConNeg"], prefixes: ["", "jieh"] },
                        { label: "sun", tags: ["Ind+Prs+Sg3", "Ind+Prs+ConNeg"], prefixes: ["", "ij"], seperator: true },
                        { label: "muoi", tags: ["Ind+Prs+Du1", "Ind+Prs+ConNeg"], prefixes: ["", "iän"] },
                        { label: "tuoi", tags: ["Ind+Prs+Du2", "Ind+Prs+ConNeg"], prefixes: ["", "eppee"] },
                        { label: "suoi", tags: ["Ind+Prs+Du3", "Ind+Prs+ConNeg"], prefixes: ["", "iävá"], seperator: true },
                        { label: "mij", tags: ["Ind+Prs+Pl1", "Ind+Prs+ConNeg"], prefixes: ["", "ep"] },
                        { label: "tij", tags: ["Ind+Prs+Pl2", "Ind+Prs+ConNeg"], prefixes: ["", "eppeđ"] },
                        { label: "sij", tags: ["Ind+Prs+Pl3", "Ind+Prs+ConNeg"], prefixes: ["", "iä"] },
                    ],
                },
                {
                    title: m.paradigm_perfect,
                    headers: [m.paradigm_person, m.paradigm_positive, m.paradigm_negative],
                    rows: [
                        { label: "mun", tags: ["PrfPrc", "PrfPrc"], prefixes: ["lam", "jiem lah"] },
                        { label: "tun", tags: ["PrfPrc", "PrfPrc"], prefixes: ["lah", "jieh lah"] },
                        { label: "sun", tags: ["PrfPrc", "PrfPrc"], prefixes: ["lii", "ij lah"], seperator: true },
                        { label: "muoi", tags: ["PrfPrc", "PrfPrc"], prefixes: ["láán", "iän lah"] },
                        { label: "tuoi", tags: ["PrfPrc", "PrfPrc"], prefixes: ["leppee", "eppee lah"] },
                        { label: "suoi", tags: ["PrfPrc", "PrfPrc"], prefixes: ["lává", "iävá lah"], seperator: true },
                        { label: "mij", tags: ["PrfPrc", "PrfPrc"], prefixes: ["lep", "ep lah"] },
                        { label: "tij", tags: ["PrfPrc", "PrfPrc"], prefixes: ["leppeđ", "eppeđ lah"] },
                        { label: "sij", tags: ["PrfPrc", "PrfPrc"], prefixes: ["láá", "iä lah"] },
                    ],
                },
                {
                    title: m.paradigm_preterite,
                    headers: [m.paradigm_person, m.paradigm_positive, m.paradigm_negative],
                    rows: [
                        { label: "mun", tags: ["Ind+Prt+Sg1", "Ind+Prt+ConNeg"], prefixes: ["", "jiem"] },
                        { label: "tun", tags: ["Ind+Prt+Sg2", "Ind+Prt+ConNeg"], prefixes: ["", "jieh"] },
                        { label: "sun", tags: ["Ind+Prt+Sg3", "Ind+Prt+ConNeg"], prefixes: ["", "ij"], seperator: true },
                        { label: "muoi", tags: ["Ind+Prt+Du1", "Ind+Prt+ConNeg"], prefixes: ["", "iän"] },
                        { label: "tuoi", tags: ["Ind+Prt+Du2", "Ind+Prt+ConNeg"], prefixes: ["", "eppee"] },
                        { label: "suoi", tags: ["Ind+Prt+Du3", "Ind+Prt+ConNeg"], prefixes: ["", "iävá"], seperator: true },
                        { label: "mij", tags: ["Ind+Prt+Pl1", "Ind+Prt+ConNeg"], prefixes: ["", "ep"] },
                        { label: "tij", tags: ["Ind+Prt+Pl2", "Ind+Prt+ConNeg"], prefixes: ["", "eppeđ"] },
                        { label: "sij", tags: ["Ind+Prt+Pl3", "Ind+Prt+ConNeg"], prefixes: ["", "iä"] },
                    ],
                },
                {
                    title: m.paradigm_pluperfect,
                    headers: [m.paradigm_person, m.paradigm_positive, m.paradigm_negative],
                    rows: [
                        { label: "mun", tags: ["PrfPrc", "PrfPrc"], prefixes: ["lijjim", "jiem lean"] },
                        { label: "tun", tags: ["PrfPrc", "PrfPrc"], prefixes: ["lijjih", "jieh lean"] },
                        { label: "sun", tags: ["PrfPrc", "PrfPrc"], prefixes: ["lâi", "ij lean"], seperator: true },
                        { label: "muoi", tags: ["PrfPrc", "PrfPrc"], prefixes: ["láim", "iän lean"] },
                        { label: "tuoi", tags: ["PrfPrc", "PrfPrc"], prefixes: ["láid", "eppee lean"] },
                        { label: "suoi", tags: ["PrfPrc", "PrfPrc"], prefixes: ["láin", "iävá lean"], seperator: true },
                        { label: "mij", tags: ["PrfPrc", "PrfPrc"], prefixes: ["lâim", "ep lean"] },
                        { label: "tij", tags: ["PrfPrc", "PrfPrc"], prefixes: ["lâid", "eppeđ lean"] },
                        { label: "sij", tags: ["PrfPrc", "PrfPrc"], prefixes: ["lijjii", "iä lean"] },
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
                        { label: "mun", tags: ["Cond+Prs+Sg1", "Cond+Prs+ConNeg"], prefixes: ["", "jiem"] },
                        { label: "tun", tags: ["Cond+Prs+Sg2", "Cond+Prs+ConNeg"], prefixes: ["", "jieh"] },
                        { label: "sun", tags: ["Cond+Prs+Sg3", "Cond+Prs+ConNeg"], prefixes: ["", "ij"], seperator: true },
                        { label: "muoi", tags: ["Cond+Prs+Du1", "Cond+Prs+ConNeg"], prefixes: ["", "iän"] },
                        { label: "tuoi", tags: ["Cond+Prs+Du2", "Cond+Prs+ConNeg"], prefixes: ["", "eppee"] },
                        { label: "suoi", tags: ["Cond+Prs+Du3", "Cond+Prs+ConNeg"], prefixes: ["", "iävá"], seperator: true },
                        { label: "mij", tags: ["Cond+Prs+Pl1", "Cond+Prs+ConNeg"], prefixes: ["", "ep"] },
                        { label: "tij", tags: ["Cond+Prs+Pl2", "Cond+Prs+ConNeg"], prefixes: ["", "eppeđ"] },
                        { label: "sij", tags: ["Cond+Prs+Pl3", "Cond+Prs+ConNeg"], prefixes: ["", "iä"] },
                    ],
                },
                {
                    title: m.paradigm_perfect,
                    headers: [m.paradigm_person, m.paradigm_positive, m.paradigm_negative],
                    rows: [
                        { label: "mun", tags: ["PrfPrc", "PrfPrc"], prefixes: ["liččim", "in ličči"] },
                        { label: "tun", tags: ["PrfPrc", "PrfPrc"], prefixes: ["liččih", "it ličči"] },
                        { label: "sun", tags: ["PrfPrc", "PrfPrc"], prefixes: ["liččij", "ii ličči"], seperator: true },
                        { label: "muoi", tags: ["PrfPrc", "PrfPrc"], prefixes: ["liččijm", "ean ličči"] },
                        { label: "tuoi", tags: ["PrfPrc", "PrfPrc"], prefixes: ["liččijd", "eahppi ličči"] },
                        { label: "suoi", tags: ["PrfPrc", "PrfPrc"], prefixes: ["liččijn", "eaba ličči"], seperator: true },
                        { label: "mij", tags: ["PrfPrc", "PrfPrc"], prefixes: ["liččijm", "eat ličči"] },
                        { label: "tij", tags: ["PrfPrc", "PrfPrc"], prefixes: ["liččijd", "ehpet ličči"] },
                        { label: "sij", tags: ["PrfPrc", "PrfPrc"], prefixes: ["liččii", "eai ličči"] },
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
                        { label: "mun", tags: ["Imprt+Sg1", "Imprt+ConNeg"], prefixes: ["", "iällum"] },
                        { label: "tun", tags: ["Imprt+Sg2", "Imprt+ConNeg"], prefixes: ["", "ale"] },
                        { label: "sun", tags: ["Imprt+Sg3", "Imprt+ConNeg"], prefixes: ["", "iällus"], seperator: true },
                        { label: "muoi", tags: ["Imprt+Du1", "Imprt+ConNeg"], prefixes: ["", "iälloon"] },
                        { label: "tuoi", tags: ["Imprt+Du2", "Imprt+ConNeg"], prefixes: ["", "ellee"] },
                        { label: "suoi", tags: ["Imprt+Du3", "Imprt+ConNeg"], prefixes: ["", "iällus"], seperator: true },
                        { label: "mij", tags: ["Imprt+Pl1", "Imprt+ConNeg"], prefixes: ["", "iällup"] },
                        { label: "tij", tags: ["Imprt+Pl2", "Imprt+ConNeg"], prefixes: ["", "elleđ"] },
                        { label: "sij", tags: ["Imprt+Pl3", "Imprt+ConNeg"], prefixes: ["", "iälluč"] },
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
                        { label: "mun", tags: ["Pot+Prs+Sg1", "Pot+Prs+ConNeg"], prefixes: ["", "jiem"] },
                        { label: "tun", tags: ["Pot+Prs+Sg2", "Pot+Prs+ConNeg"], prefixes: ["", "jieh"] },
                        { label: "sun", tags: ["Pot+Prs+Sg3", "Pot+Prs+ConNeg"], prefixes: ["", "ij"], seperator: true },
                        { label: "muoi", tags: ["Pot+Prs+Du1", "Pot+Prs+ConNeg"], prefixes: ["", "iän"] },
                        { label: "tuoi", tags: ["Pot+Prs+Du2", "Pot+Prs+ConNeg"], prefixes: ["", "eppee"] },
                        { label: "suoi", tags: ["Pot+Prs+Du3", "Pot+Prs+ConNeg"], prefixes: ["", "iävá"], seperator: true },
                        { label: "mij", tags: ["Pot+Prs+Pl1", "Pot+Prs+ConNeg"], prefixes: ["", "ep"] },
                        { label: "tij", tags: ["Pot+Prs+Pl2", "Pot+Prs+ConNeg"], prefixes: ["", "eppeđ"] },
                        { label: "sij", tags: ["Pot+Prs+Pl3", "Pot+Prs+ConNeg"], prefixes: ["", "iä"] },
                    ],
                },
                {
                    showIf: has_tags("Pot", "Prt"),
                    title: m.paradigm_preterite,
                    headers: [m.paradigm_person, m.paradigm_positive],
                    rows: [
                        { label: "mun", tags: ["Pot+Prt+Sg1"] },
                        { label: "tun", tags: ["Pot+Prt+Sg2"] },
                        { label: "sun", tags: ["Pot+Prt+Sg3"], seperator: true },
                        { label: "muoi", tags: ["Pot+Prt+Du1"] },
                        { label: "tuoi", tags: ["Pot+Prt+Du2"] },
                        { label: "suoi", tags: ["Pot+Prt+Du3"], seperator: true },
                        { label: "mij", tags: ["Pot+Prt+Pl1"] },
                        { label: "tij", tags: ["Pot+Prt+Pl2"] },
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
                        { label: m.paradigm_actioillative, tags: ["Actio+Ill"] },
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
