<script lang="ts">
    import { t } from "svelte-intl-precompile";
    import type { PageData } from "./$types";
    import { page } from "$app/state";
    import { get_usage } from "$lib/utils";
    import ToolDescription from "$components/ToolDescription.svelte";
    import TextArea from "$components/TextArea.svelte";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();

    let value = $derived(data.q || "");

    let usage = $derived(get_usage(page.params.lang, $t));
    let instruction = $derived($t("disambiguate.instruction"));
    let description = $derived($t("disambiguate.description"));
</script>

<div class="flex flex-col items-center gap-4">
    <!-- <ToolDescription {description} {usage} /> -->
    <TextArea {instruction} bind:value />

    <div>
        {#if data.error}
            Error: {data.error}
        {/if}

        {#if data.results}
            <div
                class="card border-primary-500 min-w-full overflow-x-auto border-2 px-6 py-4 whitespace-nowrap shadow-md xl:text-lg"
            >
                <div class="inline-block min-w-full whitespace-nowrap">
                    {#each data.results as result, i}
                        {#if i !== 0}
                            <hr class="hr" />
                        {/if}
                        <span class="">
                            <p class="text-red-800">
                                <b>{result.wordform}</b>
                            </p>
                            {#each result.analyses as analysis_group}
                                <div class="mb-2">
                                    {#each analysis_group as analysis, i}
                                        {@const tabs = "&emsp;".repeat(i)}
                                        <div class="flex flex-row gap-2">
                                            {@html tabs}
                                            <p class="text-red-700">
                                                [{analysis.lemma}]
                                            </p>
                                            <p>{analysis.verbtype}</p>
                                            <p class="text-blue-700">
                                                {analysis.tags}
                                            </p>
                                            <p class="text-green-700">
                                                {analysis.syntax}
                                            </p>
                                            <p>{analysis.relation}</p>
                                        </div>
                                    {/each}
                                </div>
                            {/each}
                        </span>
                    {/each}
                </div>
            </div>
        {/if}
    </div>
</div>
