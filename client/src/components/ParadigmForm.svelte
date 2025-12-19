<script lang="ts">
    import { goto } from "$app/navigation";
    import { t } from "svelte-intl-precompile";

    let { word, size, pos, format = $bindable(), has_tables } = $props();

    const poses = {
        any: "any",
        noun: "N",
        verb: "V",
        adjective: "A",
        // adverb: "Adv",
        pronoun: "Pron",
        numeral: "Num",
        // Pcle: "Pcle",
        // Po: "Po",
        // Pr: "Pr",
        //Adp: "Adp",
    };
    const paradigm_sizes = ["minimal", "standard", "full"];

    let input: HTMLInputElement;

    async function on_radio_change() {
        if (word) {
            goto(`?word=${word}&size=${size}&pos=${pos}`);
            input.focus();
        }
    }

    async function on_submit(ev: SubmitEvent) {
        ev.preventDefault();
        goto(`?word=${word}&size=${size}&pos=${pos}`);
        input.focus();
    }
</script>

<form onsubmit={on_submit} id="form" class="mb-2 flex flex-col gap-2">
    <div
        class="flex flex-col items-center gap-2 xl:flex-row xl:justify-center xl:gap-4"
    >
        <div
            class="grid grid-cols-2 items-center gap-2 xl:grid-cols-1 xl:gap-0"
        >
            <label
                for="paradigmsize-select"
                class="label-text text-right xl:text-left xl:text-sm"
            >
                {$t("paradigmsize")}:
            </label>
            <select
                class="select bg-surface-50-950 text-sm xl:text-base"
                bind:value={size}
                onchange={on_radio_change}
                name="size"
                id="paradigmsize-select"
            >
                {#each paradigm_sizes as value}
                    <option {value}>
                        {$t("paradigmsize." + value)}
                    </option>
                {/each}
            </select>
        </div>
        <div
            class="grid grid-cols-2 items-center gap-2 xl:grid-cols-1 xl:gap-0"
        >
            <label
                for="pos-select"
                class="label-text text-right xl:text-left xl:text-sm"
            >
                {$t("partofspeech")}:
            </label>
            <select
                class="select bg-surface-50-950 text-sm xl:text-base"
                bind:value={pos}
                onchange={on_radio_change}
                name="pos"
                id="pos-select"
            >
                {#each Object.entries(poses) as [label, value]}
                    <option {value}>
                        {$t("partofspeech." + label)}
                    </option>
                {/each}
            </select>
        </div>

        {#if has_tables}
            <div
                class="grid grid-cols-2 items-center gap-2 xl:grid-cols-1 xl:gap-0"
            >
                <label
                    for="format-select"
                    class="label-text text-right xl:text-left xl:text-sm"
                >
                    {$t("paradigm.format")}:
                </label>
                <select
                    class="select bg-surface-50-950 text-sm xl:text-base"
                    bind:value={format}
                    onchange={on_radio_change}
                    name="format"
                    id="format-select"
                >
                    <option value="table">
                        {$t("paradigm.table")}
                    </option>
                    <option value="list">
                        {$t("paradigm.list")}
                    </option>
                </select>
            </div>
        {/if}
    </div>
    <span class="mt-4 flex justify-center">
        <div class="flex flex-col">
            <div class="flex h-fit flex-row gap-2">
                <input
                    class="input bg-surface-50 xl:h-12 xl:w-80 xl:text-lg"
                    id="input"
                    type="search"
                    name="word"
                    bind:value={word}
                    bind:this={input}
                    autocapitalize="off"
                    spellcheck="false"
                    placeholder={$t("search") + "..."}
                />
                <button
                    class="btn preset-filled-primary-500 text-sm xl:text-base"
                    type="submit"
                >
                    {$t("submit")}
                </button>
            </div>
        </div>
    </span>
</form>
