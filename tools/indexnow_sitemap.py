#!/usr/bin/env python3
"""Build an IndexNow payload from local sitemap files; never make a request."""

import argparse
import datetime as dt
import json
from pathlib import Path
import re
import sys
import xml.etree.ElementTree as ET

HOST = "homegroundchina.com"
ORIGIN = f"https://{HOST}"
MAX_URLS = 10_000
MAX_XML_BYTES = 10 * 1024 * 1024
SITEMAP_NS = "http://www.sitemaps.org/schemas/sitemap/0.9"


def canonical_url(value):
    # These are the site's exported canonical page routes. Reject, rather than
    # silently rewrite, a host alias, port, query, fragment or encoded path.
    if len(value) > 2048 or not re.fullmatch(
        r"https://homegroundchina\.com/(?:[a-z0-9-]+/)*", value
    ):
        return None
    return value


def read_sitemap(path):
    with Path(path).open("rb") as source:
        raw = source.read(MAX_XML_BYTES + 1)
    if len(raw) > MAX_XML_BYTES:
        raise ValueError("sitemap exceeds the input size limit")
    xml = raw.decode("utf-8-sig")
    if "\x00" in xml or re.search(r"<!\s*(?:DOCTYPE|ENTITY)\b", xml, re.I):
        raise ValueError("sitemap must not contain DTD or entity declarations")
    root = ET.fromstring(xml)
    if root.tag == f"{{{SITEMAP_NS}}}urlset":
        prefix = f"{{{SITEMAP_NS}}}"
    elif root.tag == "urlset":
        prefix = ""
    else:
        raise ValueError("expected a sitemap urlset")
    entries = []
    rejected = 0
    for child in root:
        if child.tag != f"{prefix}url":
            raise ValueError("unexpected sitemap root child")
        locs = child.findall(f"{prefix}loc")
        lastmods = child.findall(f"{prefix}lastmod")
        if len(locs) != 1 or len(locs[0]) or len(lastmods) > 1 or (lastmods and len(lastmods[0])):
            raise ValueError("each sitemap URL needs one plain loc")
        url = canonical_url((locs[0].text or "").strip())
        if not url:
            rejected += 1
            continue
        lastmod = (lastmods[0].text or "").strip() if lastmods else None
        entries.append((url, lastmod))
    if not entries:
        raise ValueError("sitemap has no valid canonical page URLs")
    return entries, rejected


def lastmod_date(value):
    if not value:
        return None
    try:
        if re.fullmatch(r"\d{4}-\d{2}-\d{2}", value):
            return dt.date.fromisoformat(value)
        if not re.fullmatch(r"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:\d{2})", value):
            return None
        parsed = dt.datetime.fromisoformat(value.replace("Z", "+00:00"))
        return parsed.date()
    except ValueError:
        return None


def select_urls(current, baseline, as_of, submit_all=False, limit=MAX_URLS):
    if not isinstance(as_of, dt.date) or isinstance(as_of, dt.datetime):
        raise ValueError("as_of must be a calendar date")
    if not isinstance(limit, int) or not 1 <= limit <= MAX_URLS:
        raise ValueError("URL limit must be from 1 to 10000")
    entries, rejected = read_sitemap(current)
    baseline_urls = None
    baseline_state = "unavailable"
    if baseline:
        try:
            previous, _ = read_sitemap(baseline)
            baseline_urls = {url for url, _ in previous}
            baseline_state = "valid"
        except (OSError, ValueError, ET.ParseError):
            # An unavailable/invalid baseline never means every page is new.
            pass
    current_urls = list(dict.fromkeys(url for url, _ in entries))
    new_urls = [url for url in current_urls if baseline_urls is not None and url not in baseline_urls]
    since = as_of - dt.timedelta(days=2)
    recent_urls = list(dict.fromkeys(
        url for url, lastmod in entries
        if (modified := lastmod_date(lastmod)) is not None and since <= modified <= as_of
    ))
    # New routes get priority if the combined payload reaches IndexNow's cap.
    candidates = current_urls if submit_all else list(dict.fromkeys(new_urls + recent_urls))
    return candidates[:limit], {
        "baseline": baseline_state,
        "current": len(current_urls),
        "new": len(new_urls),
        "recent": len(recent_urls),
        "rejected": rejected,
        "selected": min(len(candidates), limit),
        "omitted_at_limit": max(0, len(candidates) - limit),
        "all": submit_all,
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--current", required=True)
    parser.add_argument("--baseline")
    parser.add_argument("--as-of", required=True, type=dt.date.fromisoformat)
    parser.add_argument("--key", required=True)
    parser.add_argument("--submit-all", choices=("true", "false"), default="false")
    args = parser.parse_args()
    if not re.fullmatch(r"[a-f0-9]{32}", args.key):
        parser.error("expected the site's public 32-character hexadecimal key")
    try:
        urls, summary = select_urls(args.current, args.baseline, args.as_of, args.submit_all == "true")
    except (OSError, ValueError, ET.ParseError) as error:
        print(f"IndexNow selection skipped: {type(error).__name__}", file=sys.stderr)
        return 1
    print("IndexNow selection: " + json.dumps(summary, sort_keys=True), file=sys.stderr)
    print(json.dumps({"host": HOST, "key": args.key, "keyLocation": f"{ORIGIN}/{args.key}.txt", "urlList": urls}))
    return 0


if __name__ == "__main__":
    sys.exit(main())
