#!/usr/bin/env python3

"""
Download the paradigm text files that are not present in the giella-* apertium
nightly repositories.

The script does the following:
    - make directory "non-apnightly-files" in the current working directory
      (name overridable with --target-dir)
    - cd to it
    - write "install.py", a script that copies the files inside the directory
      to /usr/share/giella/ (so the api can see them in the directory)
    - check out giellalt/lang-* for all languages the api supports (see LANGS
      variable in code)
      Notice: does a very sparse checkout, without downloading anything, so
      it's very fast.
    - Checks out the paradigm files, so that they are downloaded (see
      PARADIGM_FILES variable in code)
"""

import argparse
import asyncio
import builtins
from asyncio.subprocess import DEVNULL, PIPE
import os
import pathlib
import shutil

REPOS_URL = "https://github.com/giellalt/lang-"
LANGS = [
    "bxr", "ciw", "cor", "evn", "fao", "fin", "fit", "fkv", "gle", "ipk",
    "izh", "kal", "kca", "koi", "kpv", "liv", "mdf", "mhr", "mns", "mrj",
    "myv", "nio", "nob", "olo", "rus", "sjd", "sje", "sma", "sme", "smj",
    "smn", "sms", "som", "udm", "vep", "vot", "vro", "yrk",
]
TARGET_DIR = "non-apnightly-files"
SUCCESS = {"success": True}
PARADIGM_FILES = [
    "devtools/testdata/korpustags.{lang}.txt",
    "src/fst/morphology/test/paradigm.{lang}.txt",
    "src/fst/morphology/test/paradigm_min.{lang}.txt",
    "src/fst/morphology/test/paradigm_standard.{lang}.txt",
    "src/fst/morphology/test/paradigm_full.{lang}.txt",
]

# A scripte to transfer the downloaded files to the apertium nightly
# directories. Stored as TARGET_DIR/install.py, so that it can be done in
# two steps.
INSTALL_SCRIPT = """#!/usr/bin/env python3

from pathlib import Path
from shutil import copyfile
from sys import argv

TARGET_DIR = Path("/usr/share/giella")
if len(argv) == 2:
    TARGET_DIR = Path(argv[1])

if not TARGET_DIR.is_dir():
    exit(f"fatal: target directory doesn't exist: {TARGET_DIR}")

def cp(src, dst):
    print(f"cp {src} {dst}")
    try:
        copyfile(src, dst)
    except OSError as e:
        print(f"failed! ({e})")

def all_files(langdir):
    for file in langdir.glob("**/*"):
        if list(file.parts)[1] == ".git":
            continue

        if file.is_file():
            yield file

for langdir in Path(".").glob("lang-*"):
    lang = langdir.name[5:]

    for src in all_files(langdir):
        dst = Path(f"{TARGET_DIR}/{lang}/{src.name}")
        cp(src, dst)

print("all done")
"""


def success(data=None):
    if data is None:
        return SUCCESS
    return {**SUCCESS, "data": data}


def error(**kwargs):
    return {"success": False, **kwargs}


def is_success(d):
    return d["success"]


async def shell(
    cmd,
    stdin=None,
    stdout=None,
    stderr=None,
    cwd=None,
    timeout=None,
    print=builtins.print,
):
    print(f"running: {cmd}")
    proc = await asyncio.subprocess.create_subprocess_shell(
        cmd,
        stdout=DEVNULL,
        stderr=PIPE,
        cwd=cwd,
    )

    try:
        async with asyncio.timeout(timeout):
            ret = await proc.wait()
    except TimeoutError:
        print(f"running timeout! {cmd}")
        return error(msg="timeout ({timeout}s)")

    if ret != 0:
        if proc.stderr is not None:
            stderr = await proc.stderr.read()
            stderr = stderr.decode("utf-8")
        else:
            stderr = None
        return error(msg=f"nonzero return code ({ret})", stderr=stderr)

    return SUCCESS


async def worker(n, workq, doneq):
    def worker_print(*msg):
        builtins.print(f"[worker {n}]:", *msg)

    worker_print("start")

    while True:
        try:
            lang = workq.get_nowait()
        except asyncio.QueueEmpty:
            worker_print("exit (no more work in queue)")
            break

        result = await do_lang(lang, print=worker_print)

        doneq.put_nowait((lang, result))
        workq.task_done()


async def do_lang(lang, print=builtins.print):
    # this will clone the repo without downloading almost anything at all,
    # and will pull from the repo only when needed
    def printer(*msg):
        print(f"lang {lang}:", *msg)

    printer("start")

    cmd = (
        "git clone --no-checkout --depth 1 --filter=blob:none "
        f"{REPOS_URL}{lang}"
    )
    result = await shell(cmd, print=printer)
    if not is_success(result):
        printer("NOT SUCCESS")
        return result

    files_retrieved = []

    for file in PARADIGM_FILES:
        file_path = file.format(lang=lang)
        cmd = f"git checkout main -- {file_path}"
        result = await shell(cmd, cwd=f"lang-{lang}", timeout=4, print=printer)

        if is_success(result):
            files_retrieved.append(file_path)
        else:
            printer(f"failure {result}")

    printer("done")
    return success(data=files_retrieved)


def parse_args():
    description = __doc__.split("\n\n")[0]
    parser = argparse.ArgumentParser(description=description)
    parser.add_argument(
        "-o",
        "--target-dir",
        type=pathlib.Path,
        default=TARGET_DIR,
        help=(
            "The directory to store the repos with the downloaded files in. "
            f"Default '{TARGET_DIR}'"
        ),
    )
    parser.add_argument(
        "-n",
        "--workers",
        type=int,
        default=4,
        help="Use this many worker tasks. Default 4."
    )
    args = parser.parse_args()
    return args


async def main():
    args = parse_args()

    target_dir = args.target_dir
    n_workers = args.workers
    try:
        print(f"rm -rf {target_dir}")
        shutil.rmtree(target_dir)
    except FileNotFoundError:
        pass

    target_dir.mkdir()
    print(f"cd {target_dir}")
    os.chdir(target_dir)
    print("create install.py")
    with open("install.py", "w") as f:
        f.write(INSTALL_SCRIPT)

    workq, doneq = asyncio.Queue(), asyncio.Queue()

    for lang in LANGS:
        workq.put_nowait(lang)

    n_workers = min(len(LANGS), n_workers)

    tasks = []
    for i in range(n_workers):
        worker_task = asyncio.create_task(worker(i + 1, workq, doneq))
        tasks.append(worker_task)

    await workq.join()
    for task in tasks:
        task.cancel()


if __name__ == "__main__":
    raise SystemExit(asyncio.run(main()))
