import { m } from "$lib/paraglide/messages";
import type { LanguageSchema } from "../types";
import { generatePronounTable } from "./helpers";

const schema: LanguageSchema = {
    sections: [
        {
            title: m.paradigm_personal,
            tables: [
                generatePronounTable("Sg1"),
                generatePronounTable("Sg2"),
                generatePronounTable("Sg3"),
                generatePronounTable("Du1"),
                generatePronounTable("Du2"),
                generatePronounTable("Du3"),
                generatePronounTable("Pl1"),
                generatePronounTable("Pl2"),
                generatePronounTable("Pl3"),
            ],
        },
    ],
};

export default schema;
