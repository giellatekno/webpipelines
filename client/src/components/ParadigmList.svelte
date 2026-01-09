<script lang="ts">
    import Table from "./Table.svelte";
    import type { ParsedParadigm } from "$lib/parsers";
    import { m } from "$lib/paraglide/messages";

    let { elem }: { elem: ParsedParadigm } = $props();
</script>

<div class="mx-auto flex justify-center">
    <Table>
        <thead>
            <tr class="[&>th]:text-start">
                <th>{m.paradigm_tags()}</th>
                <th>{m.paradigm_wordform()}</th>
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
