<script lang="ts">
    import type { ParsedParadigm } from "$lib/parsers";
    import { t } from "svelte-intl-precompile";
    import { CASES } from "../sme_paradigm_options";
    import { get_word } from "$lib/utils";

    let { elem }: { elem: ParsedParadigm } = $props();
</script>

<table class="table h-fit w-fit border text-lg">
    <thead>
        <tr
            class="bg-primary-50-950 text-surface-950-50 font-bold [&>td]:border"
        >
            <td>{$t("paradigm.case")}</td>
            <td>{$t("paradigm.singular")}</td>
            <td>{$t("paradigm.plural")}</td>
        </tr>
    </thead>
    <tbody>
        {#each Object.entries(CASES) as [tag, name]}
            {@const row_exists = elem.wordforms
                .keys()
                .find((e) => e.endsWith(tag))}
            {#if row_exists}
                {#if !(tag === "Ess")}
                    <tr class="[&>td]:border [&>td]:pr-4">
                        <td class="bg-surface-100-900">
                            {$t(`paradigm.${name}`)}
                        </td>
                        <td>
                            {get_word(`Sg+${tag}`, elem)}
                        </td>
                        <td>
                            {get_word(`Pl+${tag}`, elem)}
                        </td>
                    </tr>
                {:else}
                    <tr class="[&>td]:border">
                        <td class="bg-surface-100-900">
                            {$t(`paradigm.${name}`)}
                        </td>
                        <td colspan="2" class="text-center">
                            {get_word(tag, elem)}
                        </td>
                    </tr>
                {/if}
            {/if}
        {/each}
    </tbody>
</table>
