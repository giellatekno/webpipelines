export const CASES: Record<string, string> = {
    Nom: "nominative",
    Gen: "genitive",
    Acc: "accusative",
    Ill: "illative",
    Loc: "locative",
    Com: "comitative",
    Ess: "essive",
};

export const PERSONS: Record<string, string> = {
    1: "1. Person",
    2: "2. Person",
    3: "3. Person",
};

export const NUMBERS: Record<string, string> = {
    Sg: "singularis",
    Du: "dualis",
    Pl: "pluralis",
};

export const CASE_NUMBERS: Record<string, string> = {
    Sg: "singular",
    Pl: "plural",
};

export const ADJ_GRADES: Record<string, string> = {
    "Posit": "positive",
    "Der/Comp": "comparative",
    "Der/Superl": "superlative",
};

export const MODES: Record<string, string> = {
    Ind: "indicative",
    Cond: "conditional",
    Imprt: "imperative",
    Pot: "potential",
};

export const TIMES: Record<string, string> = {
    Prs: "present",
    Prt: "preterite",
};

export const NONFINITE_FORMS: Record<string, string> = {
    "Inf": "infinite",
    "PrfPrc": "perfectparticiple",
    "PrsPrc": "presentparticiple",
    "VGen": "verbgenitive",
    "VAbess": "verbabessive",
    "Actio+Nom": "actionominative",
    "Actio+Gen": "actiogenitive",
    "Actio+Loc": "actiolocative",
    "Actio+Com": "actiocomitative",
    "Actio+Ess": "actioessive",
    "Sup": "supine",
    "Ger": "gerund",
};

export const NUMBER_PERSONS: Record<string, Record<string, string>> = {
    Sg: {
        1: "Mun",
        2: "Don",
        3: "Son/dat",
    },
    Du: {
        1: "Moai",
        2: "Doai",
        3: "Soai",
    },
    Pl: {
        1: "Mii",
        2: "Dii",
        3: "Sii/dat",
    },
};
