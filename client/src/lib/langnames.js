// The Intl API is not very consistent between browsers, browser versions,
// browser editions (mobile vs non-mobile browser).. and maybe OS, and all of
// this - hence.....

const LANGNAMES = {
    bxr: { eng: "Buryat", nob: "Burjatisk", sme: "Burjátagiela", fin: "Burjaatin kieli", rus: "Бурятский язык", },
    ciw: { eng: "Chippewa", nob: "Ojibwe", sme: "Ojibwegiela", rus: "Чиппева", },
    chp: { eng: "Denesuline", nob: "Dene suline", sme: "Denesuline", },
    chr: { eng: "Cherokee", nob: "Cherokesisk", sme: "Cherokee" },
    cor: { eng: "Cornish", nob: "Kornisk", sme: "Kornagiella", fin: "Korni", rus: "Корнский язык" },
    deu: { eng: "German", nob: "Tysk", sme: "Duiskkagiella", },
    eng: { eng: "English", nob: "Engelsk", sme: "Eaŋgalsgiella", },
    evn: { eng: "Evenki", nob: "Evenkisk", sme: "Evenkaagiela", fin: "Evenkin kieli", rus: "Эвенкийский язык" },
    est: { eng: "Estonian", nob: "Estisk", sme: "Esttegiella", },
    fao: { eng: "Faroese", nob: "Færøysk", sme: "Fearagiella", fin: "Fäärin kieli", rus: "Фарерский язык", },
    fin: { eng: "Finnish", nob: "Finsk", sme: "Suomagiella", },
    fit: { eng: "Meänkieli", nob: "Meänkieli", sme: "Meängiella", },
    gle: { eng: "Irish", nob: "Irsk", sme: "Iirragiella", fin: "Iiri", rus: "Ирландский язык", },
    fkv: { eng: "Kven", nob: "Kvensk", sme: "Kveanagiella", },
    hdn: { eng: "Northern Haida", nob: "Nordhaida", sme: "Davvihaidagiella", },
    hun: { eng: "Hungarian", nob: "Ungarsk", sme: "Ungáragiella", },
    izh: { eng: "Ingrian", nob: "Ingrisk", sme: "Inkeroisgiella", },
    koi: { eng: "Komi Permyak", nob: "Komipermjakisk", sme: "Komipermjakgiella", },
    kom: { eng: "Komi", nob: "Komi", sme: "Komigiella", },
    kpv: { eng: "Komi", nob: "Syrjensk", sme: "Komigiella", },
    ipk: { eng: "Iñupiaq", nob: "Inupiak", sme: "Inupiaka", fin: "Inupiatun", rus: "Инупиак", },
    kal: { eng: "Greenlandic", nob: "Grønlandsk", sme: "Ruonáeatnanlaš", fin: "Grönlannin kieli", rus: "Гренландский язык", },
    kca: { eng: "Khanty", nob: "Khanti", sme: "Hantigiella", fin: "Hantin kieli", rus: "Хантыйский язык", },
    lav: { eng: "Latvian", nob: "Latvisk", sme: "Latviagiella", },
    liv: { eng: "Livonian", nob: "Livisk", sme: "Liivigiella", fin: "Liivin kieli", rus: "Ливский язык", },
    mdf: { eng: "Moksha", nob: "Moksja", sme: "Mokšagiella", },
    mhr: { eng: "Eastern Mari", nob: "Østmarisk", sme: "Niitomarigiella", },
    mns: { eng: "Mansi", nob: "Mansisk", sme: "Mansigiella", },
    mrj: { eng: "Hill Mari", nob: "Vestmarisk", sme: "Várremarigiella", },
    myv: { eng: "Erzya", nob: "Erzja", sme: "Ersagiella", },
    nio: { eng: "Nganasan", nob: "Nganasansk", sme: "Nganasanagiella", fin: "Nganasanin kieli", rus: "Нганасанский" },
    nob: { eng: "Norwegian bokmål", nob: "Norsk bokmål", sme: "Dárogiella", },
    olo: { eng: "Livvi-Karelian", nob: "Livvisk", sme: "Livvi", rus: "ливвиковский язык", },
    otw: { eng: "Odawa", nob: "Odawa", sme: "Odawa", },
    ron: { eng: "Romanian", nob: "Rumensk", sme: "Romaniagiella", },
    rmf: { eng: "Finnish Kalo", nob: "Kalo finsk romani", sme: "Suoma romanigiela", fin: "Suomen romanikieli", rus: "Финский кало", },
    rus: { eng: "Russian", nob: "Russisk", sme: "Ruoššagiella", },
    sjd: { eng: "Kildin Sámi", nob: "Kildinsamisk", sme: "Gielddasámegiella", fin: "Kiltinänsaame", },
    sje: { eng: "Pite Sámi", nob: "Pitesamisk", sme: "Bihtánsámegiella", },
    sjt: { eng: "Ter Saḿi", nob: "Tersamisk", sme: "Darjjesámegiella", fin: "Turjansaame", },
    sma: { eng: "South Sami", nob: "Sørsamisk", sme: "Lullisámegiella", fin: "Eteläsaame", },
    sme: { eng: "North Sami", nob: "Nordsamisk", sme: "Davvisámegiella", },
    smj: { eng: "Lule Sami", nob: "Lulesamisk", sme: "Julevsámegiella", },
    smn: { eng: "Inari sami", nob: "Enaresamisk", sme: "Anárašgiella", },
    sms: { eng: "Skolt Sámi", nob: "Skoltesamisk", sme: "Nuortalašgiella", },
    som: { eng: "Somali", nob: "Somalisk", sme: "Somaligiella", },
    srs: { eng: "Tsuutʼina", nob: "Tsuutʼina", sme: "Tsuutʼina", },
    swe: { eng: "Swedish", nob: "Svensk", sme: "Ruoŧagiella", },
    udm: { eng: "Udmurt", nob: "Udmurtisk", sme: "Udmurtagiella", },
    vep: { eng: "Veps", nob: "Vepsisk", sme: "Vepsägiella", fin: "Vepsän kieli", rus: "Вепсский язык", },
    vot: { eng: "Votic", nob: "Votisk", sme: "Vatjagiella", },
    vro: { eng: "Võro", nob: "Võro", sme: "Võrogiella", },
    yrk: { eng: "Nenets", nob: "Nenetsisk", sme: "Nenetsagiella", },
};

