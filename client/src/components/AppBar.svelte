<script lang="ts">
    import { AppBar } from "@skeletonlabs/skeleton-svelte";
    import { t } from "svelte-intl-precompile";
    import SelectLocale from "./SelectLocale.svelte";
    import { resolve } from "$app/paths";
    import giellatekno_logo from "$assets/giellatekno_logo_official.png";
</script>

<div class="">
    <AppBar class="bg-surface-50-950 border-surface-950-50 border-b-2">
        <AppBar.Toolbar
            class="mx-auto w-full max-w-[1700px] grid-cols-[auto_auto]"
        >
            <AppBar.Headline>
                <a
                    href={resolve("/")}
                    class="flex flex-row items-center gap-4 text-3xl font-bold"
                >
                    <img
                        class="h-10 scale-100"
                        src={giellatekno_logo}
                        alt="Giellatekno logo"
                    />

                    Webpipelines
                </a>
            </AppBar.Headline>

            <AppBar.Trail class="flex flex-row gap-2">
                <a
                    class="btn hover:preset-tonal w-fit"
                    href={resolve("/about")}
                >
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
</div>
