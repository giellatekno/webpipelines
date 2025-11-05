<script lang="ts">
    import { paradigm_parser } from "$lib/parsers";
    import { t } from "svelte-intl-precompile";
    import {
        CASES,
        PERSONS,
        NUMBERS,
        NUMBER_PERSONS,
        CASE_NUMBERS,
    } from "./sme_paradigm_options";
    import ParadigmText from "$components/ParadigmText.svelte";

    interface ParadigmElem {
        lemma: string;
        pos: string;
        subclass: string;
        wordforms: Map<string, Set<string>>;
    }
    let { data, size } = $props();

    const paradigms = $derived(paradigm_parser(data));

    function get_word(tags: string, elem: ParadigmElem) {
        const wordforms = elem.wordforms.get(tags);
        return wordforms ? Array.from(wordforms).join(", ") : "--";
    }
</script>

{#each Object.entries(paradigms) as [key, elem]}
    {#if elem.pos === "N"}
        <table class="table w-fit text-lg">
            <thead>
                <tr>
                    <td>{$t("case")}</td>
                    <td>{$t("singular")}</td>
                    <td>{$t("plural")}</td>
                </tr>
            </thead>
            <tbody>
                {#each Object.entries(CASES) as [tag, name]}
                    {#if !(tag === "Ess")}
                        <tr>
                            <td>{$t(name)}</td>
                            <td>{get_word(`Sg+${tag}`, elem)}</td>
                            <td>{get_word(`Pl+${tag}`, elem)}</td>
                        </tr>
                    {:else}
                        <tr>
                            <td>{$t(name)}</td>
                            <td colspan="2" class="text-center">
                                {get_word(tag, elem)}
                            </td>
                        </tr>
                    {/if}
                {/each}
            </tbody>
        </table>
        {#if size === "full"}
            <table class="table w-fit text-lg">
                <thead>
                    <tr>
                        <td>{$t("case")}</td>
                        <td>{$t("person")}</td>
                        <td>{$t("singularis")}</td>
                        <td>{$t("dualis")}</td>
                        <td>{$t("pluralis")}</td>
                    </tr>
                </thead>
                <tbody>
                    {#each Object.keys(CASES) as case_tag}
                        {#if !(case_tag === "Ess")}
                            {#each Object.keys(CASE_NUMBERS) as case_num_tag}
                                {#each Object.keys(PERSONS) as pers_tag}
                                    {#if !(case_tag === "Nom" && (case_num_tag === "Pl" || pers_tag === "3"))}
                                        <tr>
                                            {#if pers_tag === "1"}
                                                <td
                                                    rowspan={case_tag === "Nom"
                                                        ? 2
                                                        : 3}
                                                >
                                                    {case_num_tag}. {case_tag}.
                                                </td>
                                            {/if}
                                            <td>{pers_tag}.</td>
                                            {#each Object.keys(NUMBERS) as num_tag}
                                                <td>
                                                    {get_word(
                                                        `${case_num_tag}+${case_tag}+Px${num_tag}${pers_tag}`,
                                                        elem,
                                                    )}
                                                </td>
                                            {/each}
                                        </tr>
                                    {/if}
                                {/each}
                            {/each}
                        {:else}
                            {#each Object.keys(PERSONS) as pers_tag}
                                <tr>
                                    {#if pers_tag === "1"}
                                        <td rowspan="3">{case_tag}.</td>
                                    {/if}
                                    <td>{pers_tag}.</td>
                                    {#each Object.keys(NUMBERS) as num_tag}
                                        <td>
                                            {get_word(
                                                `${case_tag}+Px${num_tag}${pers_tag}`,
                                                elem,
                                            )}
                                        </td>
                                    {/each}
                                </tr>
                            {/each}
                        {/if}
                    {/each}
                </tbody>
            </table>
        {/if}
        <!-- {:else if paradigm_elem.pos === "V"} -->
        <!--     <table class="table"> -->
        <!--         <thead> -->
        <!--             <tr> -->
        <!--                 <td></td> -->
        <!--             </tr> -->
        <!--         </thead> -->
        <!--     </table> -->
    {:else}
        <ParadigmText {data} />
    {/if}
{/each}
