import { m } from "$lib/paraglide/messages";

export const CASES = [
    { tag: "Nom", name: m.paradigm_nominative },
    { tag: "Gen", name: m.paradigm_genitive },
    { tag: "Par", name: m.paradigm_partitive },
    { tag: "Ine", name: m.paradigm_inessive },
    { tag: "Ill", name: m.paradigm_illative },
    { tag: "Ela", name: m.paradigm_elative },
    { tag: "Ade", name: m.paradigm_adessive },
    { tag: "All", name: m.paradigm_allative },
    { tag: "Abl", name: m.paradigm_ablative },
    { tag: "Abe", name: m.paradigm_abessive },
    { tag: "Ess", name: m.paradigm_essive },
    { tag: "Tra", name: m.paradigm_translative },
    { tag: "Com", name: m.paradigm_comitative },
] as const;

export const PERSONS = [
    { tag: "1", name: m.paradigm_first_person },
    { tag: "2", name: m.paradigm_second_person },
    { tag: "3", name: m.paradigm_third_person },
];

export const NUMBERS = [
    { tag: "Sg", name: m.paradigm_singular },
    { tag: "Pl", name: m.paradigm_plural },
];

export const ADJ_GRADES = [
    { tag: "Posit", name: m.paradigm_positive },
    { tag: "Compar", name: m.paradigm_comparative },
    { tag: "Superl", name: m.paradigm_superlative },
];

export const MODES = [
    { tag: "Ind", name: m.paradigm_indicative },
    { tag: "Cond", name: m.paradigm_conditional },
    { tag: "Imprt", name: m.paradigm_imperative },
];

export const TIMES = {
    Ind: [
        { tag: "Prs", name: m.paradigm_present },
        { tag: "Prf", name: m.paradigm_perfect },
        { tag: "Prt", name: m.paradigm_preterite },
        { tag: "PluPrf", name: m.paradigm_pluperfect },
    ],
    Cond: [
        { tag: "Prs", name: m.paradigm_present },
        { tag: "Prf", name: m.paradigm_perfect },
    ],
};

export const NONFINITE_FORMS = [
    { tag: "Inf", name: m.paradigm_infinite },
    { tag: "Inf3", name: m.paradigm_thirdinfinite },
    { tag: "PrfPrc", name: m.paradigm_perfectparticiple },
    { tag: "PrsPrc", name: m.paradigm_presentparticiple },
];

export const DIATHESIS = [
    { tag: "Act", name: m.paradigm_active },
    { tag: "Pass", name: m.paradigm_passive },
];

export const PRONOUN_SUBCLASSES = [
    { tag: "Indef", name: m.paradigm_indefinite },
    { tag: "Rel", name: m.paradigm_relative },
    { tag: "Interr", name: m.paradigm_interrogative },
    { tag: "Pers", name: m.paradigm_personal },
    { tag: "Refl", name: m.paradigm_reflexive },
    { tag: "Dem", name: m.paradigm_demonstrative },
    { tag: "Qu", name: m.paradigm_quantifier },
];

export const NUMBER_PERSONS: Record<string, Record<string, string>> = {
    Sg: {
        1: "Mie",
        2: "Sie",
        3: "Hän/Se",
    },
    Pl: {
        1: "Met",
        2: "Tet",
        3: "Het/Net",
    },
};

export const HELP_VERBS: Record<
    string,
    Record<string, Record<string, string>>
> = {
    Neg: {
        Sg: {
            1: "en",
            2: "et",
            3: "ei",
        },
        Pl: {
            1: "emmä",
            2: "että",
            3: "ei",
        },
        Pass: { 3: "ei" },
    },
    IndPrf: {
        Sg: {
            1: "olen",
            2: "olet",
            3: "oon",
        },
        Pl: {
            1: "olema",
            2: "oletta",
            3: "oon",
        },
        Pass: { 3: "oon" },
    },
    IndPrfNeg: {
        Sg: {
            1: "en ole",
            2: "et ole",
            3: "ei ole",
        },
        Pl: {
            1: "emmä ole",
            2: "että ole",
            3: "ei ole",
        },
        Pass: { 3: "ei ole" },
    },
    IndPluPrf: {
        Sg: {
            1: "olin",
            2: "olit",
            3: "oli",
        },
        Pl: {
            1: "olima",
            2: "olitta",
            3: "olthiin/olit",
        },
        Pass: { 3: "oli" },
    },
    IndPluPrfNeg: {
        Sg: {
            1: "en ollu",
            2: "et ollu",
            3: "ei ollu",
        },
        Pl: {
            1: "emmä olheet",
            2: "että olheet",
            3: "ei olheet",
        },
        Pass: { 3: "ei ollu" },
    },
    CondPrf: {
        Sg: {
            1: "olisin",
            2: "olisit",
            3: "olis",
        },
        Pl: {
            1: "olisimma",
            2: "olisitta",
            3: "oltais",
        },
        Pass: { 3: "olis" },
    },
    CondPrfNeg: {
        Sg: {
            1: "en olis",
            2: "et olis",
            3: "ei olis",
        },
        Pl: {
            1: "emmä olis",
            2: "että olis",
            3: "ei olis",
        },
        Pass: { 3: "ei olis" },
    },
    ImprtNeg: {
        Sg: {
            1: "",
            2: "älä",
            3: "",
        },
        Pl: {
            1: "",
            2: "älkkää",
            3: "",
        },
        Pass: { 3: "" },
    },
};
