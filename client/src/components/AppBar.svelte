<script lang="ts">
    import { AppBar } from "@skeletonlabs/skeleton-svelte";
    import { t } from "svelte-intl-precompile";
    import SelectLocale from "./SelectLocale.svelte";
    import { resolve } from "$app/paths";
    import giellatekno_logo from "$assets/giellatekno_logo_official.png";
</script>

<AppBar>
    <AppBar.Toolbar class="grid-cols-[auto_auto]">
        <AppBar.Headline>
            <a
                href={resolve("/")}
                class="text-4xl font-bold flex flex-row gap-4 items-center"
            >
                <img
                    class="scale-100 h-10"
                    src={giellatekno_logo}
                    alt="Giellatekno logo"
                />

                {$t("languagetools")}
            </a>
        </AppBar.Headline>

        <AppBar.Trail class="flex flex-row gap-2">
            <a class="btn hover:preset-tonal w-fit" href={resolve("/about")}>
                {$t("about")}
            </a>
            <a
                class="btn hover:preset-tonal w-fit"
                href={resolve("/developers")}
            >
                {$t("developers")}
            </a>
            <SelectLocale />
        </AppBar.Trail>
    </AppBar.Toolbar>
</AppBar>
