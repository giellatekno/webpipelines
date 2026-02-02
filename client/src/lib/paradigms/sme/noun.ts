import { m } from "$lib/paraglide/messages";
import { has_tags } from "../paradigm_utils";
import type { LanguageSchema } from "../types";
import { generatePossessiveBlock, SME_DEFAULT_CASE_TABLE } from "./helpers";

const schema: LanguageSchema = {
    sections: [
        {
            title: m.paradigm_generalforms,
            tables: [SME_DEFAULT_CASE_TABLE],
        },
        {
            title: m.paradigm_possessivesuffixes,
            showIf: has_tags("Px"),
            tables: [
                generatePossessiveBlock(m.paradigm_nominative, "Nom"),
                generatePossessiveBlock(m.paradigm_accusative, "Acc"),
                generatePossessiveBlock(m.paradigm_genitive, "Gen"),
                generatePossessiveBlock(m.paradigm_illative, "Ill"),
                generatePossessiveBlock(m.paradigm_locative, "Loc"),
                generatePossessiveBlock(m.paradigm_comitative, "Com"),
                generatePossessiveBlock(m.paradigm_essive, "Ess"),
            ],
        },
    ],
};

export default schema;
