<script lang="ts">
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    import icon from "$lib/images/search.svg";
    import { t } from "svelte-intl-precompile";

    export let value: string;

    function onkeydown(ev: KeyboardEvent) {
        if (ev.key === "Enter") {
            dispatch("enter");
        } else if (ev.key === "Escape") {
            value = "";
        }
    }
</script>

<div>
    <img alt="" src={icon} width="20" height="20">
    <input bind:value on:keydown={onkeydown} placeholder="{$t("search")}...">
</div>

<style>
    div {
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        padding: 6px;
        min-height: 3em;
    }
    img {
        margin-right: 8px;
        user-select: none;
    }
    input {
        font-size: 16px;
        font-family: Roboto, sans-serif;
        width: 8em;
        border-radius: 12px;
        border: 2px solid #dadada;
        padding: 8px;
        transition:
            width ease-out 0.15s,
            border-radius ease-out 0.15s,
            border-color ease-out 0.15s;
    }
    input:focus {
        width: 100%;
        border-radius: 6px;
        border: 2px solid #7777ee;
        outline: none;
    }
</style>
