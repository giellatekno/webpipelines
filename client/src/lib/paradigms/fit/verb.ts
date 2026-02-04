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
                        { label: "mie", tags: ["Act+Ind+Prs+Sg1", "Act+Ind+Prs+ConNeg"], prefixes: ["", "en"] },
                        { label: "sie", tags: ["Act+Ind+Prs+Sg2", "Act+Ind+Prs+ConNeg"], prefixes: ["", "et"] },
                        { label: "hän/se", tags: ["Act+Ind+Prs+Sg3", "Act+Ind+Prs+ConNeg"], prefixes: ["", "ei"] },
                        { label: "met", tags: ["Act+Ind+Prs+Pl1", "Act+Ind+Prs+ConNeg"], prefixes: ["", "emmä"] },
                        { label: "tet", tags: ["Act+Ind+Prs+Pl2", "Act+Ind+Prs+ConNeg"], prefixes: ["", "että"] },
                        { label: "het/net", tags: ["Act+Ind+Prs+Pl3", "Act+Ind+Prs+ConNeg"], prefixes: ["", "ei"] },

                        // { label: m.paradigm_passive, tags: ["Pass+Ind+Prs", "???"], prefixes: ["", "ei"]} // Missing form?
                    ]
                },
                {
                    title: m.paradigm_perfect,
                    headers: [m.paradigm_person, m.paradigm_positive, m.paradigm_negative],
                    rows: [
                        { label: "mie", tags: ["Act+PrfPrc+Sg+Nom", "Act+PrfPrc+Sg+Nom"], prefixes: ["olen", "en ole"] },
                        { label: "sie", tags: ["Act+PrfPrc+Sg+Nom", "Act+PrfPrc+Sg+Nom"], prefixes: ["olet", "et ole"] },
                        { label: "hän/se", tags: ["Act+PrfPrc+Sg+Nom", "Act+PrfPrc+Sg+Nom"], prefixes: ["oon", "ei ole"] },
                        { label: "met", tags: ["Act+PrfPrc+Pl+Nom", "Act+PrfPrc+Pl+Nom"], prefixes: ["olema", "emmä ole"] },
                        { label: "tet", tags: ["Act+PrfPrc+Pl+Nom", "Act+PrfPrc+Pl+Nom"], prefixes: ["oletta", "että ole"] },
                        { label: "het/net", tags: ["Act+PrfPrc+Pl+Nom", "Act+PrfPrc+Pl+Nom"], prefixes: ["oon", "ei ole"] },
                        // { label: m.paradigm_passive, tags: ["???", "??"], prefixes: ["oon", "ei ole"]}
                    ]
                },
                {
                    title: m.paradigm_preterite,
                    headers: [m.paradigm_person, m.paradigm_positive, m.paradigm_negative],
                    rows: [
                        { label: "mie", tags: ["Act+Ind+Prt+Sg1", "Act+Ind+Prt+ConNeg+Sg"], prefixes: ["", "en"] },
                        { label: "sie", tags: ["Act+Ind+Prt+Sg2", "Act+Ind+Prt+ConNeg+Sg"], prefixes: ["", "et"] },
                        { label: "hän/se", tags: ["Act+Ind+Prt+Sg3", "Act+Ind+Prt+ConNeg+Sg"], prefixes: ["", "ei"] },
                        { label: "met", tags: ["Act+Ind+Prt+Pl1", "Act+PrfPrc+Pl+Nom"], prefixes: ["", "emmä"] },
                        { label: "tet", tags: ["Act+Ind+Prt+Pl2", "Act+PrfPrc+Pl+Nom"], prefixes: ["", "että"] },
                        { label: "het/net", tags: ["Act+Ind+Prt+Pl3", "Act+PrfPrc+Pl+Nom"], prefixes: ["", "ei"] },
                        // { label: m.paradigm_passive, tags: ["Pass+Ind+Prt", "Pass+PrfPrc+Sg+Nom"], prefixes: ["", "ei"]}
                    ]
                },
                {
                    title: m.paradigm_pluperfect,
                    headers: [m.paradigm_person, m.paradigm_positive, m.paradigm_negative],
                    rows: [
                        { label: "mie", tags: ["Act+PrfPrc+Sg+Nom", "Act+PrfPrc+Sg+Nom"], prefixes: ["olin", "en ollu"] },
                        { label: "sie", tags: ["Act+PrfPrc+Sg+Nom", "Act+PrfPrc+Sg+Nom"], prefixes: ["olit", "et ollu"] },
                        { label: "hän/se", tags: ["Act+PrfPrc+Sg+Nom", "Act+PrfPrc+Sg+Nom"], prefixes: ["oli", "ei ollu"] },
                        { label: "met", tags: ["Act+PrfPrc+Pl+Nom", "Act+PrfPrc+Pl+Nom"], prefixes: ["olima", "emmä olheet"] },
                        { label: "tet", tags: ["Act+PrfPrc+Pl+Nom", "Act+PrfPrc+Pl+Nom"], prefixes: ["olitta", "että olheet"] },
                        { label: "het/net", tags: ["Act+PrfPrc+Pl+Nom", "Act+PrfPrc+Pl+Nom"], prefixes: ["olit/olthiin", "ei olheet"] },
                        // { label: m.paradigm_passive, tags: ["???", "???"], prefixes: ["oli", "ei ollu"]}
                    ]
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
                        { label: "mie", tags: ["Act+Cond+Sg1", "Act+Cond+ConNeg"], prefixes: ["", "en"] },
                        { label: "sie", tags: ["Act+Cond+Sg2", "Act+Cond+ConNeg"], prefixes: ["", "et"] },
                        { label: "hän/se", tags: ["Act+Cond+Sg3", "Act+Cond+ConNeg"], prefixes: ["", "ei"] },
                        { label: "met", tags: ["Act+Cond+Pl1", "Act+Cond+ConNeg"], prefixes: ["", "emmä"] },
                        { label: "tet", tags: ["Act+Cond+Pl2", "Act+Cond+ConNeg"], prefixes: ["", "että"] },
                        { label: "het/net", tags: ["Act+Cond+Pl3", "Act+Cond+ConNeg"], prefixes: ["", "ei"] },
                        // { label: m.paradigm_passive, tags: ["Pass+Cond", ""], prefixes: ["", "ei"]}
                    ]
                },
                {
                    title: m.paradigm_perfect,
                    headers: [m.paradigm_person, m.paradigm_positive, m.paradigm_negative],
                    rows: [
                        { label: "mie", tags: ["Act+PrfPrc+Sg+Nom", "Act+PrfPrc+Sg+Nom"], prefixes: ["olisin", "en olis"] },
                        { label: "sie", tags: ["Act+PrfPrc+Sg+Nom", "Act+PrfPrc+Sg+Nom"], prefixes: ["olisit", "et olis"] },
                        { label: "hän/se", tags: ["Act+PrfPrc+Sg+Nom", "Act+PrfPrc+Sg+Nom"], prefixes: ["olis", "ei olis"] },
                        { label: "met", tags: ["Act+PrfPrc+Pl+Nom", "Act+PrfPrc+Pl+Nom"], prefixes: ["olisimma", "emmä olis"] },
                        { label: "tet", tags: ["Act+PrfPrc+Pl+Nom", "Act+PrfPrc+Pl+Nom"], prefixes: ["olisitta", "että olis"] },
                        { label: "het/net", tags: ["Act+PrfPrc+Pl+Nom", "Act+PrfPrc+Pl+Nom"], prefixes: ["oltais", "ei olis"] },
                        // { label: m.paradigm_passive, tags: ["Pass+Cond", ""], prefixes: ["", "ei"]}
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
                        { label: "mie", tags: ["", ""], prefixes: ["", ""] },
                        { label: "sie", tags: ["Act+Imprt+Sg2", "Act+Imprt+Sg2"], prefixes: ["", "älä"] },
                        { label: "hän/se", tags: ["Act+Imprt+Sg3", ""], prefixes: ["", ""] },
                        { label: "met", tags: ["", ""], prefixes: ["", ""] },
                        { label: "tet", tags: ["Act+Imprt+Pl2", "Act+Imprt+Pl2"], prefixes: ["", "älkkää"] },
                        { label: "het/net", tags: ["", ""], prefixes: ["", ""] },
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
                        { label: m.paradigm_adessive, tags: ["InfMa+Ade"] },
                        { label: m.paradigm_illative, tags: ["InfMa+Ill"] },
                        { label: m.paradigm_inessive, tags: ["InfMa+Ine"] },
                        { label: m.paradigm_elative, tags: ["InfMa+Ela"] },
                        { label: m.paradigm_abessive, tags: ["InfMa+Abe"] },
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
