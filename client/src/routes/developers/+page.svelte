<script>
    import { t } from "svelte-intl-precompile";

    const apilink =
        '<a rel="external" href="https://gtweb-02.uit.no/webpipeline-api/">gtweb-02.uit.no/webpipeline-api/</a>';
    const repolink =
        '<a rel="external" href="https://github.com/giellatekno/webpipelines">github.com/giellatekno/webpipelines</a>';
</script>

<h3 class="h3">{$t("fordevelopers")}</h3>

<div
    class="card w-fit mt-2 p-2 preset-filled-surface-100-900 border border-surface-200-800"
>
    <h4 class="h4">API</h4>

    <p>{@html $t("api.paragraph", { values: { apilink: apilink } })}</p>

    <h4 class="h4 mt-2">{$t("sourcecode")}</h4>

    <p>
        {@html $t("developers.code.paragraph", {
            values: { repolink: repolink },
        })}
    </p>

    <p>{$t("developers.code.paragraph2")}</p>
</div>
