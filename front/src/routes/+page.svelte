<script>
    import { env } from '$env/dynamic/public';
    import { readablestream_to_blob, blob_to_base64 } from "$lib/index.js";
    const upload_url = `${env.PUBLIC_BACKEND_URL}/unknown-lemmas-in-dict`;
    console.log("upload_url:", upload_url);

    let results_big_warn = false;
    let textarea_value = "";
    let textarea_disabled = false;
    let datafile;
    const LANGS = {
        "nob": {
            "nob": "Norsk bokmål",
        },
        "fin": {
            "nob": "Finsk",
        },
        "fkv": {
            "nob": "Kvensk",
        },
        "sma": {
            "nob": "Sørsamisk",
        },
        "sme": {
            "nob": "Nordsamisk",
        },
        "smn": {
            "nob": "Enaresamisk",
        },
        "sms": {
            "nob": "Skoltesamisk"
        },
    };
    const LANG_PAIRS = [
        ["fin", ["nob", "sme", "smn", "sms"]],
        ["fkv", ["nob"]],
        ["nob", ["fin", "fkv", "sme", "sma"]],
        ["sma", ["nob"]],
        ["sme", ["nob", "fin", "smn"]],
        ["smn", ["fin", "sme"]],
    ];
    let lang1 = "nob";
    let lang2 = "fin";
    $: to_langs = LANG_PAIRS.find(([iso, _]) => iso === lang1)[1];

    let results = "(...venter på valg...)";
    // Timer used while waiting for server
    let waiting_timer = null;
    let abort_controller = null;

    // file data set when choosing a file
    let file_data = null;

    const fetch_opts = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
    };

    function on_textarea_input() {
        if (textarea_value) {
            datafile.disabled = true;
        } else {
            datafile.disabled = false;
        }
    }

    function start_waiting_timer() {
        results = "(...server is processing... 0s)";
        let t = 0;

        function update() {
            t += 1;
            results = `(...server is processing... ${t}s)`;
        }

        waiting_timer = window.setInterval(update, 1000);
    }

    function stop_waiting_timer() {
        if (waiting_timer) {
            window.clearInterval(waiting_timer);
            waiting_timer = null;
        }
    }

    function abort_query() {
        if (abort_controller) {
            abort_controller.abort();
        }
    }

    function reset() {
        stop_waiting_timer();
        results = "(...venter på valg...)";
        textarea_disabled = false;
        datafile.value = null;
        textarea_value = "";
        file_data = null;
        results_big_warn = false;
    }

    async function do_query() {
        let body;
        if (file_data) {
            body = JSON.stringify({ lang1, lang2, ...file_data });
        } else {
            body = JSON.stringify({ lang1, lang2, typ: "text", data: textarea_value });
        }

        abort_controller = new AbortController();
        const signal = abort_controller.signal;
        const opts = { body, signal, ...fetch_opts };

        start_waiting_timer();
        let response;
        try {
            response = await fetch(`${location.protocol}//${upload_url}`, opts);
        } catch (e) {
            const err_name = e.name;
            if (e instanceof TypeError) {
                // there are a number of things that can cause this, but
                // we assume it's a network error
                results = "<Feil: Ingen kontakt med serveren. Serveren kan " +
                    "være nede, eller det kan være at du ikke har internett.>";
            } else if (err_name === "AbortError") {
                // aborted
                results = "<Du avbrøyt prosesseringa.>";
            } else {
                results = `<Feil: Uhåndtert feil: ${e.name}: ${e.message}>`;
            }
            return;
        }
        stop_waiting_timer();

        switch (response.status) {
            case 200:
                results = await response.text();
                break;
            case 503:
                results = "<Tjenesten opplever mye trafikk, og er opptatt nå. Prøv igjen om litt.>";
                break;
            default:
                let status = response.status;
                let msg = await response.text();
                results = `<Feilmelding fra serveren: ${status}>:<br>${msg}`;
        }
    }

    async function on_file_change() {
        textarea_disabled = true;
        const file = this.files[0];
        const is_docx = file.type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        const type = is_docx ? "docx" : "text+gz+b64";

        let blob;
        if (is_docx) {
            blob = file;
        } else {
            const gzipped_stream = file.stream().pipeThrough(new CompressionStream("gzip"));
            blob = await readablestream_to_blob(gzipped_stream);
        }
        const base64_s = await blob_to_base64(blob);
        const data_index = base64_s.indexOf("base64,") + 7;
        const base64_data = base64_s.slice(data_index);
        results_big_warn = base64_data.length > 100;
        file_data = { data: base64_data, typ: type };
    }
