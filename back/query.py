#!/usr/bin/env python3
"""Send a query to the webpipeline API, running locally, or elsewhere."""

import argparse
import pathlib
import datetime
import json
import sys

import urllib
from urllib.request import Request, urlopen

thisfile = pathlib.Path(__file__).name
LOCAL_API = "http://localhost:3000"
PROD_API = "https://something.something"
GTWEB_API = "https://gtweb.uit.no/webpipelineapi"
LAB_API = "https://dictapi.livelybeach-54ee1a2e.norwayeast.azurecontainerapps.io"
HOUR = 60 * 60
DAY = 60 * 60 * 24

EXAMPLES = f"""
Examples:
  $ python {thisfile} freq nob fkv
     Does a frequency search on all words.
"""


def fatal(*msg):
    print("fatal:", *msg, file=sys.stderr)
    sys.exit(2)


def human_readable_timespan(seconds):
    if not isinstance(seconds, (int, float, datetime.timedelta)):
        raise TypeError(
            f"seconds must be int, float or datetime.timedelta, not {type(seconds)}"
        )

    if isinstance(seconds, datetime.timedelta):
        seconds = seconds.total_seconds()

    if DAY <= seconds < 365 * DAY:
        days = int(seconds / DAY)
        hr = int((seconds - days * DAY) / HOUR)
        return f"{days}d{hr}hr"
    if HOUR <= seconds < DAY:
        hr = int(seconds / HOUR)
        minutes = int((seconds - hr * HOUR) / 60)
        return f"{hr}hr{minutes}m"
    if 60 <= seconds < HOUR:
        minutes = int(seconds / 60)
        seconds = int(seconds % 60)
        return f"{minutes}m{seconds}s"

    if 1 <= seconds < 60:
        unit = "s"
        t = seconds
    elif 1e-3 < seconds < 1:
        unit = "ms"
        t = seconds * 1e3
    elif 1e-6 < seconds < 1e-3:
        unit = "us"
        t = seconds * 1e6
    elif 1e-9 < seconds < 1e-6:
        unit = "ns"
        t = seconds * 1e9
    else:
        return f"{seconds:.2E}s"

    if 1 < t < 10:
        return f"{t:.2f}{unit}"
    else:
        return f"{round(t)}{unit}"


def run_info(
    verbose=False,
    detailed=False,
    pretty=False,
    api=LOCAL_API,
):
    url = f"{api}/info"
    if detailed or pretty:
        detailed = "yes" if detailed else "no"
        detailed = f"detailed={detailed}"
        pretty = "yes" if pretty else "no"
        pretty = f"pretty={pretty}"
        url += f"?{detailed}&{pretty}"

    if verbose:
        print("url =", url)
    request = Request(url=url)
    try:
        response = urlopen(request)
    except Exception as e:
        print(e)
    else:
        data = response.fp.read().decode("utf-8")
        print(data)


def analyze(word=None, lang=None, verbose=False, api=LOCAL_API):
    url = f"{api}/analyze/{lang}/{word}"
    request = Request(url=url)
    try:
        response = urlopen(request)
    except Exception as e:
        print(e)
    else:
        data = response.fp.read().decode("utf-8")
        print(data)


def run_freq_pipeline(
    text=None,
    lang1=None,
    lang2=None,
    api=LOCAL_API,
    verbose=False
):
    if sys.stdin.isatty():
        fatal("No data on standard in. Pipe some text in.")

    text = sys.stdin.read()
    text = text.strip()
    if not text:
        fatal("Text on stdin was blank.")

    url = f"{LOCAL_API}/unknown-lemmas-in-dict"
    data = json.dumps({
        "lang1": lang1,
        "lang2": lang2,
        "data": text,
        "typ": "text",
    }).encode("utf-8")
    headers = {
        "content-type": "application/json",
    }
    request = Request(url=url, method="POST", headers=headers, data=data)
    try:
        response = urlopen(request)
    except urllib.error.HTTPError as e:
        data = e.fp.read()
        print(e)
        print("--")
        print(data)
    else:
        print("x", response)
        print("y", response.body)


