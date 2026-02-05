import { m } from "$lib/paraglide/messages";
import type { LanguageSchema } from "../types";

const schema: LanguageSchema = {
    title: m.paradigm_reflexive,
    sections: [
        {
            tables: [
                {
                    title: m.paradigm_nominative,
                    headers: [m.paradigm_number, m.paradigm_empty],
                    rows: [
                        { label: m.paradigm_singular, tags: ["Sg+Nom"] },
                        { label: m.paradigm_dual, tags: ["Du+Nom"] },
                        { label: m.paradigm_plural, tags: ["Pl+Nom"] },
                    ],
                },
                {
                    title: m.paradigm_accusative,
                    headers: [m.paradigm_person, m.paradigm_empty],
                    rows: [
                        { label: "mu", tags: ["Acc+PxSg1"] },
                        { label: "du", tags: ["Acc+PxSg2"] },
                        { label: "su/dan", tags: ["Acc+PxSg3"], seperator: true },
                        { label: "munno", tags: ["Acc+PxDu1"] },
                        { label: "dudno", tags: ["Acc+PxDu2"] },
                        { label: "sudno", tags: ["Acc+PxDu3"], seperator: true },
                        { label: "min", tags: ["Acc+PxPl1"] },
                        { label: "din", tags: ["Acc+PxPl2"] },
                        { label: "sin/daid", tags: ["Acc+PxPl3"] },
                    ],
                },
                {
                    title: m.paradigm_genitive,
                    headers: [m.paradigm_person, m.paradigm_empty],
                    rows: [
                        { label: "mu", tags: ["Gen+PxSg1"] },
                        { label: "du", tags: ["Gen+PxSg2"] },
                        { label: "su/dan", tags: ["Gen+PxSg3"], seperator: true },
                        { label: "munno", tags: ["Gen+PxDu1"] },
                        { label: "dudno", tags: ["Gen+PxDu2"] },
                        { label: "sudno", tags: ["Gen+PxDu3"], seperator: true },
                        { label: "min", tags: ["Gen+PxPl1"] },
                        { label: "din", tags: ["Gen+PxPl2"] },
                        { label: "sin/daid", tags: ["Gen+PxPl3"] },
                    ],
                },
                {
                    title: m.paradigm_illative,
                    headers: [m.paradigm_person, m.paradigm_empty],
                    rows: [
                        { label: "munnje", tags: ["Ill+PxSg1"] },
                        { label: "dutnje", tags: ["Ill+PxSg2"] },
                        { label: "sutnje/dasa", tags: ["Ill+PxSg3"], seperator: true },
                        { label: "munnuide", tags: ["Ill+PxDu1"] },
                        { label: "dudnuide", tags: ["Ill+PxDu2"] },
                        { label: "sudnuide", tags: ["Ill+PxDu3"], seperator: true },
                        { label: "midjiide", tags: ["Ill+PxPl1"] },
                        { label: "didjiide", tags: ["Ill+PxPl2"] },
                        { label: "sidjiide/daidda", tags: ["Ill+PxPl3"] },
                    ],
                },
                {
                    title: m.paradigm_locative,
                    headers: [m.paradigm_person, m.paradigm_empty],
                    rows: [
                        { label: "mus", tags: ["Loc+PxSg1"] },
                        { label: "dus", tags: ["Loc+PxSg2"] },
                        { label: "sus/das", tags: ["Loc+PxSg3"], seperator: true },
                        { label: "munnos", tags: ["Loc+PxDu1"] },
                        { label: "dudnos", tags: ["Loc+PxDu2"] },
                        { label: "sudnos", tags: ["Loc+PxDu3"], seperator: true },
                        { label: "mis", tags: ["Loc+PxPl1"] },
                        { label: "dis", tags: ["Loc+PxPl2"] },
                        { label: "sis/dain", tags: ["Loc+PxPl3"] },
                    ],
                },
                {
                    title: m.paradigm_comitative,
                    headers: [m.paradigm_person, m.paradigm_empty],
                    rows: [
                        { label: "muinna", tags: ["Com+PxSg1"] },
                        { label: "duinna", tags: ["Com+PxSg2"] },
                        { label: "suinna/dainna", tags: ["Com+PxSg3"], seperator: true },
                        { label: "munnuin", tags: ["Com+PxDu1"] },
                        { label: "dudnuin", tags: ["Com+PxDu2"] },
                        { label: "sudnuin", tags: ["Com+PxDu3"], seperator: true },
                        { label: "minguin", tags: ["Com+PxPl1"] },
                        { label: "dinguin", tags: ["Com+PxPl2"] },
                        { label: "singuin/daiguin", tags: ["Com+PxPl3"] },
                    ],
                },
                {
                    title: m.paradigm_essive,
                    headers: [m.paradigm_person, m.paradigm_empty],
                    rows: [
                        { label: "Vaikko geanin", tags: ["Ess"], seperator: true },
                        { label: "munin", tags: ["Ess+PxSg1"] },
                        { label: "dunin", tags: ["Ess+PxSg2"] },
                        { label: "sunin/danin", tags: ["Ess+PxSg3"], seperator: true },
                        { label: "munnon", tags: ["Ess+PxDu1"] },
                        { label: "dudnon", tags: ["Ess+PxDu2"] },
                        { label: "sudnon", tags: ["Ess+PxDu3"], seperator: true },
                        { label: "minin", tags: ["Ess+PxPl1"] },
                        { label: "dinin", tags: ["Ess+PxPl2"] },
                        { label: "sinin/danin", tags: ["Ess+PxPl3"] },
                    ],
                },
            ],
        },
    ],
};

export default schema;
