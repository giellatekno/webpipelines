<script lang="ts">
    import "../app.css";
    import AppBar from "$components/AppBar.svelte";
    import Footer from "$components/Footer.svelte";

    let { children } = $props();
</script>

<svelte:head>
    <title>Giellatekno Webpipelines</title>
    <meta name="description" content="Run Giellatekno Pipelines" />
</svelte:head>

<div class="app">
    <AppBar />
    <main class="p-6">
        {@render children?.()}
    </main>
    <Footer />
</div>
