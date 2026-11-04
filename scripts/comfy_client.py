#!/usr/bin/env python3
"""ComfyUI 客户端：提交 API 格式工作流、轮询、取图。"""
from __future__ import annotations
import json, time, urllib.request, urllib.error, uuid, os, sys

HOST = os.environ.get("COMFY_HOST", "http://100.106.75.99:8188")
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/131.0"

def _req(path: str, data: dict | None = None, timeout: int = 60):
    url = HOST + path
    body = json.dumps(data).encode() if data is not None else None
    r = urllib.request.Request(url, data=body, headers={"User-Agent": UA, "Content-Type": "application/json"})
    with urllib.request.urlopen(r, timeout=timeout) as resp:
        raw = resp.read()
    return raw

def submit(wf: dict) -> str:
    cid = str(uuid.uuid4())
    out = json.loads(_req("/prompt", {"prompt": wf, "client_id": cid}))
    if "prompt_id" not in out:
        raise RuntimeError(f"submit failed: {out}")
    return out["prompt_id"]

def wait(pid: str, timeout: int = 900, interval: float = 2.0) -> dict:
    t0 = time.time()
    while time.time() - t0 < timeout:
        h = json.loads(_req(f"/history/{pid}", timeout=30))
        if pid in h:
            st = h[pid].get("status", {})
            if st.get("completed") or st.get("status_str") == "success":
                return h[pid]
            if st.get("status_str") == "error":
                raise RuntimeError(f"error: {json.dumps(st)[:500]}")
        time.sleep(interval)
    raise TimeoutError(f"timeout after {timeout}s for {pid}")

def fetch(hist: dict, idx: int = 0) -> bytes:
    imgs = hist["outputs"][list(hist["outputs"])[0]].get("images", [])
    im = imgs[idx]
    q = urllib.parse.urlencode({"filename": im["filename"], "subfolder": im.get("subfolder", ""), "type": im.get("type", "output")})
    return _req(f"/view?{q}", timeout=120)

import urllib.parse  # noqa: E402

def gen(wf: dict, timeout: int = 900) -> tuple[bytes, float]:
    t0 = time.time()
    pid = submit(wf)
    hist = wait(pid, timeout=timeout)
    data = fetch(hist)
    return data, time.time() - t0
