#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
from html.parser import HTMLParser
from pathlib import Path


VOID_TAGS = {
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "param", "source", "track", "wbr",
}
APPENDIX_MARKERS = ("evidence-appendix", "visual-corpus-appendix", "evidence-index")

TERM_DEFINITIONS: dict[str, tuple[str, ...]] = {
    "CMF": (
        r"색(?:상)?\s*[·,/와과\s]\s*소재\s*[·,/와과\s]\s*마감\s*\(\s*CMF\s*\)",
        r"color.{0,30}material.{0,30}finish.{0,10}\(\s*CMF\s*\)",
    ),
    "LUT": (
        r"색보정.{0,80}\(\s*LUT\s*\)",
        r"LUT.{0,100}색보정",
        r"look[- ]?up table.{0,20}\(\s*LUT\s*\)",
    ),
    "HIG": (
        r"화면 설계 지침.{0,80}\bHIG\b",
        r"HIG.{0,100}Human Interface Guidelines",
        r"Human Interface Guidelines.{0,30}\bHIG\b",
    ),
    "HLS": (
        r"스트리밍 영상 형식.{0,60}\bHLS\b",
        r"스트리밍 영상.{0,40}\bHLS\b",
        r"HLS.{0,100}(?:스트리밍|HTTP Live Streaming)",
    ),
    "CSS": (
        r"(?:화면|웹페이지) 스타일 코드.{0,30}\bCSS\b",
        r"CSS.{0,100}(?:스타일 코드|Cascading Style Sheets)",
    ),
}

TRANSLATED_JARGON = {
    "hero": "대표 이미지",
    "proof": "근거 또는 확인 자료",
    "shot job": "사진의 설명 역할",
    "figure-ground": "배경과 대상의 분리",
    "intrinsic product": "제품 고유 시각·인지 문법",
    "productive tension": "함께 유지하는 대비 요소",
    "protected surface": "그대로 복제하면 안 되는 요소",
    "authorship layer": "자료를 만든 주체와 목적",
    "saturation budget": "선명한 색을 집중하는 범위",
}

ABSTRACT_PHRASES = {
    "근거의 양보다 층위와 저자성을 분리": "자료를 만든 주체와 목적을 직접 설명",
    "토큰은 값의 목록이 아니라": "값이 어디에서 무엇을 위해 쓰이는지 직접 설명",
    "증명 사다리": "이미지가 이어지는 실제 순서를 직접 설명",
    "지배적 주인공": "무엇을 얼마나 크게 보여 주는지 직접 설명",
    "약속을 닫": "어떤 근거로 주장을 뒷받침하는지 직접 설명",
    "전면화": "무엇을 먼저 또는 크게 보여 주는지 직접 설명",
    "감각적 약속": "실제 주장이나 인상을 직접 명명",
}


