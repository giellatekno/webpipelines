<script lang="ts">
    import { page } from "$app/state";
    import { goto } from "$app/navigation";
    import { t } from "svelte-intl-precompile";
    import type { PageData } from "./$types";
    import { type Component } from "svelte";
    import { get_usage } from "$lib/utils";
    import ToolDescription from "$components/ToolDescription.svelte";
    import Paradigm from "$components/Paradigm.svelte";

    interface Props {
        data: PageData;
    }
    let { data }: Props = $props();
    let { word, size, pos } = $state(data);

    const allTableModules = import.meta.glob<Component>(
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
        await goto(`paradigm?word=${word}&size=${size}&pos=${pos}`, {
            keepFocus: true,
            // replaceState: true,
        });
    }

    async function on_radio_change() {
        if (word) {
            await goto(`paradigm?word=${word}&size=${size}&pos=${pos}`, {
                keepFocus: true,
                // replaceState: true,
            });
        }
    }

    let format_switch_checked = $state(false);
    let format = $state("table");

    let usage = $derived(get_usage(page.params.lang, $t));
    let description = $t("paradigm.description");
    let instruction = $t("paradigm.instruction");
</script>

<div class="flex flex-col items-center gap-4">
    <!-- <ToolDescription {description} {usage} /> -->

    <div
        class="card preset-filled-surface-100-900 border-surface-200-800 mx-4 w-fit border p-2 xl:w-fit xl:p-4"
    >
        <div class="hidden xl:block">
            {@render paradigm_form()}
        </div>
        <div class="xl:hidden">
            {@render paradigm_form_mobile()}
        </div>
    </div>

    {#if data?.results}
        <Paradigm data={data.results} {lang_tables} {format} />
    {:else if data?.error}
        <p>Error: {data.error}</p>
    {/if}
</div>

{#snippet paradigm_form()}
    <form onsubmit={on_submit} id="form" class="my-2 flex flex-col gap-2">
        <label class="flex flex-row items-center gap-2">
            <p class="font-bold">{$t("paradigmsize")}:</p>
            {#each paradigm_sizes as value}
                <label class="flex flex-row items-center gap-1">
                    <input
                        type="radio"
                        class="radio"
                        name="size"
                        {value}
                        bind:group={size}
                        onchange={on_radio_change}
                    />
                    <p>{$t("paradigmsize." + value)}</p>
                </label>
            {/each}
        </label>
        <label class="flex flex-row items-center gap-2">
            <p class="font-bold">{$t("partofspeech")}:</p>
            {#each Object.entries(poses) as [label, value]}
                <label class="flex flex-row items-center gap-1">
                    <input
                        type="radio"
                        class="radio"
                        name="pos"
                        {value}
                        bind:group={pos}
                        onchange={on_radio_change}
                    />
                    <p>{$t("partofspeech." + label)}</p>
                </label>
            {/each}
        </label>
        <label class="flex flex-row items-center gap-2">
            <p class="font-bold">Format:</p>
            <label class="flex flex-row items-center gap-1">
                <input
                    type="radio"
                    class="radio"
                    name="format"
                    value="table"
                    bind:group={format}
                />
                <p>Table</p>
            </label>
            <label class="flex flex-row items-center gap-1">
                <input
                    type="radio"
                    class="radio"
                    name="format"
                    value="list"
                    bind:group={format}
                />
                <p>Table</p>
            </label>
        </label>
        <span class="mt-2 flex justify-center">
            <div class="flex flex-col gap-2">
                <span class="label-text">
                    {instruction}:
                </span>
                <div class="flex flex-row gap-2">
                    <input
                        class="input bg-surface-50 h-12 w-80"
                        type="text"
                        name="word"
                        bind:value={word}
                    />
                    <button class="btn preset-filled-primary-500" type="submit">
                        {$t("submit")}
                    </button>
                </div>
            </div>
        </span>
    </form>
{/snippet}

{#snippet paradigm_form_mobile()}
    <form onsubmit={on_submit} id="form" class="mb-2 flex flex-col gap-2">
        <div class="flex w-full flex-row justify-center gap-2">
            <label class="flex flex-col gap-2">
                <p class="label-text">{$t("paradigmsize")}:</p>
                <select
                    class="select bg-surface-50-950 text-sm"
                    bind:value={size}
                    onchange={on_radio_change}
                    name="paradigmsize-select"
                    id="paradigmsize-select"
                >
                    {#each paradigm_sizes as value}
                        <option {value}>
                            {$t("paradigmsize." + value)}
                        </option>
                    {/each}
                </select>
            </label>
            <label class="flex flex-col gap-2">
                <p class="label-text">POS:</p>
                <select
                    class="select bg-surface-50-950 text-sm"
                    bind:value={pos}
                    onchange={on_radio_change}
                    name="pos-select"
                    id="pos-select"
                >
                    {#each Object.entries(poses) as [label, value]}
                        <option {value}>
                            {$t("partofspeech." + label)}
                        </option>
                    {/each}
                </select>
            </label>
            {#await lang_tables then tables}
                {#if tables !== undefined}
                    <label class="flex flex-col gap-2">
                        <p class="label-text">Format:</p>
                        <select
                            class="select bg-surface-50-950 text-sm"
                            bind:value={format}
                            onchange={on_radio_change}
                            name="pos-select"
                            id="pos-select"
                        >
                            <option value="table">Table</option>
                            <option value="list">List</option>
                        </select>
                    </label>
                {/if}
            {/await}
        </div>
        <span class="mt-2 flex justify-center">
            <div class="flex flex-col gap-2">
                <span class="label-text">
                    {instruction}:
                </span>
                <div class="flex flex-row gap-2">
                    <input
                        class="input bg-surface-50"
                        type="text"
                        name="word"
                        bind:value={word}
                        autocapitalize="off"
                        spellcheck="false"
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
{/snippet}
