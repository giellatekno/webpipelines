<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    import { only_on } from "$lib/utils.js";

    export let name: string = "group";
    export let header: string;
    export let choices: Array<[string, string]>;
    export let selected: string;

    function select_choice(choice: string) {
        dispatch("new-select", choice);
        selected = choice;
    }

    /*
    type Fn = () => void;
    type KeyboardEventHandler = (ev: KeyboardEvent) => void;
    function enter_and_space(fn: Fn): KeyboardEventHandler {
        return function (ev: KeyboardEvent) {
            if (ev.key === "Enter" || ev.key === " ") fn();
        }
    }
    */
    const enter_and_space = only_on(["Enter", " "]);
</script>

<div>
    <header>{header}</header>

    {#each choices as [label, value], i}
        <label for={value}>
            <input type="radio" id={value} bind:group={selected} {value}>
            <span>{label}</span>
        </label>
        <!--
        <button
            {name}
            id="button{i}"
            class:on={selected === label}
            on:click={() => select_choice(label)}
            on:keydown={enter_and_space(() => select_choice(label))}
        >
            {label}
            <input
                type="radio"
                bind:group={selected}
                {name}
                value={value}
            >
        </button>
        -->
    {/each}
</div>

<style>
    div {
        display: flex;
        font-variant: small-caps;
        user-select: none;
        margin: 8px 0;
    }

    div > header {
        font-size: 18px;
        font-weight: bold;
        padding: 2px 8px;
        border-radius: 5px;
        color: #000;
    }

    /*
    label {
        cursor: pointer;
        font-size: 16px;
        border: none;
        margin-left: 16px;
        padding: 5px 14px;
        border-radius: 5px;
        background-color: var(--color-bg-1, #d9d9d9);
        color: #292929;
        font-weight: bold;
        transition:
            background-color 0.2s ease-out,
            color 0.2s ease-out;
    }
    */

    /*
    input[type=radio]:checked+label {
        background-color: var(--color-sami-blue, #4651ea);
        color: white;
    */
        /*
        outline: 2px solid orange;
        */
    /*
    }
    */

    /*
    div > button {
        font-size: 16px;
        border: none;
        margin-left: 16px;
        padding: 5px 14px;
        border-radius: 5px;
        background-color: var(--color-bg-1, #d9d9d9);
        color: #292929;
        font-weight: bold;
        transition:
            background-color 0.2s ease-out,
            color 0.2s ease-out;
    }

    div > button.on {
        background-color: var(--color-sami-blue, #4651ea);
        color: white;
    }

    div > button:hover,
    div > button > label:hover {
        cursor: pointer;
    }

    div > button.on:focus-within {
        outline: 2px solid orange;
    }

    div input {
        appearance: none;
        display: none;
    }
    */

    @media screen and (max-width: 880px) {
        div {
            flex-wrap: wrap;
        }

        div > header {
            width: 100%;
        }

        div > button {
            margin-left: 0;
            margin-right: 16px;
        }
    }

    @media screen and (max-width: 750px) {
        div > header {
            margin-bottom: 0;
        }
        div > button {
            margin-top: 8px;
        }
    }
</style>
