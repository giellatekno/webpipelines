<script lang="ts">
    import "../app.css";
    import AppBar from "$components/AppBar.svelte";
    import Footer from "$components/Footer.svelte";

    let { children } = $props();
</script>

<svelte:head>
    <title>Giellatekno Webpipeline</title>
    <meta name="description" content="Run Giellatekno Pipelines" />
</svelte:head>

<div
    class="app preset-gradient-bg bg-secondary-700-300 flex h-full min-h-screen flex-col"
>
    <AppBar />
    <main
        class="bg-surface-50-950 mx-auto w-full max-w-[1750px] flex-1 p-1 pb-16 xl:p-4"
    >
        {@render children?.()}
    </main>
    <Footer />
</div>
