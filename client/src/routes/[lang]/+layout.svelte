<script lang="ts">
    import { resolve } from "$app/paths";
    import { page } from "$app/state";
    import { Earth } from "@lucide/svelte";
    import { t } from "svelte-intl-precompile";

    let { children } = $props();
</script>

<div class="flex flex-col gap-2">
    <a class="btn preset-outlined-primary-500 w-fit" href={resolve("/")}>
        <Earth />
        <span> [l6e] Explore another language </span>
    </a>
    <h3 class="h3">{$t("title.tool.analyze.lang." + page.params.lang)}</h3>
</div>

<hr class="hr my-4" />

{@render children?.()}
