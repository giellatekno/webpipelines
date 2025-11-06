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

<div class="flex flex-col gap-4">
    <ToolDescription {description} {usage} />
    <TextArea {instruction} bind:value />

    <div class="">
        {#if data.error}
            Error: {data.error}
        {/if}

        {#if data.results?.lines}
            <div>
                {#each data.results.lines as line}
                    {line}
                    <br />
                {/each}
            </div>
        {/if}
    </div>
</div>
