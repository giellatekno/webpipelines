import { m } from "$lib/paraglide/messages";
import { has_tags } from "../paradigm_utils";
import type { LanguageSchema } from "../types";
import { SMN_DEFAULT_CASE_TABLE, SMN_PERSONS } from "./helpers";

const schema: LanguageSchema = {
    sections: [
        {
            title: m.paradigm_generalforms,
            tables: [SMN_DEFAULT_CASE_TABLE],
        },
        {
            title: m.paradigm_possessivesuffixes,
            showIf: has_tags("Px"),
            tables: [
                {
                    title: m.paradigm_nominative,
                    headers: [m.paradigm_owner, m.paradigm_singular, m.paradigm_plural],
                    rows: SMN_PERSONS.map((p) => ({
                        label: p.pxLabel,
                        tags: [`Sg+Nom+Px${p.tag}`, `Pl+Nom+Px${p.tag}`],
                        seperator: p.tag === "Sg3" || p.tag === "Du3",
                    })),
                },
                {
                    title: m.paradigm_accusative,
                    headers: [m.paradigm_owner, m.paradigm_singular, m.paradigm_plural],
                    rows: SMN_PERSONS.map((p) => ({
                        label: p.pxLabel,
                        tags: [`Sg+Acc+Px${p.tag}`, `Pl+Acc+Px${p.tag}`],
                        seperator: p.tag === "Sg3" || p.tag === "Du3",
                    })),
                },
                {
                    title: m.paradigm_genitive,
                    headers: [m.paradigm_owner, m.paradigm_singular, m.paradigm_plural],
                    rows: SMN_PERSONS.map((p) => ({
                        label: p.pxLabel,
                        tags: [`Sg+Gen+Px${p.tag}`, `Pl+Gen+Px${p.tag}`],
                        seperator: p.tag === "Sg3" || p.tag === "Du3",
                    })),
                },
                {
                    title: m.paradigm_illative,
                    headers: [m.paradigm_owner, m.paradigm_singular, m.paradigm_plural],
                    rows: SMN_PERSONS.map((p) => ({
                        label: p.pxLabel,
                        tags: [`Sg+Ill+Px${p.tag}`, `Pl+Ill+Px${p.tag}`],
                        seperator: p.tag === "Sg3" || p.tag === "Du3",
                    })),
                },
                {
                    title: m.paradigm_locative,
                    headers: [m.paradigm_owner, m.paradigm_singular, m.paradigm_plural],
                    rows: SMN_PERSONS.map((p) => ({
                        label: p.pxLabel,
                        tags: [`Sg+Loc+Px${p.tag}`, `Pl+Loc+Px${p.tag}`],
                        seperator: p.tag === "Sg3" || p.tag === "Du3",
                    })),
                },
                {
                    title: m.paradigm_comitative,
                    headers: [m.paradigm_owner, m.paradigm_singular, m.paradigm_plural],
                    rows: SMN_PERSONS.map((p) => ({
                        label: p.pxLabel,
                        tags: [`Sg+Com+Px${p.tag}`, `Pl+Com+Px${p.tag}`],
                        seperator: p.tag === "Sg3" || p.tag === "Du3",
                    })),
                },
                {
                    title: m.paradigm_abessive,
                    headers: [m.paradigm_owner, m.paradigm_singular, m.paradigm_plural],
                    rows: SMN_PERSONS.map((p) => ({
                        label: p.pxLabel,
                        tags: [`Sg+Abe+Px${p.tag}`, `Pl+Abe+Px${p.tag}`],
                        seperator: p.tag === "Sg3" || p.tag === "Du3",
                    })),
                },
                {
                    title: m.paradigm_essive,
                    headers: [m.paradigm_owner, m.paradigm_empty],
                    rows: SMN_PERSONS.map((p) => ({
                        label: p.pxLabel,
                        tags: [`Ess+Px${p.tag}`],
                        seperator: p.tag === "Sg3" || p.tag === "Du3",
                    })),
                },
                {
                    title: m.paradigm_partitive,
                    headers: [m.paradigm_owner, m.paradigm_empty],
                    rows: SMN_PERSONS.map((p) => ({
                        label: p.pxLabel,
                        tags: [`Par+Px${p.tag}`],
                        seperator: p.tag === "Sg3" || p.tag === "Du3",
                    })),
                },
            ],
        },
    ],
};

export default schema;