export function langname(of, in_) {
    if (typeof of !== "string") {
        const msg = `langname(): argument 'of': must be a string, not ${type(of)}`;
        throw new TypeError(msg);
    }
    if (typeof in_ !== "string") {
        const msg = `langname(): argument 'in_': must be a string, not ${type(in_)}`;
        throw new TypeError(msg);
    }

    let result = get_our(of, in_);
    if (!result) {
        // fall back to whatever Intl gives us.
        result = (new Intl.DisplayNames([in_], { type: "language" })).of(of);
        if (result === of) {
            console.warn(`Browser doesn't know how to say ${of} in ${in_}`);
        }
    }

    // replace normal spaces with non-breaking space to
    // prevent newlines in the middle of a language name
    return result.replaceAll(" ", "\xA0");
}

function get_our(of, in_) {
    const lang = LANGNAMES[of];
    if (lang === undefined) {
        console.warn(`We don't have any information on how to say '${of}' in any language.`);
        return;
    }

    const our = lang[in_];
    if (our === undefined) {
        console.warn(`We don't know how to say '${of}' in ${in_}`);
        return;
    }

    return our;
}

// nicer typeof (null is actually "null", not "object")
export function type(obj) {
    if (obj === null) return "null";
    if (obj === undefined) return "undefined";
    return obj.constructor.name;
}
