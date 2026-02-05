import { m } from "$lib/paraglide/messages";
import type { LanguageSchema } from "../types";
import { CASES } from "./helpers";

// prettier-ignore
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
                        { label: "minä", tags: ["Act+Ind+Prs+Sg1", "Act+Ind+Prs+ConNeg"], prefixes: ["", "en"] },
                        { label: "sinä", tags: ["Act+Ind+Prs+Sg2", "Act+Ind+Prs+ConNeg"], prefixes: ["", "et"] },
                        { label: "hän", tags: ["Act+Ind+Prs+Sg3", "Act+Ind+Prs+ConNeg"], prefixes: ["", "ei"] },
                        { label: "myö", tags: ["Act+Ind+Prs+Pl1", "Act+Ind+Prs+ConNeg"], prefixes: ["", "emme"] },
                        { label: "työ", tags: ["Act+Ind+Prs+Pl2", "Act+Ind+Prs+ConNeg"], prefixes: ["", "ette"] },
                        { label: "hyö", tags: ["Act+Ind+Prs+Pl3", "Act+Ind+Prs+ConNeg"], prefixes: ["", "ei"] },

                        // { label: m.paradigm_passive, tags: ["Pss+Ind+Prs", "???"], prefixes: ["", "ei"]} // Missing form?
                    ]
                },
                {
                    title: m.paradigm_perfect,
                    headers: [m.paradigm_person, m.paradigm_positive, m.paradigm_negative],
                    rows: [
                        { label: "minä", tags: ["Act+PrfPrc+Sg+Nom", "Act+PrfPrc+Sg+Nom"], prefixes: ["olen", "en ole"] },
                        { label: "sinä", tags: ["Act+PrfPrc+Sg+Nom", "Act+PrfPrc+Sg+Nom"], prefixes: ["olet", "et ole"] },
                        { label: "hän", tags: ["Act+PrfPrc+Sg+Nom", "Act+PrfPrc+Sg+Nom"], prefixes: ["on", "ei ole"] },
                        { label: "myö", tags: ["Act+PrfPrc+Pl+Nom", "Act+PrfPrc+Pl+Nom"], prefixes: ["olemme", "emmo ole"] },
                        { label: "työ", tags: ["Act+PrfPrc+Pl+Nom", "Act+PrfPrc+Pl+Nom"], prefixes: ["olette", "etto ole"] },
                        { label: "hyö", tags: ["Act+PrfPrc+Pl+Nom", "Act+PrfPrc+Pl+Nom"], prefixes: ["on", "ei ole"] },
                        // { label: m.paradigm_passive, tags: ["???", "??"], prefixes: ["on", "ei ole"]}
                    ]
                },
                {
                    title: m.paradigm_preterite,
                    headers: [m.paradigm_person, m.paradigm_positive, m.paradigm_negative],
                    rows: [
                        { label: "minä", tags: ["Act+Ind+Prt+Sg1", "Act+Ind+Prt+ConNeg+Sg"], prefixes: ["", "en"] },
                        { label: "sinä", tags: ["Act+Ind+Prt+Sg2", "Act+Ind+Prt+ConNeg+Sg"], prefixes: ["", "et"] },
                        { label: "hän", tags: ["Act+Ind+Prt+Sg3", "Act+Ind+Prt+ConNeg+Sg"], prefixes: ["", "ei"] },
                        { label: "myö", tags: ["Act+Ind+Prt+Pl1", "Act+Ind+Prt+ConNeg+Pl"], prefixes: ["", "emmo"] },
                        { label: "työ", tags: ["Act+Ind+Prt+Pl2", "Act+Ind+Prt+ConNeg+Pl"], prefixes: ["", "etto"] },
                        { label: "hyö", tags: ["Act+Ind+Prt+Pl3", "Act+Ind+Prt+ConNeg+Pl"], prefixes: ["", "ei"] },
                        // { label: m.paradigm_passive, tags: ["Pss+Ind+Prt", "Pss+PrfPrc+Sg+Nom"], prefixes: ["", "ei"]}
                    ]
                },
                {
                    title: m.paradigm_pluperfect,
                    headers: [m.paradigm_person, m.paradigm_positive, m.paradigm_negative],
                    rows: [
                        { label: "minä", tags: ["Act+PrfPrc+Sg+Nom", "Act+PrfPrc+Sg+Nom"], prefixes: ["olin", "en olluh"] },
                        { label: "sinä", tags: ["Act+PrfPrc+Sg+Nom", "Act+PrfPrc+Sg+Nom"], prefixes: ["olit", "et olluh"] },
                        { label: "häe", tags: ["Act+PrfPrc+Sg+Nom", "Act+PrfPrc+Sg+Nom"], prefixes: ["oli", "ei olluh"] },
                        { label: "myö", tags: ["Act+PrfPrc+Pl+Nom", "Act+PrfPrc+Pl+Nom"], prefixes: ["olimmo", "emmo olluot"] },
                        { label: "työ", tags: ["Act+PrfPrc+Pl+Nom", "Act+PrfPrc+Pl+Nom"], prefixes: ["olitto", "etto olluot"] },
                        { label: "hyö", tags: ["Act+PrfPrc+Pl+Nom", "Act+PrfPrc+Pl+Nom"], prefixes: ["oldih", "ei olluot"] },
                        // { label: m.paradigm_passive, tags: ["???", "???"], prefixes: ["oli", "ei oldu"]}
                    ]
                },
            ],
        },
        {
            title: m.paradigm_conditional_present,
            validateRows: true,
            tables: [
                {
                    title: m.paradigm_present,
                    headers: [m.paradigm_person, m.paradigm_positive, m.paradigm_negative],
                    rows: [
                        { label: "minä", tags: ["Act+Cond+Prs+Sg1", "Act+Cond+ConNeg"], prefixes: ["", "en"] },
                        { label: "sinä", tags: ["Act+Cond+Prs+Sg2", "Act+Cond+ConNeg"], prefixes: ["", "et"] },
                        { label: "hän", tags: ["Act+Cond+Prs+Sg3", "Act+Cond+ConNeg"], prefixes: ["", "ei"] },
                        { label: "myö", tags: ["Act+Cond+Prs+Pl1", "Act+Cond+ConNeg"], prefixes: ["", "emmo"] },
                        { label: "työ", tags: ["Act+Cond+Prs+Pl2", "Act+Cond+ConNeg"], prefixes: ["", "etto"] },
                        { label: "hyö", tags: ["Act+Cond+Prs+Pl3", "Act+Cond+ConNeg"], prefixes: ["", "ei"] },
                        // { label: m.paradigm_passive, tags: ["Pss+Cond+Prs", ""], prefixes: ["", "ei"]}
                    ]
                },
                {
                    title: m.paradigm_preterite,
                    headers: [m.paradigm_person, m.paradigm_positive, m.paradigm_negative],
                    rows: [
                        { label: "minä", tags: ["Act+Cond+Prt+Sg1", "Act+Cond+ConNeg"], prefixes: ["", "en"] },
                        { label: "sinä", tags: ["Act+Cond+Prt+Sg2", "Act+Cond+ConNeg"], prefixes: ["", "et"] },
                        { label: "hän", tags: ["Act+Cond+Prt+Sg3", "Act+Cond+ConNeg"], prefixes: ["", "ei"] },
                        { label: "myö", tags: ["Act+Cond+Prt+Pl1", "Act+Cond+ConNeg"], prefixes: ["", "emmo"] },
                        { label: "työ", tags: ["Act+Cond+Prt+Pl2", "Act+Cond+ConNeg"], prefixes: ["", "etto"] },
                        { label: "hyö", tags: ["Act+Cond+Prt+Pl3", "Act+Cond+ConNeg"], prefixes: ["", "ei"] },
                        // { label: m.paradigm_passive, tags: ["Pss+Cond+Prt", ""], prefixes: ["", "ei"]}
                    ]
                },
                {
                    title: m.paradigm_perfect,
                    headers: [m.paradigm_person, m.paradigm_positive, m.paradigm_negative],
                    rows: [
                        { label: "minä", tags: ["Act+PrfPrc+Sg+Nom", "Act+PrfPrc+Sg+Nom"], prefixes: ["olizin", "en olizi"] },
                        { label: "sinä", tags: ["Act+PrfPrc+Sg+Nom", "Act+PrfPrc+Sg+Nom"], prefixes: ["olizit", "et olizi"] },
                        { label: "hän", tags: ["Act+PrfPrc+Sg+Nom", "Act+PrfPrc+Sg+Nom"], prefixes: ["olizi", "ei olizi"] },
                        { label: "myö", tags: ["Act+PrfPrc+Pl+Nom", "Act+PrfPrc+Pl+Nom"], prefixes: ["olizimme", "emme oliz"] },
                        { label: "työ", tags: ["Act+PrfPrc+Pl+Nom", "Act+PrfPrc+Pl+Nom"], prefixes: ["olizitte", "että oliz"] },
                        { label: "hyö", tags: ["Act+PrfPrc+Pl+Nom", "Act+PrfPrc+Pl+Nom"], prefixes: ["oltaiz", "ei oliz"] },
                        // { label: m.paradigm_passive, tags: ["Pss+Cond", ""], prefixes: ["", "ei"]}
                    ]
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
                        { label: "minä", tags: ["", ""], prefixes: ["", ""] },
                        { label: "sinä", tags: ["Act+Imprt+Sg2", "Act+Imprt+Sg2"], prefixes: ["", "älä"] },
                        { label: "hän", tags: ["Act+Imprt+Sg3", ""], prefixes: ["", ""] },
                        { label: "myö", tags: ["", ""], prefixes: ["", ""] },
                        { label: "työ", tags: ["Act+Imprt+Pl2", "Act+Imprt+Pl2"], prefixes: ["", "älkkää"] },
                        { label: "hyö", tags: ["", ""], prefixes: ["", ""] },
                    ]
                },
            ],
        },
        {
            title: m.paradigm_nonfinite,
            tables: [
                {
                    title: m.paradigm_firstinfinite,
                    headers: [],
                    rows: [
                        { label: m.paradigm_infinite, tags: ["Inf"] },
                    ]
                },
                {
                    title: m.paradigm_thirdinfinite,
                    headers: [m.paradigm_case, m.paradigm_empty],
                    rows: [
                        { label: m.paradigm_adessive, tags: ["Act+InfMa+Ade"] },
                        { label: m.paradigm_illative, tags: ["Act+InfMa+Ill"] },
                        { label: m.paradigm_inessive, tags: ["Act+InfMa+Ine"] },
                        { label: m.paradigm_elative, tags: ["Act+InfMa+Ela"] },
                        { label: m.paradigm_abessive, tags: ["Act+InfMa+Abe"] },
                    ]
                },
                {
                    title: m.paradigm_perfectparticiple,
                    headers: [m.paradigm_case, m.paradigm_singular, m.paradigm_plural],
                    rows: CASES.map((c) => ({
                        label: c.label,
                        tags: [`Act+PrfPrc+Sg+${c.tag}`, `Act+PrfPrc+Pl+${c.tag}`]
                    }))
                    
                },
                {
                    title: m.paradigm_presentparticiple,
                    headers: [m.paradigm_case, m.paradigm_singular, m.paradigm_plural],
                    rows: [
                        {
                            label: m.paradigm_nominative,
                            tags: ["Act+PrsPrc+Sg+Nom", "Act+PrsPrc+Pl+Nom"]
                        }
                    ]
                },
            ]
        },
    ],
};

export default schema;
