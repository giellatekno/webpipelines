<script lang="ts">
    import { goto } from "$app/navigation";
    import { m } from "$lib/paraglide/messages";

    let { word, pos, format = $bindable(), has_tables } = $props();

    const poses = {
        any: m.partofspeech_any,
        N: m.partofspeech_noun,
        V: m.partofspeech_verb,
        A: m.partofspeech_adjective,
        Pron: m.partofspeech_pronoun,
        Num: m.partofspeech_numeral,
        // adverb: "Adv",
        // Pcle: "Pcle",
        // Po: "Po",
        // Pr: "Pr",
        //Adp: "Adp",
    } as const;

    let input: HTMLInputElement;

    async function on_radio_change() {
        if (word) {
            goto(`?word=${word}&pos=${pos}`);
            input.focus();
        }
    }

    async function on_submit(ev: SubmitEvent) {
        ev.preventDefault();
        goto(`?word=${word}&pos=${pos}`);
        input.focus();
    }
</script>

<form onsubmit={on_submit} id="form" class="mb-2 flex flex-col items-center gap-2">
    <span class="flex justify-center">
        <div class="flex flex-col">
            <div class="flex h-fit flex-row gap-2">
                <input
                    class="input bg-surface-50 h-12 text-lg lg:w-80"
                    id="input"
                    type="search"
                    name="word"
                    bind:value={word}
                    bind:this={input}
                    autocapitalize="off"
                    spellcheck="false"
                    placeholder={m.search() + "..."}
                />
                <button class="btn preset-filled-primary-500 m-0.5" type="submit">
                    {m.submit()}
                </button>
            </div>
        </div>
    </span>
    <div class="mt-4 grid w-1/2 grid-cols-1 gap-4">
        <div class="w-full">
            <label for="pos-select" class="label-text">
                {m.partofspeech()}:
            </label>
            <select
                class="select bg-surface-50-950 min-h-max w-full"
                bind:value={pos}
                onchange={on_radio_change}
                name="pos"
                id="pos-select"
            >
                {#each Object.entries(poses) as [value, title]}
                    <option {value}>
                        {title()}
                    </option>
                {/each}
            </select>
        </div>

        <div class="w-full">
            {#if has_tables}
                <label for="format-select" class="label-text">
                    {m.paradigm_format()}:
                </label>
                <div
                    class="bg-surface-50-950 border-surface-200-800 flex flex-row justify-center gap-4 rounded-sm border p-2"
                >
                    <div class="flex items-center space-x-2">
                        <input
                            type="radio"
                            class="radio"
                            bind:group={format}
                            onchange={on_radio_change}
                            name="format"
                            value="table"
                        />
                        <p>{m.paradigm_table()}</p>
                    </div>
                    <div class="flex items-center space-x-2">
                        <input
                            type="radio"
                            class="radio"
                            bind:group={format}
                            onchange={on_radio_change}
                            name="format"
                            value="list"
                        />
                        <p>{m.paradigm_list()}</p>
                    </div>
                </div>
                <!-- <select -->
                <!--     class="select bg-surface-50-950 text-sm xl:text-base" -->
                <!--     bind:value={format} -->
                <!--     onchange={on_radio_change} -->
                <!--     name="format" -->
                <!--     id="format-select" -->
                <!-- > -->
                <!--     <option value="table"> -->
                <!--         {m.paradigm_table()} -->
                <!--     </option> -->
                <!--     <option value="list"> -->
                <!--         {m.paradigm_list()} -->
                <!--     </option> -->
                <!-- </select> -->
            {/if}
        </div>
    </div>
</form>
