<script lang="ts">
    import { CASES, CASE_NUMBERS, NUMBERS } from "./sme_paradigm_options";
    import type { ParsedParadigm } from "$lib/parsers";
    import { get_entry } from "$lib/utils";
    import Table from "$components/Table.svelte";
    import { m } from "$lib/paraglide/messages";

    let { elem }: { elem: ParsedParadigm } = $props();

    let has_possessive_suffixes = $derived(
        elem.wordforms.keys().find((e) => e.includes("+Px")),
    );

    function px_case_rows(
        elem: ParsedParadigm,
        case_tag: string,
        case_num_tag: string,
    ) {
        let re = new RegExp(
            `${case_num_tag}(?:\\+${case_tag})?\\+Px(Sg|Du|Pl)(\\d)`,
        );
        return [
            ...new Set(
                elem.wordforms
                    .keys()
                    .filter((val) => re.test(val))
                    .map((val) => val[val.length - 1])
                    .toArray()
                    .sort(),
            ),
        ];
    }

    const owners: Record<string, string> = {
        Sg: "mu/du/su",
        Du: "munno/dudno/sudno",
        Pl: "min/din/sin",
    };
</script>

<div class="flex flex-col gap-2">
    <h3 class="h4 xl:h3">{m.paradigm_generalforms()}</h3>
    <Table>
        <thead>
            <tr>
                <th>{m.paradigm_case()}</th>
                <th>{m.paradigm_singular()}</th>
                <th>{m.paradigm_plural()}</th>
            </tr>
        </thead>
        <tbody>
            {#each Object.entries(CASES) as [tag, name]}
                {@const row_exists = elem.wordforms
                    .keys()
                    .find((e) => e.endsWith(tag))}
                {#if row_exists}
                    {#if !(tag === "Ess")}
                        <tr>
                            <td class="bg-surface-100-900 border-r-2">
                                {m[`paradigm_${name}`]()}
                            </td>
                            <td>
                                {@html get_entry(`Sg+${tag}`, elem)}
                            </td>
                            <td>
                                {@html get_entry(`Pl+${tag}`, elem)}
                            </td>
                        </tr>
                    {:else}
                        <tr>
                            <td class="bg-surface-100-900">
                                {m[`paradigm_${name}`]()}
                            </td>
                            <td colspan="2" class="text-center">
                                {@html get_entry(tag, elem)}
                            </td>
                        </tr>
                    {/if}
                {/if}
            {/each}
        </tbody>
    </Table>
</div>
{#if has_possessive_suffixes}
    <div class="hidden xl:block">
        {@render px_desktop()}
    </div>
    <div class="xl:hidden">
        {@render px_mobile()}
    </div>
{/if}

{#snippet px_desktop()}
    <div class="flex flex-col gap-2">
        <h3 class="h3">{m.paradigm_possessivesuffixes()}</h3>
        <Table>
            <thead>
                <tr>
                    <th>{m.paradigm_case()}</th>
                    <th>{m.paradigm_person_short()}</th>
                    <th>{m.paradigm_singular()}</th>
                    <th>{m.paradigm_dual()}</th>
                    <th>{m.paradigm_plural()}</th>
                </tr>
            </thead>
            <tbody>
                {#each Object.entries(CASES) as [case_tag, case_name]}
                    {#if !(case_tag === "Ess")}
                        {#each Object.entries(CASE_NUMBERS) as [case_num_tag, case_num_name]}
                            {@const rows = px_case_rows(
                                elem,
                                case_tag,
                                case_num_tag,
                            )}
                            {#if rows}
                                {#each rows as pers_tag}
                                    {@const is_last =
                                        pers_tag === rows[rows.length - 1]}
                                    <tr class:separate={is_last}>
                                        {#if pers_tag === rows[0]}
                                            <td
                                                class="bg-surface-100-900"
                                                rowspan={rows.length}
                                            >
                                                {m[
                                                    `paradigm_${case_num_name}`
                                                ]()}
                                                <br />
                                                {m[`paradigm_${case_name}`]()}
                                            </td>
                                        {/if}
                                        <td class="bg-surface-100-900">
                                            {pers_tag}.
                                        </td>
                                        {#each Object.keys(NUMBERS) as num_tag}
                                            <td>
                                                {@html get_entry(
                                                    `${case_num_tag}+${case_tag}+Px${num_tag}${pers_tag}`,
                                                    elem,
                                                )}
                                            </td>
                                        {/each}
                                    </tr>
                                {/each}
                            {/if}
                        {/each}
                    {:else}
                        {@const rows = px_case_rows(elem, case_tag, "")}
                        {#if rows}
                            {#each rows as pers_tag}
                                <tr>
                                    {#if pers_tag === rows[0]}
                                        <td
                                            class="bg-surface-100-900"
                                            rowspan={rows.length}
                                        >
                                            {m[`paradigm_${case_name}`]()}
                                        </td>
                                    {/if}
                                    <td class="bg-surface-100-900">
                                        {pers_tag}.
                                    </td>
                                    {#each Object.keys(NUMBERS) as num_tag}
                                        <td>
                                            {@html get_entry(
                                                `${case_tag}+Px${num_tag}${pers_tag}`,
                                                elem,
                                            )}
                                        </td>
                                    {/each}
                                </tr>
                            {/each}
                        {/if}
                    {/if}
                {/each}
            </tbody>
        </Table>
    </div>
{/snippet}

{#snippet px_mobile()}
    <div class="flex flex-col gap-2">
        <h4 class="h4">{m.paradigm_possessivesuffixes()}</h4>
        <div class="flex flex-col gap-2">
            {#each Object.entries(NUMBERS) as [num_tag, num_name]}
                <h6 class="h6 mt-2">
                    {m[`paradigm_${num_name}`]()} owner ({owners[num_tag]})
                </h6>
                <Table>
                    <thead>
                        <tr>
                            <th>{m.paradigm_case()}</th>
                            <th>{m.paradigm_person_short()}</th>
                            <th>{m[`paradigm_${num_name}`]()}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each Object.entries(CASES) as [case_tag, case_name]}
                            {#if !(case_tag === "Ess")}
                                {#each Object.entries(CASE_NUMBERS) as [case_num_tag, case_num_name]}
                                    {@const rows = px_case_rows(
                                        elem,
                                        case_tag,
                                        case_num_tag,
                                    )}
                                    {#if rows}
                                        {#each rows as pers_tag}
                                            {@const is_last =
                                                pers_tag ===
                                                rows[rows.length - 1]}
                                            <tr class:separate={is_last}>
                                                {#if pers_tag === rows[0]}
                                                    <td
                                                        class="bg-surface-100-900 w-fit"
                                                        rowspan={rows.length}
                                                    >
                                                        {case_num_tag}. {case_tag}.
                                                    </td>
                                                {/if}
                                                <td class="bg-surface-100-900">
                                                    {pers_tag}.
                                                </td>
                                                <td>
                                                    {@html get_entry(
                                                        `${case_num_tag}+${case_tag}+Px${num_tag}${pers_tag}`,
                                                        elem,
                                                    )}
                                                </td>
                                            </tr>
                                        {/each}
                                    {/if}
                                {/each}
                            {:else}
                                {@const rows = px_case_rows(elem, case_tag, "")}
                                {#if rows}
                                    {#each rows as pers_tag}
                                        <tr>
                                            {#if pers_tag === rows[0]}
                                                <td
                                                    class="bg-surface-100-900"
                                                    rowspan={rows.length}
                                                >
                                                    {case_tag}.
                                                </td>
                                            {/if}
                                            <td class="bg-surface-100-900">
                                                {pers_tag}.
                                            </td>
                                            <td>
                                                {@html get_entry(
                                                    `${case_tag}+Px${num_tag}${pers_tag}`,
                                                    elem,
                                                )}
                                            </td>
                                        </tr>
                                    {/each}
                                {/if}
                            {/if}
                        {/each}
                    </tbody>
                </Table>
            {/each}
        </div>
    </div>
{/snippet}
