<script lang="ts">
    import type { ParsedParadigm } from "$lib/parsers";
    import { t } from "svelte-intl-precompile";
    import {
        MODES,
        NONFINITE_FORMS,
        NUMBER_PERSONS,
        NUMBERS,
        PERSONS,
        TIMES,
    } from "../sme_paradigm_options";
    import { get_word } from "$lib/utils";

    let { elem }: { elem: ParsedParadigm } = $props();

    function has_preterite(mode_tag: string, elem: ParsedParadigm) {
        switch (mode_tag) {
            case "Ind":
                return true;
            case "Cond":
                return false;
            case "Imprt":
                return false;
            case "Pot":
                return elem.wordforms
                    .keys()
                    .find((t) => t.startsWith("Pot+Prt"))
                    ? true
                    : false;
        }
    }
</script>

{#each Object.entries(MODES) as [mode_tag, mode_name]}
    {#if elem.wordforms.keys().find((t) => t.startsWith(mode_tag))}
        <div class="flex flex-col gap-2">
            <h4 class="h4">{$t(`paradigm.${mode_name}`)}</h4>
            <table class="table h-fit w-fit border text-lg shadow-lg">
                <thead>
                    <tr
                        class="bg-primary-50-950 text-surface-950-50 font-bold [&>td]:border"
                    >
                        <td>
                            {$t("paradigm.person")}
                        </td>
                        <td>
                            {#if mode_tag !== "Imprt"}
                                {$t("paradigm.present")}
                            {/if}
                        </td>
                        {#if has_preterite(mode_tag, elem)}
                            <td>
                                {$t("paradigm.preterite")}
                            </td>
                        {/if}
                    </tr>
                </thead>
                <tbody>
                    {#each Object.entries(NUMBER_PERSONS) as [num_tag, persons]}
                        {#each Object.entries(persons) as [pers_tag, pronoun]}
                            <tr class="[&>td]:border [&>td]:pr-4">
                                <td class="bg-surface-100-900">
                                    {pronoun}
                                </td>
                                {#if mode_tag === "Imprt"}
                                    <td>
                                        {get_word(
                                            `${mode_tag}+${num_tag}${pers_tag}`,
                                            elem,
                                        )}
                                    </td>
                                {:else}
                                    {#each Object.entries(TIMES) as [time_tag, _]}
                                        {#if time_tag === "Prs" || (time_tag === "Prt" && has_preterite(mode_tag, elem))}
                                            <td>
                                                {get_word(
                                                    `${mode_tag}+${time_tag}+${num_tag}${pers_tag}`,
                                                    elem,
                                                )}
                                            </td>
                                        {/if}
                                    {/each}
                                {/if}
                            </tr>
                        {/each}
                    {/each}
                    <tr class="[&>td]:border [&>td]:pr-4">
                        <td class="bg-surface-100-900">
                            {$t("paradigm.connegative")}
                        </td>
                        <td>
                            {#if mode_tag === "Imprt"}
                                {get_word(`${mode_tag}+ConNeg`, elem)}
                            {:else}
                                {get_word(`${mode_tag}+Prs+ConNeg`, elem)}
                            {/if}
                        </td>
                        {#if has_preterite(mode_tag, elem)}
                            <td>
                                {get_word(`${mode_tag}+Prt+ConNeg`, elem)}
                            </td>
                        {/if}
                    </tr>
                </tbody>
            </table>
        </div>
    {/if}
{/each}
<div class="flex flex-col gap-2">
    <h4 class="h4">{$t("paradigm.nonfinite")}</h4>
    <table class="table h-fit w-fit border text-lg shadow-lg">
        <tbody>
            {#each Object.entries(NONFINITE_FORMS) as [form_tag, form_name]}
                {@const form_exists = elem.wordforms
                    .keys()
                    .find((t) => t.startsWith(form_tag))}
                {#if form_exists}
                    <tr class="[&>td]:border [&>td]:pl-4">
                        <td class="bg-primary-50-950 font-bold">
                            {$t(`paradigm.${form_name}`)}
                        </td>
                        <td>{get_word(form_tag, elem)}</td>
                    </tr>
                    {#if form_tag === "Ger"}
                        {#if elem.wordforms
                            .keys()
                            .find((t) => t.startsWith(`${form_tag}+Px`))}
                            {#each Object.entries(NUMBERS) as [num_tag, num_name]}
                                {#each Object.entries(PERSONS) as [pers_tag, pers_name]}
                                    <tr class="[&>td]:border [&>td]:pl-4">
                                        <td class="bg-primary-50-950 font-bold">
                                            {$t("paradigm.gerund")}
                                            {$t(`paradigm.${num_name}`)}
                                            {pers_name}
                                        </td>
                                        <td>
                                            {get_word(
                                                `Ger+Px${num_tag}${pers_tag}`,
                                                elem,
                                            )}
                                        </td>
                                    </tr>
                                {/each}
                            {/each}
                        {/if}
                    {/if}
                {/if}
            {/each}
        </tbody>
    </table>
</div>
