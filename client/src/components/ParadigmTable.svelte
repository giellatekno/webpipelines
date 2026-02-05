<script lang="ts">
    import type { LanguageSchema, Table, Section } from "$lib/paradigms/types";
    import type { ParsedParadigm } from "$lib/parsers";
    import { get_entry } from "$lib/paradigms/paradigm_utils";
    import { m } from "$lib/paraglide/messages";
    import { MenuIcon, XIcon } from "@lucide/svelte";
    import { Dialog, Portal, Navigation } from "@skeletonlabs/skeleton-svelte";

    let { schema, elem }: { schema: LanguageSchema; elem: ParsedParadigm } = $props();

    function labelStyle(table: Table): string {
        if (table.headers.length === 0) {
            return "font-bold";
        }
        return "font-medium opacity-80";
    }

    function findActiveRows(section: Section) {
        return section.validateRows
            ? section.tables[0].rows.map((row) => {
                  const anchor = get_entry(row.tags[0], elem);
                  return anchor && anchor !== "—";
              })
            : null;
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
    const animBackdrop =
        "transition transition-discrete opacity-0 starting:data-[state=open]:opacity-0 data-[state=open]:opacity-100";
    const animModal =
        "transition transition-discrete opacity-0 translate-y-full starting:data-[state=open]:opacity-0 starting:data-[state=open]:translate-y-full data-[state=open]:opacity-100 data-[state=open]:-translate-y-0";
</script>

<div class="mb-8 grid w-full grid-cols-1 gap-8 md:mb-24 md:grid-cols-[auto_1fr_auto]">
    <!-- Navigation menus -->
    {@render desktop_nav()}
    {@render mobile_nav()}
    <div class="flex w-full flex-col gap-8 overflow-x-auto">
        {#each visibleSections as section}
            {@const activeRows = findActiveRows(section)}
            <section
                id={section.sId}
                class="highlight-target flex w-full scroll-mt-24 flex-col rounded-lg md:p-2"
            >
                {#if section.title}
                    <h4 class="h4 text-primary-500 mb-6 w-full border-b-2 pb-2 font-bold">
                        {section.title()}
                    </h4>
                {/if}

                <div class="grid w-full grid-cols-1 gap-4 md:gap-8 2xl:grid-cols-2">
                    {#each section.visibleTables as table}
                        {#if !table.showIf || table.showIf(elem)}
                            <div
                                id={table.tId}
                                class="highlight-target w-full scroll-mt-24 rounded-lg p-2 md:p-4"
                            >
                                {#if table.title}
                                    <h5 class="h5 mb-2 font-semibold italic opacity-70">
                                        {table.title()}
                                    </h5>
                                {/if}

                                <div
                                    class="border-surface-200-800 bg-surface-50-950 w-full overflow-x-auto rounded-lg border shadow-sm md:min-w-md"
                                >
                                    {@render table_constructor(table, activeRows)}
                                </div>
                            </div>
                        {/if}
                    {/each}
                </div>
            </section>
        {/each}
    </div>
</div>

{#snippet table_constructor(table: Table, activeRows: (boolean | "")[] | null)}
    {@const label_css = labelStyle(table)}
    <table class="w-full table-auto border-collapse text-left">
        <thead>
            {#if table.headers.length > 0}
                <tr
                    class="bg-surface-200-800/60 border-surface-200-800 divide-surface-200-800 divide-x border-b"
                >
                    {#each table.headers as header}
                        <th
                            class="p-2 text-sm font-bold tracking-wider uppercase opacity-70 md:p-4 md:text-base"
                        >
                            {header()}
                        </th>
                    {/each}
                </tr>
            {/if}
        </thead>
        <tbody class="divide-surface-100-900 divide-y">
            {#each table.rows as row, rowIndex}
                {@const isRowDisabled = activeRows && !activeRows[rowIndex]}
                {@const separator = row.seperator
                    ? "border-b-2 border-surface-200-800"
                    : ""}
                <tr
                    class="hover:bg-primary-500/5 divide-surface-100-900 divide-x transition-colors {separator}"
                >
                    <td
                        class="bg-surface-100-900/50 w-px p-2 text-sm whitespace-nowrap md:p-4 md:text-base {label_css}"
                    >
                        {#if typeof row.label === "string"}
                            {row.label}
                        {:else}
                            {row.label()}
                        {/if}
                    </td>

                    {#each row.tags as tag, i}
                        {@const cellEntries = get_entry(tag, elem)}
                        {@const centerCell =
                            row.colspan && row.colspan > 1 ? "items-center" : ""}
                        <td class="p-2 md:p-4" colspan={row.colspan || 1}>
                            {#if isRowDisabled}
                                <span>—</span>
                            {:else}
                                <div class="flex flex-col gap-1 {centerCell}">
                                    {#each cellEntries as cellEntry}
                                        <p
                                            class="text-surface-900-100 text-sm text-nowrap md:text-base"
                                        >
                                            {#if row.prefixes && row.prefixes[i]}
                                                <span
                                                    class="text-secondary-600-400 italic"
                                                >
                                                    {row.prefixes[i]}
                                                </span>
                                            {/if}
                                            {cellEntry}
                                        </p>
                                    {/each}
                                </div>
                            {/if}
                        </td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
{/snippet}

{#snippet desktop_nav()}
    <nav
        class="card bg-surface-100-900 sticky top-24 hidden h-fit w-64 shrink-0 p-4 md:block"
    >
        <div class="space-y-2 text-sm">
            <h3 class="text-base font-bold uppercase">{m.paradigm_jumpto()}</h3>
            <hr class="hr" />
            <ul class="space-y-4">
                {#each visibleSections as section}
                    {#if section.title}
                        <li>
                            <div>
                                <a
                                    href="#{section.sId}"
                                    class="anchor text-primary-500 my-1 block font-bold uppercase"
                                >
                                    {section.title()}
                                </a>
                                <ul
                                    class="border-surface-200 mb-2 ml-2 space-y-2 border-l-2 pl-1"
                                >
                                    {#each section.visibleTables as table}
                                        {#if table.title}
                                            <li>
                                                <a
                                                    href="#{table.tId}"
                                                    class="anchor text-surface-700-300 my-1 block"
                                                >
                                                    {table.title()}
                                                </a>
                                            </li>
                                        {/if}
                                    {/each}
                                </ul>
                            </div>
                        </li>
                    {/if}
                {/each}
            </ul>
        </div>
    </nav>
{/snippet}

{#snippet mobile_nav()}
    <div class="fixed right-6 bottom-6 z-40 md:hidden">
        <Dialog>
            <Dialog.Trigger>
                <button class="btn-icon preset-filled-primary-500">
                    <MenuIcon class="size-5" />
                </button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop
                    class="bg-surface-50-950/50 fixed inset-0 z-50 transition transition-discrete {animBackdrop}"
                />
                <Dialog.Positioner class="fixed inset-0 z-50 flex justify-start">
                    <Dialog.Content
                        class="card bg-surface-100-900 fixed inset-x-0 bottom-0 max-h-4/5 w-full space-y-4 overflow-y-auto p-4 shadow-xl {animModal}"
                    >
                        <Navigation
                            layout="bar"
                            class="grid grid-rows-[auto_auto_1fr_auto] gap-4"
                        >
                            <Navigation.Header class="flex items-center justify-between">
                                <Dialog.Title class="text-2xl font-bold">
                                    {m.paradigm_jumpto()}
                                </Dialog.Title>
                                <Dialog.CloseTrigger class="btn-icon preset-tonal">
                                    <XIcon />
                                </Dialog.CloseTrigger>
                            </Navigation.Header>
                            <hr class="hr" />
                            <Navigation.Content>
                                <Navigation.Group>
                                    <div class="flex flex-col gap-2">
                                        <div class="space-y-4">
                                            {#each visibleSections as section}
                                                {#if section.title}
                                                    <div>
                                                        <Dialog.Trigger>
                                                            <a
                                                                href="#{section.sId}"
                                                                class="anchor text-primary-500 mb-2 block py-2 font-bold uppercase"
                                                            >
                                                                {section.title()}
                                                            </a>
                                                        </Dialog.Trigger>
                                                        <div
                                                            class="border-surface-200 ml-4 flex flex-col space-y-2 border-l-2 pl-2"
                                                        >
                                                            {#each section.visibleTables as table}
                                                                {#if table.title}
                                                                    <Dialog.Trigger>
                                                                        <a
                                                                            href="#{table.tId}"
                                                                            class="anchor text-surface-700-300 block w-full py-1 text-left text-sm"
                                                                        >
                                                                            {table.title()}
                                                                        </a>
                                                                    </Dialog.Trigger>
                                                                {/if}
                                                            {/each}
                                                        </div>
                                                    </div>
                                                {/if}
                                            {/each}
                                        </div>
                                    </div>
                                </Navigation.Group>
                            </Navigation.Content>
                        </Navigation>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog>
    </div>
{/snippet}
