<script lang="ts">
    import type { PageData } from "./$types";
    import { copy_text, POS_TAGS } from "$lib/utils";
    import Table from "$components/Table.svelte";
    import ErrorBox from "$components/ErrorBox.svelte";
    import FormWrapper from "$components/FormWrapper.svelte";
    import TextForm from "$components/TextForm.svelte";
    import { m } from "$lib/paraglide/messages";
    import { page } from "$app/state";
    import { getLocale } from "$lib/paraglide/runtime";
    import { langname } from "$lib/langnames";
    import { createToaster, Toast } from "@skeletonlabs/skeleton-svelte";
    import { CopyCheckIcon } from "@lucide/svelte";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();

    let lang = $derived(page.params.lang || "");

    let value = $derived(data.q || "");

    function color_tags(tags: string[]) {
        const results: string[] = [];
        for (const [i, tag] of tags.entries()) {
            if (POS_TAGS.includes(tag)) {
                results.push(`<span class='font-bold'>${tag}</span>`);
            } else if (tags[i + 1] && POS_TAGS.includes(tags[i + 1])) {
                results.push(`<span class='text-red-800'>${tag}</span>`);
            } else {
                results.push(tag);
            }
        }
        return results;
    }

    function combine_tags(lemma: string, pos: string, tags: string[]) {
        if (tags.length === 1 && tags[0] === "") {
            return [lemma, pos];
        }
        return [lemma, pos, ...tags];
    }

    const toaster = createToaster({ duration: 2000, overlap: true });

    function onTextClick(text: string) {
        copy_text(text);
        toaster.info({});
    }
</script>

<svelte:head>
    <title>{m.analyze_title()} • {langname(lang, getLocale())} • {m.page_title()}</title>
</svelte:head>

<div class="flex flex-col items-center gap-4">
    <h3 class="h4 lg:h3">{m.analyze_title()}</h3>
    <FormWrapper tool="analyze">
        <TextForm bind:value />
    </FormWrapper>

    <div class="mt-6 flex flex-col gap-2">
        {#if data.error}
            <ErrorBox error={data.error} />
        {:else if data.results}
            <div class="flex max-w-dvw flex-col p-2">
                <Table>
                    <thead>
                        <tr>
                            <th>{m.wordform()}</th>
                            <th>{m.analysis()}</th>
                        </tr>
                    </thead>
                    {#each data.results as word_analyses, i}
                        {@const plus = "<span class='text-gray-500'>+</span>"}
                        <tbody>
                            {#each word_analyses.items as { wordform, lemma, pos, tags }, j}
                                {@const html_tags = color_tags(
                                    combine_tags(lemma, pos, tags),
                                ).join(plus)}
                                <tr
                                    class:separator={j ===
                                        word_analyses.items.length - 1 &&
                                        i !== data.results.length - 1}
                                >
                                    <td>
                                        <span class="text-green-700">
                                            {wordform}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            class="text-nowrap"
                                            onclick={() =>
                                                onTextClick(
                                                    combine_tags(lemma, pos, tags).join(
                                                        "+",
                                                    ),
                                                )}
                                        >
                                            {@html html_tags}
                                        </button>
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    {/each}
                </Table>
            </div>
        {/if}
    </div>
</div>

<Toast.Group {toaster}>
    {#snippet children(toast)}
        <Toast {toast}>
            <Toast.Message>
                <CopyCheckIcon />
                Text copied
            </Toast.Message>
            <Toast.CloseTrigger />
        </Toast>
    {/snippet}
</Toast.Group>
