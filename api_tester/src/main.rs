use std::future::Future;
use std::io;
use std::sync::{Arc, RwLock};
use std::time::Duration;

use crossterm::{
    event::{self, Event, KeyCode},
    style::Color,
};
use strum::Display;
use ratatui::{prelude::*, widgets::*};

type Result<T> = std::result::Result<T, Box<dyn std::error::Error>>;

const ROOT: &str = "http://gtweb.uit.no/webpipelineapi";

struct Request {
    start_time: std::time::Instant,
    fut: Box<dyn Future<Output = std::result::Result<reqwest::Response, reqwest::Error>>>,
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
    Ok(Duration),
    Failed(u16, Duration),
}

#[derive(Copy, Clone, PartialEq, Eq, Display)]
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

/*
impl std::fmt::Display for EndpointMethod {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::result::Result<(), std::fmt::Error> {
        use EndpointMethod::*;
        write!(
            f,
            "{}",
            match self {
                Analyze => "analyze",
                Dependency => "dependency",
                Disambiguate => "disambiguate",
                Generate => "generate",
                Hyphenate => "hyphenate",
                Paradigm => "paradigm",
                Transcribe => "transcribe",
            }
        )
    }
}
*/

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
        Text::from(method.method.to_string()).fg(match method.state {
            EndpointState::Initial => Color::White,
            EndpointState::Disabled => Color::DarkGrey,
            EndpointState::NotStarted => Color::Grey,
            EndpointState::Waiting(_t0) => Color::Yellow,
            EndpointState::Ok(_dur) => Color::Green,
            EndpointState::Failed(_code, _dur) => Color::Red,
        })
    }
}

#[derive(Default)]
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
}

impl App {
    fn new() -> Self {
        let mut inst = Self::default();
        inst.endpoints.extend(endpoints());
        inst.install_panic_hook();
        inst
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
) -> (&'static str, EndpointMethod, EndpointState) {
    let t0 = std::time::Instant::now();

    let fut = reqwest::get(format!("{ROOT}/{method}/{lang}/sometext"));
    match fut.await {
        Ok(response) => {
            let t = std::time::Instant::now().duration_since(t0);
            if response.status() == 200 {
                (lang, method, EndpointState::Ok(t))
            } else {
                (
                    lang,
                    method,
                    EndpointState::Failed(response.status().as_u16(), t),
                )
            }
        }
        Err(err) => {
            panic!("request to gtweb failed ({err})")
        }
    }
}

async fn async_main(app: Arc<RwLock<App>>) -> () {
    let mut js = tokio::task::JoinSet::new();
    {
        let mut app = app.write().unwrap();
        app.endpoints
            .iter_mut()
            .for_each(|Endpoint { lang, methods }| {
                methods.iter_mut().for_each(|method| {
                    if let EndpointState::Disabled = method.state {
                        return;
                    }
                    let _aborthandle = js.spawn(call_endpoint(lang, method.method));
                    let t0 = std::time::Instant::now();
                    method.state = EndpointState::Waiting(t0);
                })
            });
    }

    while let Some(result) = js.join_next().await {
        let (lang, method, new_state) = result.unwrap();
        let saved = new_state.clone();
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
            .state = saved;
    }
    app.write().unwrap().tokio_runtime_done = true;
}

fn async_runtime_thread(app: Arc<RwLock<App>>) -> () {
    let runtime = tokio::runtime::Runtime::new().unwrap();
    runtime.block_on(async_main(app));
    ()
}

fn main() -> Result<()> {
    let app = App::new();
    let app = Arc::new(RwLock::new(app));
    let ac = Arc::clone(&app);
    std::thread::spawn(|| async_runtime_thread(ac));
    let mut terminal = init_terminal()?;
    run_tui(&mut terminal, app)?;
    reset_terminal()?;
    Ok(())
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
