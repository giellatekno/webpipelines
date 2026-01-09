<script lang="ts">
    import type { ParsedParadigm } from "$lib/parsers";
    import { get_entry } from "$lib/utils";
    import { ADJ_GRADES, CASES } from "./sme_paradigm_options";
    import Table from "$components/Table.svelte";
    import { m } from "$lib/paraglide/messages";

    let { elem }: { elem: ParsedParadigm } = $props();

    function is_ordinal(elem: ParsedParadigm) {
        return !!elem.wordforms.keys().find((t) => t.startsWith("Ord"));
    }

    function has_grade(grade_tag: string, elem: ParsedParadigm) {
        switch (grade_tag) {
            case "Posit":
                return elem.wordforms
                    .keys()
                    .find(
                        (w) =>
                            !(
                                w.startsWith("Der/Comp") ||
                                w.startsWith("Der/Superl")
                            ),
                    );
            case "Der/Comp":
                return elem.wordforms
                    .keys()
                    .find((w) => w.startsWith("Der/Comp"));
            case "Der/Superl":
                return elem.wordforms
                    .keys()
                    .find((w) => w.startsWith("Der/Superl"));
        }
    }

    function has_row(
        grade_tag: string,
        case_tag: string,
        elem: ParsedParadigm,
    ) {
        switch (grade_tag) {
            case "Posit":
                return elem.wordforms
                    .keys()
                    .filter(
                        (t) =>
                            !(
                                t.startsWith("Der/Comp") ||
                                t.startsWith("Der/Superl")
                            ),
                    )
                    .find((t) => t.endsWith(case_tag));
            case "Der/Comp":
                return elem.wordforms
                    .keys()
                    .filter((t) => t.startsWith("Der/Comp"))
                    .find((t) => t.endsWith(case_tag));
            case "Der/Superl":
                return elem.wordforms
                    .keys()
                    .filter((t) => t.startsWith("Der/Superl"))
                    .find((t) => t.endsWith(case_tag));
        }
    }
</script>

{#if is_ordinal(elem)}
    {@const prefix = "Ord+"}
    <div class="flex flex-col gap-2">
        <h3 class="h4 xl:h3">{m.paradigm_ordinal()}</h3>
        <div class="w-fit">
            <Table>
                <tbody>
                    <tr>
                        <th>
                            {m.paradigm_attribute()}
                        </th>
                        <td>{@html get_entry(prefix + "Attr", elem)}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
        <Table>
            <thead>
                <tr>
                    <th>{m.paradigm_case()}</th>
                    <th>{m.paradigm_singular()}</th>
                    <th>{m.paradigm_plural()}</th>
                </tr>
            </thead>
            <tbody>
                {#each CASES as cur_case}
                    {@const row_exists = elem.wordforms
                        .keys()
                        .find((e) => e.endsWith(cur_case.tag))}
                    {#if row_exists}
                        {#if !(cur_case.tag === "Ess")}
                            <tr>
                                <td class="bg-surface-100-900">
                                    {cur_case.name()}
                                </td>
                                <td>
                                    {@html get_entry(
                                        prefix + `Sg+${cur_case.tag}`,
                                        elem,
                                    )}
                                </td>
                                <td>
                                    {@html get_entry(
                                        prefix + `Pl+${cur_case.tag}`,
                                        elem,
                                    )}
                                </td>
                            </tr>
                        {:else}
                            <tr>
                                <td class="bg-surface-100-900">
                                    {cur_case.name()}
                                </td>
                                <td colspan="2" class="text-center">
                                    {@html get_entry(
                                        prefix + cur_case.tag,
                                        elem,
                                    )}
                                </td>
                            </tr>
                        {/if}
                    {/if}
                {/each}
            </tbody>
        </Table>
    </div>
{:else}
    {#each ADJ_GRADES as grade}
        {@const prefix = grade.tag === "Posit" ? "" : grade.tag + "+A+"}
        {@const grade_exists = has_grade(grade.tag, elem)}
        {#if grade_exists}
            <div class="flex flex-col gap-2">
                <h3 class="h4 xl:h3">{grade.name()}</h3>
                <div class="w-fit">
                    <Table>
                        <tbody>
                            <tr>
                                <th>
                                    {m.paradigm_attribute()}
                                </th>
                                <td>
                                    {@html get_entry(prefix + "Attr", elem)}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th>{m.paradigm_case()}</th>
                            <th>{m.paradigm_singular()}</th>
                            <th>{m.paradigm_plural()}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each CASES as cur_case}
                            {@const row_exists = has_row(
                                grade.tag,
                                cur_case.tag,
                                elem,
                            )}
                            {#if row_exists}
                                {#if !(cur_case.tag === "Ess")}
                                    <tr>
                                        <td class="bg-surface-100-900">
                                            {cur_case.name()}
                                        </td>
                                        <td>
                                            {@html get_entry(
                                                prefix + `Sg+${cur_case.tag}`,
                                                elem,
                                            )}
                                        </td>
                                        <td>
                                            {@html get_entry(
                                                prefix + `Pl+${cur_case.tag}`,
                                                elem,
                                            )}
                                        </td>
                                    </tr>
                                {:else}
                                    <tr>
                                        <td class="bg-surface-100-900">
                                            {cur_case.name()}
                                        </td>
                                        <td colspan="2" class="text-center">
                                            {@html get_entry(
                                                prefix + cur_case.tag,
                                                elem,
                                            )}
                                        </td>
                                    </tr>
                                {/if}
                            {/if}
                        {/each}
                    </tbody>
                </Table>
            </div>
        {/if}
    {/each}
{/if}
