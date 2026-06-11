# Deploy: Laravel Forge

How the Flowstack landing site is deployed on Laravel Forge. Specifically tuned for the constraints in `AGENTS.md`: persistent Node host, one process, working SSE.

---

## 1. Why Forge is the right shape

The site has one architectural constraint that rules out most deploy targets:

> **Deployment must be persistent Node.** Vercel serverless / Edge / Lambda / Cloudflare Workers all break the singleton (each invocation is a fresh isolate). — `AGENTS.md`

The stats broadcaster (`src/lib/stats-broadcaster.ts`) is a module-level singleton: one poller in the Node process fans out to every visitor's SSE connection. If the process restarts or runs as N separate isolates, the optimisation breaks and the dashboard sees N× the load.

Forge provisions a long-lived VPS with supervisord-managed daemons. The Next process stays warm, the singleton survives, SSE works. Vercel does not — don't migrate without rewriting the broadcaster to a short-interval-polling client (see the dashboard docs).

---

## 2. One-time server provisioning

| Setting | Value |
|---|---|
| Provider | DigitalOcean / Hetzner / Linode / Vultr — anything Forge supports |
| Size | 1 GB RAM minimum; 2 GB if you also host the dashboard on the same box |
| Region | Same region as your customers / dashboard for minimal RTT |
| OS | Ubuntu 22.04 LTS (Forge default) |
| Node version | 22 LTS or 24 LTS — pick via Forge → Server → Node |
| pnpm | `npm i -g pnpm` once via SSH or Forge → Recipes |
| Time zone | UTC (so log timestamps line up with the SSE `last_activity_at`) |

If the PHP dashboard runs on the same server, Forge already has PHP 8.3+ installed. The Node site is a separate Forge "site" record sharing the same VPS.

---

## 3. Site creation

In Forge → Server → Sites → Add Site:

- **Site type**: **Static HTML / Static**. Do NOT pick "PHP" — Forge will try to wire php-fpm and the Nginx defaults won't proxy to Node correctly.
- **Project type**: Generic (the field varies by Forge version; you want a site whose Nginx is editable and whose deploy script runs arbitrary commands).
- **Web directory**: `/` (Nginx will proxy to Node on port 3000; nothing reads files directly).
- **Domain**: your real domain. SSL is added later.
- **Quick Deploy**: on — push to `main` auto-deploys.

---

## 4. Repository

- Connect GitHub / GitLab via Forge → Site → Apps.
- Branch: `main`.
- **Install composer dependencies: OFF.** This is not a PHP app.
- Deploy key auto-added to the repo for read access.

---

## 5. Deploy script

Paste this into Forge → Site → Deploy → Edit Deploy Script.

```bash
cd $FORGE_SITE_PATH

# pull latest
git pull origin $FORGE_SITE_BRANCH

# install dependencies (frozen so prod matches lockfile exactly)
pnpm install --frozen-lockfile

# build — emits .next/standalone/server.js thanks to
# `output: "standalone"` in next.config.ts
pnpm build

# Stitch the standalone bundle. Next's standalone bundle includes
# server.js + a tracing-resolved subset of node_modules, but does NOT
# include public/ or .next/static/. Both need to be next to server.js
# so the server can serve them.
rsync -a --delete public/ .next/standalone/public/
rsync -a --delete .next/static/ .next/standalone/.next/static/

# Reload daemon — Forge wraps the Node process in supervisord (see §6).
# Wrapped in flock to avoid concurrent deploys clobbering each other.
( flock -w 10 9 || exit 1
  echo "Reloading flowstack-landing..."
  sudo -S supervisorctl restart flowstack-landing
) 9>/tmp/forge-flowstack-deploy.lock
```

### Alternative: PM2 instead of Forge daemons

If you prefer PM2 (cluster mode, hot reload, log rotation):

```bash
pm2 reload flowstack-landing --update-env || \
  pm2 start .next/standalone/server.js \
    --name flowstack-landing --update-env
pm2 save
```

**Caveat with PM2 cluster mode**: do not run more than one instance. The singleton broadcaster + one process per box is the design. PM2 cluster of `n` workers = `n` broadcasters = `n×` dashboard load.

---

## 6. Process management — Forge daemon

Forge → Server → Daemons → New:

