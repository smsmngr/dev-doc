// SmsManager docs — Cloudflare Worker add-on: <html lang> + cross-domain hreflang
// Mintlify has no native hreflang for two separate single-language projects, so we
// inject it at the edge. Deploy ONE per domain; flip the CONFIG block per domain.
//
//   smsmanager.cz/docs  -> LANG="cs"
//   smsmanager.com/docs -> LANG="en"
//
// Wrap this around your EXISTING /docs proxy: fetch the Mintlify origin as you do
// today, then pass the HTML response through injectSeo().

// ---- CONFIG (per domain) ----
const LANG = "cs";                         // "cs" on .cz, "en" on .com
const BASE = "/docs";                       // subpath where docs are hosted
const CZ  = "https://smsmanager.cz/docs";
const COM = "https://smsmanager.com/docs";
const XDEFAULT = COM;                       // x-default target (international/EN)

// Paths (relative to /docs, no leading/trailing slash; "" = home) that exist in
// BOTH languages. hreflang is injected only for these to avoid pointing at 404s.
// Auto-generated OpenAPI endpoint pages are intentionally excluded (their slugs
// are localized and differ per language).
const SHARED = new Set([
  "",
  "api-reference/http-api/send",
  "api-reference/json-v2/overview",
  "api-reference/json-v2/sent-message-webhook",
  "api-reference/json-v2/webhooks",
  "api-reference/rest/overview",
  "api-reference/verify/overview",
  "api-reference/waba/overview",
  "api-reference/xml-api/send",
  "authentication",
  "concepts/channels",
  "concepts/message-flow",
  "concepts/message-ids",
  "concepts/phone-normalization",
  "concepts/scheduling",
  "guides/batch-sending",
  "guides/phone-verification",
  "guides/send-sms",
  "guides/send-viber",
  "guides/send-whatsapp",
  "guides/webhooks",
  "introduction",
  "quickstart",
  "reference/errors",
  "reference/phone-numbers",
  "reference/rate-limits"
]);

function injectSeo(response, url) {
  const ct = response.headers.get("content-type") || "";
  if (!ct.includes("text/html")) return response;

  let path = url.pathname;
  if (path.startsWith(BASE)) path = path.slice(BASE.length);
  path = path.replace(/^\/+/, "").replace(/\/+$/, "");   // normalize

  const rw = new HTMLRewriter().on("html", {
    element(e) { e.setAttribute("lang", LANG); }
  });

  if (SHARED.has(path)) {
    const suffix = path ? "/" + path : "";
    const cz = CZ + suffix, com = COM + suffix, xd = XDEFAULT + suffix;
    rw.on("head", {
      element(e) {
        e.append(`<link rel="alternate" hreflang="cs" href="${cz}" />`, { html: true });
        e.append(`<link rel="alternate" hreflang="en" href="${com}" />`, { html: true });
        e.append(`<link rel="alternate" hreflang="x-default" href="${xd}" />`, { html: true });
      }
    });
  }
  return rw.transform(response);
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    // TODO: replace with your existing Mintlify-origin proxy fetch:
    const response = await fetch(request);
    return injectSeo(response, url);
  }
};
