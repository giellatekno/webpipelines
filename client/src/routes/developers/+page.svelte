<script>
    import { t } from "svelte-intl-precompile";

    const apilink = '<a rel="external" href="https://gtweb-02.uit.no/webpipeline-api/">gtweb-02.uit.no/webpipeline-api/</a>';
    const repolink = '<a rel="external" href="https://github.com/giellatekno/webpipelines">github.com/giellatekno/webpipelines</a>';
</script>

<h1>{@html $t("fordevelopers")}</h1>

<h2>API</h2>

<p>{@html $t("api.paragraph", { values: { apilink } })}</p>


<h2>{$t("sourcecode")}</h2>

<p>{@html $t("developers.code.paragraph", { values: { repolink } })}</p>

<p>{$t("developers.code.paragraph2")}</p>

<style>
    h2 {
        font-size: 2em;
    }
</style>
