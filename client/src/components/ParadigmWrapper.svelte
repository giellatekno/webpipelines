<script lang="ts">
    import { paradigm_parser } from "$lib/parsers";
    import { Tabs } from "@skeletonlabs/skeleton-svelte";
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

    let headers = $state([]);
</script>

<Tabs {value} onValueChange={(details) => (value = details.value)}>
    {#if keys.length > 1}
        <p class="my-2 self-center font-bold">
            {m.paradigm_homonyms({ num: keys.length })}
        </p>
    {/if}
    <Tabs.List class="justify-center">
        {#each keys as key}
            <Tabs.Trigger class="hover:preset-tonal" value={key}>
                {key}
            </Tabs.Trigger>
        {/each}
        <Tabs.Indicator />
    </Tabs.List>
    {#each keys as key}
        {@const elem = paradigms[key]}
        {@const schemaPromise = getParadigmSchema(
            lang,
            elem.pos,
            elem.subclass,
        )}
        <Tabs.Content value={key}>
            {#await schemaPromise}
                Loading tables...
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
            <p>{m.paradigm_noresults()}</p>
        </div>
    {/each}
</Tabs>
<!-- {#snippet header_navigation(headers: string[])} -->
<!--     {#if headers.length > 0} -->
<!--         <div -->
<!--             class="card bg-surface-100-900/50 border-surface-400-600 sticky top-1/3 col-span-1 h-fit w-full border p-4 shadow-md" -->
<!--         > -->
<!--             <h5 class="h5">{m.paradigm_jumpto}</h5> -->
<!--             <ul class="ml-4 list-disc text-base"> -->
<!--                 {#each headers as header} -->
<!--                     <li> -->
<!--                         <a href={"#" + header} class="hover:underline"> -->
<!--                             {m[`paradigm_${header}`]()} -->
<!--                         </a> -->
<!--                     </li> -->
<!--                 {/each} -->
<!--             </ul> -->
<!--         </div> -->
<!--     {/if} -->
<!-- {/snippet} -->
