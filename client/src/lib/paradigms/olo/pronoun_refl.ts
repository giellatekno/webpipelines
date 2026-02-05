import { m } from "$lib/paraglide/messages";
import type { LanguageSchema } from "../types";
import { OLO_DEFAULT_CASE_TABLE } from "./helpers";

const schema: LanguageSchema = {
    sections: [
        {
            title: m.paradigm_reflexive,
            tables: [OLO_DEFAULT_CASE_TABLE],
        },
    ],
};

export default schema;
