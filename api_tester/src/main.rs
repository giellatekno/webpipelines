use std::io;
use std::sync::{Arc, RwLock};
use std::time::Duration;

use clap::Parser;
use crossterm::{
    event::{self, Event, KeyCode},
    style::Color,
};
use strum::Display;
use ratatui::{prelude::*, widgets::*};

type Result<T> = std::result::Result<T, Box<dyn std::error::Error>>;

const ROOT: &str = "https://gtweb-02.uit.no/webpipeline-api";
const MAX_CONCURRENT_REQUESTS: usize = 2;

//struct Request {
//    start_time: std::time::Instant,
//    fut: Box<dyn Future<Output = std::result::Result<reqwest::Response, reqwest::Error>>>,
//}

#[derive(Debug, Clone)]
struct CompletedRequest {
    time_spent: Duration,
    status: u16,
    body: String,
}

#[derive(Default, Debug, Clone)]
enum EndpointState {
    #[default]
    Initial,
    /// User doesn't want to see it, it has been filtered out by cli args
    Disabled,
    NotStarted,
    /// Call in progress
    Waiting(std::time::Instant),
    Ok(CompletedRequest),
    Failed(CompletedRequest),
}

#[derive(Copy, Clone, Debug, PartialEq, Eq, Display)]
enum EndpointMethod {
    #[strum(to_string = "analyze")]
    Analyze,
    #[strum(to_string = "dependency")]
    Dependency,
    #[strum(to_string = "disambiguate")]
    Disambiguate,
    #[strum(to_string = "generate")]
    Generate,
    #[strum(to_string = "hyphenate")]
    Hyphenate,
    #[strum(to_string = "paradigm")]
    Paradigm,
    #[strum(to_string = "transcribe")]
    Transcribe,
}

#[derive(Debug)]
struct Method {
    method: EndpointMethod,
    state: EndpointState,
}

impl Method {
    fn new(method: EndpointMethod) -> Self {
        Self {
            method,
            state: EndpointState::Initial,
        }
    }
}

impl From<&Method> for Text<'_> {
    fn from(method: &Method) -> Self {
        Text::from(method.method.to_string()).fg(match &method.state {
            EndpointState::Initial => Color::White,
            EndpointState::Disabled => Color::DarkGrey,
            EndpointState::NotStarted => Color::Grey,
            EndpointState::Waiting(_t0) => Color::Yellow,
            EndpointState::Ok(_completed_request) => Color::Green,
            EndpointState::Failed(_completed_request) => Color::Red,
        })
    }
}

#[derive(Default, Debug)]
struct Endpoint {
    /// "sme", "sma", ...
    lang: &'static str,
    methods: Vec<Method>,
}

impl Endpoint {
    fn new(lang: &'static str, methods: Vec<EndpointMethod>) -> Self {
        Self {
            lang,
            methods: methods.iter().map(|&m| Method::new(m)).collect(),
        }
    }
}

/// Our application state
#[derive(Default)]
struct App {
    hook_enabled: bool,
    tokio_runtime_done: bool,
    endpoints: Vec<Endpoint>,
    enabled_endpoints: Vec<Endpoint>,
}

impl App {
    fn new() -> Self {
        let mut inst = Self::default();
        inst.endpoints.extend(endpoints());
        inst.install_panic_hook();
        inst
    }

    fn disable_endpoints(&mut self, disabled_endpoints: &[String]) {
        self.endpoints.iter_mut().for_each(|endpoint| {
            if !disabled_endpoints.contains(&endpoint.lang.to_string()) {
                endpoint.methods.iter_mut().for_each(|method| {
                    method.state = EndpointState::Disabled;
                });
            }
        });
    }

    fn install_panic_hook(&mut self) {
        let original_hook = std::panic::take_hook();

        std::panic::set_hook(Box::new(move |panic| {
            reset_terminal().unwrap();
            original_hook(panic);
        }));

        self.hook_enabled = true;
    }
}

