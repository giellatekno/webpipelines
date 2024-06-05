<script lang="ts">
    import { base } from "$app/paths";
    import example_img from "$assets/language.svg";
    import spellcheck_img from "$assets/spellcheck.svg";
    import hyphenate_img from "$assets/hyphenation.svg";
    import num_img from "$assets/num.svg";
    import ipa_img from "$assets/ipa.svg";
    import { t } from "svelte-intl-precompile";
    import type { PageData } from "./$types";
    import { tools_for } from "$lib/langs.js";

    export let data: PageData;

    const IMAGES = {
        spellcheck: spellcheck_img,
        hyphenate: hyphenate_img,
        num: num_img,
        transcribe: ipa_img,
    }
</script>

<h1>{$t("title.tool.analyze.lang." + data.lang)}</h1>

<div class="tools">
    {#each tools_for[data.lang] as tool}
        <!--<a href="{base}/{data.lang}/{tool}" class="tool" class:grayed={!tools_available.includes(tool)}>-->
        <a href="{base}/{data.lang}/{tool}" class="tool">
            <img src={IMAGES[tool] || example_img} alt="">
            <span class="title">{$t(tool)}</span>
            <span class="desc">
                {@html $t(tool + ".description")}
            </span>
        </a>
    {/each}
</div>

<style>
    .tools {
        display: grid;
        grid-template-columns: repeat(2, max-content);
        grid-gap: 18px;
    }

    a.tool { 
        display: grid;
        color: black;
        text-decoration: none;
        grid-template-areas:
            'img img title title title'
            'img img desc desc desc';
        grid-template-columns: 35px 35px repeat(3, max-content);
        /*background-color: #f7f2c9;*/
        /*border: 1px solid #e6bd4c;*/
        background-color: #a2b9ec;
        background-color: #acc1ef;
        border-radius: 2px;
        border: 1px solid #4972cc;
        padding: 4px 12px;
        box-shadow: 1px 2px 2px 0px rgba(51, 42, 106, 0.12);
        transition: background-color ease-out 0.25s;
    }

    a.tool.grayed {
        filter: grayscale(1.0) blur(0.5px);
        color: #757272;
        box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.44);
    }

        a.tool:hover {
        background-color: #ece268;
    }

    a.tool > img {
        align-self: center;
        grid-area: img;
        height: 68px;
        width: 68px;
    }

    a.tool > span.title {
        margin-left: 10px;
        justify-self: start;
        align-self: end;
        grid-area: title;
        font-size: 1.5em;
        font-weight: 500;
        font-variant: small-caps;
        margin-bottom: 6px;
    }

    a.tool > span.desc {
        margin-left: 12px;
        justify-self: start;
        align-self: start;
        grid-area: desc;
        font-style: italic;
        font-size: 1.05em;
    }
</style>
