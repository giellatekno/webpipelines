<script lang="ts">
    import { page } from "$app/state";
    import { t } from "svelte-intl-precompile";
    import type { PageData } from "./$types";
    import { type SvelteComponent, type Component } from "svelte";
    import Paradigm from "$components/Paradigm.svelte";
    import ErrorBox from "$components/ErrorBox.svelte";
    import FormWrapper from "$components/FormWrapper.svelte";
    import ParadigmForm from "$components/ParadigmForm.svelte";

    interface Props {
        data: PageData;
    }
    let { data }: Props = $props();
    let { word, size, pos } = $derived(data);

    const allTableModules = import.meta.glob<SvelteComponent>(
        "../../../components/tables/*/*.svelte",
    );

    async function load_tables(): Promise<Component[] | undefined> {
        const lang = page.params.lang;

        const componentNames = [
            "Adjective",
            "Noun",
            "Numeral",
            "Pronoun",
            "Verb",
        ];
        const loadedComponents: Component[] = [];

        try {
            for (const componentName of componentNames) {
                const path = `../../../components/tables/${lang}/${componentName}.svelte`;
                const loader = allTableModules[path];

                if (loader) {
                    const module = await loader();
                    loadedComponents.push(module.default);
                } else {
                    console.warn(
                        `Component not found for language ${lang} at path: ${path}`,
                    );
                    return undefined;
                }
            }
            return loadedComponents;
        } catch (error) {
            console.warn(
                `Could not load paradigm component for language: ${lang}`,
                error,
            );
            return undefined;
        }
    }
    let lang_tables = load_tables();

    const tool = "paradigm";
    let format = $state("table");
</script>

<svelte:head>
    <title>{$t(tool + ".title")} | Webpipeline</title>
</svelte:head>

<div class="flex flex-col items-center gap-4">
    <FormWrapper {tool}>
        <ParadigmForm
            {word}
            {size}
            {pos}
            bind:format
            has_tables={!!lang_tables}
        />
    </FormWrapper>

    {#if data.results}
        <Paradigm data={data.results} {lang_tables} {format} />
    {:else if data.error}
        <ErrorBox error={data.error} />
    {/if}
</div>
