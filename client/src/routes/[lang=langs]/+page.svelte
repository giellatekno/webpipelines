<script lang="ts">
    import { resolve } from "$app/paths";
    import example_img from "$assets/language.svg";
    import spellcheck_img from "$assets/spellcheck.svg";
    import hyphenate_img from "$assets/hyphenation.svg";
    import num_img from "$assets/num.svg";
    import ipa_img from "$assets/ipa.svg";
    import { t } from "svelte-intl-precompile";
    import { tools_for } from "$lib/langs";
    import { page } from "$app/state";

    const IMAGES: { [key: string]: string } = {
        spellcheck: spellcheck_img,
        hyphenate: hyphenate_img,
        num: num_img,
        transcribe: ipa_img,
    };

    let lang = $derived(page.params.lang || "");
</script>

<div class="grid w-fit max-w-4/5 grid-cols-2 items-stretch gap-6">
    {#each tools_for[lang] as tool}
        <a
            href={resolve(`/${lang}/${tool}`)}
            class="btn text-surface-950-50 preset-filled-primary-200-800 border-primary-500 justify-start border-2 text-wrap shadow-xl"
        >
            <img
                class="mr-2 size-16 justify-start"
                src={IMAGES[tool] || example_img}
                alt=""
            />
            <div class="flex flex-col">
                <span class="text-2xl">{$t(tool)}</span>
                <span class="text-xl italic">
                    {$t(tool + ".description")}
                </span>
            </div>
        </a>
    {/each}
</div>
