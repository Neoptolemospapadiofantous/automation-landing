#!/usr/bin/env bash
# Deploy the edge BRB worker + routes to the flowstack.run zone.
#
# Auth: CLOUDFLARE_API_TOKEN env var, or a token in ~/.cloudflare-token.
# Needs: Zone:Read + Workers Routes:Edit on flowstack.run, and Account
# Workers Scripts:Edit. Idempotent — safe to re-run.
set -euo pipefail

TOKEN="${CLOUDFLARE_API_TOKEN:-$(cat ~/.cloudflare-token 2>/dev/null || true)}"
[ -n "$TOKEN" ] || { echo "no token: set CLOUDFLARE_API_TOKEN or ~/.cloudflare-token" >&2; exit 1; }

API="https://api.cloudflare.com/client/v4"
HERE="$(cd "$(dirname "$0")" && pwd)"
REPO="$(cd "$HERE/../.." && pwd)"
SCRIPT_NAME="flowstack-edge-brb"

cf() { curl -sS --max-time 30 -H "Authorization: Bearer $TOKEN" "$@"; }

ZONE_JSON=$(cf "$API/zones?name=flowstack.run")
ZONE_ID=$(echo "$ZONE_JSON" | python3 -c "import json,sys; r=json.load(sys.stdin)['result']; print(r[0]['id'] if r else '')")
ACCOUNT_ID=$(echo "$ZONE_JSON" | python3 -c "import json,sys; r=json.load(sys.stdin)['result']; print(r[0]['account']['id'] if r else '')")
[ -n "$ZONE_ID" ] || { echo "token cannot see the flowstack.run zone" >&2; exit 1; }
echo "zone: $ZONE_ID  account: $ACCOUNT_ID"

# Build worker.js: inject public/brb.html into the template as a JS string.
python3 - "$REPO/public/brb.html" "$HERE/worker.template.js" "$HERE/worker.js" <<'PYEOF'
import json, sys
brb, template, out = sys.argv[1:4]
with open(brb) as f: html = f.read()
with open(template) as f: tpl = f.read()
with open(out, "w") as f: f.write(tpl.replace("__BRB_HTML__", json.dumps(html), 1))
print("worker.js built")
PYEOF

# Upload the module worker.
UPLOAD=$(cf -X PUT "$API/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME" \
  -F "metadata={\"main_module\": \"worker.js\", \"compatibility_date\": \"2026-01-01\"};type=application/json" \
  -F "worker.js=@$HERE/worker.js;type=application/javascript+module")
echo "$UPLOAD" | python3 -c "import json,sys; d=json.load(sys.stdin); print('upload ok:', d['success']) if d.get('success') else (print(json.dumps(d['errors'])), exit(1))"

# Routes (www + apex + app; never ws.). Skip patterns that already exist.
EXISTING=$(cf "$API/zones/$ZONE_ID/workers/routes")
for PATTERN in "www.flowstack.run/*" "flowstack.run/*" "app.flowstack.run/*"; do
  if echo "$EXISTING" | python3 -c "import json,sys; r=json.load(sys.stdin)['result'] or []; exit(0 if any(x['pattern']=='$PATTERN' for x in r) else 1)"; then
    echo "route exists: $PATTERN"
  else
    cf -X POST "$API/zones/$ZONE_ID/workers/routes" \
      -H "Content-Type: application/json" \
      -d "{\"pattern\": \"$PATTERN\", \"script\": \"$SCRIPT_NAME\"}" \
      | python3 -c "import json,sys; d=json.load(sys.stdin); print('route created: $PATTERN' if d.get('success') else json.dumps(d['errors']))"
  fi
done
echo "done — verify: curl -s https://www.flowstack.run/robots.txt (should be 200, untouched)"
