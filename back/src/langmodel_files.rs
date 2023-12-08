use std::collections::{HashMap, HashSet};
use std::sync::RwLock;
use std::path::PathBuf;

use axum::extract::Query;
use axum::response::{Json, IntoResponse, Response};
use dotenv;
use once_cell::sync::Lazy;
use serde::{Serialize, Deserialize};
use serde_json::{json, Value};
use tracing::info;

use crate::util::query_param_is_trueish;

/// Total number of languages we have. Change this if we add or remove any.
const NUM_LANGS: usize = 51;

/// How many language model files (artifacts or source files) does each
/// language have, on average...roughly? (answer: no idea, just ballparking)
const AVG_NUM_LANGFILES_PER_LANG: usize = 4;

const LANGS: [&str; NUM_LANGS] = [
    "bxr", "chr", "ciw", "cor", "crk",
    "deu", "est", "evn", "fao", "fin",
    "fit", "fkv", "gle", "hdn", "hun",
    "ipk", "izh", "kal", "kca", "koi",
    "kom", "kpv", "lav", "liv", "lut",
    "mdf", "mhr", "mns", "mrj", "myv",
    "nio", "nno", "nob", "olo", "rmf",
    "rup", "rus", "sjd", "sje", "sma",
    "sme", "smj", "smn", "sms", "som",
    "swe", "udm", "vep", "vot", "vro",
    "yrk",
];

#[derive(Serialize, Deserialize)]
pub struct LangmodelFiles {
    files: Vec<LangmodelFile>,
}

#[derive(Serialize, Deserialize)]
struct LangmodelFile {
    filename: String,
    repo_path: String,
    build_flags: Option<Vec<String>>,
    methods: Vec<String>,
    requires_build: Option<bool>,
    shared_by: Option<Vec<String>>,
    repo: Option<String>,
}

const LANGMODEL_DEFS: Lazy<LangmodelFiles> = Lazy::new(|| {
    serde_yaml::from_str(include_str!("langmodel_files.yaml")).unwrap()
});

// (lang, filename) -> path to file
pub static LANGFILES: Lazy<RwLock<HashMap<(&str, String), PathBuf>>> = Lazy::new(|| {
    // A hashmap with room for all files for all langs... maybe roughly so
    RwLock::new(HashMap::with_capacity(NUM_LANGS * AVG_NUM_LANGFILES_PER_LANG))
});

/// Read the WP_LANGFOLDER, and fill the LANGFILES hashmap with the paths
pub fn load_langfiles() -> usize {
    let base_path = PathBuf::from(&*WP_LANGFOLDER);
    let mut langfiles = LANGFILES.write().unwrap();

    LANGS.iter().for_each(|lang| {
        let lang_path = base_path.join(lang);

        LANGMODEL_DEFS.files.iter().for_each(|file| {
            let filename = file.filename.replace("{lang}", lang);
            let repo_path = PathBuf::from(filename);
            let path = lang_path.join(&repo_path);
            
            // if [base]/[repo_path] is found, `value` will be Some(path),
            // otherwise, we try [base]/bin/[repo_path] because that's how
            // it's structured on gtweb, and if that path is found, the value
            // is Some(that_path), or None otherwise.
            info!("searching {:?}", path);
            let maybe_found_path = path
                .is_file()
                .then_some(path)
                .or_else(|| {
                    let path_with_bin = lang_path.join("bin").join(repo_path);
                    path_with_bin.is_file().then_some(path_with_bin)
                });
            
            match maybe_found_path {
                Some(path) => {
                    let filename = file.filename.replace("{lang}", lang);
                    let key = (*lang, filename);
                    langfiles.insert(key, path);
                }
                None => {}
            };
        })
    });

    langfiles.len()
}

/// Try to get an owned PathBuf from a given (lang, file) pair, or None
/// if that file is missing for that language.
pub fn get_langfile(lang: &str, file: &str) -> Option<PathBuf> {
    LANGFILES
        .read()
        .unwrap()
        .get(&(lang, file.to_string()))
        .map(|path| path.clone())
}

// The environment variable WP_LANGFOLDER
pub static WP_LANGFOLDER: Lazy<String> = Lazy::new(|| {
    dotenv::var("WP_LANGFOLDER").unwrap_or_else(|_| {
        eprintln!("environment variable WP_LANGFOLDER not set (or somehow not unicode)");
        std::process::exit(2);
    })
});

pub async fn endpoint_info_all(
    Query(params): Query<HashMap<String, String>>
) -> Response {
    // info about which capabilities the api has
    // mainly: which endpoints are supported for which languages
    // for example something like this:
    // {
    //   "analyze": ["nob", "sme", "sma"],
    //   "dependency": ["nob"],
    // }
    let s = include_str!("langmodel_files.yaml");
    let files = serde_yaml::from_str::<LangmodelFiles>(s).unwrap();

    // method => list of files
    let mut methods: HashMap<String, HashSet<String>> = HashMap::new();

    for file in files.files.iter() {
        for method in file.methods.iter() {
            let set = methods.entry(method.clone()).or_default();
            set.insert(file.filename.to_string());
        }
    }

    info!("{:?}", methods);
    // method => HashMap<lang, Vec<(filename, bool)>>
    let mut detailed: HashMap<&str, HashMap<&str, Vec<(String, bool)>>> = HashMap::new();
    let mut simple: HashMap<&str, HashSet<String>> = HashMap::new();

    let langfiles = LANGFILES.read().unwrap();
    for lang in LANGS.iter() {
        for (method, files) in methods.iter() {
            let have_all_files = files.iter().all(|f| {
                let file = f.replace("{lang}", lang);
                langfiles.get(&(lang, file)).is_some()
            });

            if have_all_files {
               simple 
                    .entry(lang)
                    .and_modify(|vec| { vec.insert(method.to_string()); })
                    .or_insert_with(|| {
                        let mut s = HashSet::new();
                        s.insert(method.to_string());
                        s
                    });
            }

            for file in files.iter() {
                let file = file.replace("{lang}", lang);
                let m = detailed.entry(method).or_default();
                let has_file = langfiles.get(&(lang, file.clone())).is_some();
                let v = m.entry(lang).or_default();
                v.push((file, has_file));
            }
        }
    }

    //Json(json!({
    //    files: files,
    //}))
    let wants_pretty = query_param_is_trueish(&params, "pretty");
    let wants_detailed = query_param_is_trueish(&params, "detailed");
    match (wants_pretty, wants_detailed) {
        (false, false) => Json(json!(simple)).into_response(),
        (false, true) => Json(json!(detailed)).into_response(),
        (true, false) => PrettyJson(simple).into_response(),
        (true, true) => PrettyJson(detailed).into_response(),
    }
}


struct PrettyJson<T>(T);

impl<T> IntoResponse for PrettyJson<T>
where
    T: Serialize
{
    fn into_response(self) -> axum::response::Response {
        match serde_json::to_string_pretty(&self.0) {
            Ok(string) => string.into_response(),
            Err(_) => "error when serializing response".into_response(),
        }
    }
}
