<script lang="ts">
    import { t } from "svelte-intl-precompile";
    import type { PageData } from "./$types";
    import { page } from "$app/stores";
    import { base } from "$app/paths";
    import { goto } from "$app/navigation";
    import Switch from "$components/Switch.svelte";

    export let data: PageData;

    let form: HTMLFormElement;
    let value = "";
    let result_format = "text";
    let results: any;
    $: results = set_results(data, result_format);

    function set_results(data: PageData, result_format: string) {
        if (!data.results) return;

        if (result_format === "text") {
            // Somewhat confusing: if user asks for text, we must parse the json
            const analyses = [];
            let last = null;
            let curr = [];
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
    };

    $: usage = get_usage($page.params.lang, $t);
    $: instruction = $t(`instruction.tool.analyze`);

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
            await goto(`?q=${value}`, { keepFocus: true });
        }
    }
</script>

<main>
    <span>
        <h1>{$t("analyze")}</h1>
        <a href="{base}/{$page.params.lang}">[l6e] Tilbake til verktøy</a>
    </span>

    <p>{@html usage}</p>
    <p>{@html instruction}</p>

    <form
        bind:this={form}
        data-sveltekit-replacestate
        data-sveltekit-keepfocus
    >
        <textarea rows="6" cols="50" name="q" bind:value on:keydown={on_textarea_keydown}></textarea>
        <br>
        <br>
        <button type="submit">{$t("Send")}</button>
    </form>

    <div class="results">
        {#if data.error}
            Error: {data.error}
        {/if}

        {#if results}
            <Switch bind:value={result_format} label="" options={["text", "json"]} fontSize={16} />

            {#if result_format == "text"}
                <table>
                    {#each results as word_analyses}
                        {@const plus = "<span style='color: gray;'>+</span>"}
                        {#each word_analyses as {wordform, lemma, pos, tags}}
                            {@const tags_s = tags.join(plus)}
                            <tr>
                                <td><span style="color: rgb(40, 125, 9);">{wordform}</span></td>
                                <td><span style="color: #a80909;">{lemma}</span>{@html plus}<span style="font-weight: bold;">{pos}</span>{@html plus}{@html tags_s}</td>
                            </tr>
                        {/each}
                        <tr><td>&nbsp;</td><td>&nbsp;</td></tr>
                    {/each}
                </table>
            {:else if result_format == "json"}
                {@html results}
            {/if}
        {:else}
            No analyses
        {/if}
    </div>
</main>

<style>
    main {
        margin-left: 34px;
    }

    div.results {
        margin-top: 1.5em;
    }

    form button[type=submit] {
        background-color: #acc1ef;
        border-radius: 2px;
        border: 1px solid #9d9db0;
        padding: 8px 16px;

    }

    textarea {
        font-family: Roboto, sans-serif;
        font-size: 14px;
        border: 1px solid #9d9db0;
        border-radius: 6px;
        padding: 4px;
    }

    textarea:focus-within {
        border: 1px solid #7777ee;
        box-shadow: 0px 2px 8px 0px rgba(200, 200, 255, 0.9);
    }
</style>
