<script lang="ts">
    import { t } from "svelte-intl-precompile";
    import type { PageData } from "./$types";
    import { page } from "$app/state";
    import { Progress } from "@skeletonlabs/skeleton-svelte";
    import { get_usage } from "$lib/utils";
    import TextArea from "$components/TextArea.svelte";
    import ToolDescription from "$components/ToolDescription.svelte";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();

    let loading = $state(false);

    let value = $state(data.q || "");

    let usage = $derived(get_usage(page.params.lang, $t));
    let instruction = $derived($t("transcribe.instruction"));
    let description = $derived($t("transcribe.description"));
</script>

<div class="flex flex-col items-center gap-4">
    <!-- <ToolDescription {description} {usage} /> -->
    <TextArea {instruction} bind:value bind:loading />

    {#if loading}
        <Progress class="w-lg items-center py-6" value={null}>
            <Progress.Circle>
                <Progress.CircleTrack />
                <Progress.CircleRange />
            </Progress.Circle>
            <Progress.ValueText />
        </Progress>
    {:else if data.error || data.results}
        <div
            class="card preset-filled-surface-100-900 border-surface-200-800 w-xl border px-4 py-6 text-wrap"
        >
            {#if data.error}
                <span class="text-error-500 text-xl">
                    Error: {data.error}
                </span>
            {/if}

            {#if data.results?.analyses}
                <div class="flex flex-col gap-2 text-xl">
                    {#each data.results.analyses as result}
                        <p>
                            {result}
                        </p>
                    {:else}
                        No analyses
                    {/each}
                </div>
            {/if}
        </div>
    {/if}
</div>
