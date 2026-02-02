import { m } from "$lib/paraglide/messages";
import type { LanguageSchema } from "../types";
import { generatePronounBlock } from "./helpers";

const schema: LanguageSchema = {
    sections: [
        {
            title: m.paradigm_personal,
            tables: [
                generatePronounBlock("1"),
                generatePronounBlock("2"),
                generatePronounBlock("3"),
            ],
        },
    ],
};

export default schema;
