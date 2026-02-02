<script lang="ts">
    import type {
        LanguageSchema,
        TableBlock,
        TableSection,
    } from "$lib/paradigms/types";
    import type { ParsedParadigm } from "$lib/parsers";
    import { get_entry } from "$lib/paradigms/paradigm_utils";
    import { m } from "$lib/paraglide/messages";

    let { schema, elem }: { schema: LanguageSchema; elem: ParsedParadigm } =
        $props();

    function labelStyle(table: TableBlock): string {
        if (table.headers.length === 0) {
            return "font-bold";
        }
        return "font-medium";
    }

    function findActiveRows(section: TableSection) {
        return section.validateRows
            ? section.tables[0].rows.map((row) => {
                  const anchor = get_entry(row.tags[0], elem);
                  return anchor && anchor !== "—";
              })
            : null;
    }

    function scrollTo(id: string) {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    let visibleSections = $derived(
        schema.sections
            .filter((s) => !s.showIf || s.showIf(elem))
            .map((s, sIndex) => ({
                ...s,
                sId: `section-${sIndex}`,
                visibleTables: s.tables
                    .filter((t) => !t.showIf || t.showIf(elem))
                    .map((t, tIndex) => ({
                        ...t,
                        tId: `table-${sIndex}-${tIndex}`,
                    })),
            })),
    );
</script>

<div class="mx-auto flex max-w-[1600px] flex-col gap-8 p-4 md:flex-row">
    <aside class="shrink-0 md:w-64">
        <nav
            class="scrollbar-thin sticky top-24 max-h-[80vh] space-y-4 overflow-y-auto pr-4"
        >
            {#each visibleSections as section}
                <div class="space-y-1">
                    <button
                        onclick={() => scrollTo(section.sId)}
                        class="text-primary-500 hover:text-primary-700 w-full px-2 py-1 text-left text-sm font-bold uppercase"
                    >
                        {section.title()}
                    </button>

                    <div
                        class="border-surface-200 ml-4 flex flex-col space-y-1 border-l-2"
                    >
                        {#each section.visibleTables as table}
                            {#if table.title}
                                <button
                                    onclick={() => scrollTo(table.tId)}
                                    class="text-surface-600 hover:bg-surface-200 rounded px-3 py-1 text-left text-xs transition-colors"
                                >
                                    {table.title()}
                                </button>
                            {/if}
                        {/each}
                    </div>
                </div>
            {/each}
        </nav>
    </aside>

    <div class="flex flex-col items-center space-y-12">
        {#each visibleSections as section}
            {@const activeRows = findActiveRows(section)}
            <section
                id={section.sId}
                class="flex w-fit scroll-mt-24 flex-col items-center"
            >
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
                    {#each section.visibleTables as table}
                        {#if !table.showIf || table.showIf(elem)}
                            {@const label_css = labelStyle(table)}
                            <div class="table-wrapper">
                                {#if table.title}
                                    <h4
                                        id={table.tId}
                                        class="h4 mb-3 scroll-mt-24 font-semibold italic opacity-70"
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
                                            {#each table.rows as row, rowIndex}
                                                {@const isRowDisabled =
                                                    activeRows &&
                                                    !activeRows[rowIndex]}
                                                <tr
                                                    class="hover:bg-primary-500/5 transition-colors"
                                                >
                                                    <td
                                                        class="bg-surface-100/50 w-24 border-b p-2 text-nowrap {label_css}"
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
                                                        {@const centerCell =
                                                            row.colspan &&
                                                            row.colspan > 1
                                                                ? "justify-center"
                                                                : ""}
                                                        <td
                                                            class="border-b p-2 text-sm"
                                                            colspan={row.colspan ||
                                                                1}
                                                        >
                                                            {#if isRowDisabled}
                                                                <span>—</span>
                                                            {:else}
                                                                <div
                                                                    class="flex flex-wrap items-center gap-1 {centerCell}"
                                                                >
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
                                                                </div>
                                                            {/if}
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
        {/each}
    </div>
</div>
