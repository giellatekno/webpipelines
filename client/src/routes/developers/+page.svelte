<script>
    import { resolve } from "$app/paths";
    import { EarthIcon } from "@lucide/svelte";
    import { t } from "svelte-intl-precompile";
</script>

<div class="flex flex-col gap-6">
    <a
        class="btn w-fit preset-outlined-primary-500 hover:preset-tonal"
        href={resolve("/")}
    >
        <EarthIcon />
        {$t("backtolangs")}
    </a>
    <h3 class="h3">{$t("fordevelopers")}</h3>
</div>

<div
    class="card w-xl mt-2 p-4 preset-filled-surface-100-900 border-2 border-secondary-500"
>
    <h4 class="h4">API</h4>

    <p>
        {$t("api.paragraph")}
        <a
            class="text-primary-700-300 hover:underline"
            rel="external"
            href="https://gtweb-02.uit.no/webpipeline-api/"
            target="_blank"
        >
            gtweb-02.uit.no/webpipeline-api/
        </a>
    </p>

    <h4 class="h4 mt-2">{$t("sourcecode")}</h4>

    <p>
        {$t("developers.code.paragraph")}
        <a
            class="text-primary-700-300 hover:underline"
            rel="external"
            href="https://github.com/giellatekno/webpipelines"
            target="_blank"
        >
            github.com/giellatekno/webpipelines
        </a>
    </p>

    <p>{$t("developers.code.paragraph2")}</p>
</div>
