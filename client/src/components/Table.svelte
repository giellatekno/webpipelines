<script lang="ts">
    let { children } = $props();
</script>

<table
    class=" [&_th]:bg-primary-100-900 w-fit overflow-x-scroll border text-lg shadow-md [&_.separate]:border-b-3 [&_td]:max-w-sm [&_td]:border [&_td]:p-2 [&_td]:pr-4 [&_td]:text-wrap [&_td]:md:overflow-x-scroll [&_th]:border [&_th]:p-2 [&_th]:text-left [&_tr]:hover:bg-amber-100 [&>tbody]:border [&>thead]:[&>tr]:border-b-3"
>
    {@render children?.()}
</table>