class ReportCollector(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.stack: list[tuple[str, dict[str, str]]] = []
        self.images: list[dict[str, str]] = []
        self.visible_text: list[str] = []
        self.heading_text: list[str] = []
        self.skip_depth = 0
        self.heading_depth = 0

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        tag = tag.lower()
        item = {key.lower(): value or "" for key, value in attrs}
        if tag in {"style", "script"}:
            self.skip_depth += 1
        if tag in {"h1", "h2", "h3"}:
            self.heading_depth += 1
        if tag == "img":
            context = " ".join(
                value
                for _, ancestor in self.stack
                for key, value in ancestor.items()
                if key in {"id", "class", "role"}
            ).lower()
            image = dict(item)
            image["_context"] = context
            self.images.append(image)
        if tag not in VOID_TAGS:
            self.stack.append((tag, item))

    def handle_endtag(self, tag: str) -> None:
        tag = tag.lower()
        if tag in {"style", "script"} and self.skip_depth:
            self.skip_depth -= 1
        if tag in {"h1", "h2", "h3"} and self.heading_depth:
            self.heading_depth -= 1
        if self.stack and self.stack[-1][0] == tag:
            self.stack.pop()

    def handle_data(self, data: str) -> None:
        text = " ".join(data.split())
        if not text or self.skip_depth:
            return
        self.visible_text.append(text)
        if self.heading_depth:
            self.heading_text.append(text)


def first_use_is_defined(text: str, term: str, patterns: tuple[str, ...]) -> bool:
    match = re.search(rf"(?<![A-Za-z]){re.escape(term)}(?![A-Za-z])", text)
    if not match:
        return True
    window = text[max(0, match.start() - 140):match.end() + 180]
    return any(re.search(pattern, window, re.IGNORECASE | re.DOTALL) for pattern in patterns)


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Validate reader-facing language and source-image use in a source-brand HTML report."
    )
    parser.add_argument("html_path")
    args = parser.parse_args()

    html_path = Path(args.html_path).expanduser().resolve()
    errors: list[str] = []
    warnings: list[str] = []
    if not html_path.is_file():
        print(f"Report: {html_path}")
        print("ERROR: HTML report does not exist")
        print("Result: FAIL")
        return 1

    collector = ReportCollector()
    collector.feed(html_path.read_text(encoding="utf-8"))
    visible = " \n".join(collector.visible_text)
    headings = " \n".join(collector.heading_text)

    for index, image in enumerate(collector.images, start=1):
        label = f"HTML image {index}"
        src = image.get("src", "").strip()
        normalized_src = src.replace("\\", "/").lower()
        context = image.get("_context", "")
        if not src or src.startswith(("http://", "https://", "data:")):
            errors.append(f"{label}: src must be a registered local file")
        elif not (html_path.parent / src).resolve().is_file():
            errors.append(f"{label}: local image missing {src}")
        is_contact_sheet = "contact-sheets/" in normalized_src or "contact-sheet" in normalized_src
        is_appendix = any(marker in context for marker in APPENDIX_MARKERS)
        if is_contact_sheet and not is_appendix:
            errors.append(f"{label}: derived contact sheet may appear only inside an evidence appendix")
        if re.search(r"(?:^|/)(?:outputs?|reports?)/|screenshot|screen-capture|report-capture", normalized_src):
            warnings.append(f"{label}: path looks like a report or screenshot derivative; verify source provenance")
        for field in ("alt", "data-evidence-id", "data-era", "data-credit", "data-rights-note"):
            if not image.get(field, "").strip():
                errors.append(f"{label}: missing {field}")
        if not (image.get("data-category", "").strip() or image.get("data-evidence-role", "").strip()):
            errors.append(f"{label}: missing image category or evidence role")
        if not (image.get("data-layer", "").strip() or image.get("data-evidence-role", "").strip()):
            errors.append(f"{label}: missing analysis layer or evidence role")
        if not (image.get("data-source-url", "").strip() or image.get("data-source", "").strip()):
            errors.append(f"{label}: missing source URL or source label")

    for term, patterns in TERM_DEFINITIONS.items():
        if not first_use_is_defined(visible, term, patterns):
            errors.append(f"{term}: first reader-facing use requires a short definition")

    for term, replacement in TRANSLATED_JARGON.items():
        if re.search(rf"(?<![A-Za-z]){re.escape(term)}(?![A-Za-z])", visible, re.IGNORECASE):
            warnings.append(f"translated jargon '{term}' found; prefer '{replacement}' unless the term is under analysis")

    for phrase, replacement in ABSTRACT_PHRASES.items():
        if phrase in visible:
            warnings.append(f"abstract phrase '{phrase}' found; {replacement}")

    if re.search(r"사진 한 장에는 한 가지 설명 역할을 부여한다[.!]?\s*(?:$|\n)", headings):
        warnings.append("headline may have dropped the image-series relationship and outcome")

    print(f"Report: {html_path}")
    print(f"Images: {len(collector.images)}")
    for warning in warnings:
        print(f"WARNING: {warning}")
    for error in errors:
        print(f"ERROR: {error}")
    print(f"Result: {'FAIL' if errors else 'PASS'}")
    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
