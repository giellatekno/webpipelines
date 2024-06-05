use std::io::Read;

/// Read out all paragraphs in a .docx Word document
pub fn read_docx_text(data: Vec<u8>) -> Option<String> {
    let Ok(docx) = docx_rs::read_docx(&data) else {
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

    let text = newline_converter::dos2unix(&text).to_string();

    Some(text)
}

/// decompress gzipped data
pub fn gunzip(data: Vec<u8>) -> Option<Vec<u8>> {
    let mut gz = flate2::bufread::GzDecoder::new(&data[..]);
    let mut buf = Vec::new();
    match gz.read_to_end(&mut buf) {
        Ok(_) => {}
        Err(_) => return None,
    }
    Some(buf)
}

/// Used to check if a query param is present, and equal to some string
/// that any user would say is true, like "1", "y", "yes", and "true",
/// case-insensitively. The query param would not be considered trueish if
/// explicitly set to something like "n", or "no", so we just test a few
/// specific strings.
pub fn query_param_is_trueish(
    params: &std::collections::HashMap<String, String>,
    key: &str,
) -> bool {
    params
        .get(key)
        .filter(|&value| {
            value == "1"
                || value.eq_ignore_ascii_case("y")
                || value.eq_ignore_ascii_case("yes")
                || value.eq_ignore_ascii_case("true")
        })
        .is_some()
}
