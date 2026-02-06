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
                        { label: "tu", tags: ["Acc+PxSg2"] },
                        { label: "su", tags: ["Acc+PxSg3"], seperator: true },
                        { label: "munnuu", tags: ["Acc+PxDu1"] },
                        { label: "tunnuu", tags: ["Acc+PxDu2"] },
                        { label: "sunnuu", tags: ["Acc+PxDu3"], seperator: true },
                        { label: "mii", tags: ["Acc+PxPl1"] },
                        { label: "tii", tags: ["Acc+PxPl2"] },
                        { label: "sii", tags: ["Acc+PxPl3"] },
                    ],
                },
                {
                    title: m.paradigm_genitive,
                    headers: [m.paradigm_person, m.paradigm_empty],
                    rows: [
                        { label: "mu", tags: ["Gen+PxSg1"] },
                        { label: "tu", tags: ["Gen+PxSg2"] },
                        { label: "su", tags: ["Gen+PxSg3"], seperator: true },
                        { label: "munnuu", tags: ["Gen+PxDu1"] },
                        { label: "tunnuu", tags: ["Gen+PxDu2"] },
                        { label: "sunnuu", tags: ["Gen+PxDu3"], seperator: true },
                        { label: "mii", tags: ["Gen+PxPl1"] },
                        { label: "tii", tags: ["Gen+PxPl2"] },
                        { label: "sii", tags: ["Gen+PxPl3"] },
                    ],
                },
                {
                    title: m.paradigm_illative,
                    headers: [m.paradigm_person, m.paradigm_empty],
                    rows: [
                        { label: "munjin", tags: ["Ill+PxSg1"] },
                        { label: "tunjin", tags: ["Ill+PxSg2"] },
                        { label: "sunjin", tags: ["Ill+PxSg3"], seperator: true },
                        { label: "munnui", tags: ["Ill+PxDu1"] },
                        { label: "tunnui", tags: ["Ill+PxDu2"] },
                        { label: "sunnui", tags: ["Ill+PxDu3"], seperator: true },
                        { label: "mijjân", tags: ["Ill+PxPl1"] },
                        { label: "tijjân", tags: ["Ill+PxPl2"] },
                        { label: "sijjân", tags: ["Ill+PxPl3"] },
                    ],
                },
                {
                    title: m.paradigm_locative,
                    headers: [m.paradigm_person, m.paradigm_empty],
                    rows: [
                        { label: "must", tags: ["Loc+PxSg1"] },
                        { label: "tust", tags: ["Loc+PxSg2"] },
                        { label: "sust", tags: ["Loc+PxSg3"], seperator: true },
                        { label: "munnust", tags: ["Loc+PxDu1"] },
                        { label: "tunnust", tags: ["Loc+PxDu2"] },
                        { label: "sunnust", tags: ["Loc+PxDu3"], seperator: true },
                        { label: "mist", tags: ["Loc+PxPl1"] },
                        { label: "tist", tags: ["Loc+PxPl2"] },
                        { label: "sist", tags: ["Loc+PxPl3"] },
                    ],
                },
                {
                    title: m.paradigm_comitative,
                    headers: [m.paradigm_person, m.paradigm_empty],
                    rows: [
                        { label: "muin", tags: ["Com+PxSg1"] },
                        { label: "tuin", tags: ["Com+PxSg2"] },
                        { label: "suin", tags: ["Com+PxSg3"], seperator: true },
                        { label: "munnuin", tags: ["Com+PxDu1"] },
                        { label: "tunnuin", tags: ["Com+PxDu2"] },
                        { label: "sunnuin", tags: ["Com+PxDu3"], seperator: true },
                        { label: "miiguin", tags: ["Com+PxPl1"] },
                        { label: "tiiguin", tags: ["Com+PxPl2"] },
                        { label: "siiguin", tags: ["Com+PxPl3"] },
                    ],
                },
                {
                    title: m.paradigm_essive,
                    headers: [m.paradigm_person, m.paradigm_empty],
                    rows: [
                        { label: "Veikkâ geanin", tags: ["Ess"], seperator: true },
                        { label: "munen", tags: ["Ess+PxSg1"] },
                        { label: "tunen", tags: ["Ess+PxSg2"] },
                        { label: "sunen", tags: ["Ess+PxSg3"], seperator: true },
                        { label: "munnun", tags: ["Ess+PxDu1"] },
                        { label: "tunnun", tags: ["Ess+PxDu2"] },
                        { label: "sunnun", tags: ["Ess+PxDu3"], seperator: true },
                        { label: "minen", tags: ["Ess+PxPl1"] },
                        { label: "tinen", tags: ["Ess+PxPl2"] },
                        { label: "sinen", tags: ["Ess+PxPl3"] },
                    ],
                },
            ],
        },
    ],
};

export default schema;
