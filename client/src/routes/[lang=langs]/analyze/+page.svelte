<script lang="ts">
    import { t } from "svelte-intl-precompile";
    import type { PageData } from "./$types";
    import { page } from "$app/state";
    import { analyze_parser } from "$lib/parsers";
    import ToolDescription from "$components/ToolDescription.svelte";
    import TextArea from "$components/TextArea.svelte";
    import { copy_text, get_usage, POS_TAGS } from "$lib/utils";
    import { CopyIcon } from "@lucide/svelte";
    import Table from "$components/Table.svelte";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();

    let value = $derived(data.q || "");
    let results = $derived(analyze_parser(data.results?.parsed));

    let lang = $derived(page.params.lang || "");

    let usage = $derived(get_usage(lang, $t));
    let instruction = $derived($t(`analyze.instruction`));
    let description = $derived($t(`analyze.description`));

    function color_tags(tags: string[]) {
        const results: string[] = [];
        for (const [i, tag] of tags.entries()) {
            if (POS_TAGS.includes(tag)) {
                results.push(`<span class='font-bold'>${tag}</span>`);
            } else if (tags[i + 1] && POS_TAGS.includes(tags[i + 1])) {
                results.push(`<span class='text-red-800'>${tag}</span>`);
            } else {
                results.push(tag);
            }
        }
        return results;
    }

    function combine_tags(lemma: string, pos: string, tags: string[]) {
        if (tags.length === 1 && tags[0] === "") {
            return [lemma, pos];
        }
        return [lemma, pos, ...tags];
    }
</script>

<div class="flex flex-col items-center gap-4">
    <!-- <ToolDescription {description} {usage} /> -->
    <TextArea {instruction} bind:value />

    <div class="mt-6 flex flex-col gap-2">
        {#if data.error}
            <span class="text-error-500">
                Error: {data.error}
            </span>
        {/if}

        {#if results}
            <div class="flex flex-col">
                <Table>
                    <thead>
                        <tr>
                            <th>Wordform</th>
                            <th>Analysis</th>
                            <th>Copy</th>
                        </tr>
                    </thead>
                    {#each results as word_analyses, i}
                        {@const plus = "<span class='text-gray-500'>+</span>"}
                        <tbody>
                            {#each word_analyses.items as { wordform, lemma, pos, tags }, j}
                                {@const html_tags = color_tags(
                                    combine_tags(lemma, pos, tags),
                                ).join(plus)}
                                <tr
                                    class:separate={j ===
                                        word_analyses.items.length - 1 &&
                                        i !== results.length - 1}
                                >
                                    <td>
                                        <span class="text-green-700">
                                            {wordform}
                                        </span>
                                    </td>
                                    <td>
                                        {@html html_tags}
                                    </td>
                                    <td class="">
                                        <button
                                            class="btn-icon preset-outlined-surface-950-50 hover:preset-tonal h-fit w-fit"
                                            type="button"
                                            onclick={() =>
                                                copy_text(
                                                    combine_tags(
                                                        lemma,
                                                        pos,
                                                        tags,
                                                    ).join("+"),
                                                )}
                                        >
                                            <CopyIcon class="size-4" />
                                        </button>
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    {/each}
                </Table>
            </div>
        {/if}
    </div>
</div>
