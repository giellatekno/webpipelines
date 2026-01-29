import { m } from "$lib/paraglide/messages";
import type { LanguageSchema } from "../types";
import { SME_DEFAULT_CASE_TABLE } from "./helpers";

const schema: LanguageSchema = {
    sections: [
        {
            title: m.paradigm_demonstrative,
            tables: [SME_DEFAULT_CASE_TABLE],
        },
    ],
};

export default schema;
