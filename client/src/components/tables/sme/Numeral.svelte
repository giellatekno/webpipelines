<script lang="ts">
    import type { ParsedParadigm } from "$lib/parsers";
    import { CASES } from "./sme_paradigm_options";
    import { get_entry } from "$lib/utils";
    import Table from "$components/Table.svelte";
    import { m } from "$lib/paraglide/messages";

    let { elem }: { elem: ParsedParadigm } = $props();
</script>

<div class="flex flex-col gap-2">
    <h3 class="h4 xl:h3">{m.partofspeech_numeral()}</h3>
    <Table>
        <thead>
            <tr>
                <th>{m.paradigm_case()}</th>
                <th>{m.paradigm_singular()}</th>
                <th>{m.paradigm_plural()}</th>
            </tr>
        </thead>
        <tbody>
            {#each CASES as gram_case}
                {@const row_exists = elem.wordforms
                    .keys()
                    .find((e) => e.endsWith(gram_case.tag))}
                {#if row_exists}
                    {#if !(gram_case.tag === "Ess")}
                        <tr>
                            <td class="bg-surface-100-900">
                                {gram_case.name()}
                            </td>
                            <td>
                                {@html get_entry(`Sg+${gram_case.tag}`, elem)}
                            </td>
                            <td>
                                {@html get_entry(`Pl+${gram_case.tag}`, elem)}
                            </td>
                        </tr>
                    {:else}
                        <tr>
                            <td class="bg-surface-100-900">
                                {gram_case.name()}
                            </td>
                            <td colspan="2" class="text-center">
                                {@html get_entry(gram_case.tag, elem)}
                            </td>
                        </tr>
                    {/if}
                {/if}
            {/each}
        </tbody>
    </Table>
</div>
