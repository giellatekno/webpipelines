<script lang="ts">
    import { resolve } from "$app/paths";
    import { page } from "$app/state";
    import { goto } from "$app/navigation";
    import { t } from "svelte-intl-precompile";
    import type { PageData } from "./$types";
    import { MoveLeft } from "@lucide/svelte";
    import { onMount, type Component } from "svelte";
    interface Props {
        data: PageData;
    }

    let ParadigmComponent: Component | null = $state(null);
    onMount(async () => {
        const lang = page.params.lang;

        try {
            const module = await import(
                `$components/tables/${lang}_paradigm.svelte`
            );

            ParadigmComponent = module.default;
        } catch (error) {
            console.error(
                `Could not load paradigm component for language: ${lang}`,
                error,
            );
        }
    });

    let { data }: Props = $props();

    let { word, size, pos } = $state(data);
    let form_element: undefined | HTMLFormElement = $state();

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

    function get_usage(lang: string | undefined, $t: (key: string) => string) {
        const lang_specific = $t(`usage.lang.${lang}`);
        if (lang_specific !== `usage.lang.${lang}`) {
            return lang_specific;
        } else {
            const fallback = $t("usage");
            return fallback;
        }
    }
    let usage = $derived(get_usage(page.params.lang, $t));

    async function handle_submit() {
        // console.log("Submitting:", word, size, pos);
        await goto(`paradigm?word=${word}&size=${size}&pos=${pos}`, {
            keepFocus: true,
        });
    }
</script>

<div>
    <p class="my-2">{usage}</p>

    <form onsubmit={handle_submit} class="flex flex-col gap-2 my-2">
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
                        onchange={handle_submit}
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
                        onchange={handle_submit}
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

    {#if data?.results && ParadigmComponent}
        <ParadigmComponent text={data.results.text} />
    {:else if data?.results}
        {@html data.results.text.replaceAll("\n", "<br/>")}
    {/if}
</div>
