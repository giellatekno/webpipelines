<script lang="ts">
    import type { LanguageSchema } from "$lib/paradigms/types";
    import type { ParsedParadigm } from "$lib/parsers";
    import { get_entry } from "$lib/paradigms/paradigm_utils";

    let { schema, elem }: { schema: LanguageSchema; elem: ParsedParadigm } =
        $props();
</script>

<div class="flex flex-col items-center space-y-12">
    {#each schema.sections as section}
        {#if !section.showIf || section.showIf(elem)}
            <section class="flex w-fit flex-col items-center">
                {#if section.title}
                    <h3
                        class="h3 text-primary-500 mb-6 w-full border-b pb-2 font-bold"
                    >
                        {section.title()}
                    </h3>
                {/if}

                <div
                    class="grid w-fit min-w-4xl grid-cols-1 gap-8 md:grid-cols-2"
                >
                    {#each section.tables as table}
                        {#if !table.showIf || table.showIf(elem)}
                            {@const boldLabel =
                                table.headers.length === 0 ? "font-bold" : ""}
                            <div class="table-wrapper">
                                {#if table.title}
                                    <h4
                                        class="h4 mb-3 font-semibold italic opacity-70"
                                    >
                                        {table.title()}
                                    </h4>
                                {/if}

                                <div
                                    class="overflow-x-auto rounded-lg border shadow-sm"
                                >
                                    <table
                                        class="bg-surface-50 w-full border-collapse text-left"
                                    >
                                        <thead>
                                            <tr class="bg-surface-200/50">
                                                {#each table.headers as header}
                                                    <th
                                                        class="border-b p-2 font-bold tracking-wider uppercase"
                                                    >
                                                        {header()}
                                                    </th>
                                                {/each}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {#each table.rows as row}
                                                {@const anchorForm = get_entry(
                                                    row.tags[0],
                                                    elem,
                                                )}
                                                {@const hasAnchor =
                                                    anchorForm &&
                                                    anchorForm !== "—"}
                                                <tr
                                                    class="hover:bg-primary-500/5 transition-colors"
                                                >
                                                    <td
                                                        class="bg-surface-100/50 w-24 border-b p-2 text-nowrap {boldLabel}"
                                                    >
                                                        {#if typeof row.label === "string"}
                                                            {row.label}
                                                        {:else}
                                                            {row.label()}
                                                        {/if}
                                                    </td>

                                                    {#each row.tags as tag, i}
                                                        {@const cellEntry =
                                                            get_entry(
                                                                tag,
                                                                elem,
                                                            )}
                                                        <td
                                                            class="border-b p-2 text-sm"
                                                            colspan={row.colspan ||
                                                                1}
                                                        >
                                                            <div
                                                                class="flex flex-wrap items-center gap-1"
                                                            >
                                                                {#if (!table.strict && cellEntry !== "—") || (table.strict && hasAnchor && cellEntry !== "—")}
                                                                    {#if row.prefixes && row.prefixes[i]}
                                                                        <span
                                                                            class="text-secondary-600 font-medium italic"
                                                                        >
                                                                            {row
                                                                                .prefixes[
                                                                                i
                                                                            ]}
                                                                        </span>
                                                                    {/if}

                                                                    <span
                                                                        class="wordform"
                                                                    >
                                                                        {@html cellEntry}
                                                                    </span>
                                                                {:else}
                                                                    <span
                                                                        class="opacity-50"
                                                                    >
                                                                        —
                                                                    </span>
                                                                {/if}
                                                            </div>
                                                        </td>
                                                    {/each}
                                                </tr>
                                            {/each}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        {/if}
                    {/each}
                </div>
            </section>
        {/if}
    {/each}
</div>
