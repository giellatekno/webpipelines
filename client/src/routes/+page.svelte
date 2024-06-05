<script lang="ts">
    import { goto } from "$app/navigation";
    import { base } from "$app/paths";
    import { t, locale } from "svelte-intl-precompile";
    import Search from "$components/Search.svelte";
    import { langs, sami_langs, nonsamiuralic_langs, other_langs } from "$lib/langs.js";
    import { langname } from "$lib/langnames.js";
    import { only_on_enter } from "$lib/utils.js";

    let show_sami = false;
    let show_uralic = false;
    let filter_others = false;
    let search = "";

    $: visible_langs = filter_langs(search, show_sami, show_uralic, filter_others);
    $: console.log(visible_langs);

    function filter_langs(
        search: string,
        show_sami: boolean,
        show_uralic: boolean,
        filter_others: boolean,
    ) {
        const any_filters_on = show_sami || show_uralic || filter_others;
        let rootset = langs;
        if (any_filters_on) {
            rootset = [];
            if (show_sami) rootset.push(...sami_langs);
            if (show_uralic) rootset.push(...nonsamiuralic_langs);
            if (filter_others) rootset.push(...other_langs);
        }

        if (search === "") {
            return rootset;
        } else {
            return rootset
                .map(iso => [iso, langname(iso, "nob")])
                .filter(([iso, name]) => {
                    const lower = search.toLowerCase();
                    return iso.includes(lower) || name.toLowerCase().includes(lower);
                })
                .map(([iso, _name]) => iso);
        }
    }

    async function onenter() {
        if (visible_langs.length === 1) {
            const lang = visible_langs[0];
            await goto(`${base}/${lang}`);
        }
    }
</script>

<svelte:head>
	<title>Giellatekno Webpipeline</title>
	<meta name="description" content="Run Giellatekno Pipelines" />
</svelte:head>

<main>
    <h1>{$t("languagetools")}</h1>
    <div>
        <h2>{$t("index.showtoolsfordotdotdot")}</h2>

        <Search on:enter={onenter} bind:value={search} />
    </div>

    <div class="filters">
        <span class="header">{$t("filters")}:</span>
        <span
            class="label"
            role="button"
            tabindex="0"
            class:on={show_sami}
            on:click={() => show_sami = !show_sami}
            on:keydown={only_on_enter(() => show_sami = !show_sami)}
        >
            <label for="sami">{$t("samilanguages")}</label>
            <input name="sami" type="radio" checked={show_sami} />
        </span>

        <span
            class="label"
            role="button"
            tabindex="0"
            class:on={show_uralic}
            on:click={() => show_uralic = !show_uralic}
            on:keydown={only_on_enter(() => show_uralic = !show_uralic)}
        >
            <label for="uralicnonsami">{$t("nonsamiuralic")}</label>
            <input name="uralicnonsami" type="radio" checked={show_uralic} />
        </span>

        <span
            class="label"
            role="button"
            tabindex="0"
            class:on={filter_others}
            on:click={() => filter_others = !filter_others}
            on:keydown={only_on_enter(() => filter_others = !filter_others)}
        >
            <label for="others">{$t("otherlanguages")}</label>
            <input name="others" type="radio" checked={filter_others} />
        </span>
    </div>

    <!--<div class="langs" bind:this={langs_container_el}>-->
    <div class="langs">
        {#each visible_langs as lng}
            <!--<span class="language" class:grayed={!langs_in_api.includes(lng)}>-->
            <span class="language">
                <a href="{base}/{lng}">{langname(lng, $locale)}</a>
            </span>
        {:else}
            [l6e] Ingen treff på søkeordet...
        {/each}
    </div>
</main>

<style>
    div.filters {
        display: flex;
        font-variant: small-caps;
        margin-top: 8px;
    }

    div.filters > span.header {
        user-select: none;
        padding: 2px 0px;
        border-radius: 5px;
        color: #000;
        font-weight: bold;
    }

    span.label {
        margin-left: 16px;
        padding: 3px 8px;
        border-radius: 5px;
        /* brighter sami-blue */
        background-color: #6c8ed8;
        color: #292929;
        font-weight: bold;
        transition:
            background-color 0.2s ease-out,
            color 0.2s ease-out;
    }

    span.label:hover,
    span.label > label:hover {
        cursor: pointer;
    }

    span.label.on {
        background-color: #4651ea;
        /* sami blue */
        background-color: #0035aa;
        color: white;
    }

    span.label > input {
        appearance: none;
        display: none;
    }

    span.label > label {
        user-select: none;
    }

    div.langs {
        margin-top: 1em;
        display: grid;
        width: 800px;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }

    span.language {
        font-size: 20px;
        padding: 6px;
    }
</style>
