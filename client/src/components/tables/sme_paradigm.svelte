<script lang="ts">
    let { text } = $props();

    function parse_paradigm(text: string) {
        // TODO: Better parsing
        const lines = text.trim().split("\n");
        const results = {
            pos: "",
            conj_words: new Map(),
        };

        for (const line of lines) {
            const trimmed_line = line.trim();

            if (trimmed_line === "DIRECT HITS") {
                continue;
            }
            if (trimmed_line === "OTHER HITS") {
                break;
            }

            if (trimmed_line.length > 0) {
                const parts = trimmed_line.split("\t");

                if (parts.length >= 3) {
                    const full_tag = parts[0];
                    const conj_word = parts[1];

                    const tag_parts = full_tag.split("+");
                    const pos = tag_parts[1] || "";
                    const tags = tag_parts.slice(2).join("+");

                    if (results.pos === "") {
                        results.pos = pos;
                    }

                    results.conj_words.set(tags, conj_word);
                }
            }
        }
        return results;
    }

    const paradigm = $derived(parse_paradigm(text));
</script>

{#if paradigm.pos === "N"}
    <table class="table w-fit">
        <thead>
            <tr>
                <td>Kasus</td>
                <td>Entall</td>
                <td>Flertall</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Nominativ</td>
                <td>{paradigm.conj_words.get("Sg+Nom")}</td>
                <td>{paradigm.conj_words.get("Pl+Nom")}</td>
            </tr>
            <tr>
                <td>Genitiv</td>
                <td>{paradigm.conj_words.get("Sg+Gen")}</td>
                <td>{paradigm.conj_words.get("Pl+Gen")}</td>
            </tr>
            <tr>
                <td>Akkussativ</td>
                <td>{paradigm.conj_words.get("Sg+Acc")}</td>
                <td>{paradigm.conj_words.get("Pl+Acc")}</td>
            </tr>
            <tr>
                <td>Illativ</td>
                <td>{paradigm.conj_words.get("Sg+Ill")}</td>
                <td>{paradigm.conj_words.get("Pl+Ill")}</td>
            </tr>
            <tr>
                <td>Lokativ</td>
                <td>{paradigm.conj_words.get("Sg+Loc")}</td>
                <td>{paradigm.conj_words.get("Pl+Loc")}</td>
            </tr>
            <tr>
                <td>Komitativ</td>
                <td>{paradigm.conj_words.get("Sg+Com")}</td>
                <td>{paradigm.conj_words.get("Pl+Com")}</td>
            </tr>
            <tr>
                <td>Essiv</td>
                <td colspan="2" class="text-center">
                    {paradigm.conj_words.get("Ess")}
                </td>
            </tr>
        </tbody>
    </table>

    <table class="table">
        <!-- TODO: Possesive suffixes -->
    </table>
{:else if paradigm.pos === "V"}
    <table class="table">
        <thead>
            <tr>
                <td></td>
            </tr>
        </thead>
    </table>
{:else}
    {@html text.replaceAll("\n", "<br />")}
{/if}
