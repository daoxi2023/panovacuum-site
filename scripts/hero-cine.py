#!/usr/bin/env python3
"""Turn a generated / raw clip into a seamless-ish looping hero video.

  python3 scripts/hero-cine.py --in /tmp/h3.mp4 --out public/video \
      --tag hero-loop --dur 13.0 --fade 0.5

Outputs <tag>-1920.mp4 / <tag>-1280.mp4 / <tag>-poster.jpg at 30fps, H.264,
yuv420p, faststart, silent. The loop seam (last <fade> seconds) is dissolved
into the head of the clip so a restart reads as one continuous camera move.
"""
import argparse
import json
import subprocess
from pathlib import Path


def run(cmd: list[str]) -> None:
    subprocess.run(cmd, check=True)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--in", dest="src", required=True)
    ap.add_argument("--out", default="public/video")
    ap.add_argument("--tag", default="hero-loop")
    ap.add_argument("--dur", type=float, default=13.0, help="loop length in seconds")
    ap.add_argument("--fade", type=float, default=0.5, help="seam dissolve length")
    ap.add_argument("--start", type=float, default=0.0)
    ap.add_argument("--sharp", type=float, default=0.6, help="unsharp amount for upscales")
    ap.add_argument("--crf", type=int, default=25)
    args = ap.parse_args()

    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    mp4_1920 = out / f"{args.tag}-1920.mp4"
    mp4_1280 = out / f"{args.tag}-1280.mp4"
    poster = out / f"{args.tag}-poster.jpg"

    scale = (
        "scale=1920:1080:force_original_aspect_ratio=increase:flags=lanczos,"
        "crop=1920:1080,setsar=1,fps=30,format=yuv420p"
    )
    if args.sharp > 0:
        scale += f",unsharp=5:5:{args.sharp}:5:5:0"

    dur, fade = args.dur, args.fade
    graph = (
        f"[0:v]trim=start={args.start}:duration={dur},setpts=PTS-STARTPTS,{scale}[body];"
        f"[0:v]trim=start={args.start}:duration={fade},setpts=PTS-STARTPTS,{scale}[head];"
        f"[body][head]xfade=transition=fade:duration={fade}:offset={dur - fade:.3f}[v]"
    )
    run([
        "ffmpeg", "-v", "error", "-y", "-i", args.src,
        "-filter_complex", graph, "-map", "[v]", "-an",
        "-c:v", "libx264", "-preset", "slow", "-crf", str(args.crf),
        "-profile:v", "high", "-level", "4.0", "-pix_fmt", "yuv420p",
        "-movflags", "+faststart", str(mp4_1920),
    ])
    run([
        "ffmpeg", "-v", "error", "-y", "-i", str(mp4_1920),
        "-vf", "scale=1280:720:flags=lanczos", "-an",
        "-c:v", "libx264", "-preset", "slow", "-crf", str(args.crf + 1),
        "-profile:v", "main", "-pix_fmt", "yuv420p",
        "-movflags", "+faststart", str(mp4_1280),
    ])
    run([
        "ffmpeg", "-v", "error", "-y", "-ss", "0.6", "-i", str(mp4_1920),
        "-frames:v", "1", "-q:v", "3", str(poster),
    ])

    def probe(p: Path) -> dict:
        info = subprocess.run(
            ["ffprobe", "-v", "error", "-select_streams", "v:0",
             "-show_entries", "stream=width,height,r_frame_rate,nb_frames",
             "-show_entries", "format=duration,size", "-of", "json", str(p)],
            capture_output=True, text=True,
        ).stdout
        return json.loads(info)

    print(json.dumps({
        "1920": probe(mp4_1920),
        "1280": probe(mp4_1280),
        "poster_kb": round(poster.stat().st_size / 1024),
    }, ensure_ascii=False, indent=1))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
