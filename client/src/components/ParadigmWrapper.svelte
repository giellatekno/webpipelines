<script lang="ts">
    import { paradigm_parser } from "$lib/parsers";
    import { Progress, Tabs } from "@skeletonlabs/skeleton-svelte";
    import ParadigmList from "$components/ParadigmList.svelte";
    import { m } from "$lib/paraglide/messages";
    import { getParadigmSchema } from "$lib/paradigms/registry";
    import { page } from "$app/state";
    import ParadigmTable from "./ParadigmTable.svelte";

    interface Props {
        data: any;
        format: string;
    }

    let { data, format }: Props = $props();

    let lang = $derived(page.params.lang || "");

    const paradigms = $derived(paradigm_parser(data));

    let keys = $derived(Object.keys(paradigms));
    let value = $derived(keys[0]);
</script>

<div class="w-full">
    <Tabs {value} onValueChange={(details) => (value = details.value)}>
        {#if keys.length > 1}
            <p class="label my-2 self-center text-center">
                {m.paradigm_homonyms({ num: keys.length })}
            </p>
        {/if}
        <Tabs.List class="w-full justify-center">
            {#each keys as key}
                <Tabs.Trigger class="hover:preset-tonal" value={key}>
                    {key}
                </Tabs.Trigger>
            {/each}
            <Tabs.Indicator />
        </Tabs.List>
        {#each keys as key}
            {@const elem = paradigms[key]}
            {@const schemaPromise = getParadigmSchema(lang, elem.pos, elem.subclass)}
            <Tabs.Content value={key}>
                {#await schemaPromise}
                    <div class="flex justify-center">
                        <Progress class="w-fit items-center" value={null}>
                            <Progress.Circle class="[--size:--spacing(12)]">
                                <Progress.CircleTrack />
                                <Progress.CircleRange />
                            </Progress.Circle>
                            <Progress.ValueText />
                        </Progress>
                    </div>
                {:then schema}
                    {#if schema && format === "table"}
                        <ParadigmTable {schema} {elem} />
                    {:else}
                        <ParadigmList {elem} />
                    {/if}
                {/await}
            </Tabs.Content>
        {:else}
            <div class="flex justify-center">
                <span>{m.paradigm_noresults()}</span>
            </div>
        {/each}
    </Tabs>
</div>
