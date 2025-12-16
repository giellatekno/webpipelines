<script lang="ts">
    import { t } from "svelte-intl-precompile";
    import giellatekno_logo from "$assets/giellatekno_logo.svg";
    import uit_logo_sme from "$assets/uit_logo/UiT_Segl_Sam_Hvit.png";
</script>

<footer
    class="bg-surface-800-200 text-surface-100-900 flex w-full justify-center p-4"
>
    <div
        class="grid grid-cols-[1fr_1fr] place-items-center gap-2 xl:grid-cols-[1fr_auto_1fr]"
    >
        <img
            class="order-2 h-5 scale-100 invert xl:order-1 xl:block xl:h-10"
            src={giellatekno_logo}
            alt="Giellatekno logo"
        />
        <div
            class="order-1 col-span-2 flex flex-col justify-between gap-4 text-center text-xs xl:order-2 xl:col-span-1 xl:text-base"
        >
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
        <img
            class="order-3 h-10 scale-100 xl:block xl:h-20"
            src={uit_logo_sme}
            alt="UiT logo"
        />
    </div>
</footer>
