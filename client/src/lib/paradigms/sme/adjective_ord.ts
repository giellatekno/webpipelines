import { m } from "$lib/paraglide/messages";
import type { LanguageSchema } from "../types";
import { SME_DEFAULT_CASE_TABLE } from "./helpers";

const schema: LanguageSchema = {
    sections: [
        {
            title: m.paradigm_ordinal,
            tables: [
                {
                    headers: [],
                    rows: [
                        {
                            label: m.paradigm_attribute,
                            tags: ["Attr"],
                        },
                    ],
                },
                SME_DEFAULT_CASE_TABLE,
            ],
        },
    ],
};
export default schema;
