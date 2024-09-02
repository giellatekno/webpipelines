<script lang="ts">
    import { base } from "$app/paths";
    import { t } from "svelte-intl-precompile";
    //import { lang } from "../lib/stores.js";
    //import { paradigm } from "../lib/api.js";
    import { page } from "$app/stores";
    import type { PageData } from "./$types";
    //import WordInput from "$components/WordInput.svelte";
    import RadioGroup from "$components/RadioGroup.svelte";
    //import FallbackParadigmLayout from "../components/paradigm_layouts/Fallback.svelte";
    export let data: PageData;

    //$: usage = $t(`usage.lang.${$lang}`);

    let value = $page.url.searchParams.get("word");
    if (value === null) value = "";
    let pos = "Any";
    let size = "Standard";
    const poses = {
        Any: "Any",
        Noun: "N",
        Verb: "V",
        Adjective: "A",
        Adverb: "Adv",
        Pronoun: "Pron",
        Num: "Num",
        // Pcle: "Pcle",
        // Po: "Po",
        // Pr: "Pr",
        //Adp: "Adp",
    };
    const paradigm_sizes = {
        Minimal: "minimal",
        Standard: "standard",
        Full: "full",
    };

    $: usage = get_usage($page.params.lang, $t);

    function get_usage(lang: string, $t: (key: string) => string) {
        const lang_specific = $t(`usage.lang.${lang}`);
        if (lang_specific !== `usage.lang.${lang}`) {
            return lang_specific;
        } else {
            const fallback = $t("usage");
            return fallback;
        }
    }

    /*
    let paradigm_component;
    let api_data;
    $: update_data(input, pos, $lang, size);

    async function update_data(input, pos, lang, size) {
        if (!input) {
            api_data = null;
            paradigm_component = null;
            return;
        }

        pos = poses[pos];
        api_data = await paradigm(lang, input, pos, paradigm_sizes[size]);

        if (api_data === null) {
            paradigm_component = null;
            return;
        }

        if (pos === "Any") {
            // determine pos from api_data
        } else {
            const path = `../components/paradigm_layouts/${lang}/${pos}.svelte`;
            try {
                const module = await import(path);
                paradigm_component = module.default;
            } catch (e) {
                console.log(`no module for (${lang},${pos}), showing fallback`);
                paradigm_component = FallbackParadigmLayout;
            }
        }
    }
    */
</script>

<main>
    <span>
        <h1>{$t("paradigm")}</h1>
        <a href="{base}/{$page.params.lang}">[l6e] Tilbake til verktøy</a>
    </span>

    <p>{@html usage}</p>


    <form
        data-sveltekit-keepfocus
    >
        <RadioGroup
            name="size"
            header="Paradigmestørrelse"
            bind:selected={size}
            choices={Object.entries(paradigm_sizes)}
        />
        <RadioGroup
            name="pos"
            header={$t("partofspeech")}
            bind:selected={pos}
            choices={Object.entries(poses)}
        />
        <div class="search">
            <input {value} name="word">
            <span
                class:active={value && value.length > 0}
                class="cross"
                on:click={() => value = ""}
                on:keypress={ev => ev.key == "Enter" ? value = "" : null}
                tabindex="0"
                role="button"
            >&#x2718;</span>
        </div>
        <button type="submit">Send</button>
        <!--
        <WordInput
            debounce={1000}
            on:new-value={({ detail }) => { console.log(detail); } }
            on:reset-value={() => input = ""}
            on:new-input-started={() => input = ""}
        />
        -->
    </form>

    <div style="height: 16px" /> <!-- just for some space -->

    {#if data?.results}
        {@html data.results.text}
    {/if}
</main>

<style>
    main {
        margin-left: 34px;
    }

    h1 {
        display: inline-block;
        padding-right: 1em;
        padding-bottom: 0;
        margin-bottom: 0;
    }

    div.search {
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
    div.search:focus-within {
        border-radius: 14px;
        border: 2px solid #7777ee;
        box-shadow: 0px 2px 8px 0px rgba(200, 200, 255, 0.9);
    }

    div.search > input {
        margin-left: 6px;
        font-size: 16px;
        font-family: Roboto, sans-serif;
        border: 0;
        outline: 0;
        padding: 8px;
    }
    div.search > input:focus {
        border: 0;
        outline: 0;
    }
    div.search > span.cross {
        color: #9d9db0;
        /*color: gray;*/
        cursor: pointer;
        font-size: 1.5em;
        margin-right: 0.4em;
        transition: color ease-out 0.18s;
    }
    div.search > div:focus-within > span.cross.active {
        color: #f05555;
    }
</style>
