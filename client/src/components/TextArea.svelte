<script lang="ts">
    import { goto } from "$app/navigation";
    import { t } from "svelte-intl-precompile";

    let { instruction, value = $bindable(), loading = $bindable() } = $props();

    let textarea: HTMLTextAreaElement;

    async function on_textarea_keydown(ev: KeyboardEvent) {
        if (ev.key === "Enter" && ev.shiftKey) {
            ev.preventDefault();
            loading = true;
            await goto(`?q=${value}`, { keepFocus: true, replaceState: true });
            loading = false;
        }
    }
    async function on_submit(ev: SubmitEvent) {
        ev.preventDefault();
        loading = true;
        await goto(`?q=${value}`, { keepFocus: true, replaceState: true });
        loading = false;
        textarea.focus();
    }

    function on_clear(ev: MouseEvent) {
        ev.preventDefault();
        value = "";
        textarea.focus();
    }
</script>

<form
    onsubmit={on_submit}
    class="card w-xl p-2 flex flex-col gap-2 preset-filled-surface-100-900 border border-surface-200-800"
>
    <label for="q" class="label">
        <span class="label-text text-sm">{instruction}</span>
    </label>
    <textarea
        class="form-textarea rounded-sm w-full"
        rows="6"
        bind:this={textarea}
        bind:value
        name="q"
        onkeydown={on_textarea_keydown}
    ></textarea>
    <div class="flex flex-row gap-2 items-center">
        <button
            class="btn btn-lg preset-filled-secondary-500"
            type="button"
            onclick={on_clear}
        >
            {$t("clear")}
        </button>
        <button class="btn btn-lg preset-filled-primary-500" type="submit">
            {$t("submit")}
        </button>
        <span>{$t("submit.keys")}</span>
    </div>
</form>
