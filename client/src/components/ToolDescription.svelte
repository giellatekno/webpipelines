<script lang="ts">
    import { t } from "svelte-intl-precompile";
    let { description, usage } = $props();
</script>

<div class="flex flex-row gap-4 mb-2">
    <div
        class="card p-4 w-sm shadow-md preset-filled-surface-100-900 border-2 border-secondary-500"
    >
        <h6 class="h6">{$t("description.title")}</h6>
        <p class="mt-2">{@html description}</p>
    </div>
    {#if usage}
        <div
            class="card p-4 w-sm shadow-md preset-filled-surface-100-900 border-2 border-secondary-500"
        >
            <h6 class="h6">{$t("usage.title")}</h6>
            <p class="mt-2">{@html usage}</p>
        </div>
    {/if}
</div>
