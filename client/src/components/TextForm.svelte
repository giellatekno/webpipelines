<script lang="ts">
    import { goto } from "$app/navigation";
    import { m } from "$lib/paraglide/messages";

    let { value = $bindable(), rows = 6 } = $props();

    let textarea: HTMLTextAreaElement;

    async function on_textarea_keydown(ev: KeyboardEvent) {
        if (ev.key === "Enter" && ev.shiftKey) {
            ev.preventDefault();
            await goto(`?q=${encodeURIComponent(value)}`, { keepFocus: true });
            textarea.focus();
        }
    }

    async function on_submit(ev: SubmitEvent) {
        ev.preventDefault();
        await goto(`?q=${encodeURIComponent(value)}`, { keepFocus: true });
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
        placeholder={m.writehere()}
    ></textarea>
    <div class="flex flex-row items-center justify-between gap-2 lg:justify-start">
        <button
            class="btn preset-outlined-error-600-400 hover:preset-tonal-error"
            type="button"
            onclick={on_clear}
        >
            {m.clear()}
        </button>
        <button class="btn preset-filled-primary-500" type="submit">
            {m.submit()}
        </button>
        <span class="hidden lg:block">{m.submit_keys()}</span>
    </div>
</form>
