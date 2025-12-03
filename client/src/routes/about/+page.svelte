<script>
    import { t } from "svelte-intl-precompile";
</script>

<div class="my-4 flex w-full justify-center">
    <div class="grid grid-cols-1 gap-4 xl:max-h-max xl:w-2/3 xl:grid-cols-2">
        <div class="w-full">
            <h4 class="h5 xl:h4">{$t("about.title")}</h4>
            <div
                class="card bg-surface-100-900/70 border-secondary-500 mt-2 flex flex-col gap-2 border-2 p-4 shadow-md"
            >
                TODO
            </div>
        </div>
        <div class=" flex w-full flex-col">
            <div>
                <h4 class="h5 xl:h4">{$t("fordevelopers")}</h4>
                <div
                    class="card bg-surface-100-900/70 border-secondary-500 mt-2 flex flex-col gap-2 border-2 p-4 shadow-md"
                >
                    <h5 class="h6 xl:h5">API</h5>
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
                    <h5 class="h6 xl:h5 mt-2">{$t("sourcecode")}</h5>
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
            </div>
        </div>
    </div>
</div>
