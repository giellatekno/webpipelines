<script lang="ts">
    import { AppBar } from "@skeletonlabs/skeleton-svelte";
    import { t } from "svelte-intl-precompile";
    import SelectLocale from "./SelectLocale.svelte";
    import { resolve } from "$app/paths";
    import giellatekno_logo from "$assets/giellatekno_logo_official.png";
    import { page } from "$app/state";
    import { GlobeIcon, InfoIcon, WrenchIcon } from "@lucide/svelte";
</script>

<AppBar
    class="bg-surface-50-950 border-surface-950-50 sticky top-0 z-50 border-b-2"
>
    <AppBar.Toolbar class="mx-auto w-full max-w-[1700px] grid-cols-[auto_auto]">
        <AppBar.Headline class="flex flex-row gap-4">
            <a
                href={resolve("/")}
                class="flex flex-row items-center gap-4 text-3xl font-bold"
            >
                <img
                    class="h-10 scale-100"
                    src={giellatekno_logo}
                    alt="Giellatekno logo"
                />

                Webpipeline
            </a>
            <a href={resolve("/")} class="btn hover:preset-tonal">
                <GlobeIcon />
                {$t("languages")}
            </a>
            {#if page.params.lang}
                <a
                    href={resolve(`/${page.params.lang}`)}
                    class="btn hover:preset-tonal"
                >
                    <WrenchIcon />
                    {$t("toolspage")}
                </a>
            {/if}
        </AppBar.Headline>

        <AppBar.Trail class="flex h-full flex-row gap-4">
            <a class="btn hover:preset-tonal" href={resolve("/about")}>
                <InfoIcon />
                {$t("about")}
            </a>
            <SelectLocale />
        </AppBar.Trail>
    </AppBar.Toolbar>
</AppBar>
