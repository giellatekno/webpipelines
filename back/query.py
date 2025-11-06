#!/usr/bin/env python3
"""Send a query to the webpipeline API, running locally, or elsewhere."""

import argparse
import pathlib
import datetime
from json import dumps as to_json
import sys
import http

import urllib
from urllib.request import Request, urlopen

thisfile = pathlib.Path(__file__).name
LOCAL_API = "http://localhost:3000"
PROD_API = "https://something.something"
GTWEB_API = "https://gtweb.uit.no/webpipeline-api"
LAB_API = "https://dictapi.livelybeach-54ee1a2e.norwayeast.azurecontainerapps.io"
HOUR = 60 * 60
DAY = 60 * 60 * 24
POSES = ["Any", "A", "N", "V", "Adv", "Num", "Pron"]

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


def response_line(response):
    ver = float(int(response.version) / 10)
    return f"HTTP/{ver} {response.status} {response.reason}"


def do_query(
    url,
    verbose=False,
    method="GET",
    data=None,
    json=None,
    headers=None,
):
    if verbose:
        print("* sending request to", url)

    if headers is None:
        headers = {}

    if data and isinstance(data, str):
        data = data.encode("utf-8")
    elif not data and json:
        data = to_json(json).encode("utf-8")

    request = Request(
        url=url,
        method=method,
        data=data,
        headers=headers,
    )

    if verbose:
        print(
            f"> {request.get_method()} {request.selector} "
            f"{request.type.upper()}/1.1"
        )

    try:
        response = urlopen(request)
    except http.client.RemoteDisconnected:
        print("* fatal: remote disconnected")
    except urllib.error.HTTPError as e:
        print(f"* fatal: {e.code} {e.msg} ({url}")
    except urllib.error.URLError as e:
        if isinstance(e.reason, ConnectionRefusedError):
            parsed_url = urllib.parse.urlparse(url)
            hostname = parsed_url.hostname
            port = parsed_url.port
            print(f"* fatal: remote ({hostname}:{port}): connection refused")
        else:
            print(e.reason)
            print(f"* fatal: other URLError: {e}")
    except Exception as e:
        if verbose:
            print("* error: server failure")
            print("<", response_line(e))
            for header, value in e.headers.items():
                print(f"< {header}: {value}")
            print("< ")

        data = e.fp.read().decode("utf-8")
        data = data if data else "* server sent no data"
        return data
    else:
        data = response.fp.read().decode("utf-8")
        if verbose:
            print("<", response_line(response))
            for header, value in response.headers.items():
                print(f"< {header}: {value}")
            print("< ")

        return data


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

    if result := do_query(url, verbose=verbose):
        print(result)


def run_analyze(word=None, lang=None, verbose=False, api=LOCAL_API):
    word = urllib.parse.quote(word)
    url = f"{api}/analyze/{lang}/{word}"
    if result := do_query(url, verbose=verbose):
        print(result)


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

    data = {
        "lang1": lang1,
        "lang2": lang2,
        "data": text,
        "typ": "text",
    }
    headers = {
        "content-type": "application/json",
    }
    result = do_query(
        url=f"{LOCAL_API}/unknown-lemmas-in-dict",
        method="POST",
        json=data,
        headers=headers,
        verbose=verbose,
    )
    print(result)


def run_paradigm(
    lang=None,
    word=None,
    verbose=False,
    format="json",
    pos="Any",
    size="standard",
    api=LOCAL_API
):
    word = urllib.parse.quote(word)
    url = f"{api}/paradigm/{lang}/{word}?pos={pos}&size={size}&format={format}"
    if result := do_query(url, verbose=verbose):
        print(result)


def run_disambiguate(
    lang=None,
    words=None,
    verbose=False,
    api=LOCAL_API
):
    words = urllib.parse.quote(" ".join(words))
    url = f"{api}/disambiguate/{lang}/{words}"
    if result := do_query(url, verbose=verbose):
        print(result)


def add_analyze_args_parser(subparsers):
    analyze_parser = subparsers.add_parser(
        "analyze",
        aliases=["analyse"],
        help="analyze a word",
        description="analyze a word",
    )
    analyze_parser.add_argument("lang")
    analyze_parser.add_argument("word")
    analyze_parser.set_defaults(func=run_analyze)


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
    freq_parser.add_argument("lang1")
    freq_parser.add_argument("lang2")
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

    pos_group = parser.add_mutually_exclusive_group()
    pos_group.add_argument(
        "--pos",
        help="POS of input word",
        choices=POSES,
        default="Any",
    )
    pos_group.add_argument(
        "--any",
        action="store_const",
        dest="pos",
        const="Any",
    )
    pos_group.add_argument(
        "--noun",
        action="store_const",
        dest="pos",
        const="N"
    )
    pos_group.add_argument(
        "--verb",
        action="store_const",
        dest="pos",
        const="V"
    )
    pos_group.add_argument(
        "--adjective",
        action="store_const",
        dest="pos",
        const="A"
    )
    pos_group.add_argument(
        "--adverb",
        action="store_const",
        dest="pos",
        const="Adv"
    )
    pos_group.add_argument(
        "--pronoun",
        action="store_const",
        dest="pos",
        const="Pron"
    )
    parser.set_defaults(func=run_paradigm)


def add_disambiguate_args_parser(subparsers):
    parser = subparsers.add_parser(
        "disambiguate",
        aliases=["dis"],
        help="disambiguate a sentence",
        description="disambiguate a sentence",
    )
    parser.add_argument("lang")
    parser.add_argument("words", nargs="+")

    parser.set_defaults(func=run_disambiguate)


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
    group.add_argument(
        "--api",
        help="set a custom url to the api",
        default=LOCAL_API
    )
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

    format_group = parser.add_argument_group(
        title="output format",
        description=(
            "Ask the API to return the results in this format. Notice that "
            "this is only a request, the API may or may not support it"
        ),
        argument_default="text",
    )
    exclusive = format_group.add_mutually_exclusive_group()
    exclusive.add_argument(
        "--text",
        action="store_const",
        dest="format",
        const="text",
        help="shorthand for --format text",
    )
    exclusive.add_argument(
        "--json",
        action="store_const",
        dest="format",
        const="json",
        help="shorthand for --format json",
    )
    exclusive.add_argument(
        "--format",
        default="text",
        choices=["json", "text"],
        help="the desired format. defaults to text",
    )

    subparsers = parser.add_subparsers(
        title="top-level commands",
        dest="cmd",
        metavar="COMMAND",
    )

    # info
    add_info_args_parser(subparsers)
    # freq
    add_freq_args_parser(subparsers)
    # analyze (analyse)
    add_analyze_args_parser(subparsers)
    # paradigm (para)
    add_paradigm_args_parser(subparsers)
    # dependency (dep)
    # disambiguate (dis)
    add_disambiguate_args_parser(subparsers)
    # hyphenate (hyp, hyph)
    # transcribe (trans, ipa)
    # lemmacount

    args = parser.parse_args()
    namespace = vars(args)

    try:
        func = namespace["func"]
    except KeyError:
        parser.print_usage()
        fatal("no COMMAND given")
    cmd = namespace["cmd"]
    del namespace["func"]
    del namespace["cmd"]
    return cmd, func, namespace


def main():
    cmd, fn, parameters = parse_args()

    fn(**parameters)


if __name__ == "__main__":
    raise SystemExit(main())
