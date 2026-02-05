import { m } from "$lib/paraglide/messages";
import type { LanguageSchema } from "../types";
import { OLO_DEFAULT_CASE_TABLE } from "./helpers";

const schema: LanguageSchema = {
    sections: [
        {
            title: m.paradigm_generalforms,
            tables: [OLO_DEFAULT_CASE_TABLE],
        },
        {
            title: m.paradigm_possessivesuffixes,
            showIf: has_tags("Px"),
            tables: [
                generatePossessiveBlock(m.paradigm_nominative, "Nom"),
                generatePossessiveBlock(m.paradigm_accusative, "Acc"),
                generatePossessiveBlock(m.paradigm_genitive, "Gen"),
                generatePossessiveBlock(m.paradigm_partitive, "Par"),
                generatePossessiveBlock(m.paradigm_inessive, "Ine"),
                generatePossessiveBlock(m.paradigm_illative, "Ill"),
                generatePossessiveBlock(m.paradigm_elative, "Ela"),
                generatePossessiveBlock(m.paradigm_adessive, "Ade"),
                generatePossessiveBlock(m.paradigm_allative, "All"),
                generatePossessiveBlock(m.paradigm_ablative, "Abl"),
                generatePossessiveBlock(m.paradigm_translative, "Tra"),
                generatePossessiveBlock(m.paradigm_comitative, "Com"),
                generatePossessiveBlock(m.paradigm_essive, "Ess"),
                generatePossessiveBlock(m.paradigm_abessive, "Abe"),
            ],
        },	
    ],
};

export default schema;
