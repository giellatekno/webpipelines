import { m } from "$lib/paraglide/messages";
import type { LanguageSchema } from "../types";
import { SMJ_DEFAULT_CASE_TABLE } from "./helpers";

const schema: LanguageSchema = {
    sections: [
        {
            title: m.paradigm_relative,
            tables: [SMJ_DEFAULT_CASE_TABLE],
        },
    ],
};

export default schema;
