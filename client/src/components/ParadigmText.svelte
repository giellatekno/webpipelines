<script lang="ts">
    import { paradigm_parser } from "$lib/parsers";
    import { Tabs } from "@skeletonlabs/skeleton-svelte";
    import { t } from "svelte-intl-precompile";

    let { data } = $props();

    let paradigm = $derived(paradigm_parser(data));
    let keys = $derived(Object.keys(paradigm));
    let value = $derived(keys[0]);
</script>

<div class="flex w-fit flex-col gap-4">
    <Tabs {value} onValueChange={(details) => (value = details.value)}>
        <Tabs.List>
            {#each keys as key}
                <Tabs.Trigger value={key}>{key}</Tabs.Trigger>
            {/each}
            <Tabs.Indicator />
        </Tabs.List>
        {#each keys as key}
            <Tabs.Content value={key}>
                <div class="flex flex-col gap-2">
                    <table class="border text-lg shadow-lg">
                        <thead class="border">
                            <tr
                                class="bg-primary-50-950 text-surface-950-50 border font-bold [&>td]:px-4 [&>td]:py-2"
                            >
                                <td>{$t("paradigm.tags")}</td>
                                <td>{$t("paradigm.wordforms")}</td>
                            </tr>
                        </thead>
                        <tbody>
                            {#each paradigm[key].wordforms.entries() as [tags, wordforms]}
                                {@const obj = paradigm[key]}
                                <tr
                                    class="even:bg-surface-100-900/50 odd:bg-surface-50-950 border [&>td]:px-4 [&>td]:py-1"
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
                    </table>
                </div>
            </Tabs.Content>
        {/each}
    </Tabs>
</div>
