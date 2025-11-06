<script>
    import { t } from "svelte-intl-precompile";
</script>

<footer
    class="bg-surface-100-900 border-primary-500 flex w-full justify-between border-t p-2"
>
    <span>
        {$t("copyright")}
    </span>
    <span>
        {$t("feedback")}:
        <a href="mailto:giellatekno@uit.no" class="hover:underline">
            giellatekno@uit.no
        </a>
    </span>
</footer>
