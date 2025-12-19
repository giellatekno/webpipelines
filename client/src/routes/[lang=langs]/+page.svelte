<script lang="ts">
    import { resolve } from "$app/paths";
    import example_img from "$assets/language.svg";
    import spellcheck_img from "$assets/spellcheck.svg";
    import hyphenate_img from "$assets/hyphenation.svg";
    import num_img from "$assets/num.svg";
    import ipa_img from "$assets/ipa.svg";
    import paradigm_img from "$assets/paradigm.svg";
    import { t } from "svelte-intl-precompile";
    import { tools_for } from "$lib/langs";
    import { page } from "$app/state";
    import { langname } from "$lib/langnames";
    import { locale } from "$lib/locales";

    const IMAGES: { [key: string]: string } = {
        spellcheck: spellcheck_img,
        hyphenate: hyphenate_img,
        num: num_img,
        transcribe: ipa_img,
        paradigm: paradigm_img,
    };

    let lang = $derived(page.params.lang || "");
</script>

<svelte:head>
    <title>{langname(lang, $locale)} | Webpipeline</title>
</svelte:head>

<div
    class="mx-auto mt-8 grid max-h-max max-w-max grid-cols-1 items-stretch gap-6 xl:grid-cols-2"
>
    {#each tools_for[lang] as tool}
        <a
            href={resolve(`/${lang}/${tool}`)}
            class="btn text-surface-950-50 preset-gradient-button border-surface-950-50 justify-start border-2 py-2 text-wrap shadow-md"
        >
            <img
                class="mr-2 size-16 justify-start"
                src={IMAGES[tool] || example_img}
                alt=""
            />
            <div class="flex flex-col">
                <span class="text-base font-bold xl:text-2xl">
                    {$t(tool + ".title")}
                </span>
                <span
                    class="text-surface-950-50/75 text-sm font-normal italic xl:text-xl"
                >
                    {$t(tool + ".description")}
                </span>
            </div>
        </a>
    {/each}
</div>
