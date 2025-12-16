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
    let value = $derived(data.q || "");

    let usage = $derived(get_usage(page.params.lang, $t));
    let instruction = $derived($t(`generate.instruction`));
    let description = $derived($t(`generate.description`));
</script>

<div class="flex flex-col items-center gap-4">
    <!-- <ToolDescription {description} {usage} /> -->

    <form
        class="card preset-filled-surface-100-900 border-surface-200-800 border p-4"
    >
        <!-- <label for="q" class="label"> -->
        <!--     <span class="label-text text-sm">{instruction}</span> -->
        <!-- </label> -->
        <span class="flex flex-row gap-2">
            <input
                class="input bg-surface-50 h-12 w-80"
                type="text"
                name="q"
                bind:value
                placeholder={$t("writehere")}
            />
            <button class="btn preset-filled-primary-500" type="submit">
                {$t("submit")}
            </button>
        </span>
    </form>

    <div class="results">
        {#if data.error}
            Error: {data.error}
        {/if}

        {#if data.results}
            <div
                class="card border-primary-500 border-2 p-4 shadow-md xl:text-lg"
            >
                <div class="flex flex-col gap-2">
                    <p class="font-bold text-red-800">[l6e]Result:</p>

                    <ul class="list-inside list-disc">
                        {#each data.results as result}
                            <li>{result}</li>
                        {/each}
                    </ul>
                </div>
            </div>
        {:else}
            [l6e] No analyses
        {/if}
    </div>
</div>
