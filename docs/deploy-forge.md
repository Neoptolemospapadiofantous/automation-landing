# Deploy: Laravel Forge

How the Flowstack landing site is deployed on Laravel Forge: one long-lived Node process behind Nginx, one process per box.

---

## 1. Why Forge is the right shape

The site is fully prerendered (static + ISR) and holds no per-visitor server state, so nothing here is exotic — Forge is used because the whole Flowstack stack already lives on this box and deploys are CI-built artifacts rsynced into a release directory (see `.github/workflows/deploy.yml`).

The live-stats SSE pipeline that used to force a persistent single-process host was removed 2026-08-01, so a serverless host is no longer architecturally excluded. It is still not worth moving: the deploy path, the BRB error page, and the ops panel all assume this box.

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
| Time zone | UTC (so log timestamps line up across the fleet) |

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

**Caveat with PM2 cluster mode**: keep `instances: 1`. The box is 961 MB / 1 vCPU and every page is prerendered, so extra workers only compete for memory.

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

# Dashboard linkage — visitor-facing login/register URL.
NEXT_PUBLIC_DASHBOARD_URL=https://[dashboard-domain]
```

### Notes per var

- **`NODE_ENV=production`** — Next.js otherwise emits dev-mode warnings into the rendered HTML.
- **`HOSTNAME=0.0.0.0`** — bind to all interfaces so Nginx on the same box can reach it. `localhost`-only binding also works.
- **`PORT=3000`** — must match the `proxy_pass` in Nginx (§8).
- **`NEXT_PUBLIC_SITE_URL`** — without this every absolute URL on the site (canonical, OG image, sitemap) renders as `flowstack.example`. The single most-leveraged var on launch day.
- **`NEXT_PUBLIC_DASHBOARD_URL`** — what visitor "Login" / "Try it for €99" buttons point at. Usually the same host as the dashboard.

---

## 8. Nginx config — required tweaks

Forge → Site → Files → Edit Nginx Configuration. Replace the default `location /` block (and add the static-asset block) so the file's `server` block contains:

```nginx
# Default proxy for everything except static assets
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

# Long-cache Next's hashed static assets — immutable per build.
location /_next/static/ {
    proxy_pass http://127.0.0.1:3000;
    proxy_cache_valid 200 365d;
    add_header Cache-Control "public, max-age=31536000, immutable";
}
```

Reload Nginx (Forge → Server → Manage Nginx → Restart, or via SSH `sudo nginx -t && sudo systemctl reload nginx`).

The live site also carries an `error_page 502 503 504 =503 /brb.html` block so a dead or hung Node process serves the branded offline card instead of a Cloudflare error — keep it when editing this file.

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

# JSON-LD validates: paste URL into
#   https://search.google.com/test/rich-results
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

The current shape (one process, one box) handles a lot:

- Static prerender + ISR: every page is cached / generated at build time, so serving is close to static-file cost.
- No per-visitor server state and no outbound calls at request time — nothing fans out with traffic.

If you outgrow one box:

1. **Vertical first.** A 4 GB / 2 vCPU droplet has plenty of headroom, and gives the CI-built deploy room to breathe.
2. **CDN in front for static** — Cloudflare or similar in proxy mode caches `/_next/static/` and the OG image.

End of guide.
