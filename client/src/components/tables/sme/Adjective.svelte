<script lang="ts">
    import type { ParsedParadigm } from "$lib/parsers";
    import { get_word } from "$lib/utils";
    import { t } from "svelte-intl-precompile";
    import { ADJ_GRADES, CASES } from "../sme_paradigm_options";

    let { elem }: { elem: ParsedParadigm } = $props();

    function is_ordinal(elem: ParsedParadigm) {
        return !!elem.wordforms.keys().find((t) => t.startsWith("Ord"));
    }

    function has_grade(grade_tag: string, elem: ParsedParadigm) {
        switch (grade_tag) {
            case "Posit":
                return elem.wordforms
                    .keys()
                    .find(
                        (w) =>
                            !(
                                w.startsWith("Der/Comp") ||
                                w.startsWith("Der/Superl")
                            ),
                    );
            case "Der/Comp":
                return elem.wordforms
                    .keys()
                    .find((w) => w.startsWith("Der/Comp"));
            case "Der/Superl":
                return elem.wordforms
                    .keys()
                    .find((w) => w.startsWith("Der/Superl"));
        }
    }

    function has_row(
        grade_tag: string,
        case_tag: string,
        elem: ParsedParadigm,
    ) {
        switch (grade_tag) {
            case "Posit":
                return elem.wordforms
                    .keys()
                    .filter(
                        (t) =>
                            !(
                                t.startsWith("Der/Comp") ||
                                t.startsWith("Der/Superl")
                            ),
                    )
                    .find((t) => t.endsWith(case_tag));
            case "Der/Comp":
                return elem.wordforms
                    .keys()
                    .filter((t) => t.startsWith("Der/Comp"))
                    .find((t) => t.endsWith(case_tag));
            case "Der/Superl":
                return elem.wordforms
                    .keys()
                    .filter((t) => t.startsWith("Der/Superl"))
                    .find((t) => t.endsWith(case_tag));
        }
    }
</script>

{#if is_ordinal(elem)}
    {@const prefix = "Ord+"}
    <div class="flex flex-col gap-2">
        <h4 class="h4">{$t("paradigm.ordinal")}</h4>
        <table class="table h-fit w-fit border text-lg shadow-lg">
            <tbody>
                <tr class="[&>td]:border [&>td]:pr-4">
                    <td class="bg-primary-50-950 font-bold">
                        {$t("paradigm.attribute")}
                    </td>
                    <td>{get_word(prefix + "Attr", elem)}</td>
                </tr>
            </tbody>
        </table>
        <table class="table h-fit w-fit border text-lg shadow-lg">
            <thead>
                <tr
                    class="bg-primary-50-950 text-surface-950-50 font-bold [&>td]:border"
                >
                    <td>{$t("paradigm.case")}</td>
                    <td>{$t("paradigm.singular")}</td>
                    <td>{$t("paradigm.plural")}</td>
                </tr>
            </thead>
            <tbody>
                {#each Object.entries(CASES) as [tag, name]}
                    {@const row_exists = elem.wordforms
                        .keys()
                        .find((e) => e.endsWith(tag))}
                    {#if row_exists}
                        {#if !(tag === "Ess")}
                            <tr class="[&>td]:border [&>td]:pr-4">
                                <td class="bg-surface-100-900">
                                    {$t(`paradigm.${name}`)}
                                </td>
                                <td>
                                    {get_word(prefix + `Sg+${tag}`, elem)}
                                </td>
                                <td>
                                    {get_word(prefix + `Pl+${tag}`, elem)}
                                </td>
                            </tr>
                        {:else}
                            <tr class="[&>td]:border">
                                <td class="bg-surface-100-900">
                                    {$t(`paradigm.${name}`)}
                                </td>
                                <td colspan="2" class="text-center">
                                    {get_word(prefix + tag, elem)}
                                </td>
                            </tr>
                        {/if}
                    {/if}
                {/each}
            </tbody>
        </table>
    </div>
{:else}
    {#each Object.entries(ADJ_GRADES) as [grade_tag, grade_name]}
        {@const prefix = grade_tag === "Posit" ? "" : grade_tag + "+A+"}
        {@const grade_exists = has_grade(grade_tag, elem)}
        {#if grade_exists}
            <div class="flex flex-col gap-2">
                <h4 class="h4">{$t(`paradigm.${grade_name}`)}</h4>
                <table class="table h-fit w-fit border text-lg shadow-lg">
                    <tbody>
                        <tr class="[&>td]:border [&>td]:pr-4">
                            <td class="bg-primary-50-950 font-bold">
                                {$t("paradigm.attribute")}
                            </td>
                            <td>{get_word(prefix + "Attr", elem)}</td>
                        </tr>
                    </tbody>
                </table>
                <table class="table h-fit w-fit border text-lg">
                    <thead>
                        <tr
                            class="bg-primary-50-950 text-surface-950-50 font-bold [&>td]:border"
                        >
                            <td>{$t("paradigm.case")}</td>
                            <td>{$t("paradigm.singular")}</td>
                            <td>{$t("paradigm.plural")}</td>
                        </tr>
                    </thead>
                    <tbody>
                        {#each Object.entries(CASES) as [tag, name]}
                            {@const row_exists = has_row(grade_tag, tag, elem)}
                            {#if row_exists}
                                {#if !(tag === "Ess")}
                                    <tr class="[&>td]:border [&>td]:pr-4">
                                        <td class="bg-surface-100-900">
                                            {$t(`paradigm.${name}`)}
                                        </td>
                                        <td>
                                            {get_word(
                                                prefix + `Sg+${tag}`,
                                                elem,
                                            )}
                                        </td>
                                        <td>
                                            {get_word(
                                                prefix + `Pl+${tag}`,
                                                elem,
                                            )}
                                        </td>
                                    </tr>
                                {:else}
                                    <tr class="[&>td]:border">
                                        <td class="bg-surface-100-900">
                                            {$t(`paradigm.${name}`)}
                                        </td>
                                        <td colspan="2" class="text-center">
                                            {get_word(prefix + tag, elem)}
                                        </td>
                                    </tr>
                                {/if}
                            {/if}
                        {/each}
                    </tbody>
                </table>
            </div>
        {/if}
    {/each}
{/if}
