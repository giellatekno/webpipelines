<script lang="ts">
    import { resolve } from "$app/paths";
    import { page } from "$app/state";
    import { Earth } from "@lucide/svelte";
    import { locale, t } from "svelte-intl-precompile";
    import { langname } from "$lib/langnames";

    let { children } = $props();

    let lang = $derived(page.params.lang || "");
</script>

<div class="flex flex-col gap-4">
    <a
        class="btn preset-outlined-primary-500 hover:preset-tonal w-fit"
        href={resolve("/")}
    >
        <Earth />
        <span> {$t("exploreanotherlang")}</span>
    </a>
    <!-- TODO: More descriptive title. eg "North Sami tools" -->
    <h3 class="h3">{langname(lang, $locale)}</h3>
</div>

<hr class="hr my-4" />

{@render children?.()}
