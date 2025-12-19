<script lang="ts">
    import { t } from "svelte-intl-precompile";
    import type { PageData } from "./$types";
    import Table from "$components/Table.svelte";
    import FormWrapper from "$components/FormWrapper.svelte";
    import TextForm from "$components/TextForm.svelte";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();

    const tool = "hyphenate";
    let value = $derived(data.q || "");
</script>

<svelte:head>
    <title>{$t(tool + ".title")} | Webpipeline</title>
</svelte:head>

<div class="flex flex-col items-center gap-4">
    <FormWrapper {tool}>
        <TextForm bind:value />
    </FormWrapper>

    <div>
        {#if data.error}
            Error: {data.error}
        {/if}
        {#if data.results}
            <Table>
                <thead>
                    <tr>
                        <th>Lemma</th>
                        <th>Hyphenated</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {#each data.results as { input_word, variations }, i}
                        {#each variations as { hyphenated_word, score }, j}
                            <tr
                                class:separate={i !== data.results.length - 1 &&
                                    j === variations.length - 1}
                            >
                                <td>{input_word}</td>
                                <td>
                                    {#each hyphenated_word.split("") as char}
                                        {#if ["#", "-", "^"].includes(char)}
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
                    {/each}
                </tbody>
            </Table>
        {/if}
    </div>
</div>
