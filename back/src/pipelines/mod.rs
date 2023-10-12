pub mod analyze;
pub mod dependency;
pub mod generate;
pub mod hyphenate;
pub mod transcribe;
pub mod paradigm;
pub mod unknown_in_x_by_freq;
pub mod lemma_count;

pub async fn run_pipeline_single_lang<'a, F: 'a>(func: F, input: String, lang: String) -> Result<String, String>
where
    F: Fn(String, String) -> Result<String, String>,
    F: Send + Sync + 'static,
{
    tokio::task::spawn_blocking(move || {
        func(input, lang).map_err(|e| format!("Error running pipeline: {}", e))
    }).await.map_err(|e| e.to_string())?
}

pub async fn run_pipeline_two_langs<'a, F: 'a>(
    func: F, input: String, lang: String, lang2: String,
) -> Result<String, String>
where
    F: Fn(String, String, String) -> Result<String, String>,
    F: Send + Sync + 'static,
{
    tokio::task::spawn_blocking(move || {
        func(input, lang, lang2).map_err(|e| format!("Error running pipeline: {}", e))
    }).await.map_err(|e| e.to_string())?
}

