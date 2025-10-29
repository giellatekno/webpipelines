<script lang="ts">
    import { goto } from "$app/navigation";
    import { resolve } from "$app/paths";
    import { t, locale } from "svelte-intl-precompile";
    import {
        langs,
        sami_langs,
        nonsamiuralic_langs,
        other_langs,
    } from "$lib/langs";
    import { langname } from "$lib/langnames";
    import { CheckIcon, SearchIcon } from "@lucide/svelte";

    let show_sami = $state(false);
    let show_uralic = $state(false);
    let filter_others = $state(false);
    let search = $state("");

    function filter_langs(
        search: string,
        show_sami: boolean,
        show_uralic: boolean,
        filter_others: boolean,
    ) {
        const any_filters_on = show_sami || show_uralic || filter_others;
        let rootset = langs;
        if (any_filters_on) {
            rootset = [];
            if (show_sami) rootset.push(...sami_langs);
            if (show_uralic) rootset.push(...nonsamiuralic_langs);
            if (filter_others) rootset.push(...other_langs);
        }

        if (search === "") {
            return rootset.sort();
        } else {
            // TODO: Brede: Search in interface language? or any interface language?
            return rootset
                .map((iso) => [iso, langname(iso, "nob")])
                .filter(([iso, name]) => {
                    const lower = search.toLowerCase();
                    return (
                        iso.includes(lower) ||
                        name.toLowerCase().includes(lower)
                    );
                })
                .map(([iso, _name]) => iso)
                .sort();
        }
    }

    async function onenter() {
        if (visible_langs.length === 1) {
            const lang = visible_langs[0];
            await goto(resolve(`/${lang}`));
        }
    }
    let visible_langs = $derived(
        filter_langs(search, show_sami, show_uralic, filter_others),
    );
</script>

<div>
    <label class="label">
        <span class="label-text">{$t("showtoolsfor")}</span>
        <div class="flex flex-row gap-2 items-center justify-start">
            <SearchIcon class="size-5" />
            <input
                class="input w-50"
                type="text"
                onsubmit={() => onenter()}
                bind:value={search}
            />
        </div>
    </label>

    <div class="flex items-center gap-4 my-2">
        <span class="uppercase font-bold">{$t("filters")}:</span>
        <button
            type="button"
            class="chip preset-filled-primary-500"
            onclick={() => (show_sami = !show_sami)}
        >
            <span>{$t("samilanguages")}</span>
            {#if show_sami}
                <CheckIcon class="size-4" />
            {/if}
        </button>
        <button
            type="button"
            class="chip preset-filled-primary-500"
            onclick={() => (show_uralic = !show_uralic)}
        >
            <span>{$t("nonsamiuralic")}</span>
            {#if show_uralic}
                <CheckIcon class="size-4" />
            {/if}
        </button>
        <button
            type="button"
            class="chip preset-filled-primary-500"
            onclick={() => (filter_others = !filter_others)}
        >
            <span>{$t("otherlanguages")}</span>
            {#if filter_others}
                <CheckIcon class="size-4" />
            {/if}
        </button>
    </div>

    <div
        class="grid grid-cols-3 p-4 gap-4 w-fit card bg-surface-100-900 border border-surface-200-800"
    >
        {#each visible_langs as lng}
            <a
                class="btn hover:preset-tonal justify-start"
                href={resolve(`/${lng}`)}>{langname(lng, $locale)}</a
            >
        {:else}
            <span>
                {$t("noresults")}
            </span>
        {/each}
    </div>
</div>
