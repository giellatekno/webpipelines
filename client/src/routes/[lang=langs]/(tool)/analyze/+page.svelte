<script lang="ts">
    import { t } from "svelte-intl-precompile";
    import type { PageData } from "./$types";
    import { page } from "$app/state";
    import { resolve } from "$app/paths";
    import { goto } from "$app/navigation";
    import { Switch } from "@skeletonlabs/skeleton-svelte";
    import { MoveLeft } from "@lucide/svelte";
    import { analyze_parser } from "$lib/parsers";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();

    let format_switch_checked = $state(false);
    let result_format = $state("text");

    let value = $state(data.q || "");
    let results = $derived(analyze_parser(data.results?.parsed, result_format));

    $effect(() => console.log(results));

    let lang = $derived(page.params.lang || "");

    function onCheckedChange() {
        format_switch_checked = !format_switch_checked;
        result_format = format_switch_checked ? "json" : "text";
    }

    function get_usage(lang: string, $t: (_: string) => string) {
        const lang_specific = $t(`usage.lang.${lang}`);
        if (lang_specific !== `usage.lang.${lang}`) {
            return lang_specific;
        } else {
            const fallback = $t("usage");
            return fallback;
        }
    }

    async function on_textarea_keydown(ev: KeyboardEvent) {
        if (ev.key === "Enter" && ev.shiftKey) {
            ev.preventDefault();
            await goto(`?q=${value}`, { keepFocus: true });
        }
    }
    async function on_submit() {
        await goto(`?q=${value}`, { keepFocus: true });
    }

    let usage = $derived(get_usage(lang, $t));
    let instruction = $derived($t(`instruction.tool.analyze`));
</script>

<div>
    <p class="my-2">{@html usage}</p>

    <form onsubmit={on_submit}>
        <label class="label">
            <span class="label-text text-sm">{instruction}</span>
            <textarea
                class="textarea w-fit"
                rows="6"
                cols="50"
                name="q"
                bind:value
                onkeydown={on_textarea_keydown}
            ></textarea>
            <div class="flex flex-row gap-2 items-center">
                <button
                    class="btn btn-lg preset-filled-primary-500"
                    type="submit">{$t("submit")}</button
                >
                <span>{$t("submit.keys")}</span>
            </div>
        </label>
    </form>

    <div class="flex flex-col mt-6 gap-2">
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
                class="table-wrap card min-w-xl w-fit bg-surface-100-900 border border-surface-200-800"
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
