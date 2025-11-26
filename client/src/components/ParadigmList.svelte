<script lang="ts">
    import { paradigm_parser } from "$lib/parsers";
    import { Tabs } from "@skeletonlabs/skeleton-svelte";
    import { t } from "svelte-intl-precompile";
    import Table from "./Table.svelte";

    let { data } = $props();

    let paradigm = $derived(paradigm_parser(data));
    let keys = $derived(Object.keys(paradigm));
    let value = $derived(keys[0]);
</script>

<Tabs {value} onValueChange={(details) => (value = details.value)}>
    <Tabs.List class="justify-center">
        {#if keys.length > 1}
            {#each keys as key}
                <Tabs.Trigger value={key}>{key}</Tabs.Trigger>
            {/each}
        {/if}
        <Tabs.Indicator />
    </Tabs.List>
    {#each keys as key}
        <Tabs.Content value={key}>
            <div class="mx-auto flex justify-center">
                <Table>
                    <thead>
                        <tr>
                            <th>{$t("paradigm.tags")}</th>
                            <th>{$t("paradigm.wordform")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each paradigm[key].wordforms.entries() as [tags, wordforms]}
                            {@const obj = paradigm[key]}
                            <tr
                                class="even:bg-surface-100-900/50 odd:bg-surface-50-950 border"
                            >
                                <td class="font-bold">
                                    {obj.pos}
                                    {obj.subclass ? obj.subclass + " " : ""}
                                    {tags.replaceAll("+", " ")}
                                </td>
                                <td>
                                    {Array.from(wordforms).join(", ")}
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </Table>
            </div>
        </Tabs.Content>
    {/each}
</Tabs>
