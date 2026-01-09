import { m } from "$lib/paraglide/messages";

interface Element {
    tag: string;
    name: Function;
}

export const CASES: Element[] = [
    { tag: "Nom", name: m.paradigm_nominative },
    { tag: "Gen", name: m.paradigm_genitive },
    { tag: "Acc", name: m.paradigm_accusative },
    { tag: "Ill", name: m.paradigm_illative },
    { tag: "Loc", name: m.paradigm_locative },
    { tag: "Com", name: m.paradigm_comitative },
    { tag: "Ess", name: m.paradigm_essive },
] as const;

export const PERSONS = [
    { tag: "1", name: m.paradigm_first_person },
    { tag: "2", name: m.paradigm_second_person },
    { tag: "3", name: m.paradigm_third_person },
];

export const NUMBERS = [
    { tag: "Sg", name: m.paradigm_singular },
    { tag: "Du", name: m.paradigm_dual },
    { tag: "Pl", name: m.paradigm_plural },
];

export const CASE_NUMBERS = [
    { tag: "Sg", name: m.paradigm_singular },
    { tag: "Pl", name: m.paradigm_plural },
];

export const ADJ_GRADES = [
    { tag: "Posit", name: m.paradigm_positive },
    { tag: "Der/Comp", name: m.paradigm_comparative },
    { tag: "Der/Superl", name: m.paradigm_superlative },
];

export const MODES = [
    { tag: "Ind", name: m.paradigm_indicative },
    { tag: "Cond", name: m.paradigm_conditional },
    { tag: "Imprt", name: m.paradigm_imperative },
    { tag: "Pot", name: m.paradigm_potential },
];

export const TIMES: Record<string, Element[]> = {
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
    Pot: [
        { tag: "Prs", name: m.paradigm_present },
        { tag: "Prt", name: m.paradigm_preterite },
    ],
};

export const NONFINITE_FORMS = [
    { tag: "Inf", name: m.paradigm_infinite },
    { tag: "PrfPrc", name: m.paradigm_perfectparticiple },
    { tag: "PrsPrc", name: m.paradigm_presentparticiple },
    { tag: "VGen", name: m.paradigm_verbgenitive },
    { tag: "VAbess", name: m.paradigm_verbabessive },
    { tag: "Actio+Nom", name: m.paradigm_actionominative },
    { tag: "Actio+Gen", name: m.paradigm_actiogenitive },
    { tag: "Actio+Loc", name: m.paradigm_actiolocative },
    { tag: "Actio+Com", name: m.paradigm_actiocomitative },
    { tag: "Actio+Ess", name: m.paradigm_actioessive },
    { tag: "Sup", name: m.paradigm_supine },
    { tag: "Ger", name: m.paradigm_gerund },
];

export const PRONOUN_SUBCLASSES = [
    { tag: "Indef", name: m.paradigm_indefinite },
    { tag: "Rel", name: m.paradigm_relative },
    { tag: "Interr", name: m.paradigm_interrogative },
    { tag: "Pers", name: m.paradigm_personal },
    { tag: "Refl", name: m.paradigm_reflexive },
    { tag: "Dem", name: m.paradigm_demonstrative },
];

export const NUMBER_PERSONS: Record<
    "Sg" | "Du" | "Pl",
    Record<"1" | "2" | "3", string>
> = {
    Sg: {
        1: "mun/mon",
        2: "don",
        3: "son/dat",
    },
    Du: {
        1: "moai",
        2: "doai",
        3: "soai",
    },
    Pl: {
        1: "mii",
        2: "dii",
        3: "sii/dat",
    },
};

export const HELP_VERBS: Record<
    string,
    Record<string, Record<string, string>>
> = {
    Neg: {
        Sg: {
            1: "in",
            2: "it",
            3: "ii",
        },
        Du: {
            1: "ean",
            2: "eahppi",
            3: "eaba",
        },
        Pl: {
            1: "eat",
            2: "ehpet",
            3: "eai",
        },
    },
    IndPrf: {
        Sg: {
            1: "lean",
            2: "leat",
            3: "lea",
        },
        Du: {
            1: "letne",
            2: "leahppi",
            3: "leaba",
        },
        Pl: {
            1: "leat",
            2: "lehpet",
            3: "leat",
        },
    },
    IndPrfNeg: {
        Sg: {
            1: "in leat",
            2: "it leat",
            3: "ii leat",
        },
        Du: {
            1: "ean leat",
            2: "eahppi leat",
            3: "eaba leat",
        },
        Pl: {
            1: "eat leat",
            2: "ehpet leat",
            3: "eai leat",
        },
    },
    IndPluPrf: {
        Sg: {
            1: "ledjen",
            2: "ledjet",
            3: "lei",
        },
        Du: {
            1: "leimme",
            2: "leidde",
            3: "leigga",
        },
        Pl: {
            1: "leimmet",
            2: "leiddet",
            3: "ledje",
        },
    },
    IndPluPrfNeg: {
        Sg: {
            1: "in lean",
            2: "it lean",
            3: "ii lean",
        },
        Du: {
            1: "ean lean",
            2: "eahppi lean",
            3: "eaba lean",
        },
        Pl: {
            1: "eat lean",
            2: "ehpet lean",
            3: "eai lean",
        },
    },
    CondPrf: {
        Sg: {
            1: "livččen",
            2: "livččet",
            3: "livččii",
        },
        Du: {
            1: "livččiime",
            2: "livččiide",
            3: "livččiiga",
        },
        Pl: {
            1: "livččiimet",
            2: "livččiidet",
            3: "livčče",
        },
    },
    CondPrfNeg: {
        Sg: {
            1: "in livčče",
            2: "it livčče",
            3: "ii livčče",
        },
        Du: {
            1: "ean livčče",
            2: "eahppi livčče",
            3: "eaba livčče",
        },
        Pl: {
            1: "eat livčče",
            2: "ehpet livčče",
            3: "eai livčče",
        },
    },
    ImprtNeg: {
        Sg: {
            1: "allon",
            2: "ale",
            3: "allos",
        },
        Du: {
            1: "allu",
            2: "alli",
            3: "alloska",
        },
        Pl: {
            1: "allot",
            2: "allet",
            3: "alloset",
        },
    },
};
