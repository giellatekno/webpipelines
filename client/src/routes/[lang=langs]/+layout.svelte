<script lang="ts">
    import { page } from "$app/state";
    import { locale, t } from "svelte-intl-precompile";
    import { langname } from "$lib/langnames";
    import { ChevronRight } from "@lucide/svelte";
    import { resolve } from "$app/paths";

    let { children } = $props();

    let lang = $derived(page.params.lang || "");

    // Get last part of url
    let last_part = $derived(
        page.url.pathname.split("/").filter(Boolean).pop() || "",
    );
</script>

<div class="mx-2 my-4">
    {#if lang === last_part}
        <h3 class="h3">{$t(`toolsfor.${lang}`)}</h3>
    {:else}
        <div class="flex flex-row items-center gap-2">
            <a href={resolve(`/${lang}`)} class="h3 hover:underline">
                {langname(lang, $locale)}
            </a>
            <ChevronRight class="size-8" />

            <h3 class="h3">{$t(last_part)}</h3>
        </div>
    {/if}
</div>

<hr class="hr my-4" />

{@render children?.()}
