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
    <h3 class="h3">{$t("about.title")}</h3>
</div>

<div>TODO</div>
