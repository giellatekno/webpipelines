<script lang="ts">
    import ToolDescription from "./ToolDescription.svelte";

    let { children, tool } = $props();
</script>

<div class="flex w-full max-w-xl flex-col gap-2">
    <ToolDescription {tool} />
    <div
        class="card preset-filled-surface-100-900 border-surface-200-800 w-full border p-4 xl:w-xl"
    >
        {@render children?.()}
    </div>
</div>
