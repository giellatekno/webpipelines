import { m } from "$lib/paraglide/messages";
import type { LanguageSchema } from "../types";
import { FIT_DEFAULT_CASE_TABLE } from "./helpers";

const schema: LanguageSchema = {
    sections: [
        {
            title: m.paradigm_reflexive,
            tables: [FIT_DEFAULT_CASE_TABLE],
        },
    ],
};

export default schema;
