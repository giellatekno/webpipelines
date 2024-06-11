<script lang="ts">
    import { base } from "$app/paths";
    import { t } from "svelte-intl-precompile";
    import type { PageData } from "./$types";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";

    export let data: PageData;

    let value = "";

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
        <h1>{$t("transcribe")}</h1>
        <a href="{base}/{$page.params.lang}">[l6e] Tilbake til verktøy</a>
    </span>

    <p>{@html usage}</p>
    <p>{@html instruction}</p>

    <form
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

        {#if data.results?.analyses}
            <div>
                {#each data.results.analyses as result}
                    {result}<br>
                {:else}
                    No analyses
                {/each}
            </div>
        {/if}
    </div>
        <!--
        <table>
            {#each data.results as result}
                    <tr>
                        <td colspan="4">
                            <Pulse color="#FF0000" size="28" unit="px" duration="1s" />
                            [spinner]
                        </td>
                    </tr>
                        {#each res as { word, root, cls, props }}
                            <tr>
                                <td class="input-word">{word}</td>
                                <td class="root-word">{root}</td>
                                <td class="word-cls">{cls}</td>
                                <td class="word-props">{props}</td>
                            </tr>
                        {/each}
            {/each}
        </table>
        -->
</main>

<style>
    main {
        margin-left: 34px;
    }

    div.results {
        margin-top: 1.5em;
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
