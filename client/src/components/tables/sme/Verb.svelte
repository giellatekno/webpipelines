<script lang="ts">
    import type { ParsedParadigm } from "$lib/parsers";
    import { t } from "svelte-intl-precompile";
    import { NUMBER_PERSONS, NUMBERS, PERSONS } from "../sme_paradigm_options";
    import { get_word } from "$lib/utils";

    let { elem }: { elem: ParsedParadigm } = $props();
</script>

<div class="flex flex-col gap-2">
    <h4 class="h4">[l6e] Indicative</h4>
    <table class="table h-fit w-fit border text-lg">
        <thead>
            <tr class="bg-primary-50-950 font-bold [&>td]:border">
                <td>Person</td>
                <td>Present</td>
                <td>Past</td>
            </tr>
        </thead>
        <tbody>
            {#each Object.entries(NUMBERS) as [num_tag, num_name]}
                {#each Object.entries(PERSONS) as [pers_tag, pers_name]}
                    <tr>
                        <td>{num_name} {pers_name}</td>
                        <td>
                            {get_word(`Ind+Prs+${num_tag}${pers_tag}`, elem)}
                        </td>
                        <td>
                            {get_word(`Ind+Prt+${num_tag}${pers_tag}`, elem)}
                        </td>
                    </tr>
                {/each}
            {/each}
        </tbody>
    </table>
</div>
