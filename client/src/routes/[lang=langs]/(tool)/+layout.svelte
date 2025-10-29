<script lang="ts">
    import { t } from "svelte-intl-precompile";
    import { page } from "$app/state";
    import { resolve } from "$app/paths";
    import { MoveLeft } from "@lucide/svelte";
    import { derived } from "svelte/store";

    let { children } = $props();

    let tool = $derived(
        page.url.pathname.split("/").filter(Boolean).pop() || "",
    );
</script>

<span class="flex flex-col gap-2 mb-4">
    <a
        class="btn btn-sm preset-outlined-primary-500 w-fit"
        href={resolve(`/${page.params.lang}`)}
    >
        <MoveLeft />
        {$t("backtotools")}
    </a>
    <h1 class="h4">{$t(tool)}</h1>
</span>

{@render children?.()}
