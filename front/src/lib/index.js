export async function readablestream_to_blob(stream) {
    const reader = stream.getReader();
    const chunks = [];
    let done = false;
    while (!done) {
        const next = await reader.read();
        done = next.done;
        if (next.value) {
            chunks.push(next.value);
        }
    }
    return new Blob(chunks);
}

export function blob_to_base64(blob) {
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
}

/*
async function encode_utf8(text) {
    return (new TextEncoder()).encode(text);
}
*/

/*
async function readablestream_to_arraybuffer(stream) {
    let blob = await readablestream_to_blob(stream);
    return await blob.arrayBuffer();
}
*/
