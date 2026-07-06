# =============================================================================
# Flowstack landing — Forge deploy script
# =============================================================================
# Copy everything below the line into:
#   Forge → site (flowstack.run) → Deployments → Deploy Script → Edit
# Save → Deploy Now.
#
# Differences from the previous (npm) script:
#   - Replaces `npm ci || npm install` with `pnpm install --frozen-lockfile`.
#   - Replaces `npm run build` with `pnpm build`.
#   - Adds a one-time `npm i -g pnpm` bootstrap (no-op after first install).
#   - Pins PM2 to `instances: 1` (was `"max"`): the SSE stats broadcaster in
#     src/lib/stats-broadcaster.ts is a per-process module singleton, so each
#     cluster worker would poll the dashboard independently (~N req/5s). One
#     instance keeps it a true singleton — ~1 request/5s regardless of traffic.
#   - Writes the PM2 config on EVERY deploy (was: only if the file was missing)
#     and does delete+start rather than reload, so runtime changes like the
#     instance count actually converge — `pm2 reload` won't scale workers down.
#   - PM2 daemon ID, paths, port unchanged.
#
# This file is local-only for reference; the source of truth is the Forge UI.
# Consider committing it later if you want it tracked.
# =============================================================================


$CREATE_RELEASE()

cd $FORGE_RELEASE_DIRECTORY

# Ensure pnpm is available on the Forge box. No-op after the first deploy.
if ! command -v pnpm &> /dev/null; then
  npm i -g pnpm
fi

pnpm install --frozen-lockfile
pnpm build

$ACTIVATE_RELEASE()

# Write the PM2 config on every deploy so runtime settings (e.g. instances)
# stay in sync with this script — no `if [ ! -f ]` guard, which would otherwise
# pin the box to whatever config was written on the first-ever deploy.
mkdir -p /home/forge/.pm2-conf
cat <<'EOF' > /home/forge/.pm2-conf/site-3238855.json
{
    name: "site-3238855",
    cwd: "/home/forge/flowstack.run/current",
    script: "./node_modules/next/dist/bin/next",
    args: "start --hostname 0.0.0.0 --port 3000",
    instances: 1,
    exec_mode: "cluster",
}
EOF

# delete+start (not reload): reload is graceful but won't change the cluster
# instance count, so a max->1 change would otherwise never take effect. The
# `|| true` covers the first deploy when the process doesn't exist yet.
pm2 delete site-3238855 2> /dev/null || true
pm2 start /home/forge/.pm2-conf/site-3238855.json --update-env
pm2 save
