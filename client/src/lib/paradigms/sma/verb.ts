import { m } from "$lib/paraglide/messages";
import type { LanguageSchema } from "../types";

const schema: LanguageSchema = {
    sections: [
        {
            title: m.paradigm_indicative,
            validateRows: true,
            tables: [
                {
                    title: m.paradigm_present,
                    headers: [
                        m.paradigm_person,
                        m.paradigm_positive,
                        m.paradigm_negative,
                    ],
                    rows: [
                        {
                            label: "manne",
                            tags: ["Ind+Prs+Sg1", "ConNeg"],
                            prefixes: ["", "im"],
                        },
                        {
                            label: "datne",
                            tags: ["Ind+Prs+Sg2", "ConNeg"],
                            prefixes: ["", "ih"],
                        },
                        {
                            label: "dïhte",
                            tags: ["Ind+Prs+Sg3", "ConNeg"],
                            prefixes: ["", "ij"],
                        },
                        {
                            label: "månnoeh",
                            tags: ["Ind+Prs+Du1", "ConNeg"],
                            prefixes: ["", "ean"],
                        },
                        {
                            label: "dåtnoeh",
                            tags: ["Ind+Prs+Du2", "ConNeg"],
                            prefixes: ["", "idien"],
                        },
                        {
                            label: "dah guaktah",
                            tags: ["Ind+Prs+Du3", "ConNeg"],
                            prefixes: ["", "eakan"],
                        },
                        {
                            label: "mijjieh",
                            tags: ["Ind+Prs+Pl1", "ConNeg"],
                            prefixes: ["", "ibie"],
                        },
                        {
                            label: "dijjieh",
                            tags: ["Ind+Prs+Pl2", "ConNeg"],
                            prefixes: ["", "idie"],
                        },
                        {
                            label: "dah",
                            tags: ["Ind+Prs+Pl3", "ConNeg"],
                            prefixes: ["", "eah"],
                        },
                    ],
                },
                {
                    title: m.paradigm_perfect,
                    headers: [
                        m.paradigm_person,
                        m.paradigm_positive,
                        m.paradigm_negative,
                    ],
                    rows: [
                        {
                            label: "manne",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["leam", "im leah"],
                        },
                        {
                            label: "datne",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["leah", "ih leah"],
                        },
                        {
                            label: "dïhte",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["lea", "ij leah"],
                        },
                        {
                            label: "månnoeh",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["lean", "ean leah"],
                        },
                        {
                            label: "dåtnoeh",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["lidien", "idien leah"],
                        },
                        {
                            label: "dah guaktah",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["lægan", "eakan leah"],
                        },
                        {
                            label: "mijjieh",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["libie", "ibie leah"],
                        },
                        {
                            label: "dijjieh",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["lidie", "idie leah"],
                        },
                        {
                            label: "dah",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["leah", "eah leah"],
                        },
                    ],
                },
                {
                    title: m.paradigm_preterite,
                    headers: [
                        m.paradigm_person,
                        m.paradigm_positive,
                        m.paradigm_negative,
                    ],
                    rows: [
                        {
                            label: "manne",
                            tags: ["Ind+Prt+Sg1", "ConNeg"],
                            prefixes: ["", "idtjim"],
                        },
                        {
                            label: "datne",
                            tags: ["Ind+Prt+Sg2", "ConNeg"],
                            prefixes: ["", "idtjih"],
                        },
                        {
                            label: "dïhte",
                            tags: ["Ind+Prt+Sg3", "ConNeg"],
                            prefixes: ["", "idtji"],
                        },
                        {
                            label: "månnoeh",
                            tags: ["Ind+Prt+Du1", "ConNeg"],
                            prefixes: ["", "idtjimen"],
                        },
                        {
                            label: "dåtnoeh",
                            tags: ["Ind+Prt+Du2", "ConNeg"],
                            prefixes: ["", "idtjiden"],
                        },
                        {
                            label: "dah guaktah",
                            tags: ["Ind+Prt+Du3", "ConNeg"],
                            prefixes: ["", "idtjigan"],
                        },
                        {
                            label: "mijjieh",
                            tags: ["Ind+Prt+Pl1", "ConNeg"],
                            prefixes: ["", "idtjimh"],
                        },
                        {
                            label: "dijjieh",
                            tags: ["Ind+Prt+Pl2", "ConNeg"],
                            prefixes: ["", "idtjidh"],
                        },
                        {
                            label: "dah",
                            tags: ["Ind+Prt+Pl3", "ConNeg"],
                            prefixes: ["", "idtjin"],
                        },
                    ],
                },
                {
                    title: m.paradigm_pluperfect,
                    headers: [
                        m.paradigm_person,
                        m.paradigm_positive,
                        m.paradigm_negative,
                    ],
                    rows: [
                        {
                            label: "manne",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["lim", "im lim"],
                        },
                        {
                            label: "datne",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["lih", "ih lih"],
                        },
                        {
                            label: "dïhte",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["lij", "ij lij"],
                        },
                        {
                            label: "månnoeh",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["limen", "ean limen"],
                        },
                        {
                            label: "dåtnoeh",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["liden", "idien liden"],
                        },
                        {
                            label: "dah guaktah",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["ligan", "eakan ligan"],
                        },
                        {
                            label: "mijjieh",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["limh", "ibie limh"],
                        },
                        {
                            label: "dijjieh",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["lidh", "idie lidh"],
                        },
                        {
                            label: "dah",
                            tags: ["PrfPrc", "PrfPrc"],
                            prefixes: ["lin", "eah lin"],
                        },
                    ],
                },
            ],
        },
        {
            title: m.paradigm_imperative,
            validateRows: true,
            tables: [
                {
                    headers: [
                        m.paradigm_person,
                        m.paradigm_positive,
                        m.paradigm_imperative_i,
                        m.paradigm_imperative_ii,
                    ],
                    rows: [
                        {
                            label: "manne",
                            tags: ["Imprt+Sg1", "ConNeg", "ConNeg"],
                            prefixes: ["", "aelliem", "ollem"],
                        },
                        {
                            label: "datne",
                            tags: ["Imprt+Sg2", "ConNeg", "ConNeg"],
                            prefixes: ["", "aellieh", "ollh"],
                        },
                        {
                            label: "dïhte",
                            tags: ["Imprt+Sg3", "ConNeg", "ConNeg"],
                            prefixes: ["", "aellies", "olles"],
                        },
                        {
                            label: "månnoeh",
                            tags: ["Imprt+Du1", "ConNeg", "ConNeg"],
                            prefixes: ["", "aellien", "ollen"],
                        },
                        {
                            label: "dåtnoeh",
                            tags: ["Imprt+Du2", "ConNeg", "ConNeg"],
                            prefixes: ["", "aelleden", "olleden"],
                        },
                        {
                            label: "dah guaktah",
                            tags: ["Imprt+Du3", "ConNeg", "ConNeg"],
                            prefixes: ["", "aellies", "olles"],
                        },
                        {
                            label: "mijjieh",
                            tags: ["Imprt+Pl1", "ConNeg", "ConNeg"],
                            prefixes: ["", "aellebe", "ollebe"],
                        },
                        {
                            label: "dijjieh",
                            tags: ["Imprt+Pl2", "ConNeg", "ConNeg"],
                            prefixes: ["", "aellede", "ollede"],
                        },
                        {
                            label: "dah",
                            tags: ["Imprt+Pl3", "ConNeg", "ConNeg"],
                            prefixes: ["", "aellies", "olles"],
                        },
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
                        {
                            label: m.paradigm_perfectparticiple,
                            tags: ["PrfPrc"],
                        },
                        { label: m.paradigm_verbgenitive, tags: ["VGen"] },
                        { label: m.paradigm_gerund, tags: ["Ger"] },
                    ],
                },
            ],
        },
    ],
};

export default schema;
