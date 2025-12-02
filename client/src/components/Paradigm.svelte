<script lang="ts">
    import { paradigm_parser } from "$lib/parsers";
    import { Tabs } from "@skeletonlabs/skeleton-svelte";
    import { t } from "svelte-intl-precompile";
    import ParadigmList from "$components/ParadigmList.svelte";
    import type { Component } from "svelte";
    interface Props {
        data: any;
        lang_tables: Promise<Component[] | undefined>;
        format: string;
    }

    let { data, lang_tables, format }: Props = $props();

    const paradigms = $derived(paradigm_parser(data));

    let keys = $derived(Object.keys(paradigms));
    let value = $derived(keys[0]);

    let headers = $state([]);
</script>

{#await lang_tables}
    <p>loading tables...</p>
{:then components}
    <Tabs {value} onValueChange={(details) => (value = details.value)}>
        {#if keys.length > 1}
            <p class="my-2 self-center font-bold">
                {$t("paradigm.homonyms", { values: { num: keys.length } })}
            </p>
        {/if}
        <Tabs.List class="justify-center">
            {#if keys.length > 1}
                {#each keys as key}
                    <Tabs.Trigger class="hover:preset-tonal" value={key}>
                        {key}
                    </Tabs.Trigger>
                {/each}
            {/if}
            <Tabs.Indicator />
        </Tabs.List>
        {#each keys as key}
            {@const elem = paradigms[key]}
            <Tabs.Content value={key}>
                {#if components && format === "table"}
                    {@const [Adjective, Noun, Numeral, Pronoun, Verb] =
                        components}
                    <div
                        class="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_auto_1fr]"
                    >
                        <div>
                            <!-- {@render header_navigation(headers)} -->
                        </div>
                        <div
                            class="flex w-full flex-col items-center gap-16 xl:items-start [&_h3]:scroll-mt-24"
                        >
                            {#if elem.pos === "A"}
                                <Adjective {elem} />
                            {:else if elem.pos === "N"}
                                <Noun {elem} />
                            {:else if elem.pos === "Num"}
                                <Numeral {elem} />
                            {:else if elem.pos === "Pron"}
                                <Pronoun {elem} />
                            {:else if elem.pos === "V"}
                                <Verb {elem} bind:headers />
                            {:else}
                                <span>
                                    [l6e] Can't generate table for {key}
                                </span>
                            {/if}
                        </div>
                    </div>
                {:else}
                    <ParadigmList {elem} />
                {/if}
            </Tabs.Content>
        {:else}
            <div class="flex justify-center">
                <p>{$t("paradigm.noresults")}</p>
            </div>
        {/each}
    </Tabs>
{:catch error}
    <p>Error: {error}</p>
{/await}

{#snippet header_navigation(headers: string[])}
    {#if headers.length > 0}
        <div
            class="card bg-surface-100-900/50 border-surface-400-600 sticky top-1/3 col-span-1 h-fit w-full border p-4 shadow-md"
        >
            <h5 class="h5">{$t("paradigm.jumpto")}</h5>
            <ul class="ml-4 list-disc text-base">
                {#each headers as header}
                    <li>
                        <a href={"#" + header} class="hover:underline">
                            {$t(`paradigm.${header}`)}
                        </a>
                    </li>
                {/each}
            </ul>
        </div>
    {/if}
{/snippet}
