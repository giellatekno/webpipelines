<script lang="ts">
    import { t } from "svelte-intl-precompile";
    import type { PageData } from "./$types";
    import { page } from "$app/stores";
    import { base } from "$app/paths";

    // this isn't used
    import WordInput from "$components/WordInput.svelte";
    import { only_on_enter } from "$lib/utils.js";

    export let data: PageData;

    $: console.log("new data", data);

    // the search text
    let value = "";

    $: usage = get_usage($page.params.lang, $t);
    $: instruction = $t(`instruction.tool.generate`);

    function get_usage(lang: string, $t) {
        const lang_specific = $t(`usage.lang.${lang}`);
        if (lang_specific !== `usage.lang.${lang}`) {
            return lang_specific;
        } else {
            const fallback = $t("usage");
            return fallback;
        }
    }

    function reset() {
        value = "";
    }
</script>

<main>
    <span>
        <h1>{$t("generate")}</h1>
        <a href="{base}/{$page.params.lang}">[l6e] Tilbake til verktøy</a>
    </span>

    <p>{@html usage}</p>
    <p>{@html instruction}</p>

    <form
        data-sveltekit-replacestate
        data-sveltekit-keepfocus
    >
        <div class="searchinput">
            <input name="q" type="text" bind:value>
            <span
                class:active={value.length > 0}
                class="cross"
                on:click={reset}
                on:keydown={only_on_enter(reset)}
                tabindex="0"
                role="button"
            >&#x2718;</span>
        </div>
    </form>

    <div class="results">
        {#if data.error}
            Error: {data.error}
        {/if}

        {#if data.results?.generated}
            <div>
                {#each data.results.generated as result}
                    {result}<br>
                {:else}
                    No analyses
                {/each}
            </div>
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

    div.searchinput {
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        min-height: 3em;
        border-radius: 8px;
        border: 2px solid #9d9db0;
        transition:
            width ease-out 0.18s,
            border-radius ease-out 0.18s,
            border-color ease-out 0.18s;
    }

    div.searchinput:focus-within {
        border-radius: 14px;
        border: 2px solid #7777ee;
        box-shadow: 0px 2px 8px 0px rgba(200, 200, 255, 0.9);
    }

    div.searchinput > input {
        margin-left: 6px;
        font-size: 16px;
        font-family: Roboto, sans-serif;
        border: 0;
        outline: 0;
        padding: 8px;
    }
    div.searchinput > input:focus {
        border: 0;
        outline: 0;
    }
    div.searchinput > span.cross {
        color: #9d9db0;
        /*color: gray;*/
        cursor: pointer;
        font-size: 1.5em;
        margin-right: 0.4em;
        transition: color ease-out 0.18s;
    }
    div.searchinput > div:focus-within > span.cross.active {
        color: #f05555;
    }
</style>
