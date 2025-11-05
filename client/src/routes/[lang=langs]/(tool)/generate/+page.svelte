<script lang="ts">
    import { t } from "svelte-intl-precompile";
    import type { PageData } from "./$types";
    import { page } from "$app/state";
    import { get_usage } from "$lib/utils";
    import ToolDescription from "$components/ToolDescription.svelte";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();

    // the search text
    let value = $state(data.q || "");

    let usage = $derived(get_usage(page.params.lang, $t));
    let instruction = $derived($t(`generate.instruction`));
    let description = $derived($t(`generate.description`));
</script>

<div class="flex flex-col gap-4">
    <ToolDescription {description} {usage} />

    <form class="my-2">
        <label for="q" class="label">
            <span class="label-text text-sm">{instruction}</span>
        </label>
        <span class="flex flex-row gap-2 mt-2">
            <input class="input w-80 h-12" type="text" name="q" bind:value />
            <button class="btn preset-filled-primary-500" type="submit">
                {$t("submit")}
            </button>
        </span>
    </form>

    <div class="results">
        {#if data.error}
            Error: {data.error}
        {/if}

        {#if data.results?.generated}
            <div>
                {#each data.results.generated as result}
                    {result}<br />
                {:else}
                    No analyses
                {/each}
            </div>
        {/if}
    </div>
</div>
