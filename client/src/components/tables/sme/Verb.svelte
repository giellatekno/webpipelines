<script lang="ts">
    import type { ParsedParadigm } from "$lib/parsers";
    import {
        MODES,
        NONFINITE_FORMS,
        NUMBER_PERSONS,
        NUMBERS,
        PERSONS,
        HELP_VERBS,
        TIMES,
    } from "./sme_paradigm_options";
    import { get_entry } from "$lib/utils";
    import Table from "$components/Table.svelte";
    import { m } from "$lib/paraglide/messages";

    interface Props {
        elem: ParsedParadigm;
        headers: string[];
    }
    let { elem, headers = $bindable() }: Props = $props();

    const time_color: Record<string, string> = {
        Prs: "bg-yellow-800/20",
        Prf: "bg-purple-800/20",
        Prt: "bg-green-800/20",
        PluPrf: "bg-red-800/20",
    };

    function has_tags(tags: string, elem: ParsedParadigm) {
        return !!elem.wordforms.keys().find((t) => t.includes(tags));
    }
</script>

{#each MODES as mode}
    {#if has_tags(mode.tag, elem)}
        {#if mode.tag !== "Imprt"}
            <div class="flex w-full flex-col gap-2">
                <h3 class="h4 xl:h3" id={mode.tag}>
                    {mode.name()}
                </h3>
                <div
                    class="grid grid-cols-1 place-content-start gap-4 xl:grid-cols-2"
                >
                    {#if elem.subclass == "Neg"}
                        <Table>
                            <thead>
                                <tr>
                                    <th>
                                        {m.paradigm_person()}
                                    </th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {#each Object.entries(NUMBER_PERSONS) as [num_tag, persons]}
                                    {#each Object.entries(persons) as [pers_tag, pronoun]}
                                        {@const sep =
                                            pers_tag.endsWith("3") &&
                                            num_tag !== "Pl"}
                                        <tr class:separate={sep}>
                                            <td class="bg-surface-100-900">
                                                {pronoun}
                                            </td>
                                            <td>
                                                {@html get_entry(
                                                    `${mode.tag}+${num_tag}${pers_tag}`,
                                                    elem,
                                                )}
                                            </td>
                                        </tr>
                                    {/each}
                                {/each}
                            </tbody>
                        </Table>
                    {:else}
                        {#each TIMES[mode.tag] as time}
                            {@const color = time_color[time.tag]
                                ? time_color[time.tag]
                                : ""}
                            {#if !(mode.tag === "Pot" && time.tag === "Prt" && !has_tags("Pot+Prt", elem))}
                                <Table>
                                    <thead>
                                        <tr>
                                            <td
                                                colspan={3}
                                                class="{color} text-center font-bold"
                                            >
                                                {time.name()}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                {m.paradigm_person()}
                                            </th>
                                            <th>
                                                {m.paradigm_positive()}
                                            </th>
                                            <th>
                                                {m.paradigm_negative()}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {#each Object.entries(NUMBER_PERSONS) as [num_tag, persons]}
                                            {#each Object.entries(persons) as [pers_tag, pronoun]}
                                                {@const sep =
                                                    pers_tag.endsWith("3") &&
                                                    num_tag !== "Pl"}
                                                <tr class:separate={sep}>
                                                    <td
                                                        class="bg-surface-100-900"
                                                    >
                                                        {pronoun}
                                                    </td>
                                                    {#if ["Prf", "PluPrf"].includes(time.tag)}
                                                        <td>
                                                            {@html get_entry(
                                                                "PrfPrc",
                                                                elem,
                                                                HELP_VERBS[
                                                                    mode.tag +
                                                                        time.tag
                                                                ][num_tag][
                                                                    pers_tag
                                                                ],
                                                            )}
                                                        </td>
                                                        <td>
                                                            {@html get_entry(
                                                                "PrfPrc",
                                                                elem,
                                                                HELP_VERBS[
                                                                    mode.tag +
                                                                        time.tag +
                                                                        "Neg"
                                                                ][num_tag][
                                                                    pers_tag
                                                                ],
                                                            )}
                                                        </td>
                                                    {:else}
                                                        <td>
                                                            {@html get_entry(
                                                                `${mode.tag}+${time.tag}+${num_tag}${pers_tag}`,
                                                                elem,
                                                            )}
                                                        </td>
                                                        <td>
                                                            {@html get_entry(
                                                                `${mode.tag}+${time.tag}+ConNeg`,
                                                                elem,
                                                                HELP_VERBS[
                                                                    "Neg"
                                                                ][num_tag][
                                                                    pers_tag
                                                                ],
                                                            )}
                                                        </td>
                                                    {/if}
                                                </tr>
                                            {/each}
                                        {/each}
                                    </tbody>
                                </Table>
                            {/if}
                        {/each}
                    {/if}
                </div>
            </div>
        {:else}
            <div class="flex flex-col gap-2">
                <h3 class="h4 xl:h3" id={mode.tag}>
                    {mode.name()}
                </h3>
                {#if elem.subclass == "Neg"}
                    <Table>
                        <thead>
                            <tr>
                                <th>
                                    {m.paradigm_person()}
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each Object.entries(NUMBER_PERSONS) as [num_tag, persons]}
                                {#each Object.entries(persons) as [pers_tag, pronoun]}
                                    {@const sep =
                                        pers_tag.endsWith("3") &&
                                        num_tag !== "Pl"}
                                    <tr class:separate={sep}>
                                        <td class="bg-surface-100-900">
                                            {pronoun}
                                        </td>
                                        <td>
                                            {@html get_entry(
                                                `${mode.tag}+${num_tag}${pers_tag}`,
                                                elem,
                                            )}
                                        </td>
                                    </tr>
                                {/each}
                            {/each}
                        </tbody>
                    </Table>
                {:else}
                    <Table>
                        <thead>
                            <tr>
                                <th>
                                    {m.paradigm_person()}
                                </th>
                                <th>
                                    {m.paradigm_positive()}
                                </th>
                                <th>
                                    {m.paradigm_negative()}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each Object.entries(NUMBER_PERSONS) as [num_tag, persons]}
                                {#each Object.entries(persons) as [pers_tag, pronoun]}
                                    {@const sep =
                                        pers_tag.endsWith("3") &&
                                        num_tag !== "Pl"}
                                    <tr class:separate={sep}>
                                        <td class="bg-surface-100-900">
                                            {pronoun}
                                        </td>
                                        <td>
                                            {@html get_entry(
                                                `${mode.tag}+${num_tag}${pers_tag}`,
                                                elem,
                                            )}
                                        </td>
                                        <td>
                                            {@html get_entry(
                                                `${mode.tag}+ConNeg`,
                                                elem,
                                                HELP_VERBS["ImprtNeg"][num_tag][
                                                    pers_tag
                                                ],
                                            )}
                                        </td>
                                    </tr>
                                {/each}
                            {/each}
                        </tbody>
                    </Table>
                {/if}
            </div>
        {/if}
    {/if}
{/each}
{#if !(elem.subclass == "Neg")}
    <div class="flex flex-col gap-2">
        <h3 class="h4 xl:h3" id="nonfinite">
            {m.paradigm_nonfinite()}
        </h3>
        <Table>
            <tbody>
                {#each NONFINITE_FORMS as form}
                    {@const form_exists = elem.wordforms
                        .keys()
                        .find((t) => t.startsWith(form.tag))}
                    {#if form_exists}
                        <tr>
                            <th class="text-left">
                                {form.name()}
                            </th>
                            <td>
                                {@html get_entry(form.tag, elem)}
                            </td>
                        </tr>
                        {#if form.tag === "Ger"}
                            {#if elem.wordforms
                                .keys()
                                .find((t) => t.startsWith(`${form.tag}+Px`))}
                                {#each NUMBERS as num}
                                    {#each PERSONS as pers}
                                        <tr>
                                            <!-- TODO: translate short forms -->
                                            <th class="text-left">
                                                {m.paradigm_gerund()}
                                                {num.tag}.
                                                {pers.tag}. Pers.
                                            </th>
                                            <td>
                                                {@html get_entry(
                                                    `Ger+Px${num.tag}${pers.tag}`,
                                                    elem,
                                                )}
                                            </td>
                                        </tr>
                                    {/each}
                                {/each}
                            {/if}
                        {/if}
                    {/if}
                {/each}
            </tbody>
        </Table>
    </div>
{/if}
