<script lang="ts">
    import type { ParsedParadigm } from "$lib/parsers";
    import { t } from "svelte-intl-precompile";
    import { CASES } from "./sme_paradigm_options";
    import { get_entry } from "$lib/utils";
    import Table from "$components/Table.svelte";

    let { elem }: { elem: ParsedParadigm } = $props();
</script>

<div class="flex flex-col gap-2">
    <h3 class="h4 xl:h3">{$t("partofspeech.numeral")}</h3>
    <Table>
        <thead>
            <tr>
                <th>{$t("paradigm.case")}</th>
                <th>{$t("paradigm.singular")}</th>
                <th>{$t("paradigm.plural")}</th>
            </tr>
        </thead>
        <tbody>
            {#each Object.entries(CASES) as [tag, name]}
                {@const row_exists = elem.wordforms
                    .keys()
                    .find((e) => e.endsWith(tag))}
                {#if row_exists}
                    {#if !(tag === "Ess")}
                        <tr>
                            <td class="bg-surface-100-900">
                                {$t(`paradigm.${name}`)}
                            </td>
                            <td>
                                {@html get_entry(`Sg+${tag}`, elem)}
                            </td>
                            <td>
                                {@html get_entry(`Pl+${tag}`, elem)}
                            </td>
                        </tr>
                    {:else}
                        <tr>
                            <td class="bg-surface-100-900">
                                {$t(`paradigm.${name}`)}
                            </td>
                            <td colspan="2" class="text-center">
                                {@html get_entry(tag, elem)}
                            </td>
                        </tr>
                    {/if}
                {/if}
            {/each}
        </tbody>
    </Table>
</div>
