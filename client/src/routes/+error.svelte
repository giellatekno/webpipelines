<script lang="ts">
    import { page } from "$app/state";
    import { t } from "svelte-intl-precompile";
</script>

<div class="my-4 flex flex-col items-center">
    <div class="flex flex-col items-center gap-2 p-4">
        <div class="flex flex-row items-center">
            <h3 class="h3 text-error-500 font-bold">
                {page.status}: {page.error?.message}
            </h3>
        </div>
        {#if page.status === 404}
            <h4 class="h4">{$t("notfound")}</h4>
        {/if}
    </div>
</div>
