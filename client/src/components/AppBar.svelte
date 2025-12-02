<script lang="ts">
    import { AppBar } from "@skeletonlabs/skeleton-svelte";
    import { t } from "svelte-intl-precompile";
    import SelectLocale from "./SelectLocale.svelte";
    import { resolve } from "$app/paths";
    import giellatekno_logo from "$assets/giellatekno_logo_official.png";
    import { page } from "$app/state";
    import { GlobeIcon, InfoIcon, MenuIcon, WrenchIcon } from "@lucide/svelte";
</script>

<AppBar
    class="bg-surface-50-950 border-surface-950-50 sticky top-0 z-50 border-b-2"
>
    <AppBar.Toolbar
        class="mx-auto w-full max-w-[1700px] grid-cols-[1fr_auto_1fr] xl:grid-cols-[auto_auto]"
    >
        <AppBar.Lead class="xl:hidden">
            <button class="btn-icon">
                <MenuIcon class="size-4" />
            </button>
        </AppBar.Lead>
        <AppBar.Headline class="flex flex-row gap-4">
            <a
                href={resolve("/")}
                class="flex flex-row items-center justify-start gap-4 text-xl font-bold xl:text-3xl"
            >
                <img
                    class="hidden h-10 scale-100 xl:block"
                    src={giellatekno_logo}
                    alt="Giellatekno logo"
                />

                Webpipeline
            </a>
            <a href={resolve("/")} class="xl:btn hover:preset-tonal hidden">
                <GlobeIcon class="size-6" />
                {$t("languages")}
            </a>
            {#if page.params.lang}
                <a
                    href={resolve(`/${page.params.lang}`)}
                    class="xl:btn hover:preset-tonal hidden"
                >
                    <WrenchIcon class="size-6" />
                    {$t("toolspage")}
                </a>
            {/if}
        </AppBar.Headline>

        <AppBar.Trail class="hidden h-full flex-row gap-4 xl:flex">
            <a class="btn hover:preset-tonal" href={resolve("/about")}>
                <InfoIcon />
                {$t("about")}
            </a>
            <SelectLocale />
        </AppBar.Trail>
    </AppBar.Toolbar>
</AppBar>
