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

    let value = $state(data.q || "");

    let hyphenate_data = $derived(data.results?.hyphenated);

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
            await goto(`?q=${value}`);
        }
    }

    async function on_submit() {
        await goto(`?q=${value}`, { keepFocus: true });
    }

    let usage = $derived(get_usage(page.params.lang, $t));
    let instruction = $derived($t(`instruction.tool.hyphenate`));
</script>

<div>
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
                    {$t("submit")}
                </button>
                <span>{$t("submit.keys")}</span>
            </div>
        </label>
    </form>

    <div class="results">
        {#if data.error}
            Error: {data.error}
        {/if}
        {#if hyphenate_data}
            <div
                class="card p-2 preset-filled-surface-100-900 border border-surface-200-800 w-fit"
            >
                <table class="table w-fit">
                    <thead>
                        <tr>
                            <th>Lemma</th>
                            <th>Hyphenated</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    {#each hyphenate_data as { input_word, variations }}
                        <tbody class="border-t mt-2">
                            {#each variations as { hyphenated_word, score }}
                                <tr>
                                    <td>{input_word}</td>
                                    <td>
                                        {#each hyphenated_word.split("") as char}
                                            {#if char === "^" || char === "#"}
                                                <span class="text-red-800">
                                                    {char}
                                                </span>
                                            {:else}
                                                {char}
                                            {/if}
                                        {/each}
                                    </td>
                                    <td>{score}</td>
                                </tr>
                            {/each}
                        </tbody>
                    {/each}
                </table>
            </div>
        {/if}
    </div>
</div>