| Field | Value |
|---|---|
| Command | `node .next/standalone/server.js` |
| User | `forge` |
| Directory | `/home/forge/<your-domain>` |
| Processes | `1` (do not increase) |
| Start Seconds | `5` |
| Stop Wait Seconds | `10` |
| Stop Signal | `SIGTERM` |
| Restart on Reboot | yes |

Forge wraps this in supervisord. The daemon name in supervisorctl is shown in the Forge UI — use that exact name in the deploy-script `supervisorctl restart` line.

Verify after creation:

```bash
sudo supervisorctl status | grep flowstack-landing
```

Expected: `RUNNING pid <N>, uptime <duration>`.

---

## 7. Environment variables

Forge → Site → Environment. Paste:

```env
NODE_ENV=production
HOSTNAME=0.0.0.0
PORT=3000

# Public-facing — set to the real domain. Cascades into sitemap,
# robots.txt, canonicals, JSON-LD, OG image URLs.
NEXT_PUBLIC_SITE_URL=https://[your-domain]

# Dashboard linkage.
#   DASHBOARD_API_URL is SERVER-ONLY (broadcaster uses it).
#   NEXT_PUBLIC_DASHBOARD_URL is the visitor-facing login/register URL.
DASHBOARD_API_URL=http://127.0.0.1:8000
NEXT_PUBLIC_DASHBOARD_URL=https://[dashboard-domain]
```

### Notes per var

- **`NODE_ENV=production`** — Next.js otherwise emits dev-mode warnings into the rendered HTML.
- **`HOSTNAME=0.0.0.0`** — bind to all interfaces so Nginx on the same box can reach it. `localhost`-only binding also works.
- **`PORT=3000`** — must match the `proxy_pass` in Nginx (§8).
- **`NEXT_PUBLIC_SITE_URL`** — without this every absolute URL on the site (canonical, OG image, sitemap) renders as `flowstack.example`. The single most-leveraged var on launch day.
- **`DASHBOARD_API_URL`** — server-only, no `NEXT_PUBLIC_` prefix. The broadcaster fetches it every 5s.
- **`NEXT_PUBLIC_DASHBOARD_URL`** — what visitor "Login" / "Try it for $99" buttons point at. Usually the same host as the dashboard.

---

## 8. Nginx config — required tweaks

Forge → Site → Files → Edit Nginx Configuration. Replace the default `location /` block (and add the two extra `location` blocks) so the file's `server` block contains:

```nginx
# Default proxy for everything except SSE and static
location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}

# CRITICAL — SSE stream. Buffering MUST be off; default Nginx will
# accumulate ~4 KB of events before flushing, defeating "live".
location /api/stats/stream {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header Connection "";
    proxy_buffering off;
    proxy_cache off;
    chunked_transfer_encoding on;
    # Long-lived connection — don't kill SSE at 60s default.
    proxy_read_timeout 24h;
    proxy_send_timeout 24h;
}

# Long-cache Next's hashed static assets — immutable per build.
location /_next/static/ {
    proxy_pass http://127.0.0.1:3000;
    proxy_cache_valid 200 365d;
    add_header Cache-Control "public, max-age=31536000, immutable";
}
```

Reload Nginx (Forge → Server → Manage Nginx → Restart, or via SSH `sudo nginx -t && sudo systemctl reload nginx`).

The SSE block is the one Forge users miss most often. Symptom of forgetting it: visitors see the SSR-rendered fallback values forever; the dashboard never pushes anything new.

---

## 9. Domain + SSL

1. Add the domain in Forge → Site → Domains.
2. Add a DNS A record at your registrar: `@` → server IP. For root-domain handling with apex CNAMEs, use `ALIAS` or `ANAME` if your registrar supports it (Cloudflare, DNSimple, route53 do).
3. Wait for DNS to propagate (~5–30 min for fresh records, up to 48h if changing existing ones).
4. Forge → Site → SSL → **Let's Encrypt** → Obtain Certificate. One-click; auto-renews every 60 days.
5. Force HTTPS: Forge → Site → SSL → check "Activate Certificate" + Nginx redirects `http://` → `https://`.

---

## 10. Post-deploy verification

From your laptop, not the server:

