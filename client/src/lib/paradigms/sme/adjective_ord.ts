import { m } from "$lib/paraglide/messages";
import type { LanguageSchema } from "../types";
import { SME_DEFAULT_CASE_TABLE } from "./helpers";

const schema: LanguageSchema = {
    sections: [
        {
            title: m.paradigm_ordinal,
            tables: [
                SME_DEFAULT_CASE_TABLE,
                {
                    headers: [],
                    rows: [{ label: m.paradigm_attribute, tags: ["Attr"] }],
                },
            ],
        },
    ],
};
export default schema;
