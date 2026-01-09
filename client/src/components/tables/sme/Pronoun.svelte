<script lang="ts">
    import type { ParsedParadigm } from "$lib/parsers";
    import {
        CASES,
        NUMBERS,
        PERSONS,
        PRONOUN_SUBCLASSES,
    } from "./sme_paradigm_options";
    import { get_entry } from "$lib/utils";
    import Table from "$components/Table.svelte";
    import { m } from "$lib/paraglide/messages";

    let { elem }: { elem: ParsedParadigm } = $props();

    let subclass = $derived(
        PRONOUN_SUBCLASSES.find((e) => e.tag === elem.subclass),
    );
</script>

<div class="flex flex-col gap-2">
    {#if subclass}
        <h3 class="h4 xl:h3">{subclass.name()}</h3>
        {#if elem.subclass === "Refl"}
            <Table>
                <thead>
                    <tr>
                        <th>{m.paradigm_case()}</th>
                        <th>{m.paradigm_person()}</th>
                        <th>{m.paradigm_singular()}</th>
                        <th>{m.paradigm_dual()}</th>
                        <th>{m.paradigm_plural()}</th>
                    </tr>
                </thead>
                <tbody>
                    {#each CASES as gram_case}
                        {#if gram_case.tag === "Nom"}
                            <tr class="separate">
                                <td class="bg-surface-100-900 hidden xl:block">
                                    {m.paradigm_nominative()}
                                </td>
                                <td class="bg-surface-100-900 xl:hidden">
                                    {m.paradigm_nominative().slice(0, 3)}.
                                </td>
                                <td class="bg-surface-100-900"></td>
                                <td>{@html get_entry("Sg+Nom", elem)}</td>
                                <td>{@html get_entry("Du+Nom", elem)}</td>
                                <td>{@html get_entry("Pl+Nom", elem)}</td>
                            </tr>
                        {:else}
                            {#each PERSONS as pers}
                                <tr
                                    class:separate={pers.tag === "3" &&
                                        gram_case.tag !== "Ess"}
                                >
                                    {#if pers.tag === "1"}
                                        <td
                                            class="bg-surface-100-900 hidden xl:block"
                                            rowspan={3}
                                        >
                                            {gram_case.name()}
                                        </td>
                                        <td
                                            class="bg-surface-100-900 xl:hidden"
                                            rowspan={3}
                                        >
                                            {gram_case.name().slice(0, 3)}.
                                        </td>
                                    {/if}
                                    <td class="bg-surface-100-900">
                                        {pers.tag}.
                                    </td>
                                    {#each NUMBERS as num}
                                        <td>
                                            {@html get_entry(
                                                `${gram_case.tag}+Px${num.tag}${pers.tag}`,
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
            <div class="w-fit">
                <Table>
                    <tr>
                        <td class="bg-surface-100-900">
                            {m.paradigm_essive()}
                        </td>
                        <td>{@html get_entry("Ess", elem)}</td>
                    </tr>
                </Table>
            </div>
        {:else if elem.subclass === "Pers"}
            <!-- TODO: better way to find pers_tag -->
            {@const pers_tag = elem.wordforms.keys().toArray()[0][2]}
            <Table>
                <thead>
                    <tr>
                        <th>{m.paradigm_case()}</th>
                        <th>{m.paradigm_singular()}</th>
                        <th>{m.paradigm_dual()}</th>
                        <th>{m.paradigm_plural()}</th>
                    </tr>
                </thead>
                <tbody>
                    {#each CASES as gram_case}
                        {@const row_exists = elem.wordforms
                            .keys()
                            .find((e) => e.endsWith(gram_case.tag))}
                        {#if row_exists}
                            <tr>
                                <td class="bg-surface-100-900">
                                    {gram_case.name()}
                                </td>
                                {#each NUMBERS as num}
                                    <td>
                                        {@html get_entry(
                                            `${num.tag}${pers_tag}+${gram_case.tag}`,
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
                                {m.paradigm_attribute()}
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
                            <th>{m.paradigm_case()}</th>
                            <th>{m.paradigm_singular()}</th>
                            <th>{m.paradigm_plural()}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each CASES as gram_case}
                            {@const row_exists = elem.wordforms
                                .keys()
                                .find((e) => e.endsWith(gram_case.tag))}
                            {#if row_exists}
                                {#if !(gram_case.tag === "Ess")}
                                    <tr>
                                        <td class="bg-surface-100-900">
                                            {gram_case.name()}
                                        </td>
                                        <td>
                                            {@html get_entry(
                                                `Sg+${gram_case.tag}`,
                                                elem,
                                            )}
                                        </td>
                                        <td>
                                            {@html get_entry(
                                                `Pl+${gram_case.tag}`,
                                                elem,
                                            )}
                                        </td>
                                    </tr>
                                {:else}
                                    <tr>
                                        <td class="bg-surface-100-900">
                                            {gram_case.name()}
                                        </td>
                                        <td colspan="2" class="text-center">
                                            {@html get_entry(
                                                gram_case.tag,
                                                elem,
                                            )}
                                        </td>
                                    </tr>
                                {/if}
                            {/if}
                        {/each}
                    </tbody>
                </Table>
            {/if}
        {/if}
    {/if}
</div>
