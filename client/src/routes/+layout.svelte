<script>
    import { t } from "svelte-intl-precompile";
    import LocaleSelector from "$components/LangSelector.svelte";
    import LangSelector from "$components/LocaleSelector.svelte";
	import './styles.css';
</script>

<div class="app">
    <header>
        <LangSelector />
        <LocaleSelector />
    </header>

    <main>
        <slot />
    </main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

    header {
        display: flex;
        align-items: center;
        margin-top: 6px;
        margin-left: 6px;
    }

	main {
        margin-left: calc(6px + 28px);
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
