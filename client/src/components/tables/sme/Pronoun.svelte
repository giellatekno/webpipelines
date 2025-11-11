<script lang="ts">
    import type { ParsedParadigm } from "$lib/parsers";
    import { t } from "svelte-intl-precompile";
    import { CASES, NUMBERS } from "../sme_paradigm_options";
    import { get_word } from "$lib/utils";

    let { elem }: { elem: ParsedParadigm } = $props();

    // let subclass =  $state("");
    // $effect(() => {
    //     subclass = switch(elem.subclass) {
    //         case "Indef": return "indefinite";
    //         case "Rel": return "relative";
    //         default: return "";
    //     }
    // })
</script>

<div class="flex flex-col gap-2">
    {#if elem.subclass === "Refl"}
        todo
    {:else if elem.subclass === "Pers"}
        <!-- TODO: better way to find pers_tag -->
        {@const pers_tag = elem.wordforms.keys().toArray()[0][2]}
        <table class="table h-fit w-fit text-lg shadow-lg">
            <thead>
                <tr
                    class="bg-primary-50-950 text-surface-950-50 font-bold [&>td]:border"
                >
                    <td>{$t("paradigm.case")}</td>
                    <td>{$t("paradigm.singularis")}</td>
                    <td>{$t("paradigm.dualis")}</td>
                    <td>{$t("paradigm.pluralis")}</td>
                </tr>
            </thead>
            <tbody>
                {#each Object.entries(CASES) as [case_tag, case_name]}
                    {@const row_exists = elem.wordforms
                        .keys()
                        .find((e) => e.endsWith(case_tag))}
                    {#if row_exists}
                        <tr class="[&>td]:border [&>td]:pr-4">
                            <td class="bg-surface-100-900">
                                {$t(`paradigm.${case_name}`)}
                            </td>
                            {#each Object.keys(NUMBERS) as num_tag}
                                <td>
                                    {get_word(
                                        `${num_tag}${pers_tag}+${case_tag}`,
                                        elem,
                                    )}
                                </td>
                            {/each}
                        </tr>
                    {/if}
                {/each}
            </tbody>
        </table>
    {:else}
        <!-- <h4 class="h4">{$t("paradigm.")}</h4> -->

        <table class="table h-fit w-fit text-lg shadow-lg">
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
                                    {get_word(`Sg+${tag}`, elem)}
                                </td>
                                <td>
                                    {get_word(`Pl+${tag}`, elem)}
                                </td>
                            </tr>
                        {:else}
                            <tr class="[&>td]:border">
                                <td class="bg-surface-100-900">
                                    {$t(`paradigm.${name}`)}
                                </td>
                                <td colspan="2" class="text-center">
                                    {get_word(tag, elem)}
                                </td>
                            </tr>
                        {/if}
                    {/if}
                {/each}
            </tbody>
        </table>
    {/if}
</div>
