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
    import { SearchIcon } from "@lucide/svelte";

    let search = $state("");

    function filter_langs(search: string) {
        let rootset = langs;

        if (search === "") {
            return rootset.sort();
        } else {
            // TODO: Brede - Search in interface language? or any interface language?
            return rootset
                .map((iso) => [iso, langname(iso, $locale)])
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

    async function onenter(ev: KeyboardEvent) {
        if (ev.key === "Enter" && visible_langs.length === 1) {
            const lang = Array.from(visible_langs)[0];
            await goto(resolve(`/${lang}`));
        }
    }
    let visible_langs = $derived(filter_langs(search));

    let groups = $derived({
        samilanguages: visible_langs.filter((e) => sami_langs.has(e)),
        nonsamiuralic: visible_langs.filter((e) => nonsamiuralic_langs.has(e)),
        otherlanguages: visible_langs.filter((e) => other_langs.has(e)),
    });
</script>

<svelte:head>
    <title>{$t("languages")} | Webpipeline</title>
</svelte:head>

<div class="flex w-full flex-col gap-4">
    <label class="label xl:ml-2">
        <span class="label-text">{$t("showtoolsfor")}</span>
        <div class="input-group w-3xs grid-cols-[auto_1fr]">
            <div class="ig-cell preset-tonal">
                <SearchIcon class="size-4" />
            </div>
            <input
                class="ig-input"
                type="text"
                onkeydown={onenter}
                bind:value={search}
                placeholder=""
            />
        </div>
    </label>
    <hr class="hr" />

    <div class="flex w-full flex-row flex-wrap justify-evenly gap-8 xl:mx-2">
        {#if visible_langs.length}
            {#each Object.entries(groups) as [name, lang_set]}
                {#if lang_set.length}
                    <div class="flex w-full flex-col gap-2 xl:w-fit">
                        <h4 class="xl:h4 h5">{$t(name)}</h4>
                        <div class="grid min-w-max grid-cols-2 gap-2">
                            {#each lang_set as lng}
                                <a
                                    class="btn preset-outlined-primary-500 hover:preset-tonal w-full text-center text-sm text-wrap xl:text-base"
                                    href={resolve(`/${lng}`)}
                                >
                                    {langname(lng, $locale)}
                                </a>
                            {/each}
                        </div>
                    </div>
                {/if}
            {/each}
        {:else}
            <span>
                {$t("noresults")}
            </span>
        {/if}
    </div>
</div>
