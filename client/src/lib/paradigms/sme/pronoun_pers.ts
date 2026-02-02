import { m } from "$lib/paraglide/messages";
import type { LanguageSchema } from "../types";
import { generatePronounTable } from "./helpers";

const schema: LanguageSchema = {
    sections: [
        {
            title: m.paradigm_personal,
            tables: [
                generatePronounTable("1"),
                generatePronounTable("2"),
                generatePronounTable("3"),
            ],
        },
    ],
};

export default schema;
