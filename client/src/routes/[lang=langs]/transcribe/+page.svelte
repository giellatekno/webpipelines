<script lang="ts">
    import { t } from "svelte-intl-precompile";
    import type { PageData } from "./$types";
    import ErrorBox from "$components/ErrorBox.svelte";
    import FormWrapper from "$components/FormWrapper.svelte";
    import TextForm from "$components/TextForm.svelte";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();

    let value = $derived(data.q || "");
    const tool = "transcribe";
</script>

<svelte:head>
    <title>{$t(tool + ".title")} | Webpipeline</title>
</svelte:head>

<div class="flex flex-col items-center gap-4">
    <FormWrapper {tool}>
        <TextForm bind:value />
    </FormWrapper>

    {#if data.error}
        <ErrorBox error={data.error} />
    {/if}

    {#if data.results}
        <div
            class="card border-primary-500 w-xl border-2 px-4 py-6 text-wrap shadow-md"
        >
            <div class="flex flex-col gap-2 text-xl">
                {#each data.results as result}
                    <p>
                        {result}
                    </p>
                {:else}
                    [l6e] No analyses
                {/each}
            </div>
        </div>
    {/if}
</div>
