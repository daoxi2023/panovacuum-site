#!/usr/bin/env python3
"""Cut a silent hero loop from selected workshop clips.

Usage:
  python3 scripts/hero-cut.py --out public/video 9 11 16 17
  python3 scripts/hero-cut.py --list-idx /tmp/clips/index.json --seg 3.2 --out /tmp/test 1 2

For each clip the script samples frames, scores them for "large smooth neutral
metal surface" (high neutral-gray share, low edge density) and keeps the best
window, then crossfades the windows into one 1920x1080 / 30fps / faststart mp4
plus a 1280 variant and a poster jpg. No audio is carried over.
"""
import argparse
import json
import os
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image

DEFAULT_INDEX = "/tmp/clips/index.json"
FPS = 30
TRANSITION = 0.55


def probe(path: str) -> float:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path],
        capture_output=True, text=True,
    ).stdout.strip()
    try:
        return float(out)
    except ValueError:
        return 0.0


def frame_metrics(path: str, t: float) -> tuple[float, float]:
    """Return (neutral_gray_share, edge_density) for one frame."""
    with tempfile.NamedTemporaryFile(suffix=".jpg", delete=False) as tmp:
        name = tmp.name
    try:
        subprocess.run(
            ["ffmpeg", "-v", "error", "-ss", f"{t:.2f}", "-i", path, "-frames:v", "1",
             "-vf", "scale=320:-2", "-y", name],
            check=False,
        )
        if not os.path.exists(name) or os.path.getsize(name) < 2000:
            return 0.0, 1.0
        im = Image.open(name).convert("RGB").resize((320, 180))
        px = list(im.getdata())
        n = len(px)
        gray = sum(
            1 for r, g, b in px if max(r, g, b) - min(r, g, b) < 26 and 70 < max(r, g, b) < 215
        ) / n
        grey = im.convert("L")
        w, h = grey.size
        q = list(grey.getdata())
        edge = sum(abs(q[y * w + x] - q[y * w + x + 1]) for y in range(h) for x in range(w - 1))
        edge /= (w - 1) * h * 255
        return gray, edge
    finally:
        if os.path.exists(name):
            os.unlink(name)


def best_window(path: str, seg: float) -> tuple[float, float]:
    """Pick the start time whose centered frame looks most like a metal surface."""
    dur = probe(path)
    if dur <= seg + 0.4:
        return 0.0, min(dur, seg)
    step = 0.5
    best_t, best_score = 0.0, -1.0
    t = 0.6
    while t + seg <= dur - 0.2:
        gray, edge = frame_metrics(path, t + seg / 2)
        score = gray - 1.4 * edge
        if score > best_score:
            best_t, best_score = t, score
        t += step
    return best_t, seg


def build(clips: list[tuple[str, float, float]], out_dir: Path, seg: float, tag: str) -> dict:
    out_dir.mkdir(parents=True, exist_ok=True)
    n = len(clips)
    inputs: list[str] = []
    for path, start, dur in clips:
        inputs += ["-ss", f"{start:.2f}", "-t", f"{dur:.2f}", "-i", path]

    chains = []
    for i in range(n):
        chains.append(
            f"[{i}:v]fps={FPS},scale=1920:1080:force_original_aspect_ratio=increase,"
            f"crop=1920:1080,setsar=1,format=yuv420p[v{i}]"
        )
    if n == 1:
        video_label = "v0"
    else:
        last = "v0"
        offset = seg - TRANSITION
        for i in range(1, n):
            label = f"x{i}"
            chains.append(
                f"[{last}][v{i}]xfade=transition=fade:duration={TRANSITION}:offset={offset:.2f}[{label}]"
            )
            last = label
            offset += seg - TRANSITION
        video_label = last

    graph = ";".join(chains)
    mp4_1920 = out_dir / f"{tag}-1920.mp4"
    mp4_1280 = out_dir / f"{tag}-1280.mp4"
    poster = out_dir / f"{tag}-poster.jpg"

    subprocess.run(
        ["ffmpeg", "-v", "error", "-y", *inputs,
         "-filter_complex", graph, "-map", f"[{video_label}]",
         "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "21",
         "-profile:v", "high", "-level", "4.0", "-pix_fmt", "yuv420p",
         "-movflags", "+faststart", str(mp4_1920)],
        check=True,
    )
    subprocess.run(
        ["ffmpeg", "-v", "error", "-y", "-i", str(mp4_1920),
         "-vf", "scale=1280:720", "-an", "-c:v", "libx264", "-preset", "slow",
         "-crf", "23", "-profile:v", "main", "-pix_fmt", "yuv420p",
         "-movflags", "+faststart", str(mp4_1280)],
        check=True,
    )
    subprocess.run(
        ["ffmpeg", "-v", "error", "-y", "-ss", "0.8", "-i", str(mp4_1920),
         "-frames:v", "1", "-q:v", "3", str(poster)],
        check=True,
    )

    total = n * seg - (n - 1) * TRANSITION
    return {
        "segments": [{"file": os.path.basename(p), "start": round(s, 2), "dur": round(d, 2)} for p, s, d in clips],
        "duration": round(total, 2),
        "files": {
            "1920": [str(mp4_1920), mp4_1920.stat().st_size],
            "1280": [str(mp4_1280), mp4_1280.stat().st_size],
            "poster": [str(poster), poster.stat().st_size],
        },
    }


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("clips", nargs="+", help="1-based indices into the index json, or file paths")
    ap.add_argument("--list-idx", default=DEFAULT_INDEX)
    ap.add_argument("--out", default="public/video")
    ap.add_argument("--seg", type=float, default=3.2, help="seconds kept per clip")
    ap.add_argument("--tag", default="hero-loop")
    ap.add_argument("--plan", action="store_true", help="only print the chosen windows")
    args = ap.parse_args()

    index = []
    if os.path.exists(args.list_idx):
        index = json.load(open(args.list_idx))

    selected: list[tuple[str, float, float]] = []
    for raw in args.clips:
        if raw.isdigit() and index and 1 <= int(raw) <= len(index):
            path = index[int(raw) - 1][1]
        else:
            path = raw
        if not os.path.exists(path):
            print(f"missing: {path}", file=sys.stderr)
            return 1
        start, dur = best_window(path, args.seg)
        selected.append((path, start, dur))
        print(f"  {os.path.basename(path)}  window {start:.1f}s +{dur:.1f}s")

    if args.plan:
        return 0

    report = build(selected, Path(args.out), args.seg, args.tag)
    print(json.dumps(report, indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
