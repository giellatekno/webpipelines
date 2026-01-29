import { m } from "$lib/paraglide/messages";
import type { LanguageSchema } from "../types";
import { SMA_DEFAULT_CASE_TABLE } from "./helpers";

const schema: LanguageSchema = {
    sections: [
        {
            title: m.partofspeech_numeral,
            tables: [
                {
                    title: m.paradigm_attribute,
                    headers: [
                        m.paradigm_case,
                        m.paradigm_singular,
                        m.paradigm_plural,
                    ],
                    rows: [
                        {
                            label: m.paradigm_illative,
                            tags: ["Sg+Ill+Attr", ""],
                        },
                        {
                            label: m.paradigm_inessive,
                            tags: ["Sg+Ine+Attr", ""],
                        },
                        {
                            label: m.paradigm_elative,
                            tags: ["Sg+Ela+Attr", ""],
                        },
                        {
                            label: m.paradigm_comitative,
                            tags: ["", "Pl+Com+Attr"],
                        },
                    ],
                },
                SMA_DEFAULT_CASE_TABLE,
            ],
        },
    ],
};

export default schema;
