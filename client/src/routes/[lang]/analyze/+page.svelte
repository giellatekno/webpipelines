<script lang="ts">
    import { t } from "svelte-intl-precompile";
    import type { PageData } from "./$types";
    import { page } from "$app/state";
    import { resolve } from "$app/paths";
    import { goto } from "$app/navigation";
    import { Switch } from "@skeletonlabs/skeleton-svelte";
    import { MoveLeft } from "@lucide/svelte";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();

    let format_switch_checked = $state(false);
    let result_format = $state("text");

    let value = $state(data.q || "");
    let results: any = $derived(set_results(data, result_format));

    let lang = $derived(page.params.lang || "");

    function onCheckedChange(event: { checked: boolean }) {
        format_switch_checked = !format_switch_checked;
        result_format = format_switch_checked ? "json" : "text";
    }

    function set_results(data: PageData, result_format: string) {
        if (!data.results) return;

        if (result_format === "text") {
            // Somewhat confusing: if user asks for text, we must parse the json
            const analyses = [];
            let last = null;
            let curr: string[] = [];
            for (let obj of data.results.parsed) {
                if (obj.wordform != last) {
                    if (curr.length > 0) {
                        analyses.push(curr);
                    }
                    curr = [obj];
                    last = obj.wordform;
                } else {
                    curr.push(obj);
                }
            }

            // remember the last one
            if (curr.length > 0) {
                analyses.push(curr);
            }
            return analyses;
        } else if (result_format === "json") {
            // and if they ask for json, we just show stringified json
            return JSON.stringify(data.results.parsed);
            const analyses = data.results.raw
                .split("\n")
                .filter((line: string) => line.length > 0)
                .map((line: string) => line.split("\t"))
                .filter((splits: Array<string>) => splits[2] !== "inf")
                .map((splits: Array<string>) => splits[1])
                .join("<br>");
            return analyses;
        }
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
    <span class="flex flex-col gap-2 mb-4">
        <a
            class="btn btn-sm preset-outlined-primary-500 w-fit"
            href={resolve(`/${lang}`)}
        >
            <MoveLeft />
            [l6e] Back to tool selection</a
        >
        <h1 class="h4">{$t("analyze")}</h1>
    </span>

    <p class="my-2">{usage}</p>

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
                    type="submit">{$t("[l6e] submit")}</button
                >
                <span>[l6e] Or press Shift+Enter to submit.</span>
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
            {#if result_format == "text"}
                <div
                    class="table-wrap card w-fit p-2 bg-surface-100-900 border border-surface-200-800"
                >
                    <table class="table text-lg">
                        <tbody>
                            {#each results as word_analyses}
                                {@const plus =
                                    "<span class='text-gray-500'>+</span>"}
                                {#each word_analyses as { wordform, lemma, pos, tags }}
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
                                            {@html plus}
                                            <span class="font-bold">
                                                {pos}
                                            </span>
                                            {@html plus}
                                            {@html tags_s}
                                        </td>
                                    </tr>
                                {/each}
                            {/each}
                        </tbody>
                    </table>
                </div>
            {:else if result_format == "json"}
                {@html results}
            {/if}
        {:else}
            No analyses
        {/if}
    </div>
</div>
