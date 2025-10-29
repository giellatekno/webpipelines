<script lang="ts">
    import { resolve } from "$app/paths";
    import { t } from "svelte-intl-precompile";
    import type { PageData } from "./$types";
    import { page } from "$app/state";
    import { goto } from "$app/navigation";
    import { MoveLeft } from "@lucide/svelte";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();

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

    let usage = $derived(get_usage(page.params.lang, $t));
    let instruction = $derived($t(`instruction.tool.transcribe`));
</script>

<div>
    <p class="my-2">{usage}</p>

    <form>
        <label class="label">
            <span class="label-text text-sm">{instruction}</span>
            <textarea
                class="textarea w-fit"
                rows="6"
                cols="50"
                name="q"
                bind:value
                onkeydown={on_textarea_keydown}
            ></textarea>
            <div class="flex flex-row gap-2 items-center">
                <button
                    class="btn btn-lg preset-filled-primary-500"
                    type="submit">{$t("[l6e] submit")}</button
                >
                <span>[l6e] Or press Shift+Enter to submit.</span>
            </div>
        </label>
    </form>

    <div class="results">
        {#if data.error}
            Error: {data.error}
        {/if}

        {#if data.results?.analyses}
            <div>
                {#each data.results.analyses as result}
                    {result}<br />
                {:else}
                    No analyses
                {/each}
            </div>
        {/if}
    </div>
</div>
