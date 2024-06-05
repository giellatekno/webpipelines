use crate::langmodel_files::get_langfile;
use crate::pipelines::run_pipeline_two_langs;
use crate::util::{gunzip, read_docx_text};
use axum::{
    extract::Json,
    response::{IntoResponse, Response},
};
use base64::{engine::general_purpose, Engine as _};
use cmd_lib::run_fun;
use http::StatusCode;
use serde::Deserialize;
use std::collections::HashMap;
use std::io::Write;
use tempfile::NamedTempFile;

const NOB_ALPHABET: &[char] = &[
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z', 'æ', 'ø', 'å', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
    'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Æ', 'Ø',
    'Å',
];

// extracts lines like
//   "liten" A Pos Fem Sg Indef <W:0.0>
//   "setning" N Fem Sg Indef <W:0.0>
//   "giwjlehge" ?
//   "?" CLB <W:0.0>
//   "og" CC <W:0.0>
//   """ PUNCT <W:0.0>
// into a tuple of the word inside the first parens, and the
// part after it (the analysis)
fn extract_word_and_analysis(line: &str) -> (&str, &str) {
    let splits = line.split('"').collect::<Vec<_>>();
    let nsplits = splits.len();
    if nsplits == 4 {
        // a literal " (as in: """ PUNCT <W:0.0>)
        ("\"", &splits[3][1..])
    } else if nsplits == 3 {
        // not a literal "
        (splits[1], &splits[2][1..])
    } else {
        // sometimes there is more, I don't know what it is, just return
        // the the a '"' as the word, it will be filtered out
        ("\"", "")
    }
}

// unwanted analyses: "?", and PUNCT and CLB
fn unwanted_analyses((_word, analysis): &(&str, &str)) -> bool {
    analysis != &"?" || !analysis.contains("PUNCT") || !analysis.contains("CLB")
}

// unwanted words: words that do not contain any norwegian letters
fn unwanted_words((word, _analysis): &(&str, &str)) -> bool {
    word.contains(NOB_ALPHABET)
}

pub fn unknown_in_x_by_freq(input: String, lang1: String, lang2: String) -> Result<String, String> {
    let tokdisamb = get_langfile(&lang1, "tokeniser-disamb-gt-desc.pmhfst").ok_or_else(|| {
        format!(
            "cannot find tokeniser-disamb-gt-desc.pmhfst \
            for language {}",
            lang1
        )
    })?;
    let disambcg = get_langfile(&lang1, "disambiguator.cg3")
        .or_else(|| get_langfile(&lang1, "disambiguator.bin"))
        .ok_or_else(|| {
            format!(
                "cannot find disambiguator.cg3 \
            for language {}",
                lang1
            )
        })?;
    let dict = get_langfile(&lang1, format!("{}{}-all.fst", lang1, lang2).as_str())
        .ok_or_else(|| format!("cannot find {}{}-all.fst", lang1, lang2))?;

    let temp_file = NamedTempFile::new().map_err(|e| e.to_string())?;
    let path = temp_file.path();
    let _ = temp_file
        .as_file()
        .write_all(input.as_bytes())
        .map_err(|e| e.to_string())?;

    //let cut_delim = "-d\"";
    let results = run_fun!(
        cat $path |
        hfst-tokenise -cg $tokdisamb |
        vislcg3 -g $disambcg |
        grep -v "^[:\"]"// |
        //cut $cut_delim -f2 |
        //uniq |
        //sort |
        //uniq -c |
        //sort -nr |
        //cut -c9- |
        //grep -v "[0-9A-ZÆØÅ]" |
        //grep "[a-zæøå]" |
        //lookup $dict
    )
    .map_err(|e| e.to_string())?;

    let recognized_words = results
        .lines()
        .map(|line| line.trim())
        .filter(|line| line.len() > 0)
        .map(extract_word_and_analysis)
        .filter(unwanted_analyses)
        .filter(unwanted_words)
        .map(|(word, _analysis)| word)
        .collect::<Vec<_>>()
        .join("\n");

    let temp_file2 = NamedTempFile::new().map_err(|e| e.to_string())?;
    let path = temp_file2.path();
    let _ = temp_file2
        .as_file()
        .write_all(recognized_words.as_bytes())
        .map_err(|e| e.to_string())?;
    let lookup_binary = std::env::var("LOOKUP_BINARY")
        .unwrap_or_else(|_| String::from("lookup"));
    let lookup_results = run_fun!(
        cat $path |
        $lookup_binary $dict
    )
    .map_err(|e| e.to_string())?;

    // counts of how many times unrecognized word appears
    let mut counts: HashMap<&str, usize> = HashMap::new();

    lookup_results
        .lines()
        // only interested in words that were not found in the dictionary
        // those lines are "<word>\t<word>\t?" - so filter out lines that
        // does not end with ?, and extract the first word
        .filter(|line| line.ends_with('?'))
        .map(|line| line.split('\t').next().unwrap())
        .for_each(|word| {
            counts
                .entry(word)
                .and_modify(|count| *count += 1)
                .or_insert(1);
        });

    // collect the pairs into a vec
    let mut counts: Vec<(&str, usize)> =
        counts.iter().map(|(&word, &count)| (word, count)).collect();

    // ...so that we can sort them by the count..
    counts.sort_by_cached_key(|(_word, count)| *count);
    // biggest first
    counts.reverse();

    // finally output them as <count>\t<word>  one per line
    let final_results = counts
        .iter()
        .map(|(word, count)| format!("{}\t{}", count, word))
        .collect::<Vec<_>>()
        .join("\n");

    Ok(final_results)
}

// The endpoint

const UE: StatusCode = StatusCode::UNPROCESSABLE_ENTITY;

// fn valid_lang(lang: &str) -> bool {
//     lang == "sma" || lang == "sme" || lang == "fin" || lang == "fkv"
// }

#[derive(Deserialize)]
pub struct InputBody {
    typ: String,
    lang1: String,
    lang2: String,
    data: String,
}

pub async fn unknown_in_x_by_freq_endpoint(Json(body): Json<InputBody>) -> Response {
    let lang1 = body.lang1;
    let lang2 = body.lang2;

    let text: String = match body.typ.as_str() {
        "text" => body.data,
        "text+gz+b64" => {
            let Ok(gz_data) = general_purpose::STANDARD.decode(body.data) else {
                return (UE, "could not base64 decode data").into_response();
            };

            let Some(text_data) = gunzip(gz_data) else {
                return (UE, "failed to gunzip data").into_response();
            };

            let Ok(text) = String::from_utf8(text_data) else {
                return (UE, "text not valid utf-8").into_response();
            };
            text
        }
        "docx" => {
            let Ok(decoded) = general_purpose::STANDARD.decode(body.data) else {
                return (UE, "could not base64 decode data").into_response();
            };

            let Some(text) = read_docx_text(decoded) else {
                return (UE, "could not read docx file").into_response();
            };
            text
        }
        _ => return (UE, "'typ' field must be text, text+gz+b64 or docx").into_response(),
    };

    match run_pipeline_two_langs(unknown_in_x_by_freq, text, lang1, lang2).await {
        Ok(text) => (StatusCode::OK, text),
        Err(errmsg) => (StatusCode::INTERNAL_SERVER_ERROR, errmsg),
    }
    .into_response()
}
