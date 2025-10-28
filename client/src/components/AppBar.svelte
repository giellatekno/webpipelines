<script lang="ts">
    import { AppBar } from "@skeletonlabs/skeleton-svelte";
    import { t } from "svelte-intl-precompile";
    import SelectLocale from "./SelectLocale.svelte";
    import { resolve } from "$app/paths";
    import { page } from "$app/state";
    import { MoveLeft } from "@lucide/svelte";
</script>

<AppBar>
    <AppBar.Toolbar class="grid-cols-[auto_auto]">
        <AppBar.Headline>
            <p class="text-4xl font-bold">{$t("languagetools")}</p>
        </AppBar.Headline>

        <AppBar.Trail class="flex flex-row gap-2">
            <a class="btn hover:preset-tonal w-fit" href={resolve("/about")}
                >[l6e] About</a
            >
            <a
                class="btn hover:preset-tonal w-fit"
                href={resolve("/developers")}>[l6e] Developers</a
            >
            <SelectLocale />
        </AppBar.Trail>
    </AppBar.Toolbar>
</AppBar>
