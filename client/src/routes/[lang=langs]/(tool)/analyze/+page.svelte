<script lang="ts">
    import { t } from "svelte-intl-precompile";
    import type { PageData } from "./$types";
    import { page } from "$app/state";
    import { Switch } from "@skeletonlabs/skeleton-svelte";
    import { analyze_parser } from "$lib/parsers";
    import ToolDescription from "$components/ToolDescription.svelte";
    import TextArea from "$components/TextArea.svelte";
    import { get_usage } from "$lib/utils";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();

    let format_switch_checked = $state(false);
    let result_format = $state("text");

    let value = $state(data.q || "");
    let results = $derived(analyze_parser(data.results?.parsed, result_format));

    let lang = $derived(page.params.lang || "");

    function onCheckedChange() {
        format_switch_checked = !format_switch_checked;
        result_format = format_switch_checked ? "json" : "text";
    }

    let usage = $derived(get_usage(lang, $t));
    let instruction = $derived($t(`analyze.instruction`));
    let description = $derived($t(`analyze.description`));
</script>

<div class="flex flex-col gap-4">
    <ToolDescription {description} {usage} />
    <TextArea {instruction} bind:value />

    <div class="mt-6 flex flex-col gap-2">
        {#if data.error}
            Error: {data.error}
        {/if}

        {#if results}
            <Switch checked={format_switch_checked} {onCheckedChange}>
                <Switch.Label class="text-base">Text</Switch.Label>
                <Switch.Control>
                    <Switch.Thumb />
                </Switch.Control>
                <Switch.Label class="text-base">JSON</Switch.Label>
                <Switch.HiddenInput />
            </Switch>
            <div
                class="table-wrap card bg-surface-100-900 border-surface-200-800 w-fit min-w-xl border"
            >
                {#if result_format == "text" && typeof results === "object"}
                    <table class="table text-lg">
                        <thead class="[&>th]:border-spacing-4">
                            <tr
                                class="bg-primary-100-900 text-surface-950-50 border-b"
                            >
                                <th>Word</th>
                                <th>Lemma</th>
                                <th>POS</th>
                                <th>Tags</th>
                            </tr>
                        </thead>
                        {#each results as word_analyses}
                            {@const plus =
                                "<span class='text-gray-500'>+</span>"}
                            <tbody class="border-t">
                                {#each word_analyses.items as { wordform, lemma, pos, tags }}
                                    {@const tags_s = tags.join(plus)}
                                    <tr>
                                        <td>
                                            <span class="text-green-700">
                                                {wordform}
                                            </span>
                                        </td>
                                        <td class="flex">
                                            <span class="text-red-800">
                                                {lemma}
                                            </span>
                                        </td>
                                        <td>
                                            <span class="font-bold">
                                                {pos}
                                            </span>
                                        </td>
                                        <td>
                                            {@html tags_s}
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                        {/each}
                    </table>
                {:else if result_format == "json"}
                    <pre>{results}</pre>
                {/if}
            </div>
        {/if}
    </div>
</div>
