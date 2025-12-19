<script lang="ts">
    import { goto } from "$app/navigation";
    import { t } from "svelte-intl-precompile";

    let { value = $bindable(), rows = 6 } = $props();

    let textarea: HTMLTextAreaElement;

    async function on_textarea_keydown(ev: KeyboardEvent) {
        if (ev.key === "Enter" && ev.shiftKey) {
            ev.preventDefault();
            await goto(`?q=${value}`, { keepFocus: true });
            textarea.focus();
        }
    }

    async function on_submit(ev: SubmitEvent) {
        ev.preventDefault();
        await goto(`?q=${value}`, { keepFocus: true });
        textarea.focus();
    }

    function on_clear(ev: MouseEvent) {
        ev.preventDefault();
        value = "";
        textarea.focus();
    }
</script>

<form class="flex flex-col gap-2" onsubmit={on_submit}>
    <textarea
        class="form-textarea w-full rounded-sm"
        {rows}
        bind:this={textarea}
        bind:value
        name="q"
        onkeydown={on_textarea_keydown}
        placeholder={$t("writehere")}
    ></textarea>
    <div class="flex flex-row items-center justify-start gap-2">
        <button class="btn preset-filled-primary-500" type="submit">
            {$t("submit")}
        </button>
        <button
            class="btn preset-outlined-error-600-400 hover:preset-tonal-error"
            type="button"
            onclick={on_clear}
        >
            {$t("clear")}
        </button>
        <span class="hidden xl:block">{$t("submit.keys")}</span>
    </div>
</form>
