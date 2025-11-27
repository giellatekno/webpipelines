<script lang="ts">
    import type { ParsedParadigm } from "$lib/parsers";
    import { t } from "svelte-intl-precompile";
    import {
        CASES,
        NUMBERS,
        PERSONS,
        PRONOUN_SUBCLASSES,
    } from "./sme_paradigm_options";
    import { get_entry } from "$lib/utils";
    import Table from "$components/Table.svelte";

    let { elem }: { elem: ParsedParadigm } = $props();

    let subclass_name = $derived(PRONOUN_SUBCLASSES[elem.subclass]);
</script>

<div class="flex flex-col gap-2">
    <h3 class="h3">{$t(`paradigm.${subclass_name}`)}</h3>
    {#if elem.subclass === "Refl"}
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
                    {#if case_tag === "Nom"}
                        <tr class="separate">
                            <td class="bg-surface-100-900">
                                {$t("paradigm.nominative")}
                            </td>
                            <td class="bg-surface-100-900"></td>
                            <td>{@html get_entry("Sg+Nom", elem)}</td>
                            <td>{@html get_entry("Du+Nom", elem)}</td>
                            <td>{@html get_entry("Pl+Nom", elem)}</td>
                        </tr>
                    {:else}
                        {#each Object.keys(PERSONS) as pers_tag}
                            <tr
                                class:separate={pers_tag === "3" &&
                                    case_tag !== "Ess"}
                            >
                                {#if pers_tag === "1"}
                                    <td class="bg-surface-100-900" rowspan={3}>
                                        {$t(`paradigm.${case_name}`)}
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
                {/each}
            </tbody>
        </Table>
        <Table>
            <tr>
                <td class="bg-surface-100-900">{$t("paradigm.essive")}</td>
                <td>{@html get_entry("Ess", elem)}</td>
            </tr>
        </Table>
    {:else if elem.subclass === "Pers"}
        <!-- TODO: better way to find pers_tag -->
        {@const pers_tag = elem.wordforms.keys().toArray()[0][2]}
        <Table>
            <thead>
                <tr>
                    <th>{$t("paradigm.case")}</th>
                    <th>{$t("paradigm.singularis")}</th>
                    <th>{$t("paradigm.dualis")}</th>
                    <th>{$t("paradigm.pluralis")}</th>
                </tr>
            </thead>
            <tbody>
                {#each Object.entries(CASES) as [case_tag, case_name]}
                    {@const row_exists = elem.wordforms
                        .keys()
                        .find((e) => e.endsWith(case_tag))}
                    {#if row_exists}
                        <tr>
                            <td class="bg-surface-100-900">
                                {$t(`paradigm.${case_name}`)}
                            </td>
                            {#each Object.keys(NUMBERS) as num_tag}
                                <td>
                                    {@html get_entry(
                                        `${num_tag}${pers_tag}+${case_tag}`,
                                        elem,
                                    )}
                                </td>
                            {/each}
                        </tr>
                    {/if}
                {/each}
            </tbody>
        </Table>
    {:else}
        {@const has_attr = elem.wordforms
            .keys()
            .find((t) => t.startsWith("Attr"))}
        <!-- TODO: Better way to find has_cases -->
        {@const has_cases = elem.wordforms
            .keys()
            .find((t) => t.endsWith("Nom"))}
        {#if has_attr}
            <Table>
                <tbody>
                    <tr>
                        <th>
                            {$t("paradigm.attribute")}
                        </th>
                        <td>{@html get_entry("Attr", elem)}</td>
                    </tr>
                </tbody>
            </Table>
        {/if}
        {#if has_cases}
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
                                    <td class="bg-surface-100-900">
                                        {$t(`paradigm.${name}`)}
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
                                        {$t(`paradigm.${name}`)}
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
        {/if}
    {/if}
</div>