```bash
# Site responds, not Forge default
curl -sI https://[your-domain]/ | head -1

# Sitemap + robots resolve and point at the real domain
curl -s https://[your-domain]/sitemap.xml | grep -oE 'https?://[^<]+' | head
curl -s https://[your-domain]/robots.txt

# OG image renders (1200×630 PNG)
curl -sI https://[your-domain]/opengraph-image | grep -E 'content-type|content-length'

# SSE: connect, expect immediate `data: {...}` then idle
curl -N --max-time 8 https://[your-domain]/api/stats/stream | head -2

# JSON-LD validates: paste URL into
#   https://search.google.com/test/rich-results

# Single-EventSource collapse working:
#   open DevTools → Network → filter "stream" → reload homepage.
#   Expect exactly 1 EventSource connection per tab, not 7.
```

---

## 11. Rollback

If a deploy breaks production:

```bash
# SSH to the server
cd /home/forge/<your-domain>

# Find the previous good commit
git log --oneline -5

# Reset to it
git reset --hard <previous-commit-sha>

# Rebuild + reload
pnpm install --frozen-lockfile
pnpm build
rsync -a --delete public/ .next/standalone/public/
rsync -a --delete .next/static/ .next/standalone/.next/static/
sudo supervisorctl restart flowstack-landing
```

For very fast rollback without rebuilding, keep the previous `.next/standalone/` directory around (rename to `.next/standalone-prev/`) before each deploy, and swap directories on rollback. The deploy script can be extended to do this automatically — leaving it manual for now to keep the script reviewable.

---

## 12. Troubleshooting

### "Live stats don't update on the production site"
- Open `/api/stats/stream` directly in a browser tab. You should see `data: {...}` events. If nothing, check Nginx §8 — `proxy_buffering off` is missing.
- Check the daemon log for connection errors to the dashboard. If `DASHBOARD_API_URL` is wrong, the broadcaster silently falls back to FALLBACK and nothing changes ever.
- Verify the dashboard's `/api/public/stats` is reachable from the landing's box: `curl http://127.0.0.1:8000/api/public/stats` from SSH.

### "Site shows old version after deploy"
- Forge deploy log: did the script succeed? (Forge → Site → Deployments → click the deploy)
- Did supervisorctl restart actually fire? `sudo supervisorctl status flowstack-landing` should show recent uptime, not days.
- Is your CDN (Cloudflare etc.) caching HTML? Purge.

### "Build OOMs on a 1 GB droplet"
- Next builds with Turbopack are usually under 700 MB but legacy webpack-style builds can spike. Either upgrade to 2 GB, or add swap on the deploy server: `sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile`.

### "/_next/static/ assets return 404 after deploy"
- The rsync step in the deploy script didn't run. Check `.next/standalone/.next/static/` exists on the server.

### "Singleton seems to break randomly"
- Check that only one process is running: `pgrep -af 'standalone/server.js' | wc -l` should return `1`.
- If you switched to PM2 cluster mode without realising, set `instances: 1`.

### "Deploy hook fires but nothing changes"
- Forge deploy script runs as `forge` user. The `supervisorctl restart` needs sudo — Forge has passwordless sudo for `supervisorctl` by default, but if you've hardened the box, add `forge ALL=(ALL) NOPASSWD: /usr/bin/supervisorctl` to `/etc/sudoers.d/forge`.

---

## 13. Scaling notes

The current shape (one process, one box, one broadcaster) handles a lot:

- Static prerender + ISR: every page except `/api/stats/stream` is cached / generated at build time.
- SSE: tested up to ~200 concurrent connections per Node process without breaking a sweat on 2 GB RAM.
- Dashboard load: 1 fetch per 5 s regardless of visitor count — that's the whole point.

If you outgrow one box:

1. **Vertical first.** A 4 GB / 2 vCPU droplet handles ~1000 concurrent SSE viewers comfortably.
2. **Don't add Node workers on the same box** — that breaks the singleton.
3. **Don't shard horizontally** without switching the broadcaster to a Redis pub/sub or short-interval client polling (see the dashboard's `docs/architecture/landing-sse-pipeline.md` for the fallback design).
4. **CDN in front for static** — Cloudflare or similar in proxy mode caches `/_next/static/` and the OG image. Make sure SSE is excluded from CDN buffering (Cloudflare auto-detects `Content-Type: text/event-stream`).

End of guide.
