#!/usr/bin/env python3
"""Flowstack prod panel — local ops dashboard for the landing + the Forge box.

Serves http://127.0.0.1:8094 (port registry: 8090 promoter, 8091 vm-analytics,
8092 outreach, 8093 grid-control, 8094 this). Read-only: HTTP probes, the Forge
API (token from ~/.forge/token) and a BatchMode SSH vitals read. Refreshes in a
background thread every 30s so page loads never block on probes.

Runs as a `services.list` pane (auto-restart). Stdlib only, like the sibling
dashboards.
"""

import hashlib
import json
import os
import re
import subprocess
import threading
import time
import urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

PORT = 8094
SERVER_ID = 1211646
SITES = {"landing": 3238855, "dashboard": 3219726}
BOX = "178.128.138.142"
SSH_KEY = os.path.expanduser("~/.ssh/id_ed25519_forge")
FORGE_TOKEN_PATH = os.path.expanduser("~/.forge/token")
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REFRESH_S = 30

state: dict = {"ts": 0}
state_lock = threading.Lock()


def http_probe(url: str, timeout: int = 8) -> dict:
    t0 = time.time()
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "prod-panel"})
        with urllib.request.urlopen(req, timeout=timeout) as r:
            body = r.read(2048)
            return {"ok": r.status == 200, "status": r.status,
                    "ms": int((time.time() - t0) * 1000), "head": body[:200].decode("utf-8", "replace")}
    except Exception as e:
        return {"ok": False, "status": 0, "ms": int((time.time() - t0) * 1000), "err": str(e)[:80]}


EDGE_HOSTS = ("www.flowstack.run", "app.flowstack.run")


def edge_health(host: str) -> dict:
    """The edge-brb worker answers /__edge-brb/health at the edge (never
    hits the origin) with its name + the sha of its embedded BRB card."""
    try:
        req = urllib.request.Request(
            f"https://{host}/__edge-brb/health", headers={"User-Agent": "prod-panel"})
        with urllib.request.urlopen(req, timeout=8) as r:
            data = json.load(r)
            return {"ok": bool(data.get("ok")), "sha": data.get("brb_sha", "?")}
    except Exception as e:
        return {"ok": False, "err": str(e)[:60]}


def local_brb_sha() -> str:
    try:
        with open(os.path.join(REPO, "public", "brb.html"), "rb") as f:
            return hashlib.sha256(f.read()).hexdigest()[:12]
    except Exception:
        return "?"


def forge_deploys(site_id: int) -> list:
    try:
        with open(FORGE_TOKEN_PATH) as f:
            token = f.read().strip()
        req = urllib.request.Request(
            f"https://forge.laravel.com/api/v1/servers/{SERVER_ID}/sites/{site_id}/deployment-history",
            headers={"Authorization": f"Bearer {token}", "Accept": "application/json",
                     "User-Agent": "flowstack-prod-panel"})
        with urllib.request.urlopen(req, timeout=10) as r:
            deps = json.load(r)["deployments"][:3]
        return [{"id": d["id"], "status": d["status"],
                 "commit": (d.get("commit_hash") or "")[:7], "at": d["started_at"]} for d in deps]
    except Exception as e:
        return [{"id": 0, "status": f"forge-api error: {str(e)[:60]}", "commit": "", "at": ""}]


