<script>
    import { env } from "$env/dynamic/public";
    import { readablestream_to_blob, blob_to_base64 } from "$lib/index.js";
    const upload_url = `${env.PUBLIC_BACKEND_URL}/lemma-count`;

    let textarea_value = "";
    let textarea_disabled = false;
    let datafile;
    const LANGS = [
        { iso: "fin", value: "Finsk" },
        { iso: "fit", value: "Meänkieli" },
        { iso: "fkv", value: "Kvensk" },
        { iso: "nob", value: "Norsk bokmål" },
        { iso: "sma", value: "Sørsamisk" },
        { iso: "sme", value: "Nordsamisk" },
        { iso: "smj", value: "Lulesamisk" },
        { iso: "smn", value: "Enaresamisk" },
        { iso: "sms", value: "Skoltesamisk" },
    ];
    let lang = "fin";

    let results = "(...venter på valg...)";

    // Timer used while waiting for server
    let waiting_timer = null;

    // file data set when choosing a file
    let file_data = null;

    const fetch_opts = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        }
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

    function reset() {
        stop_waiting_timer();
        textarea_disabled = false;
        datafile.value = null;
        textarea_value = "";
        file_data = null;
    }

    async function do_query() {
        let body;
        if (file_data) {
            body = JSON.stringify({ lang, ...file_data });
        } else {
            body = JSON.stringify({ lang, typ: "text", data: textarea_value });
        }

        const opts = { body, ...fetch_opts };

        start_waiting_timer();
        let response;
        try {
            response = await fetch(`${location.protocol}//${upload_url}`, opts);
        } catch (e) {
            if (e instanceof TypeError) {
                // there are a number of things that can cause this, but
                // we assume it's a network error
                stop_waiting_timer();
                results = "<Feil: Ingen kontakt med serveren. Serveren kan " +
                    "være nede, eller det kan være at du ikke har internett.>";
            } else if (e.name === "AbortError") {
                stop_waiting_timer();
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
                results = `<Feil fra serveren: ${status}>:<br>${msg}`;
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
        file_data = { data: base64_data, typ: type };
    }

</script>

<svelte:head>
    <title>Lemmaliste - Giellatekno Web Pipeline</title>
</svelte:head>

<blockquote>
    Programmet gir ei sortert liste over alle lemma i teksten.
</blockquote>

<form>
    <h3>Språk:</h3>
    <div class="x">
        <div class="inner">
            {#each LANGS as { iso, value }}
                <label><input bind:group={lang} type="radio" name="lang" value={iso}>{value}</label>
            {/each}
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
    <textarea bind:value={textarea_value} on:input={on_textarea_input} disabled={textarea_disabled} rows="10"></textarea>
    <div class="buttons">
        <button type="submit" on:click={do_query}>Send</button>
        <button on:click={reset} type="button">Nullstill</button>
    </div>
</form>

<div id="results-area">
    <h2>Resultater:</h2>
    <pre>{results}</pre>
</div>

<style>
    form label {
        padding: 0.1em;
    }

    input[type="file"] {
        margin-top: 1em;
    }

    p.filetype {
        margin-top: 0.2em;
        color: rgb(200, 50, 50);
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
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: repeat(auto-fill, 1fr);
        font-size: 1.4em;
        width: 60%;
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
