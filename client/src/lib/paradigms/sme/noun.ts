import { m } from "$lib/paraglide/messages";
import { has_tags } from "../paradigm_utils";
import type { LanguageSchema } from "../types";
import { generatePossessiveSection, SME_DEFAULT_CASE_TABLE } from "./helpers";

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
                generatePossessiveSection(m.paradigm_nominative, "Nom"),
                generatePossessiveSection(m.paradigm_accusative, "Acc"),
                generatePossessiveSection(m.paradigm_genitive, "Gen"),
                generatePossessiveSection(m.paradigm_illative, "Ill"),
                generatePossessiveSection(m.paradigm_locative, "Loc"),
                generatePossessiveSection(m.paradigm_comitative, "Com"),
                generatePossessiveSection(m.paradigm_essive, "Ess"),
            ],
        },
    ],
};

export default schema;