async fn call_endpoint(
    lang: &'static str,
    method: EndpointMethod,
    tx: tokio::sync::mpsc::UnboundedSender<(&str, EndpointMethod, EndpointState)>,
    permit: tokio::sync::OwnedSemaphorePermit,
) -> () {
    let t0 = std::time::Instant::now();

    let fut = reqwest::get(format!("{ROOT}/{method}/{lang}/sometext"));
    match fut.await {
        Ok(response) => {
            let status = response.status().as_u16();
            let body = match response.text().await {
                Ok(text) => text,
                Err(e) => panic!("got invalid response from server: {}", e),
            };
            let time_spent = std::time::Instant::now().duration_since(t0);

            let completed_request = CompletedRequest {
                time_spent,
                status,
                body,
            };

            let new_state = if status == 200 {
                EndpointState::Ok(completed_request)
            } else {
                EndpointState::Failed(completed_request)
            };

            if let Err(e) = tx.send((lang, method, new_state)) {
                panic!("failed to send on channel: {}", e);
            }

            drop(permit);
        }
        Err(err) => {
            panic!("request to gtweb failed ({err})")
        }
    }
}

async fn result_handler(
    app: Arc<RwLock<App>>,
    mut rx: tokio::sync::mpsc::UnboundedReceiver<(&str, EndpointMethod, EndpointState)>,
) {
    while let Some((lang, method, new_state)) = rx.recv().await {
        app.write()
            .unwrap()
            .endpoints
            .iter_mut()
            .find(|endpoint| endpoint.lang == lang)
            .expect("lang exists")
            .methods
            .iter_mut()
            .find(|m| m.method == method)
            .expect("method exists")
            .state = new_state;
    }
}

/// Find an endpoint that is waiting to start, or None if there is none.
fn find_next_pipeline_to_call(app: Arc<RwLock<App>>) -> Option<(&'static str, EndpointMethod)> {
    let mut app = app.write().unwrap();
    for endpoint in app.endpoints.iter_mut() {
        for method in endpoint.methods.iter_mut() {
            if let EndpointState::Initial = method.state {
                let t0 = std::time::Instant::now();
                method.state = EndpointState::Waiting(t0);
                return Some((endpoint.lang, method.method));
            }
        }
    }
    None
}

async fn async_main(app: Arc<RwLock<App>>) -> () {
    //let mut js = tokio::task::JoinSet::new();
    let (tx, rx) = tokio::sync::mpsc::unbounded_channel();

    let sem = Arc::new(tokio::sync::Semaphore::new(MAX_CONCURRENT_REQUESTS));
    let result_handler_task = tokio::task::spawn(result_handler(Arc::clone(&app), rx));

    let main_sem = Arc::clone(&sem);

    while !main_sem.is_closed() {
        while let Ok(permit) = Arc::clone(&sem).acquire_owned().await {
            let app = Arc::clone(&app);
            let Some((lang, method)) = find_next_pipeline_to_call(app) else {
                sem.close();
                break;
            };
            let tx = tx.clone();
            tokio::task::spawn(call_endpoint(lang, method, tx, permit));
        }
    }


    // ignoring failure on awaiting the task
    let _ = result_handler_task.await;
    //{
    //    let mut app = app.write().unwrap();
    //    app.endpoints
    //        .iter_mut()
    //        .for_each(|Endpoint { lang, methods }| {
    //            methods.iter_mut().for_each(|method| {
    //                if let EndpointState::Disabled = method.state {
    //                    return;
    //                }
    //                let Ok(permit) = sem.acquire().await else {
    //                    panic!("Semaphore has been closed");
    //                };
    //                let _aborthandle = js.spawn(call_endpoint(lang, method.method));
    //            })
    //        });
    //}

    //while let Some(result) = js.join_next().await {
    //    let (lang, method, new_state) = result.unwrap();
    //    let saved = new_state.clone();
    //    app.write()
    //        .unwrap()
    //        .endpoints
    //        .iter_mut()
    //        .find(|endpoint| endpoint.lang == lang)
    //        .expect("lang exists")
    //        .methods
    //        .iter_mut()
    //        .find(|m| m.method == method)
    //        .expect("method exists")
    //        .state = saved;
    //}
    app.write().unwrap().tokio_runtime_done = true;
}

