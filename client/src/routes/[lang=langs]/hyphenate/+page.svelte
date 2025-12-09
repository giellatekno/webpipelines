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

    let hyphenate_data = $derived(data.results?.hyphenated);

    let usage = $derived(get_usage(page.params.lang, $t));
    let instruction = $derived($t("hyphenate.instruction"));
    let description = $derived($t("hyphenate.description"));
</script>

<div class="flex flex-col items-center gap-4">
    <!-- <ToolDescription {description} {usage} /> -->
    <TextArea {instruction} bind:value />

    <div class="">
        {#if data.error}
            Error: {data.error}
        {/if}
        {#if hyphenate_data}
            <div
                class="card preset-filled-surface-100-900 border-surface-200-800 w-fit border p-2"
            >
                <table class="table w-fit">
                    <thead>
                        <tr>
                            <th>Lemma</th>
                            <th>Hyphenated</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    {#each hyphenate_data as { input_word, variations }}
                        <tbody class="mt-2 border-t">
                            {#each variations as { hyphenated_word, score }}
                                <tr>
                                    <td>{input_word}</td>
                                    <td>
                                        {#each hyphenated_word.split("") as char}
                                            {#if char === "^" || char === "#"}
                                                <span class="text-red-800">
                                                    {char}
                                                </span>
                                            {:else}
                                                {char}
                                            {/if}
                                        {/each}
                                    </td>
                                    <td>{score}</td>
                                </tr>
                            {/each}
                        </tbody>
                    {/each}
                </table>
            </div>
        {/if}
    </div>
</div>
