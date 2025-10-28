<script lang="ts">
    import { t } from "svelte-intl-precompile";
    import type { PageData } from "./$types";
    import { page } from "$app/state";
    import { resolve } from "$app/paths";
    import { MoveLeft } from "@lucide/svelte";
    import { goto } from "$app/navigation";

    interface Props {
        data: PageData;
    }

    let lang = page.params.lang;

    let { data }: Props = $props();

    // the search text
    let value = $state(data.q || "");

    function get_usage(lang: string | undefined, $t: (_: string) => string) {
        const lang_specific = $t(`usage.lang.${lang}`);
        if (lang_specific !== `usage.lang.${lang}`) {
            return lang_specific;
        } else {
            const fallback = $t("usage");
            return fallback;
        }
    }

    // async function on_submit() {
    //     await goto(`?q=${value}`, { keepFocus: true });
    // }

    let usage = $derived(get_usage(page.params.lang, $t));
    let instruction = $derived($t(`instruction.tool.generate`));
</script>

<div>
    <span class="flex flex-col gap-2 mb-4">
        <a
            class="btn btn-sm preset-outlined-primary-500 w-fit"
            href={resolve(`/${lang}`)}
        >
            <MoveLeft />
            [l6e] Back to tool selection
        </a>
        <h1 class="h4">{$t("generate")}</h1>
    </span>

    <p class="my-2">{usage}</p>

    <form>
        <label class="label">
            <span class="label-text text-sm">{instruction}</span>
            <span class="flex flex-row gap-2 mt-2">
                <input
                    class="input w-80 h-12"
                    type="text"
                    placeholder="[l6e] Søk"
                    name="q"
                    bind:value
                />
                <button class="btn preset-filled-primary-500" type="submit">
                    [l6e] Send
                </button>
            </span>
        </label>
    </form>

    <div class="results">
        {#if data.error}
            Error: {data.error}
        {/if}

        {#if data.results?.generated}
            <div>
                {#each data.results.generated as result}
                    {result}<br />
                {:else}
                    No analyses
                {/each}
            </div>
        {/if}
    </div>
</div>
