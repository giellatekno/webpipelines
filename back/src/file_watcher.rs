use std::path::Path;

#[derive(Default)]
pub struct FileWatcherBuilder {
    create_fn: Option<Box<dyn Fn(&Path) + Send + 'static>>,
    remove_fn: Option<Box<dyn Fn(&Path) + Send + 'static>>,
}

pub struct FileWatcher {
    create_fn: Box<dyn Fn(&Path) + Send + 'static>,
    remove_fn: Box<dyn Fn(&Path) + Send + 'static>,
}

impl FileWatcherBuilder {
    fn new() -> Self {
        Default::default()
    }

    pub fn create_fn(mut self, value: Box<dyn Fn(&Path) + Send + 'static>) -> Self {
        self.create_fn = Some(value);
        self
    }

    pub fn remove_fn(mut self, value: Box<dyn Fn(&Path) + Send + 'static>) -> Self {
        self.remove_fn = Some(value);
        self
    }

    pub fn build(self) -> FileWatcher {
        FileWatcher {
            create_fn: self.create_fn.unwrap(),
            remove_fn: self.remove_fn.unwrap(),
        }
    }
}

pub fn file_watcher() -> FileWatcherBuilder {
    FileWatcherBuilder::new()
}

use notify_debouncer_full::DebounceEventResult;

impl FileWatcher {
    pub async fn spawn(
        self,
        mut rx: tokio::sync::mpsc::Receiver<DebounceEventResult>,
    ) -> tokio::task::JoinHandle<()> {
        tokio::spawn(async move {
            while let Some(res) = rx.recv().await {
                match res {
                    Ok(events) => {
                        for ev in events.iter() {
                            match ev.kind {
                                notify::EventKind::Create(_create_kind) => {
                                    // _create_kind: any, file, folder, other
                                    for path in ev.paths.as_slice() {
                                        tracing::warn!("file created: {:?}", path);
                                        (self.create_fn)(path)
                                    }
                                }
                                notify::EventKind::Modify(modify_kind) => {
                                    match modify_kind {
                                        notify::event::ModifyKind::Name(rename_mode) => {
                                            // a file was renamed. This could be
                                            // a file is no longer watched, or a
                                            // file was copied in under a different
                                            // name, and got `mv`ed to be the correct
                                            // name
                                            match rename_mode {
                                                notify::event::RenameMode::To => {
                                                    // The notifier ONLY knows
                                                    // where it was moved TO,
                                                    // meaning it has to have
                                                    // been `mv`ed INTO the
                                                    // folder from outside.
                                                    // So, we just treat this
                                                    // as if the file was
                                                    // created
                                                    // s a file that was created.
                                                    for path in ev.paths.as_slice() {
                                                        (self.create_fn)(path)
                                                    }
                                                }
                                                notify::event::RenameMode::From => {
                                                    // `mv`ed OUT of WP_LANGFOLDER
                                                    // so, same as delete
                                                    tracing::info!("renamed FROM");
                                                    for path in ev.paths.as_slice() {
                                                        (self.remove_fn)(path)
                                                    }
                                                }
                                                notify::event::RenameMode::Both => {
                                                    // `mv`ed FROM inside TO inside,
                                                    // so we need to check both
                                                    // for deletion and removal
                                                    tracing::info!("renamed, BOTH TO AND FROM");
                                                    tracing::info!(paths = ?ev.paths, "paths");
                                                }
                                                // Any and Other ignored
                                                _ => {}
                                            }
                                        }
                                        // modification kind Any, Data, Metadata,
                                        // Other: not interested
                                        _ => {}
                                    }
                                }
                                notify::EventKind::Remove(_remove_kind) => {
                                    // todo: handle the case if _remove_kind
                                    // is a folder - then we want the entire
                                    // lang to not exist anymore.
                                    for path in ev.paths.as_slice() {
                                        (self.remove_fn)(path)
                                    }
                                }
                                // We don't care about Access, Other, and Any
                                _ => {}
                            }
                        }
                    }
                    Err(errors) => {
                        tracing::error!("Errors from file watcher: {:?}", errors);
                    }
                }
            }

            tracing::error!("filewatcher died (recieved None in channel)");
        })
    }
}
