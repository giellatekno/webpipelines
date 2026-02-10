import { m } from "$lib/paraglide/messages";
import { has_tags } from "../paradigm_utils";
import type { LanguageSchema } from "../types";
import { SME_DEFAULT_CASE_TABLE, SME_PERSONS } from "./helpers";

const schema: LanguageSchema = {
    sections: [
        {
            title: m.paradigm_generalforms,
            tables: [SME_DEFAULT_CASE_TABLE],
        },
        {
            title: m.paradigm_possessivesuffixes,
            showIf: has_tags("Px"),
            tables: [
                {
                    title: m.paradigm_nominative,
                    headers: [m.paradigm_owner, m.paradigm_singular, m.paradigm_plural],
                    rows: SME_PERSONS.map((p) => ({
                        label: p.pxLabel,
                        tags: [`Sg+Nom+Px${p.tag}`, `Pl+Nom+Px${p.tag}`],
                        separator: p.tag === "Sg3" || p.tag === "Du3",
                    })),
                },
                {
                    title: m.paradigm_accusative,
                    headers: [m.paradigm_owner, m.paradigm_singular, m.paradigm_plural],
                    rows: SME_PERSONS.map((p) => ({
                        label: p.pxLabel,
                        tags: [`Sg+Acc+Px${p.tag}`, `Pl+Acc+Px${p.tag}`],
                        separator: p.tag === "Sg3" || p.tag === "Du3",
                    })),
                },
                {
                    title: m.paradigm_genitive,
                    headers: [m.paradigm_owner, m.paradigm_singular, m.paradigm_plural],
                    rows: SME_PERSONS.map((p) => ({
                        label: p.pxLabel,
                        tags: [`Sg+Gen+Px${p.tag}`, `Pl+Gen+Px${p.tag}`],
                        separator: p.tag === "Sg3" || p.tag === "Du3",
                    })),
                },
                {
                    title: m.paradigm_illative,
                    headers: [m.paradigm_owner, m.paradigm_singular, m.paradigm_plural],
                    rows: SME_PERSONS.map((p) => ({
                        label: p.pxLabel,
                        tags: [`Sg+Ill+Px${p.tag}`, `Pl+Ill+Px${p.tag}`],
                        separator: p.tag === "Sg3" || p.tag === "Du3",
                    })),
                },
                {
                    title: m.paradigm_locative,
                    headers: [m.paradigm_owner, m.paradigm_singular, m.paradigm_plural],
                    rows: SME_PERSONS.map((p) => ({
                        label: p.pxLabel,
                        tags: [`Sg+Loc+Px${p.tag}`, `Pl+Loc+Px${p.tag}`],
                        separator: p.tag === "Sg3" || p.tag === "Du3",
                    })),
                },
                {
                    title: m.paradigm_comitative,
                    headers: [m.paradigm_owner, m.paradigm_singular, m.paradigm_plural],
                    rows: SME_PERSONS.map((p) => ({
                        label: p.pxLabel,
                        tags: [`Sg+Com+Px${p.tag}`, `Pl+Com+Px${p.tag}`],
                        separator: p.tag === "Sg3" || p.tag === "Du3",
                    })),
                },
                {
                    title: m.paradigm_essive,
                    headers: [m.paradigm_owner, m.paradigm_empty],
                    rows: SME_PERSONS.map((p) => ({
                        label: p.pxLabel,
                        tags: [`Ess+Px${p.tag}`],
                        separator: p.tag === "Sg3" || p.tag === "Du3",
                    })),
                },
            ],
        },
    ],
};

export default schema;
