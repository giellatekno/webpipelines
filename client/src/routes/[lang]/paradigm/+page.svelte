<script lang="ts">
    import { base } from "$app/paths";
    //import { lang } from "../lib/stores.js";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { t } from "svelte-intl-precompile";
    import RadioGroup from "$components/RadioGroup.svelte";
    //import FallbackParadigmLayout from "../components/paradigm_layouts/Fallback.svelte";
    import type { PageData } from "./$types";
    export let data: PageData;

    let { word, size, pos } = data;
    let form_element: undefined | HTMLFormElement;

    async function radio_group_changed(which: string, new_value: string) {
        let new_url = "";

        if (which === "size") {
            new_url = `paradigm?word=${word}&size=${new_value}&pos=${pos}`;
        } else if (which === "pos") {
            new_url = `paradigm?word=${word}&size=${size}&pos=${new_value}`;
        }

        if (word) {
            await goto(new_url, { keepFocus: true });
        }
    }

    const poses = {
        Any: "any",
        Noun: "N",
        Verb: "V",
        Adjective: "A",
        Adverb: "Adv",
        Pronoun: "Pron",
        Num: "Num",
        // Pcle: "Pcle",
        // Po: "Po",
        // Pr: "Pr",
        //Adp: "Adp",
    };
    const paradigm_sizes = {
        Minimal: "minimal",
        Standard: "standard",
        Full: "full",
    };

    async function on_input_paste({ target, clipboardData }: ClipboardEvent) {
    /*
        let old = target.value;
        let paste = clipboardData?.getData("text/plain");
        if (paste && paste !== old) {
            //await tick();
            // TODO don't do a full reload
            //form_element!.submit();
            console.log("TODO resubmit form, but on client side");
            //await goto(`paradigm?word=${value}&size=${size}&pos=${pos}`);
        }
    */
    }

    function debounce(ms: number, fn: Function) {
        let timer: number | null = null;
        return function(...args: any[]) {
            if (timer) {
                window.clearTimeout(timer);
                timer = null;
            }
            timer = window.setTimeout(() => {
                timer = null;
                fn(...args);
            }, ms);
        };
    }

    const submit_after_500ms = debounce(1000, async (new_word: string) => {
        console.log("timer fired, reload with results now, please");
        word = new_word;
        await goto(`paradigm?word=${word}&size=${size}&pos=${pos}`, { keepFocus: true });
    });


    // TODO type of event handlers?
    //async function on_input_input(ev: InputEvent & { target: HTMLInputElement }) {
    const on_input_input: FormEventHandler<HTMLInputElement> = async function (ev) {
        let new_value = ev.target.value;

        let do_it_now = false;
        switch (ev.inputType) {
            case "insertReplacementText":
                do_it_now = true;
                break;
            case "deleteContentBackward":
            case "deleteContentForward":
                if (ev.target.value === "") {
                    await goto("paradigm");
                }
                break;
            case "insertFromPaste":
                do_it_now = true;
                break;
        }

        if (do_it_now) {
            word = new_value;
            await goto(`paradigm?word=${word}&size=${size}&pos=${pos}`);
        } else {
            submit_after_500ms(new_value);
        }
    }

    $: usage = get_usage($page.params.lang, $t);

    function get_usage(lang: string, $t: (key: string) => string) {
        const lang_specific = $t(`usage.lang.${lang}`);
        if (lang_specific !== `usage.lang.${lang}`) {
            return lang_specific;
        } else {
            const fallback = $t("usage");
            return fallback;
        }
    }
</script>

<main>
    <span>
        <h1>{$t("paradigm")}</h1>
        <a href="{base}/{$page.params.lang}">[l6e] Tilbake til verktøy</a>
    </span>

    <p>{@html usage}</p>

    <form
        bind:this={form_element}
        data-sveltekit-keepfocus
    >
        <RadioGroup
            name="size"
            header="Paradigmestørrelse"
            bind:selected={data.size}
            choices={Object.entries(paradigm_sizes)}
            on:new-select={({detail}) => radio_group_changed("size", detail)}
        />
        <RadioGroup
            name="pos"
            header={$t("partofspeech")}
            bind:selected={data.pos}
            choices={Object.entries(poses)}
        />
        <div class="search">
            <input bind:value={word} name="word"
                spellcheck="false"
                on:paste={on_input_paste}
                on:input={on_input_input}
            >
            <span
                class:active={word && word.length > 0}
                class="cross"
                on:click={() => word = ""}
                on:keypress={ev => ev.key == "Enter" ? word = "" : null}
                tabindex="0"
                role="button"
            >&#x2718;</span>
        </div>
        <button type="submit">Send</button>
        <!--
        <WordInput
            debounce={1000}
            on:new-value={({ detail }) => { console.log(detail); } }
            on:reset-value={() => input = ""}
            on:new-input-started={() => input = ""}
        />
        -->
    </form>

    <div style="height: 16px" /> <!-- just for some space -->

    {#if data?.results}
        {@html data.results.text}
    {/if}
</main>

<style>
    main {
        margin-left: 34px;
    }

    h1 {
        display: inline-block;
        padding-right: 1em;
        padding-bottom: 0;
        margin-bottom: 0;
    }

    div.search {
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        min-height: 3em;
        border-radius: 8px;
        border: 2px solid #9d9db0;
        transition:
            width ease-out 0.18s,
            border-radius ease-out 0.18s,
            border-color ease-out 0.18s;
    }
    div.search:focus-within {
        border-radius: 14px;
        border: 2px solid #7777ee;
        box-shadow: 0px 2px 8px 0px rgba(200, 200, 255, 0.9);
    }

    div.search > input {
        margin-left: 6px;
        font-size: 16px;
        font-family: Roboto, sans-serif;
        border: 0;
        outline: 0;
        padding: 8px;
    }
    div.search > input:focus {
        border: 0;
        outline: 0;
    }
    div.search > span.cross {
        color: #9d9db0;
        /*color: gray;*/
        cursor: pointer;
        font-size: 1.5em;
        margin-right: 0.4em;
        transition: color ease-out 0.18s;
    }
    div.search > div:focus-within > span.cross.active {
        color: #f05555;
    }

    button {
        color: black;
        cursor: pointer;
        height: 48px;
        line-height: 1.5em;
        border: 2px solid gray;
        border-radius: 6px;
        padding-left: 1.25em;
        padding-right: 1.25em;
        padding-top: 9px;
        padding-bottom: 9px;
        background-color: color-mix(in srgb, var(--color-sami-blue) 30%, white 70%);
        transition:
            color 0.2s ease-out,
            background-color 0.2s ease-out;
    }
    button:hover {
        color: white;
        background-color: color-mix(in srgb, var(--color-sami-blue) 70%, white 30%);
    }
    button:focus {
        outline: 3px solid orange;
    }
</style>
