<script lang="ts">
    import { t } from "svelte-intl-precompile";
    import type { PageData } from "./$types";
    import { page } from "$app/state";
    import ToolDescription from "$components/ToolDescription.svelte";
    import TextArea from "$components/TextArea.svelte";
    import { get_usage } from "$lib/utils";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();

    // the search text
    let value = $state("");

    let usage = $derived(get_usage(page.params.lang, $t));
    let instruction = $derived($t("dependency.instruction"));
    let description = $derived($t("dependency.description"));
</script>

<div class="flex flex-col items-center gap-4">
    <!-- <ToolDescription {description} {usage} /> -->
    <TextArea {instruction} bind:value />

    <div class="">
        {#if data.error}
            <p class="text-error-500 text-lg">
                Error: {data.error}
            </p>
        {/if}

        {#if data.results}
            <div
                class="card preset-filled-surface-100-900 border-surface-200-800 w-fit border p-4"
            >
                <div class="flex flex-col gap-2">
                    {#each data.results as analysis}
                        <span class="flex flex-row gap-2 text-lg">
                            <p class="text-red-700">
                                <b>{analysis.wordform}</b>
                                [{analysis.lemma}]
                            </p>
                            <p>{analysis.verbtype}</p>
                            <p class="text-blue-700">{analysis.tags}</p>
                            <p class="text-green-700">{analysis.syntax}</p>
                            <p>{analysis.relation}</p>
                        </span>
                    {/each}
                </div>
            </div>
        {/if}
    </div>
</div>
