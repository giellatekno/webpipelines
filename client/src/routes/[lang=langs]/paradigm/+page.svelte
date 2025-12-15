<script lang="ts">
    import { page } from "$app/state";
    import { goto } from "$app/navigation";
    import { t } from "svelte-intl-precompile";
    import type { PageData } from "./$types";
    import { type SvelteComponent, type Component } from "svelte";
    import { get_usage } from "$lib/utils";
    import ToolDescription from "$components/ToolDescription.svelte";
    import Paradigm from "$components/Paradigm.svelte";

    interface Props {
        data: PageData;
    }
    let { data }: Props = $props();
    let { word, size, pos } = $derived(data);

    const allTableModules = import.meta.glob<SvelteComponent>(
        "../../../components/tables/*/*.svelte",
    );

    async function load_tables(): Promise<Component[] | undefined> {
        const lang = page.params.lang;

        const componentNames = [
            "Adjective",
            "Noun",
            "Numeral",
            "Pronoun",
            "Verb",
        ];
        const loadedComponents: Component[] = [];

        try {
            for (const componentName of componentNames) {
                const path = `../../../components/tables/${lang}/${componentName}.svelte`;
                const loader = allTableModules[path];

                if (loader) {
                    const module = await loader();
                    loadedComponents.push(module.default);
                } else {
                    console.warn(
                        `Component not found for language ${lang} at path: ${path}`,
                    );
                    return undefined;
                }
            }
            return loadedComponents;
        } catch (error) {
            console.warn(
                `Could not load paradigm component for language: ${lang}`,
                error,
            );
            return undefined;
        }
    }
    let lang_tables = load_tables();

    const poses = {
        any: "any",
        noun: "N",
        verb: "V",
        adjective: "A",
        // adverb: "Adv",
        pronoun: "Pron",
        numeral: "Num",
        // Pcle: "Pcle",
        // Po: "Po",
        // Pr: "Pr",
        //Adp: "Adp",
    };
    const paradigm_sizes = ["minimal", "standard", "full"];

    async function on_submit(ev: SubmitEvent) {
        ev.preventDefault();
        // console.log("Submitting:", word, size, pos);
        await goto(`paradigm?word=${word.trim()}&size=${size}&pos=${pos}`, {
            keepFocus: true,
            // replaceState: true,
        });
    }

    async function on_radio_change() {
        if (word) {
            await goto(`paradigm?word=${word.trim()}&size=${size}&pos=${pos}`, {
                keepFocus: true,
                // replaceState: true,
            });
        }
    }

    let format = $state("table");

    let usage = $derived(get_usage(page.params.lang, $t));
    let description = $derived($t("paradigm.description"));
    let instruction = $derived($t("paradigm.instruction"));
</script>

<div class="flex flex-col items-center gap-4">
    <!-- <ToolDescription {description} {usage} /> -->

    {@render paradigm_form()}

    {#if data?.results}
        <Paradigm data={data.results} {lang_tables} {format} />
    {:else if data?.error}
        <p>Error: {data.error}</p>
    {/if}
</div>

{#snippet paradigm_form()}
    <div
        class="card preset-filled-surface-100-900 border-surface-200-800 mx-4 w-fit border p-2 xl:w-fit xl:p-4"
    >
        <form onsubmit={on_submit} id="form" class="mb-2 flex flex-col gap-2">
            <div
                class="flex flex-col items-center gap-2 xl:flex-row xl:justify-center xl:gap-4"
            >
                <div
                    class="grid grid-cols-2 items-center gap-2 xl:grid-cols-1 xl:gap-0"
                >
                    <label
                        for="paradigmsize-select"
                        class="label-text text-right xl:text-left xl:text-sm"
                    >
                        {$t("paradigmsize")}:
                    </label>
                    <select
                        class="select bg-surface-50-950 text-sm xl:text-base"
                        bind:value={size}
                        onchange={on_radio_change}
                        name="size"
                        id="paradigmsize-select"
                    >
                        {#each paradigm_sizes as value}
                            <option {value}>
                                {$t("paradigmsize." + value)}
                            </option>
                        {/each}
                    </select>
                </div>
                <div
                    class="grid grid-cols-2 items-center gap-2 xl:grid-cols-1 xl:gap-0"
                >
                    <label
                        for="pos-select"
                        class="label-text text-right xl:text-left xl:text-sm"
                    >
                        {$t("partofspeech")}:
                    </label>
                    <select
                        class="select bg-surface-50-950 text-sm xl:text-base"
                        bind:value={pos}
                        onchange={on_radio_change}
                        name="pos"
                        id="pos-select"
                    >
                        {#each Object.entries(poses) as [label, value]}
                            <option {value}>
                                {$t("partofspeech." + label)}
                            </option>
                        {/each}
                    </select>
                </div>
                {#await lang_tables then tables}
                    {#if tables !== undefined}
                        <div
                            class="grid grid-cols-2 items-center gap-2 xl:grid-cols-1 xl:gap-0"
                        >
                            <label
                                for="format-select"
                                class="label-text text-right xl:text-left xl:text-sm"
                            >
                                {$t("paradigm.format")}:
                            </label>
                            <select
                                class="select bg-surface-50-950 text-sm xl:text-base"
                                bind:value={format}
                                onchange={on_radio_change}
                                name="format"
                                id="format-select"
                            >
                                <option value="table">
                                    {$t("paradigm.table")}
                                </option>
                                <option value="list">
                                    {$t("paradigm.list")}
                                </option>
                            </select>
                        </div>
                    {/if}
                {/await}
            </div>
            <span class="mt-4 flex justify-center">
                <div class="flex flex-col">
                    <!-- <label for="input" class="label-text xl:text-sm"> -->
                    <!--     {instruction}: -->
                    <!-- </label> -->
                    <div class="flex h-fit flex-row gap-2">
                        <input
                            class="input bg-surface-50 xl:h-12 xl:w-80 xl:text-lg"
                            id="input"
                            type="search"
                            name="word"
                            bind:value={word}
                            autocapitalize="off"
                            spellcheck="false"
                            placeholder={$t("search") + "..."}
                        />
                        <button
                            class="btn preset-filled-primary-500 text-sm xl:text-base"
                            type="submit"
                        >
                            {$t("submit")}
                        </button>
                    </div>
                </div>
            </span>
        </form>
    </div>
{/snippet}
