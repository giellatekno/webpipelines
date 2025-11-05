export const CASES: { [key: string]: string } = {
    Nom: "nominative",
    Gen: "genitive",
    Acc: "accusative",
    Ill: "illative",
    Loc: "locative",
    Com: "comitative",
    Ess: "essive",
};

export const PERSONS: { [key: string]: string } = {
    1: "1. Person",
    2: "2. Person",
    3: "3. Person",
};

export const NUMBERS: { [key: string]: string } = {
    Sg: "singularis",
    Du: "dualis",
    Pl: "pluralis",
};

export const CASE_NUMBERS: { [key: string]: string } = {
    Sg: "singularis",
    Pl: "pluralis",
};

export const NUMBER_PERSONS: { [key: string]: { [key: string]: string } } = {
    Sg: {
        1: "Mun",
        2: "Don",
        3: "Son",
    },
    Du: {
        1: "Moai",
        2: "Doai",
        3: "Soai",
    },
    Pl: {
        1: "Mii",
        2: "Dii",
        3: "Sii",
    },
};