</script>

<svelte:head>
    <title>Frekvensorterte ukjente - Giellatekno Web Pipeline</title>
</svelte:head>

<blockquote>
    Programmet gir ei liste over ord i teksten som ikke finnes
    i ordboka,<br>sortert slik at de ordene som opptrer oftest i teksten
    kommer først.
</blockquote>

<form>
    <h3>Språk:</h3>
    <div class="x">
        <div class="inner">
            <div>
                <div class="title">Fra..</div>
                {#each LANG_PAIRS as langpair}
                    {@const iso = langpair[0]}
                    {@const human_name = LANGS[iso]["nob"]}
                    <label><input bind:group={lang1} type="radio" name="lang1" value={iso}>{human_name}</label>
                {/each}
            </div>
            <div>
                <div class="title">Til..</div>
                {#each to_langs as iso}
                    <label><input bind:group={lang2} type="radio" name="lang2" value={iso}>{LANGS[iso]["nob"]}</label>
                    <br>
                {/each}
            </div>
        </div>
    </div>

    <h3>Tekst:</h3>
    <p>Teksten kan enten komme fra ei fil, eller den kan skrives rett inn i tekstfeltet.</p>
    Fil: <input
             bind:this={datafile}
             on:change={on_file_change}
             type="file"
             id="textfile"
             name="textfile"
             accept="text/plain,.docx"
          />
    <p class="filetype">
        Merk: Fila må være ei tekstfil (<span class="italic">.txt/.text</span>)
        lagra i utf-8, eller et Word-dokument (<span class="italic">.docx</span>).
    </p>
    {#if results_big_warn}
        <p class="results_big_warn">
            Fila du har valgt er ganske stor, så det kan ta noe tid før resultatene kommer.
        </p>
    {/if}
    <textarea bind:value={textarea_value} on:input={on_textarea_input} disabled={textarea_disabled} rows="10"></textarea>
    <div class="buttons">
        <button type="submit" on:click={do_query}>Send</button>
        <button on:click={reset} type="button">Nullstill</button>
    </div>
</form>

<div id="results-area">
    <h2>Resultater:</h2>
    {#if waiting_timer}
        <button on:click={abort_query}>Avbryt prosessen</button>
    {/if}
    <pre>{results}</pre>
</div>

<style>
    form label {
        padding: 0.5em;
    }

    input[type="file"] {
        margin-top: 1em;
    }

    p.filetype {
        margin-top: 0.2em;
        color: rgb(31, 40, 176);
        font-size: 0.9em;
    }

    p.results_big_warn {
        margin-top: 0.2em;
        color: rgb(242, 6, 6);
        font-size: 0.9em;
    }

    span.italic {
        font-style: italic;
    }

    div.x {
        display: grid;
        place-items: center;
    }

    div.x > div.inner {
        font-size: 1.4em;
        width: 60%;
        display: flex;
        justify-content: space-evenly;
    }

    div.x > div.inner > div {
        display: flex;
        flex-direction: column;
    }

    div.x > div.inner > div > label {
        padding: 0.1em;
    }

    div.title {
        font-size: 1.2em;
        margin-bottom: 6px;
    }

    textarea {
        width: 100%;
    }

    div.buttons {
        margin-top: 1em;
        display: flex;
        justify-content: space-evenly;
    }

    div.buttons > button {
        font-size: 1.1rem;
        padding: 4px 20px;
    }

    blockquote {
        border-left: 4px solid orange;
        padding-left: 1em;
        margin-left: 0;
        padding: 0.4em 1em 0.4em 1em;
    }
</style>
