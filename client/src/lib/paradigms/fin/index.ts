import type { LanguageSchema } from "../types";

/**
 * Switcher for Finnish (fin).
 * Matches the API result to the specific layout file.
 */
export async function getFINSchema(
    pos: string,
    subclass: string,
): Promise<LanguageSchema | null> {
    switch (pos) {
        case "V":
            if (subclass === "Neg") {
                const mod = await import("./verb_neg");
                return mod.default;
            }
            const verbMod = await import("./verb");
            return verbMod.default;

        case "N":
            const nounMod = await import("./noun");
            return nounMod.default;

        case "A":
            if (subclass === "Ord") {
                const mod = await import("./adjective_ord");
                return mod.default;
            }
            const adjMod = await import("./adjective");
            return adjMod.default;

        case "Num":
            const numMod = await import("./numeral");
            return numMod.default;

        case "Pron":
            switch (subclass) {
                case "Dem":
                    const demMod = await import("./pronoun_dem");
                    return demMod.default;
                case "Indef":
                    const indefMod = await import("./pronoun_qu");
                    return indefMod.default;
                case "Interr":
                    const interrMod = await import("./pronoun_interr");
                    return interrMod.default;
                case "Pers":
                    const persMod = await import("./pronoun_pers");
                    return persMod.default;
                case "Qu":
                    const quMod = await import("./pronoun_qu");
                    return quMod.default;
                case "Recipr":
                    const reciprMod = await import("./pronoun_recipr");
                    return reciprMod.default;
                case "Refl":
                    const reflMod = await import("./pronoun_refl");
                    return reflMod.default;
                case "Rel":
                    const relMod = await import("./pronoun_rel");
                    return relMod.default;
                default:
                    return null;
            }

        default:
            return null;
    }
}
