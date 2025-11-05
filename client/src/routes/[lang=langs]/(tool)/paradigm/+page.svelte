<script lang="ts">
    import { page } from "$app/state";
    import { goto } from "$app/navigation";
    import { t } from "svelte-intl-precompile";
    import type { PageData } from "./$types";
    import { onMount, type Component } from "svelte";
    import { get_usage } from "$lib/utils";
    import ToolDescription from "$components/ToolDescription.svelte";
    import { Switch } from "@skeletonlabs/skeleton-svelte";
    import ParadigmText from "$components/ParadigmText.svelte";

    interface Props {
        data: PageData;
    }

    let ParadigmTables: Component | null = $state(null);
    onMount(async () => {
        const lang = page.params.lang;

        try {
            const module = await import(
                `$components/tables/${lang}_paradigm.svelte`
            );

            ParadigmTables = module.default;
        } catch (error) {
            console.error(
                `Could not load paradigm component for language: ${lang}`,
                error,
            );
        }
    });

    let { data }: Props = $props();

    let { word, size, pos } = $state(data);

    const poses = {
        any: "any",
        noun: "N",
        verb: "V",
        adjective: "A",
        adverb: "Adv",
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
            replaceState: true,
        });
    }

    async function on_radio_change() {
        if (word) {
            await goto(`paradigm?word=${word}&size=${size}&pos=${pos}`, {
                keepFocus: true,
                replaceState: true,
            });
        }
    }

    let format_switch_checked = $state(false);

    let usage = $derived(get_usage(page.params.lang, $t));
    let description = $t("paradigm.description");
    let instruction = $t("paradigm.instruction");
</script>

<div class="flex flex-col gap-4">
    <ToolDescription {description} {usage} />

    <label for="form" class="label">
        {instruction}
    </label>
    <form onsubmit={on_submit} id="form" class="flex flex-col gap-2 my-2">
        <label class="flex flex-row gap-2 items-center">
            <p class="font-bold">{$t("paradigmsize")}:</p>
            {#each paradigm_sizes as value}
                <label class="flex flex-row gap-1 items-center">
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
        <label class="flex flex-row gap-2 items-center">
            <p class="font-bold">{$t("partofspeech")}:</p>
            {#each Object.entries(poses) as [label, value]}
                <label class="flex flex-row gap-1 items-center">
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
        <span class="flex flex-row gap-2 mt-2">
            <input
                class="input w-80 h-12"
                type="text"
                name="word"
                bind:value={word}
            />
            <button class="btn preset-filled-primary-500" type="submit">
                {$t("submit")}
            </button>
        </span>
    </form>

    {#if data?.results && ParadigmTables}
        <Switch
            checked={format_switch_checked}
            onCheckedChange={() => {
                format_switch_checked = !format_switch_checked;
            }}
        >
            <Switch.Label class="text-base">Tables</Switch.Label>
            <Switch.Control>
                <Switch.Thumb />
            </Switch.Control>
            <Switch.Label class="text-base">Text</Switch.Label>
            <Switch.HiddenInput />
        </Switch>

        {#if !format_switch_checked}
            <ParadigmTables data={data.results} {size} />
        {:else}
            <ParadigmText data={data.results} />
        {/if}
    {:else if data?.results}
        <ParadigmText data={data.results} />
    {/if}
</div>
