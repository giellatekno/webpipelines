<script lang="ts">
    import { t } from "svelte-intl-precompile";
    import { CASES, CASE_NUMBERS, NUMBERS } from "../sme_paradigm_options";
    import type { ParsedParadigm } from "$lib/parsers";
    import { get_word } from "$lib/utils";
    import Table from "$components/Table.svelte";

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
</script>

<div class="flex flex-col items-center gap-16">
    <div class="flex flex-col gap-2">
        <h4 class="h4">{$t("paradigm.generalforms")}</h4>
        <Table>
            <thead>
                <tr>
                    <th>{$t("paradigm.case")}</th>
                    <th>{$t("paradigm.singular")}</th>
                    <th>{$t("paradigm.plural")}</th>
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
                            <tr>
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
        </Table>
    </div>
    {#if has_possessive_suffixes}
        <div class="flex flex-col gap-2">
            <h4 class="h4">{$t("paradigm.possessivesuffixes")}</h4>
            <Table>
                <thead>
                    <tr>
                        <th>{$t("paradigm.case")}</th>
                        <th>{$t("paradigm.person")}</th>
                        <th>{$t("paradigm.singularis")}</th>
                        <th>{$t("paradigm.dualis")}</th>
                        <th>{$t("paradigm.pluralis")}</th>
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
                                                    {$t(
                                                        `paradigm.${case_num_name}`,
                                                    )}
                                                    <br />
                                                    {$t(
                                                        `paradigm.${case_name}`,
                                                    )}
                                                </td>
                                            {/if}
                                            <td class="bg-surface-100-900">
                                                {pers_tag}.
                                            </td>
                                            {#each Object.keys(NUMBERS) as num_tag}
                                                <td>
                                                    {get_word(
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
                                                {$t(`paradigm.${case_name}`)}
                                            </td>
                                        {/if}
                                        <td class="bg-surface-100-900">
                                            {pers_tag}.
                                        </td>
                                        {#each Object.keys(NUMBERS) as num_tag}
                                            <td>
                                                {get_word(
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
    {/if}
</div>
