<script lang="ts">
    import { paradigm_parser } from "$lib/parsers";
    import { t } from "svelte-intl-precompile";
    import {
        CASES,
        PERSONS,
        NUMBERS,
        CASE_NUMBERS,
    } from "./sme_paradigm_options";
    import ParadigmText from "$components/ParadigmText.svelte";
    import type { ParsedParadigm } from "$lib/parsers";
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
    <Tabs.List>
        {#each keys as key}
            <Tabs.Trigger value={key}>{key}</Tabs.Trigger>
        {/each}
        <Tabs.Indicator />
    </Tabs.List>
    {#each keys as key}
        {@const elem = paradigms[key]}
        <Tabs.Content value={key}>
            <div class="flex flex-row flex-wrap gap-16">
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
