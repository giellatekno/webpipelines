<script lang="ts">
    let { children } = $props();
</script>

<table
    class=" [&_th]:bg-primary-100-900 bg-surface-50 h-fit table-fixed border text-xs shadow-md xl:min-w-lg xl:text-lg [&_.separate]:border-b-3 [&_td]:border [&_td]:p-2 [&_td]:pr-4 [&_td]:text-wrap [&_th]:border [&_th]:p-2 [&_th]:text-left [&_tr>td]:first:w-1/4 [&>tbody]:border"
>
    {@render children?.()}
</table>
