<script lang="ts">
    import { paradigm_parser } from "$lib/parsers";
    import { Tabs } from "@skeletonlabs/skeleton-svelte";
    import Noun from "./sme/Noun.svelte";
    import Adjective from "./sme/Adjective.svelte";
    import Pronoun from "./sme/Pronoun.svelte";
    import Verb from "./sme/Verb.svelte";
    import Numeral from "./sme/Numeral.svelte";

    let { data } = $props();

    const paradigms = $derived(paradigm_parser(data));

    let keys = $derived(Object.keys(paradigms));
    let value = $derived(keys[0]);
</script>

<Tabs {value} onValueChange={(details) => (value = details.value)}>
    {#if keys.length > 1}
        <p class="my-2 self-center font-bold">
            [l6e] Found {keys.length} homonyms:
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
            <div class="flex flex-row flex-wrap justify-center gap-16">
                {#if elem.pos === "N"}
                    <Noun {elem} />
                {:else if elem.pos === "A"}
                    <Adjective {elem} />
                {:else if elem.pos === "V"}
                    <Verb {elem} />
                {:else if elem.pos === "Pron"}
                    <Pronoun {elem} />
                {:else if elem.pos === "Num"}
                    <Numeral {elem} />
                {:else}
                    <span>[l6e] Can't generate table for {key}</span>
                {/if}
            </div>
        </Tabs.Content>
    {/each}
</Tabs>