fn async_runtime_thread(app: Arc<RwLock<App>>) -> () {
    let runtime = tokio::runtime::Runtime::new().unwrap();
    runtime.block_on(async_main(app));
    ()
}

fn handle_events() -> io::Result<bool> {
    if event::poll(std::time::Duration::from_millis(50))? {
        if let Event::Key(key) = event::read()? {
            match key.kind {
                event::KeyEventKind::Press => match key.code {
                    KeyCode::Char(ch) => match ch {
                        'q' => return Ok(true),
                        'p' => panic!("panic should reset the terminal"),
                        _ => {}
                    },
                    _ => {}
                },
                _ => {}
            }
        }
    }
    Ok(false)
}

fn ui(frame: &mut Frame, app: &App) {
    let rows = app
        .endpoints
        .iter()
        .map(|endpoint| {
            std::iter::once(endpoint.lang)
                .map(|s| Text::from(s))
                .chain(endpoint.methods.iter().map(|s| Text::from(s)))
        })
        .map(Row::new);

    let table = Table::new(
        rows,
        [
            Constraint::Length(3),
            Constraint::Length(7),
            Constraint::Length(10),
            Constraint::Length(12),
            Constraint::Length(8),
            Constraint::Length(9),
            Constraint::Length(11),
        ],
    );

    // frame.render_widget(
    //     Paragraph::new("Hello World!").block(Block::bordered().title("Greeting")),
    //     frame.size(),
    // );
    //let status_text = if app.tokio_runtime_done {
    //    "tokio done"
    //} else {
    //    "tokio running"
    //};
    //frame.render_widget(Paragraph::new(status_text), frame.size());
    frame.render_widget(table, frame.size());
}

fn run_tui(
    terminal: &mut Terminal<CrosstermBackend<io::Stdout>>,
    app: Arc<RwLock<App>>,
) -> io::Result<()> {
    loop {
        // to let the other thread get a chance to take the lock
        std::thread::sleep(Duration::from_millis(20));
        let app = app.read().unwrap();
        terminal.draw(|f| ui(f, &app))?;
        let quit = handle_events()?;
        if quit {
            break Ok(());
        }
    }
}

fn init_terminal() -> Result<Terminal<CrosstermBackend<io::Stdout>>> {
    crossterm::execute!(std::io::stdout(), crossterm::terminal::EnterAlternateScreen,)?;
    crossterm::terminal::enable_raw_mode()?;
    let backend = CrosstermBackend::new(io::stdout());
    let mut terminal = Terminal::new(backend)?;
    terminal.hide_cursor()?;
    Ok(terminal)
}

fn reset_terminal() -> Result<()> {
    crossterm::terminal::disable_raw_mode()?;
    crossterm::execute!(std::io::stdout(), crossterm::terminal::LeaveAlternateScreen)?;
    Ok(())
}

#[derive(Parser, Debug)]
#[command(version, about, long_about = None)]
struct Args {
    /// Only run with these langs
    #[arg(short, long)]
    lang: Vec<String>,

    /// Number of times to greet
    #[arg(short, long, default_value_t = 1)]
    count: u8,
}

fn main() -> Result<()> {
    let mut app = App::new();
    let args = Args::parse();
    if !args.lang.is_empty() {
        app.disable_endpoints(args.lang.as_slice());
    }
    //println!("{args:?}");
    //println!("{:?}", app.endpoints);
    //return Ok(());
    let app = Arc::new(RwLock::new(app));
    let ac = Arc::clone(&app);
    std::thread::spawn(|| async_runtime_thread(ac));
    let mut terminal = init_terminal()?;
    run_tui(&mut terminal, app)?;
    reset_terminal()?;
    Ok(())
}

