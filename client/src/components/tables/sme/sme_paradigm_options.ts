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
    Sg: "singular",
    Du: "dual",
    Pl: "plural",
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

export const TIMES: Record<string, Record<string, string>> = {
    Ind: {
        Prs: "present",
        Prf: "perfect",
        Prt: "preterite",
        PluPrf: "pluperfect",
    },
    Cond: {
        Prs: "present",
        Prf: "perfect",
    },
    Pot: {
        Prs: "present",
        Prt: "preterite",
    },
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

export const PRONOUN_SUBCLASSES: Record<string, string> = {
    Indef: "indefinite",
    Rel: "relative",
    Interr: "interrogative",
    Pers: "personal",
    Refl: "reflexive",
    Dem: "demonstrative",
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
