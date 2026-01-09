<script lang="ts">
    import type { PageData } from "./$types";
    import ErrorBox from "$components/ErrorBox.svelte";
    import FormWrapper from "$components/FormWrapper.svelte";
    import TextForm from "$components/TextForm.svelte";
    import { m } from "$lib/paraglide/messages";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();

    // the search text
    let value = $derived(data.q || "");
</script>

<svelte:head>
    <title>{m.generate_title()} | Webpipeline</title>
</svelte:head>

<div class="flex flex-col items-center gap-4">
    <FormWrapper tool="generate">
        <TextForm bind:value rows={2} />
    </FormWrapper>
    <div>
        {#if data.error}
            <ErrorBox error={data.error} />
        {/if}

        {#if data.results}
            <div
                class="card border-primary-500 border-2 p-4 shadow-md xl:text-lg"
            >
                <div class="flex flex-col gap-2">
                    <p class="font-bold text-red-800">Result:</p>

                    <ul class="list-inside list-disc">
                        {#each data.results as result}
                            <li>{result}</li>
                        {/each}
                    </ul>
                </div>
            </div>
        {:else}
            [l6e] No analyses
        {/if}
    </div>
</div>
