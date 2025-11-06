<script>
    import { t } from "svelte-intl-precompile";
</script>

<footer
    class="bg-surface-100-900 border-primary-500 fixed bottom-0 grid w-full grid-cols-2 border-t p-2"
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
