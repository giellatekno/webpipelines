<script lang="ts">
    import { t } from "svelte-intl-precompile";
    import { page } from "$app/state";
    import { resolve } from "$app/paths";
    import { ArrowRight, ChevronRight, Earth, MoveLeft } from "@lucide/svelte";
    import { langname } from "$lib/langnames";
    import { locale } from "$lib/locales";

    let { children } = $props();

    let lang = $derived(page.params.lang || "");

    // Get last part of url
    let tool = $derived(
        page.url.pathname.split("/").filter(Boolean).pop() || "",
    );
</script>

<div class="flex flex-col gap-4">
    <a
        class="btn preset-outlined-primary-500 hover:preset-tonal w-fit"
        href={resolve("/")}
    >
        <Earth />
        <span>{$t("exploreanotherlang")}</span>
    </a>
    <div class="flex flex-row items-center gap-2">
        <a href={resolve(`/${lang}`)} class="h3 hover:underline">
            {langname(lang, $locale)}
        </a>
        <ChevronRight class="size-8" />

        <h3 class="h3">{$t(tool)}</h3>
    </div>
    <hr class="hr" />
    <span class="mb-4 flex flex-col gap-2">
        <a
            class="btn btn-sm preset-outlined-primary-500 hover:preset-tonal w-fit"
            href={resolve(`/${page.params.lang}`)}
        >
            <MoveLeft />
            {$t("backtotools")}
        </a>
    </span>
</div>

{@render children?.()}
