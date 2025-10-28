<script lang="ts">
    import { t } from "svelte-intl-precompile";
    import type { PageData } from "./$types";
    import { page } from "$app/state";
    import { resolve } from "$app/paths";
    import { goto } from "$app/navigation";
    import { MoveLeft } from "@lucide/svelte";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();

    // the search text
    let value = $state("");

    function get_usage(lang: string | undefined, $t: (_: string) => string) {
        const lang_specific = $t(`usage.lang.${lang}`);
        if (lang_specific !== `usage.lang.${lang}`) {
            return lang_specific;
        } else {
            const fallback = $t("usage");
            return fallback;
        }
    }

    async function on_textarea_keydown(ev: KeyboardEvent) {
        if (ev.key === "Enter" && ev.shiftKey) {
            ev.preventDefault();
            await goto(`?q=${value}`, { keepFocus: true });
        }
    }

    async function on_submit() {
        await goto(`?q=${value}`, { keepFocus: true });
    }

    let usage = $derived(get_usage(page.params.lang, $t));
    let instruction = $derived($t(`instruction.tool.dependency`));
</script>

<div>
    <span class="flex flex-col gap-2 my-2">
        <a
            class="btn btn-sm preset-outlined-primary-500 w-fit"
            href={resolve(`/${page.params.lang}`)}
        >
            <MoveLeft />
            [l6e] Tilbake til verktøy
        </a>
        <h4 class="h4">{$t("dependency")}</h4>
    </span>

    <p>{usage}</p>

    <form class="flex flex-col w-fit gap-2 my-2" onsubmit={on_submit}>
        <label class="label">
            <span class="label-text text-sm">{instruction}</span>
            <textarea
                class="rounded-sm"
                name="q"
                rows="6"
                cols="50"
                bind:value
                onkeydown={on_textarea_keydown}
            ></textarea>
            <div class="flex flex-row gap-2 items-center">
                <button
                    class="btn btn-lg preset-filled-primary-500 w-fit"
                    type="submit"
                >
                    {$t("Send")}
                </button>
                <span>[l6e] Or press Shift+Enter to send.</span>
            </div>
        </label>
    </form>

    <div class="results">
        {#if data.error}
            Error: {data.error}
        {/if}

        {#if data.results?.lines}
            <div>
                {#each data.results.lines as line}
                    {line}<br />
                {/each}
            </div>
        {/if}
    </div>
</div>
