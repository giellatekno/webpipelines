<script lang="ts">
    import { resolve } from "$app/paths";
    import example_img from "$assets/language.svg";
    import spellcheck_img from "$assets/spellcheck.svg";
    import hyphenate_img from "$assets/hyphenation.svg";
    import num_img from "$assets/num.svg";
    import ipa_img from "$assets/ipa.svg";
    import { t } from "svelte-intl-precompile";
    import type { PageData } from "./$types";
    import { tools_for } from "$lib/langs.js";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();

    const IMAGES = {
        spellcheck: spellcheck_img,
        hyphenate: hyphenate_img,
        num: num_img,
        transcribe: ipa_img,
    };
</script>

<div class="grid grid-cols-2 gap-6">
    {#each tools_for[data.lang] as tool}
        <a
            href={resolve(`/${data.lang}/${tool}`)}
            class="btn text-wrap justify-start w-auto bg-primary-200-800 border border-primary-500 hover:preset-filled-primary-200-800 shadow-xl"
        >
            <img
                class="size-16 justify-start"
                src={IMAGES[tool] || example_img}
                alt=""
            />
            <div class="flex flex-col">
                <span class="text-2xl">{$t(tool)}</span>
                <span class="text-xl italic">
                    {@html $t(tool + ".description")}
                </span>
            </div>
        </a>
    {/each}
</div>
