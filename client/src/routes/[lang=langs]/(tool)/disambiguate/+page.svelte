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

    let value = $state(data.q || "");

    let usage = $derived(get_usage(page.params.lang, $t));
    let instruction = $derived($t("disambiguate.instruction"));
    let description = $derived($t("disambiguate.description"));
</script>

<div class="flex flex-col gap-4">
    <ToolDescription {description} {usage} />
    <TextArea {instruction} bind:value />

    <div class="results">
        {#if data.error}
            Error: {data.error}
        {/if}

        {#if data.results?.lines}
            <div>
                {#each data.results.lines as line}
                    {line}<br />
                {/each}
            </div>
        {/if}
    </div>
</div>
