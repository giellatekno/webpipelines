import { m } from "$lib/paraglide/messages";
import { has_tags } from "../paradigm_utils";
import type { LanguageSchema } from "../types";
import { SMA_DEFAULT_CASE_TABLE } from "./helpers";

const schema: LanguageSchema = {
    sections: [
        {
            title: m.paradigm_indefinite,
            tables: [
                {
                    ...SMA_DEFAULT_CASE_TABLE,

                    showIf: has_tags("Nom"),
                },
                {
                    headers: [],
                    rows: [{ label: m.paradigm_attribute, tags: ["Attr"] }],
                    showIf: has_tags("Attr"),
                },
            ],
        },
    ],
};

export default schema;