def box_vitals() -> dict:
    cmd = ("uptime; free -m | sed -n 2p; swapon --show --bytes --noheadings; "
           "pgrep -fc 'next[ ]build' || true; "
           # CI releases (ci-<sha7>-<run>) carry no .git — take the sha from
           # the dir name; legacy Forge releases fall back to git log.
           "b=$(basename $(readlink ~/flowstack.run/current)); "
           "case $b in ci-*) echo $b | cut -d- -f2;; "
           "*) cd ~/flowstack.run/current && git log --format=%h -1;; esac; "
           "pm2 jlist 2>/dev/null | python3 -c 'import json,sys; "
           "print(json.load(sys.stdin)[0][\"pm2_env\"][\"status\"])' 2>/dev/null || echo pm2-unknown")
    try:
        out = subprocess.run(
            ["ssh", "-i", SSH_KEY, "-o", "BatchMode=yes", "-o", "ConnectTimeout=6",
             f"forge@{BOX}", cmd],
            capture_output=True, text=True, timeout=20)
        if out.returncode != 0:
            return {"ok": False, "err": (out.stderr.strip() or "ssh failed")[:80]}
        lines = out.stdout.strip().splitlines()
        up = lines[0]
        load = re.search(r"load average: ([\d.]+)", up)
        mem = lines[1].split()
        swap = lines[2].split() if len(lines) > 2 and "/" in lines[2] else ["", "", "0", "0"]
        return {
            "ok": True,
            "load1": float(load.group(1)) if load else -1,
            "mem_total": int(mem[1]), "mem_avail": int(mem[-1]),
            "swap_used_pct": round(int(swap[3]) / max(int(swap[2]), 1) * 100) if swap[2].isdigit() else 0,
            "zombie_builds": int(lines[3]) if len(lines) > 3 and lines[3].isdigit() else 0,
            "serving": lines[4] if len(lines) > 4 else "?",
            "pm2": lines[5] if len(lines) > 5 else "?",
        }
    except Exception as e:
        return {"ok": False, "err": str(e)[:80]}


def git_heads() -> dict:
    def run(args):
        try:
            return subprocess.run(args, capture_output=True, text=True, cwd=REPO,
                                  timeout=15).stdout.strip()
        except Exception:
            return ""
    remote = run(["git", "ls-remote", "origin", "main"])[:7]
    local = run(["git", "rev-parse", "--short=7", "HEAD"])
    return {"origin_main": remote, "local": local}


def refresh_loop():
    while True:
        snap = {
            "landing": http_probe("https://www.flowstack.run/robots.txt"),
            "dashboard": http_probe("https://app.flowstack.run/api/public/stats"),
            "deploys": {name: forge_deploys(sid) for name, sid in SITES.items()},
            "box": box_vitals(),
            "git": git_heads(),
            "edge": {h: edge_health(h) for h in EDGE_HOSTS},
            "brb_local_sha": local_brb_sha(),
            "ts": time.time(),
        }
        with state_lock:
            state.clear()
            state.update(snap)
        time.sleep(REFRESH_S)


def pill(ok: bool, text: str, warn: bool = False) -> str:
    cls = "warn" if warn else ("good" if ok else "crit")
    return f'<span class="pill {cls}">{text}</span>'


