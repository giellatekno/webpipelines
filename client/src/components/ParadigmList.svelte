<script lang="ts">
    import { t } from "svelte-intl-precompile";
    import Table from "./Table.svelte";
    import type { ParsedParadigm } from "$lib/parsers";

    let { elem }: { elem: ParsedParadigm } = $props();
</script>

<div class="mx-auto flex justify-center">
    <Table>
        <thead>
            <tr class="[&>th]:text-start">
                <th>{$t("paradigm.tags")}</th>
                <th>{$t("paradigm.wordform")}</th>
            </tr>
        </thead>
        <tbody>
            {#each elem.wordforms.entries() as [tags, wordforms]}
                <tr
                    class="even:bg-surface-100-900/50 odd:bg-surface-50-950 border"
                >
                    <td class="font-semibold">
                        {elem.pos}+{elem.subclass
                            ? elem.subclass + "+"
                            : ""}{tags}
                    </td>
                    <td>
                        {@html Array.from(wordforms).join("<br>")}
                    </td>
                </tr>
            {/each}
        </tbody>
    </Table>
</div>
