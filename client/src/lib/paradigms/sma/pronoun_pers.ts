import { m } from "$lib/paraglide/messages";
import type { LanguageSchema } from "../types";
import { generatePronounBlock } from "./helpers";

const schema: LanguageSchema = {
    sections: [
        {
            title: m.paradigm_personal,
            tables: [
                generatePronounBlock("Sg1"),
                generatePronounBlock("Sg2"),
                generatePronounBlock("Sg3"),
                generatePronounBlock("Du1"),
                generatePronounBlock("Du2"),
                generatePronounBlock("Du3"),
                generatePronounBlock("Pl1"),
                generatePronounBlock("Pl2"),
                generatePronounBlock("Pl3"),
            ],
        },
    ],
};

export default schema;
