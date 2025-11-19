<script>
    import { t } from "svelte-intl-precompile";
</script>

<footer
    class="bg-surface-800-200 text-surface-100-900 flex w-full justify-center p-4"
>
    <div class="flex flex-col gap-4 text-center">
        <div>
            {$t("feedback")}
            <a
                href="mailto:giellatekno@uit.no"
                class="text-primary-300-700 hover:underline"
            >
                giellatekno@uit.no
            </a>
        </div>
        <div>
            {$t("copyright")}
        </div>
    </div>
</footer>
