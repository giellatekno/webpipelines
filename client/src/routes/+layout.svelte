<script>
    import { base } from "$app/paths";
    import { t } from "svelte-intl-precompile";
    import LocaleSelector from "$components/LangSelector.svelte";
    import LangSelector from "$components/LocaleSelector.svelte";
	import './styles.css';
</script>

<div class="app">
    <header>
        <div>
            <LangSelector />
            <LocaleSelector />
        </div>
        <div style="margin-left: auto">
            <a href="{base}/about">{$t("about")}</a>&nbsp;&#183;&nbsp;
            <a href="{base}/developers">{$t("developers")}</a>
        </div>
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
        margin: 6px 6px 0 6px;
        width: calc(100vw - 12px);
    }

    header > div {
        padding: 0;
        margin: 0;
        display: inline-flex;
        align-items: center;
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
