# SmsManager Developer Docs

Source of the **SmsManager developer documentation** — the docs published at
**[developers.smsmanager.com](https://developers.smsmanager.com)** and built with
[Mintlify](https://mintlify.com). The docs are **bilingual**: **Czech (primary)**
and **English**.

If you just want to *read* the docs, go to the live site. This repo is for
**editing** them.

## What's documented

The SmsManager messaging platform (SMS, Viber, WhatsApp) and its four APIs:

- **JSON API v2** — the main send API (`https://api.smsmngr.com/v2`)
- **REST API** — account, API keys, credit, message status, inbox
- **Verify API** — one-time-code phone verification
- **WhatsApp Partner API** — programmatic WABA onboarding

Plus getting-started tutorials, how-to guides, and core-concept explanations.

## Repository structure

```
docs.json              # site config + navigation (languages, tabs, groups, OpenAPI refs)
index.mdx              # root landing
style.css              # custom CSS (auto-loaded): dark developer-portal header, etc.
fonts/                 # self-hosted GothamRounded heading font
cs/                    # 🇨🇿 Czech pages (primary language) — served at the root URL
en/                    # 🇬🇧 English pages — served under /en
  ├─ index, introduction, quickstart, authentication
  ├─ concepts/         # channels, message-flow, message-ids, scheduling, …
  ├─ guides/           # send-sms, send-whatsapp, whatsapp-sms-fallback, webhooks, …
  ├─ reference/        # errors, rate-limits, phone-numbers
  └─ api-reference/    # per-API overview pages
openapi/{cs,en}/       # OpenAPI specs that power the auto-generated API reference
  ├─ json/  rest/  verify/  waba_rest/
```

### How content is organized

Navigation follows the [Diátaxis](https://diataxis.fr) model — one tab per
content type, per language:

| Czech (default) | English | Type |
|---|---|---|
| **Začínáme** | **Get started** | Tutorials |
| **Návody** | **Guides** | How-to |
| **API reference** | **API reference** | Reference (generated from `openapi/`) |
| **Koncepty** | **Concepts** | Explanation |

Every content page is exactly one type. Reference is generated from the OpenAPI
specs — don't hand-write endpoint docs; edit the spec in `openapi/`.

## Local preview

Install the [Mintlify CLI](https://www.npmjs.com/package/mint) and run it where
`docs.json` lives (the repo root):

```bash
npm i -g mint
mint dev            # → http://localhost:3000
```

## Editing

- **Pages** are MDX under `cs/` and `en/`. Edit the matching file in **both**
  languages (Czech is the source of truth; keep English in sync).
- **Navigation** (which pages appear, in what order/tab/group) lives in
  `docs.json` under `navigation.languages[]`.
- **API reference** comes from `openapi/<lang>/…` — change the spec, not a page.
- **Look & feel**: brand color and heading font are in `docs.json`; further
  tweaks (e.g. the dark header) are in `style.css`.
- Use the demo number `+420777123456` and the literal `YOUR_API_KEY` placeholder
  in examples — never commit a real key.

## Publishing

Pushing to the **`main`** branch auto-deploys to production via the Mintlify
GitHub App (installed on the `smsmngr` organization). Open a PR for review, or
push to `main` to ship.

## Related

- **Live docs:** https://developers.smsmanager.com
- **Code examples:** [`smsmngr/dev-examples`](https://github.com/smsmngr/dev-examples)
- **API dashboard / keys:** https://app.smsmanager.com/app/developers/apikeys
