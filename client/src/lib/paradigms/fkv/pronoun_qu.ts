import { m } from "$lib/paraglide/messages";
import type { LanguageSchema } from "../types";
import { FKV_DEFAULT_CASE_TABLE } from "./helpers";

const schema: LanguageSchema = {
    sections: [
        {
            title: m.paradigm_quantifier,
            tables: [FKV_DEFAULT_CASE_TABLE],
        },
    ],
};

export default schema;
