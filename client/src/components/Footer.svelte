<script>
    import { t } from "svelte-intl-precompile";
</script>

<footer
    class="grid grid-cols-2 fixed bottom-0 p-2 bg-surface-100-900 border-t border-primary-500 w-full"
>
    <span class="place-self-start">
        {$t("copyright")}
    </span>
    <span class="place-self-end">
        {$t("feedback")}:
        <a href="mailto:giellatekno@uit.no" class="hover:underline">
            giellatekno@uit.no
        </a>
    </span>
</footer>
