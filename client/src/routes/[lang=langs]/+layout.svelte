<script lang="ts">
    import { page } from "$app/state";
    import { langname } from "$lib/langnames";
    import { ChevronRight } from "@lucide/svelte";
    import { resolve } from "$app/paths";
    import { m } from "$lib/paraglide/messages";
    import { getLocale } from "$lib/paraglide/runtime";
    import type { Tools } from "$lib/langs";

    let { children } = $props();

    let lang = $derived(page.params.lang || "");

    // Get last part of url
    let last_part = $derived(page.url.pathname.split("/").filter(Boolean).pop() || "");

    const tool_titles = {
        analyze: m.analyze_title,
        dependency: m.dependency_title,
        disambiguate: m.disambiguate_title,
        generate: m.generate_title,
        hyphenate: m.hyphenate_title,
        num: m.num_title,
        paradigm: m.paradigm_title,
        transcribe: m.transcribe_title,
    };

    function isTool(s: string) {
        return Object.keys(tool_titles).includes(s);
    }
</script>

<div class="mx-2 lg:my-4">
    {#if lang === last_part}
        <h3 class="h5 lg:h3">{m.toolsfor({ iso: lang })}</h3>
    {:else if isTool(last_part)}
        {@const tool: Tools = last_part as Tools}
        <div class="flex flex-col gap-1 lg:flex-row lg:items-center">
            <span class="flex flex-row items-center gap-1">
                <a href={resolve(`/${lang}`)} class="lg:h3 h6 hover:underline">
                    {langname(lang, getLocale())}
                </a>
                <ChevronRight class="size-5 lg:size-8" />
            </span>

            <h3 class="h6 lg:h3">{tool_titles[tool]()}</h3>
        </div>
    {/if}
</div>

<hr class="hr my-4" />

{@render children?.()}