#[allow(non_snake_case)]
fn endpoints() -> Vec<Endpoint> {
    let A = EndpointMethod::Analyze;
    let DEP = EndpointMethod::Dependency;
    let DIS = EndpointMethod::Disambiguate;
    let GEN = EndpointMethod::Generate;
    let HYP = EndpointMethod::Hyphenate;
    let PAR = EndpointMethod::Paradigm;
    let TRA = EndpointMethod::Transcribe;
    vec![
        Endpoint::new("bxr", vec![A, GEN, HYP, PAR]),
        Endpoint::new("ciw", vec![A, GEN, PAR]),
        Endpoint::new("cor", vec![A, DIS, GEN, HYP, PAR]),
        Endpoint::new("est", vec![A, DIS, GEN]),
        Endpoint::new("evn", vec![A, GEN, HYP, PAR]),
        Endpoint::new("fao", vec![A, DEP, DIS, GEN, PAR]),
        Endpoint::new("fin", vec![A, DIS, GEN, HYP, PAR]),
        Endpoint::new("fit", vec![A, HYP, PAR]),
        Endpoint::new("fkv", vec![A, HYP, PAR]),
        Endpoint::new("gle", vec![A, DIS, GEN, HYP, PAR]),
        Endpoint::new("hdn", vec![A, GEN]),
        Endpoint::new("ipk", vec![A, GEN, PAR]),
        Endpoint::new("izh", vec![A, GEN, PAR]),
        Endpoint::new("kal", vec![A, DEP, DIS, GEN, HYP, PAR]),
        Endpoint::new("kca", vec![A, GEN, PAR]),
        Endpoint::new("koi", vec![A, DIS, GEN, HYP, PAR]),
        Endpoint::new("kom", vec![A, DIS, HYP]),
        Endpoint::new("kpv", vec![A, DIS, GEN, HYP, PAR]),
        Endpoint::new("liv", vec![A, GEN, PAR]),
        Endpoint::new("mdf", vec![A, GEN, HYP]),
        Endpoint::new("mhr", vec![A, DIS, GEN, HYP, PAR]),
        Endpoint::new("mns", vec![A, GEN, HYP, PAR]),
        Endpoint::new("mrj", vec![A, DIS, GEN, HYP]),
        Endpoint::new("myv", vec![A, GEN, HYP]),
        Endpoint::new("nio", vec![A, GEN, HYP, PAR]),
        Endpoint::new("nob", vec![A, DEP, GEN, PAR]),
        Endpoint::new("olo", vec![A, GEN, PAR]),
        Endpoint::new("rmf", vec![A, DIS]),
        Endpoint::new("rus", vec![A, DIS, GEN, HYP, PAR]),
        Endpoint::new("sjd", vec![A, GEN, PAR]),
        Endpoint::new("sje", vec![A, GEN, HYP, PAR]),
        Endpoint::new("sma", vec![A, DEP, DIS, GEN, HYP, PAR, TRA]),
        Endpoint::new("sme", vec![A, DEP, DIS, GEN, HYP, PAR]),
        Endpoint::new("smj", vec![A, DEP, DIS, GEN, HYP, PAR]),
        Endpoint::new("smn", vec![A, DIS, GEN, HYP, PAR]),
        Endpoint::new("sms", vec![A, GEN, HYP, PAR]),
        Endpoint::new("som", vec![A, GEN, PAR]),
        Endpoint::new("udm", vec![A, GEN, HYP, PAR]),
        Endpoint::new("vep", vec![A, GEN, PAR]),
        Endpoint::new("vot", vec![A, GEN, PAR]),
        Endpoint::new("vro", vec![A, GEN, PAR]),
        Endpoint::new("yrk", vec![A, GEN, HYP, PAR]),
    ]
}
