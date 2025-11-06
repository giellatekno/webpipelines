<script lang="ts">
    import { t } from "svelte-intl-precompile";
    let { description, usage } = $props();
</script>

<div class="mb-2 flex flex-row gap-4">
    <div
        class="card preset-filled-surface-100-900 border-secondary-500 w-sm border-2 p-4 shadow-md"
    >
        <h6 class="h6">{$t("description.title")}</h6>
        <p class="mt-2">{@html description}</p>
    </div>
    {#if usage}
        <div
            class="card preset-filled-surface-100-900 border-secondary-500 w-sm border-2 p-4 shadow-md"
        >
            <h6 class="h6">{$t("usage.title")}</h6>
            <p class="mt-2">{@html usage}</p>
        </div>
    {/if}
</div>
