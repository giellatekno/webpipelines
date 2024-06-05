<script>
    import { base } from "$app/paths";
    import { t } from "svelte-intl-precompile";
    import { locale } from "$lib/locales.js";
    import { langname } from "$lib/langnames.js";
    import { page } from "$app/stores";
</script>

<main>
    {#if $page.data.lang}
        <span class="separator">&#xB7;</span>
        {$t("nowexploring")} {langname($page.data.lang, $locale)}&nbsp;
        <a href="{base}">{$t("exploreanotherlang")}</a>
    {/if}
</main>

<style>
    main {
        display: inline-flex;
        align-items: center;
    }

    span.separator {
        margin-left: 6px;
        margin-right: 6px;
    }
</style>
