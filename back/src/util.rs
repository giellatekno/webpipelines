use std::{
    path::{Path, PathBuf},
    collections::{HashMap, hash_map::Entry},
    sync::Mutex,
    io::Read,
};
use dotenv;
use once_cell::sync::Lazy;
use flate2::bufread::GzDecoder;

// for read_docx_text()
use docx_rs::read_docx;
use newline_converter::dos2unix;



// static (only one instance in the running program)
// initialized when first accessed
// hashmap of 2-tuple (lang, filename) -> path_to_file
// cache, so that you don't have to ask the filesystem on every call
// to some function
static LANGFILES: Lazy<Mutex<HashMap<(String, String), Option<PathBuf>>>> = Lazy::new(|| {
    let m = HashMap::with_capacity(16);
    Mutex::new(m)
});

pub static WP_LANGFOLDER: Lazy<String> = Lazy::new(|| {
    dotenv::var("WP_LANGFOLDER").unwrap_or_else(|_| {
        eprintln!("environment variable WP_LANGFOLDER not set (or not unicode)");
        std::process::exit(2);
    })
});

/// Get a language model artifact file for some language. The results
/// are cached in a HashMap.
pub fn get_langfile<'a>(lang: &str, file: &str) -> Option<PathBuf> {
    match LANGFILES.lock().unwrap().entry((lang.to_string(), file.to_owned())) {
        Entry::Occupied(entry) => entry.get().clone(),
        Entry::Vacant(entry) => {
            let mut file_path = PathBuf::from(&*WP_LANGFOLDER);
            file_path.push(lang);
            file_path.push(file);

            if file_path.is_file() {
                let e = Some(file_path);
                entry.insert(e.clone());
                e
            } else {
                // For the setup on gtweb, try /FOLDER/LANG/bin/FILE
                // if /FOLDER/LANG/FILE fails
                file_path.pop();
                file_path.push("bin");
                file_path.push(file);

                if file_path.is_file() {
                    let e = Some(file_path);
                    entry.insert(e.clone());
                    e
                } else {
                    entry.insert(None);
                    None
                }
            }
        }
    }
}


/// Read out all paragraphs in a .docx Word document
pub fn read_docx_text(data: Vec<u8>) -> Option<String> {
    let Ok(docx) = read_docx(&data) else {
        return None;
    };

    let text = docx
        .document
        .children
        .iter()
        .filter_map(|doc_child| {
            if let docx_rs::DocumentChild::Paragraph(paragraph) = doc_child {
                Some(paragraph)
            } else {
                None
            }
        })
        .map(|paragraph| paragraph.raw_text())
        .collect::<Vec<_>>()
        .join("\n");

    let text = dos2unix(&text).to_string();

    Some(text)
}


/// decompress gzipped data
pub fn gunzip(data: Vec<u8>) -> Option<Vec<u8>> {
    let mut gz = GzDecoder::new(&data[..]);
    let mut buf = Vec::new();
    match gz.read_to_end(&mut buf) {
        Ok(_) => {}
        Err(_) => return None,
    }
    Some(buf)
}
