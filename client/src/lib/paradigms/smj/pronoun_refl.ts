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
                    title: m.paradigm_genitive,
                    headers: [m.paradigm_person, m.paradigm_empty],
                    rows: [
                        { label: "muv", tags: ["Gen+PxSg1"] },
                        { label: "duv", tags: ["Gen+PxSg2"] },
                        { label: "suv", tags: ["Gen+PxSg3"], seperator: true },
                        { label: "munnu", tags: ["Gen+PxDu1"] },
                        { label: "dunnu", tags: ["Gen+PxDu2"] },
                        { label: "sunnu", tags: ["Gen+PxDu3"], seperator: true },
                        { label: "mijá", tags: ["Gen+PxPl1"] },
                        { label: "dijá", tags: ["Gen+PxPl2"] },
                        { label: "sijá", tags: ["Gen+PxPl3"] },
                    ],
                },
                {
                    title: m.paradigm_accusative,
                    headers: [m.paradigm_person, m.paradigm_empty],
                    rows: [
                        { label: "muv", tags: ["Acc+PxSg1"] },
                        { label: "duv", tags: ["Acc+PxSg2"] },
                        { label: "suv", tags: ["Acc+PxSg3"], seperator: true },
                        { label: "munnuv", tags: ["Acc+PxDu1"] },
                        { label: "dunnuv", tags: ["Acc+PxDu2"] },
                        { label: "sunnuv", tags: ["Acc+PxDu3"], seperator: true },
                        { label: "mijáv", tags: ["Acc+PxPl1"] },
                        { label: "dijáv", tags: ["Acc+PxPl2"] },
                        { label: "sijáv", tags: ["Acc+PxPl3"] },
                    ],
                },
                {
                    title: m.paradigm_illative,
                    headers: [m.paradigm_person, m.paradigm_empty],
                    rows: [
                        { label: "munji", tags: ["Ill+PxSg1"] },
                        { label: "dunji", tags: ["Ill+PxSg2"] },
                        { label: "sunji", tags: ["Ill+PxSg3"], seperator: true },
                        { label: "munnuj", tags: ["Ill+PxDu1"] },
                        { label: "dunnuj", tags: ["Ill+PxDu2"] },
                        { label: "sunnuj", tags: ["Ill+PxDu3"], seperator: true },
                        { label: "midjij", tags: ["Ill+PxPl1"] },
                        { label: "didjij", tags: ["Ill+PxPl2"] },
                        { label: "sidjij", tags: ["Ill+PxPl3"] },
                    ],
                },
                {
                    title: m.paradigm_inessive,
                    headers: [m.paradigm_person, m.paradigm_empty],
                    rows: [
                        { label: "mujna", tags: ["Ine+PxSg1"] },
                        { label: "dujna", tags: ["Ine+PxSg2"] },
                        { label: "sujna", tags: ["Ine+PxSg3"], seperator: true },
                        { label: "munnun", tags: ["Ine+PxDu1"] },
                        { label: "dunnun", tags: ["Ine+PxDu2"] },
                        { label: "sunnun", tags: ["Ine+PxDu3"], seperator: true },
                        { label: "miján", tags: ["Ine+PxPl1"] },
                        { label: "diján", tags: ["Ine+PxPl2"] },
                        { label: "siján", tags: ["Ine+PxPl3"] },
                    ],
                },
                {
                    title: m.paradigm_elative,
                    headers: [m.paradigm_person, m.paradigm_empty],
                    rows: [
                        { label: "mujsta", tags: ["Ela+PxSg1"] },
                        { label: "dujsta", tags: ["Ela+PxSg2"] },
                        { label: "sujsta", tags: ["Ela+PxSg3"], seperator: true },
                        { label: "munnus", tags: ["Ela+PxDu1"] },
                        { label: "dunnus", tags: ["Ela+PxDu2"] },
                        { label: "sunnus", tags: ["Ela+PxDu3"], seperator: true },
                        { label: "mijás", tags: ["Ela+PxPl1"] },
                        { label: "dijás", tags: ["Ela+PxPl2"] },
                        { label: "sijás", tags: ["Ela+PxPl3"] },
                    ],
                },
                {
                    title: m.paradigm_comitative,
                    headers: [m.paradigm_person, m.paradigm_empty],
                    rows: [
                        { label: "mujne", tags: ["Com+PxSg1"] },
                        { label: "dujne", tags: ["Com+PxSg2"] },
                        { label: "sujne", tags: ["Com+PxSg3"], seperator: true },
                        { label: "munnujn", tags: ["Com+PxDu1"] },
                        { label: "dunnujn", tags: ["Com+PxDu2"] },
                        { label: "sunnujn", tags: ["Com+PxDu3"], seperator: true },
                        { label: "mijájn", tags: ["Com+PxPl1"] },
                        { label: "dijájn", tags: ["Com+PxPl2"] },
                        { label: "sijájn", tags: ["Com+PxPl3"] },
                    ],
                },
                {
                    title: m.paradigm_abessive,
                    headers: [m.paradigm_person, m.paradigm_empty],
                    rows: [
                        { label: "Vaikko geanin", tags: ["Abe"], seperator: true },
                        { label: "muvdá", tags: ["Abe+PxSg1"] },
                        { label: "duvdá", tags: ["Abe+PxSg2"] },
                        { label: "suvdá", tags: ["Abe+PxSg3"], seperator: true },
                        { label: "munnuda", tags: ["Abe+PxDu1"] },
                        { label: "dunnuda", tags: ["Abe+PxDu2"] },
                        { label: "sunnuda", tags: ["Abe+PxDu3"], seperator: true },
                        { label: "mijáda", tags: ["Abe+PxPl1"] },
                        { label: "dijáda", tags: ["Abe+PxPl2"] },
                        { label: "sijáda", tags: ["Abe+PxPl3"] },
                    ],
                },
            ],
        },
    ],
};

export default schema;
