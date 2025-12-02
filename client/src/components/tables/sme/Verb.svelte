<script lang="ts">
    import type { ParsedParadigm } from "$lib/parsers";
    import { t } from "svelte-intl-precompile";
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

    headers = [...Object.values(MODES), "nonfinite"];

    function has_preterite(mode_tag: string, elem: ParsedParadigm) {
        switch (mode_tag) {
            case "Ind":
                return true;
            case "Cond":
                return false;
            case "Imprt":
                return false;
            case "Pot":
                return !!elem.wordforms
                    .keys()
                    .find((t) => t.startsWith("Pot+Prt"));
        }
    }
</script>

{#each Object.entries(MODES) as [mode_tag, mode_name]}
    {#if elem.wordforms.keys().find((t) => t.startsWith(mode_tag))}
        {#if mode_tag !== "Imprt"}
            <div class="flex w-full flex-col gap-2">
                <h3 class="h4 xl:h3" id={mode_name}>
                    {$t(`paradigm.${mode_name}`)}
                </h3>
                <div
                    class="grid grid-cols-1 place-content-start gap-4 xl:grid-cols-2"
                >
                    {#each Object.entries(TIMES[mode_tag]) as [time_tag, time_name]}
                        {@const color = time_color[time_tag]}
                        {#if !(mode_tag === "Pot" && time_tag === "Prt" && !has_preterite(mode_tag, elem))}
                            <Table>
                                <thead>
                                    <tr>
                                        <td
                                            colspan={3}
                                            class={[
                                                color ? color : "",
                                                "text-center",
                                                "font-bold",
                                            ]}
                                        >
                                            {$t(`paradigm.${time_name}`)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            {$t("paradigm.person")}
                                        </th>
                                        <th>
                                            {$t("paradigm.positive")}
                                        </th>
                                        <th>
                                            {$t("paradigm.negative")}
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
                                                {#if ["Prf", "PluPrf"].includes(time_tag)}
                                                    <td>
                                                        {@html get_entry(
                                                            "PrfPrc",
                                                            elem,
                                                            HELP_VERBS[
                                                                mode_tag +
                                                                    time_tag
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
                                                                mode_tag +
                                                                    time_tag +
                                                                    "Neg"
                                                            ][num_tag][
                                                                pers_tag
                                                            ],
                                                        )}
                                                    </td>
                                                {:else}
                                                    <td>
                                                        {@html get_entry(
                                                            `${mode_tag}+${time_tag}+${num_tag}${pers_tag}`,
                                                            elem,
                                                        )}
                                                    </td>
                                                    <td>
                                                        {@html get_entry(
                                                            `${mode_tag}+${time_tag}+ConNeg`,
                                                            elem,
                                                            HELP_VERBS["Neg"][
                                                                num_tag
                                                            ][pers_tag],
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
                </div>
            </div>
        {:else}
            <div class="flex flex-col gap-2">
                <h3 class="h4 xl:h3" id={mode_name}>
                    {$t(`paradigm.${mode_name}`)}
                </h3>
                <Table>
                    <thead>
                        <tr>
                            <th>
                                {$t("paradigm.person")}
                            </th>
                            <th>
                                {$t("paradigm.positive")}
                            </th>
                            <th>
                                {$t("paradigm.negative")}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each Object.entries(NUMBER_PERSONS) as [num_tag, persons]}
                            {#each Object.entries(persons) as [pers_tag, pronoun]}
                                {@const sep =
                                    pers_tag.endsWith("3") && num_tag !== "Pl"}
                                <tr class:separate={sep}>
                                    <td class="bg-surface-100-900">
                                        {pronoun}
                                    </td>
                                    <td>
                                        {@html get_entry(
                                            `${mode_tag}+${num_tag}${pers_tag}`,
                                            elem,
                                        )}
                                    </td>
                                    <td>
                                        {@html get_entry(
                                            `${mode_tag}+ConNeg`,
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
            </div>
        {/if}
    {/if}
{/each}
<div class="flex flex-col gap-2">
    <h3 class="h4 xl:h3" id="nonfinite">
        {$t("paradigm.nonfinite")}
    </h3>
    <Table>
        <tbody>
            {#each Object.entries(NONFINITE_FORMS) as [form_tag, form_name]}
                {@const form_exists = elem.wordforms
                    .keys()
                    .find((t) => t.startsWith(form_tag))}
                {#if form_exists}
                    <tr>
                        <th class="text-left">
                            {$t(`paradigm.${form_name}`)}
                        </th>
                        <td>
                            {@html get_entry(form_tag, elem)}
                        </td>
                    </tr>
                    {#if form_tag === "Ger"}
                        {#if elem.wordforms
                            .keys()
                            .find((t) => t.startsWith(`${form_tag}+Px`))}
                            {#each Object.entries(NUMBERS) as [num_tag, num_name]}
                                {#each Object.entries(PERSONS) as [pers_tag, pers_name]}
                                    <tr>
                                        <!-- TODO: translate short forms -->
                                        <th class="text-left">
                                            {$t("paradigm.gerund")}
                                            {num_tag}.
                                            {pers_tag}. Pers.
                                        </th>
                                        <td>
                                            {@html get_entry(
                                                `Ger+Px${num_tag}${pers_tag}`,
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
