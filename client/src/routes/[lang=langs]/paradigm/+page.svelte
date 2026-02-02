<script lang="ts">
    import { page } from "$app/state";
    import type { PageData } from "./$types";
    import { type SvelteComponent, type Component } from "svelte";
    import Paradigm from "$components/Paradigm.svelte";
    import ErrorBox from "$components/ErrorBox.svelte";
    import FormWrapper from "$components/FormWrapper.svelte";
    import ParadigmForm from "$components/ParadigmForm.svelte";
    import { m } from "$lib/paraglide/messages";
    import { hasParadigmSchema } from "$lib/paradigms/registry";

    interface Props {
        data: PageData;
    }
    let { data }: Props = $props();
    let { word, pos } = $derived(data);

    let format = $state("table");
</script>

<svelte:head>
    <title>{m.paradigm_title()} | Webpipeline</title>
</svelte:head>

<div class="flex flex-col items-center gap-4">
    <FormWrapper tool="paradigm">
        <ParadigmForm
            {word}
            {pos}
            bind:format
            has_tables={hasParadigmSchema(page.params.lang)}
        />
    </FormWrapper>

    {#if data.results}
        <Paradigm data={data.results} {format} />
    {:else if data.error}
        <ErrorBox error={data.error} />
    {/if}
</div>
