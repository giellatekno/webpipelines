const all_langs = [
    "bxr", "chr", "ciw", "cor", "crk", "deu", "est", "evn", "fao", "fin",
    "fit", "fkv", "gle", "hdn", "hun", "ipk", "izh", "kal", "kca", "koi",
    "kom", "kpv", "lav", "liv", "lut", "mdf", "mhr", "mns", "mrj", "myv",
    "nio", "nno", "nob", "olo", "rmf", "tkl", "rup", "rus", "sjd", "sje",
    "sma", "sme", "smj", "smn", "sms", "som", "swe", "udm", "vep", "vot",
    "vro", "yrk",
];

export const langs = [
    "bxr", "ciw", "cor", "est", "evn",
    "fao", "fin", "fit", "fkv", "gle",
    "hdn", "ipk", "izh", "kal", "kca",
    "koi", "kpv", "liv", "mdf", "mhr",
    "mns", "mrj", "myv", "nio", "nob",
    "olo", "rmf", "tkl", "rus", "sjd",
    "sje", "sma", "sme", "smj", "smn",
    "sms", "som", "udm", "vep", "vot",
    "vro", "yrk",
];


// for the filters when selecting language
export const sami_langs = new Set([
    "sjd", "sje", "sma", "sme", "smj", "smn", "sms",
]);

export const nonsamiuralic_langs = new Set([
    "myv", "est", "fin", "mrj", "izh", "rmf", "kca",
    "kpv", "koi", "fkv", "liv", "olo", "mns", "fit", "mdf",
    "yrk", "nio", "udm", "vep", "vro", "vot", "mhr",
]);

export const other_langs = new Set([
    "bxr", "evn", "fao", "kal", "gle", "ipk", "cor",
    "hdn", "nno", "nob", "ciw", "crk", "rus", "som",
    "tkl",
]);


// for determining which tools to show for a given language

// anders: TODO I couldn't find where these were defined. is this correct?
export const dependency_langs = new Set(all_langs);
export const disambiguate_langs = new Set(all_langs);
export const hyphenation_langs = new Set(all_langs);
export const transcription_langs = new Set(all_langs);


// these were defined in cgi-index.xsl
export const analysis_langs = new Set(all_langs);

export const paradigm_langs = new Set([
    "bxr", "ciw", "cor", "evn", "fao",
    "fin", "fit", "fkv", "gle", "ipk",
    "izh", "kal", "kca", "koi", "kpv",
    "liv", "mdf", "mhr", "mns", "mrj",
    "myv", "nio", "nob", "olo", "rus",
    "sjd", "sje", "sma", "sme", "smj",
    "smn", "sms", "som", "udm", "vep",
    "vot", "vro", "yrk",
]);

export const generation_langs = new Set([
    "bxr", "ciw", "cor", "est", "evn",
    "fao", "fin", "gle", "hdn", "ipk",
    "izh", "kal", "kca", "koi", "kpv",
    "liv", "mdf", "mhr", "mns", "mrj",
    "myv", "nio", "nob", "olo", "rus", "tkl",
    "sjd", "sje", "sma", "sme", "smj",
    "smn", "sms", "som", "udm", "vep",
    "vot", "vro", "yrk",
]);

export const num_langs = new Set([
    "fin", "hdn", "liv", "mdf", "mhr",
    "myv", "olo", "rus", "sjd", "sma", "tkl",
    "sme", "smj", "smn", "sms", "yrk",
]);


export const tools = [
    "analyze",
    "dependency",
    "disambiguate",
    "generate",
    "hyphenate",
    "num",
    "paradigm",
    "spellcheck",
    "transcribe",
    //"ortography",
    //"stedsnavnsordbok",
    //"tallordsgenerator",
];


export const tools_for = {};
for (const lang of langs) {
    tools_for[lang] = [];
    if (analysis_langs.has(lang)) tools_for[lang].push("analyze");
    if (dependency_langs.has(lang)) tools_for[lang].push("dependency");
    if (disambiguate_langs.has(lang)) tools_for[lang].push("disambiguate");
    if (generation_langs.has(lang)) tools_for[lang].push("generate");
    if (hyphenation_langs.has(lang)) tools_for[lang].push("hyphenate");
    if (paradigm_langs.has(lang)) tools_for[lang].push("paradigm");
    //if (spellcheck_langs.has(lang)) tools_for[lang].push("spellcheck");
    if (num_langs.has(lang)) tools_for[lang].push("num");
    if (transcription_langs.has(lang)) tools_for[lang].push("transcribe");
}

