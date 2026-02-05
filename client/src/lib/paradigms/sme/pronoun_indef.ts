import { m } from "$lib/paraglide/messages";
import { has_tags } from "../paradigm_utils";
import type { LanguageSchema } from "../types";
import { SME_DEFAULT_CASE_TABLE } from "./helpers";

const schema: LanguageSchema = {
    sections: [
        {
            title: m.paradigm_indefinite,
            tables: [
                {
                    ...SME_DEFAULT_CASE_TABLE,
                    showIf: has_tags("Nom", "Sg"),
                },
                // TODO: buot/gait/visot har annerledes tagger
                // {
                //     showIf: lacks_tags("Sg"),
                //     headers: [m.paradigm_case, m.paradigm_empty],
                //     rows: [
                //         { label: m.paradigm_nominative, tags: ["Nom"] },
                //         { label: m.paradigm_accusative, tags: ["Acc"] },
                //     ],
                // },
                {
                    headers: [],
                    rows: [{ label: m.paradigm_attribute, tags: ["Attr"] }],
                    showIf: has_tags("Attr"),
                },
            ],
        },
    ],
};

export default schema;