def run_paradigm(
    lang=None,
    word=None,
    verbose=False,
    # TODO should be "Any"
    pos="N",
    # TODO what are the others?
    size="standard",
    api=LOCAL_API
):
    # TODO pos is not always N
    url = f"{api}/paradigm/{lang}/{word}?pos=N&size={size}"
    request = Request(url=url)
    try:
        response = urlopen(request)
    except Exception as e:
        print(e)
    else:
        data = response.fp.read().decode("utf-8")
        print(data)


def add_analyze_args_parser(subparsers):
    analyze_parser = subparsers.add_parser(
        "analyze",
        aliases=["analyse"],
        help="analyze a word",
        description="analyze a word",
    )
    analyze_parser.add_argument(
        "lang",
    )
    analyze_parser.add_argument(
        "word"
    )
    analyze_parser.set_defaults(func=analyze)


def add_freq_args_parser(subparsers):
    freq_parser = subparsers.add_parser(
        "freq",
        aliases=["f"],
        # help is text that will be shown on `./query.py --help`,
        # description is for `./query.py freq --help`
        help="run the frequency pipeline",
        description=(
            "run the frequency pipeline"
        ),
    )
    freq_parser.add_argument(
        "lang1",
    )
    freq_parser.add_argument(
        "lang2",
    )
    freq_parser.set_defaults(func=run_freq_pipeline)


def add_info_args_parser(subparsers):
    parser = subparsers.add_parser(
        "info",
        help="get info from api",
        description="get info from api",
    )
    parser.add_argument(
        "--detailed",
        action="store_true",
    )
    parser.add_argument(
        "--pretty",
        action="store_true",
    )
    parser.set_defaults(func=run_info)


def add_paradigm_args_parser(subparsers):
    parser = subparsers.add_parser(
        "paradigm",
        help="get paradigm for a word",
        description="get paradigm for a word",
    )
    parser.add_argument("lang")
    parser.add_argument("word")

    size_group = parser.add_mutually_exclusive_group()
    size_group.add_argument(
        "--size",
        help="paradigm size: standard, minimal, or full",
        choices=["standard", "minimal", "full"],
        default="standard",
    )
    size_group.add_argument(
        "--standard",
        action="store_const",
        dest="size",
        const="standard",
    )
    size_group.add_argument(
        "--full",
        action="store_const",
        dest="size",
        const="full",
    )
    size_group.add_argument(
        "--minimal",
        action="store_const",
        dest="size",
        const="minimal",
    )

    # poses:
    # "any"
    # "A"
    # "N"
    # "V"
    # "adv"
    # "num"
    # "pron"

    # --any, --n, --

    parser.add_argument(
        "--pos",
    )
    parser.set_defaults(func=run_paradigm)


def parse_args():
    parser = argparse.ArgumentParser(
        description=__doc__,
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=EXAMPLES,
    )

    parser.add_argument(
        "-v",
        "--verbose",
        action="store_true",
        help="more verbose output of communication with server",
    )

    group = parser.add_mutually_exclusive_group()
    group.add_argument("--api", help="set a custom url to the api", default=LOCAL_API)
    group.add_argument(
        "--local",
        action="store_const",
        dest="api",
        const=LOCAL_API,
        help=f"query the api running locally ({LOCAL_API})",
    )
    group.add_argument(
        "--gtweb",
        action="store_const",
        dest="api",
        const=GTWEB_API,
        help=f"query the api on gtweb ({PROD_API})",
    )
    group.add_argument(
        "--lab",
        action="store_const",
        dest="api",
        const=LAB_API,
        help=f"query the azure lab subscription api ({LAB_API})",
    )

    subparsers = parser.add_subparsers(
        title="top-level commands",
        dest="cmd",
        metavar="COMMAND",
    )

    add_info_args_parser(subparsers)
    add_freq_args_parser(subparsers)
    add_analyze_args_parser(subparsers)
    add_paradigm_args_parser(subparsers)

    args = parser.parse_args()
    namespace = vars(args)

    func = namespace["func"]
    cmd = namespace["cmd"]
    del namespace["func"]
    del namespace["cmd"]
    return cmd, func, namespace


def main():
    cmd, fn, parameters = parse_args()

    fn(**parameters)


if __name__ == "__main__":
    raise SystemExit(main())
