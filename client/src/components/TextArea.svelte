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
    class="card preset-filled-surface-100-900 border-surface-200-800 flex w-full flex-col gap-2 border p-4 xl:w-xl"
>
    <!-- <label for="q" class="label"> -->
    <!--     <span class="label-text text-sm">{instruction}</span> -->
    <!-- </label> -->
    <textarea
        class="form-textarea w-full rounded-sm"
        rows="6"
        bind:this={textarea}
        bind:value
        name="q"
        onkeydown={on_textarea_keydown}
        placeholder={$t("writehere")}
    ></textarea>
    <div
        class="flex flex-row items-center justify-between gap-2 xl:justify-start"
    >
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