def render() -> str:
    with state_lock:
        s = dict(state)
    if not s.get("ts"):
        return "<p>first probe running…</p>"
    age = int(time.time() - s["ts"])
    box = s["box"]
    git = s["git"]

    rows = []
    for name, probe in (("www.flowstack.run", s["landing"]), ("app.flowstack.run", s["dashboard"])):
        ok = probe["ok"]
        label = f"{probe['status'] or 'DOWN'} · {probe['ms']}ms"
        rows.append(f"<tr><td>{name}</td><td>{pill(ok, label)}</td>"
                    f"<td class=dim>{probe.get('err', '')}</td></tr>")

    if box.get("ok"):
        overload = box["load1"] > 4 or box["mem_avail"] < 120 or box["swap_used_pct"] > 90
        zombies = box["zombie_builds"] > 0
        vitals = f"load {box['load1']} · {box['mem_avail']}MB free · swap {box['swap_used_pct']}%"
        rows.append(
            f"<tr><td>box {BOX}</td><td>{pill(not overload, vitals, warn=overload)}</td>"
            f"<td class=dim>pm2 {box['pm2']} · serving {box['serving']}</td></tr>")
        builds_label = f"{box['zombie_builds']} running"
        rows.append(
            f"<tr><td>on-box builds</td>"
            f"<td>{pill(not zombies, builds_label, warn=zombies)}</td>"
            f"<td class=dim>&gt;0 for more than ~2min = OOM danger, kill them</td></tr>")
        drift = bool(git["origin_main"] and box["serving"] and git["origin_main"] != box["serving"])
        drift_label = f"origin {git['origin_main'] or '?'} vs serving {box['serving'] or '?'}"
        rows.append(
            f"<tr><td>deploy drift</td><td>{pill(not drift, drift_label, warn=drift)}</td>"
            f"<td class=dim>{'undeployed commits on main' if drift else 'in sync'}</td></tr>")
    else:
        rows.append(f"<tr><td>box {BOX}</td><td>{pill(False, 'SSH UNREACHABLE')}</td>"
                    f"<td class=dim>{box.get('err', '')}</td></tr>")

    # Edge BRB worker — must answer at the edge on every routed host, and
    # its embedded card must match the local public/brb.html.
    local_sha = s.get("brb_local_sha", "?")
    edge_shas = set()
    for host, e in (s.get("edge") or {}).items():
        short = host.split(".")[0]
        if e.get("ok"):
            sha = e.get("sha", "?")
            edge_shas.add(sha)
            rows.append(
                f"<tr><td>edge worker ({short})</td>"
                f"<td>{pill(True, 'active · brb ' + sha)}</td>"
                f"<td class=dim>answers /__edge-brb/health at the edge</td></tr>")
        else:
            err = e.get("err", "worker missing on route?")
            rows.append(
                f"<tr><td>edge worker ({short})</td>"
                f"<td>{pill(False, 'NOT ANSWERING')}</td>"
                f"<td class=dim>{err}</td></tr>")
    if edge_shas:
        in_sync = edge_shas == {local_sha}
        sync_label = f"edge {'/'.join(sorted(edge_shas))} vs local {local_sha}"
        rows.append(
            f"<tr><td>edge brb sync</td><td>{pill(in_sync, sync_label, warn=not in_sync)}</td>"
            f"<td class=dim>{'card in sync' if in_sync else 'STALE — run ops/edge-brb/deploy.sh'}</td></tr>")

    dep_rows = []
    for site, deps in s["deploys"].items():
        for d in deps:
            ok = d["status"] == "finished"
            live = d["status"] == "deploying"
            dep_rows.append(f"<tr><td>{site}</td><td>{pill(ok, d['status'], warn=live)}</td>"
                            f"<td>{d['commit']}</td><td class=dim>{d['at']}</td></tr>")

    return f"""<!doctype html><html lang=en><head><meta charset=utf-8>
<meta http-equiv=refresh content={REFRESH_S}><meta name=viewport content="width=device-width,initial-scale=1">
<title>Flowstack — Prod Panel</title><style>
:root{{--bg:#000;--line:#26262a;--ink:#fafafa;--dim:#8a8a8a;
--good:#4ade80;--warn:#fbbf24;--crit:#fb7185}}
body{{background:var(--bg);color:var(--ink);margin:0;padding:32px 24px;
font:13px ui-monospace,Menlo,monospace}}
h1{{font-size:15px;letter-spacing:.18em;text-transform:uppercase;margin:0 0 4px}}
.sub{{color:var(--dim);font-size:11px;margin-bottom:24px}}
table{{border-collapse:collapse;width:100%;max-width:860px;margin-bottom:28px}}
td,th{{border:1px solid var(--line);padding:8px 12px;text-align:left;font-size:12px}}
th{{color:var(--dim);text-transform:uppercase;letter-spacing:.14em;font-size:10px}}
.dim{{color:var(--dim)}}
.pill{{padding:2px 8px;border:1px solid;font-size:11px;letter-spacing:.06em}}
.pill.good{{color:var(--good);border-color:var(--good)}}
.pill.warn{{color:var(--warn);border-color:var(--warn)}}
.pill.crit{{color:var(--crit);border-color:var(--crit)}}
</style></head><body>
<h1>Flowstack / prod panel</h1>
<p class=sub>refreshed {age}s ago · auto-refresh {REFRESH_S}s · read-only</p>
<table><tr><th>surface</th><th>state</th><th>detail</th></tr>{''.join(rows)}</table>
<h1>Forge deploys</h1>
<p class=sub>last 3 per site · "deploying" on both sites at once = OOM risk on the 1GB box</p>
<table><tr><th>site</th><th>status</th><th>commit</th><th>started</th></tr>{''.join(dep_rows)}</table>
</body></html>"""


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):  # noqa: N802
        body = render().encode()
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, *args):  # quiet
        pass


if __name__ == "__main__":
    threading.Thread(target=refresh_loop, daemon=True).start()
    print(f"prod-panel on http://127.0.0.1:{PORT}")
    ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
