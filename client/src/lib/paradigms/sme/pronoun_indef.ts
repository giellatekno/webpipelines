import { m } from "$lib/paraglide/messages";
import { has_tags } from "../paradigm_utils";
import type { LanguageSchema } from "../types";
import { SME_DEFAULT_CASE_TABLE } from "./helpers";

// TODO: "buot" har anderledes tagger
const schema: LanguageSchema = {
    sections: [
        {
            title: m.paradigm_indefinite,
            tables: [
                {
                    headers: [],
                    rows: [{ label: m.paradigm_attribute, tags: ["Attr"] }],
                    showIf: has_tags("Attr"),
                },
                {
                    ...SME_DEFAULT_CASE_TABLE,

                    showIf: has_tags("Nom"),
                },
            ],
        },
    ],
};

export default schema;
