/**
 * Visitor-facing dashboard origin. Read from NEXT_PUBLIC_DASHBOARD_URL so
 * register / login / "start trial" links can target the Laravel app from
 * the browser. Distinct from DASHBOARD_API_URL (server-only, used by the
 * SSE poller and ISR fetch) — that value never reaches the client bundle.
 *
 * Production canonical: https://app.flowstack.run. Override locally via
 * NEXT_PUBLIC_DASHBOARD_URL=http://127.0.0.1:8000 in .env.local when you
 * want Login / Register buttons to hit your local `php artisan serve`.
 */
export const DASHBOARD_URL =
  process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "https://app.flowstack.run";

function join(base: string, path: string): string {
  const trimmedBase = base.replace(/\/$/, "");
  const normalisedPath = path.startsWith("/") ? path : `/${path}`;
  return `${trimmedBase}${normalisedPath}`;
}

export function dashboardUrl(path = "/"): string {
  return join(DASHBOARD_URL, path);
}

export const registerUrl = (): string => dashboardUrl("/register");
export const loginUrl = (): string => dashboardUrl("/login");
