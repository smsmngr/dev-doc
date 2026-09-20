# SmsManager Developer Docs

Source of the **SmsManager developer documentation**, built with
[Mintlify](https://mintlify.com). The docs are **bilingual** and ship as **two
independent Mintlify projects**, each deployed under its own marketing domain:

| Project | Live at |
|---|---|
| `cs/` | **[smsmanager.cz/docs](https://smsmanager.cz/docs)** (Czech — primary) |
| `en/` | **[smsmanager.com/docs](https://smsmanager.com/docs)** (English) |

There is no root `docs.json`; each project is self-contained.

If you just want to *read* the docs, go to the live site. This repo is for
**editing** them.

## What's documented

The SmsManager messaging platform (SMS, Viber, WhatsApp) and its four APIs:

- **JSON API v2** — the main send API (`https://api.smsmngr.com/v2`)
- **REST API** — account, API keys, credit, message status, inbox
- **Verify API** — one-time-code phone verification
- **WhatsApp Partner API** — programmatic WABA onboarding

Plus getting-started tutorials, how-to guides, core-concept explanations, and
two pages for **AI assistants** (`ai/`): the
[skills catalog](https://github.com/smsmngr/smsmanager-skills) for coding
agents and the hosted [MCP server](https://github.com/smsmngr/smsmanager-mcp).

## Repository structure

`cs/` and `en/` are exact structural mirrors — one Mintlify project each:

```
cs/                      # 🇨🇿 Czech (primary)  → smsmanager.cz/docs
├─ docs.json             # config + navbar + footer + navigation + OpenAPI refs
├─ style.css             # custom CSS (auto-loaded): dark header, footer colours
├─ fonts/                # self-hosted GothamRounded heading font
├─ index, introduction, quickstart, authentication
├─ concepts/             # channels, message-flow, message-ids, scheduling, …
├─ guides/               # send-sms, send-whatsapp, whatsapp-sms-fallback, webhooks, …
├─ ai/                   # AI skills + MCP server (install + features)
├─ reference/            # errors, rate-limits, phone-numbers, …
├─ tutorials/
├─ api-reference/        # per-API overview pages
└─ openapi/              # specs that power the auto-generated API reference
   ├─ json/  rest/  verify/  waba_rest/
en/                      # 🇬🇧 English      → smsmanager.com/docs
└─ … identical structure …
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

Install the [Mintlify CLI](https://www.npmjs.com/package/mint) and run it from
**inside a language directory** — that is where `docs.json` lives. One language
at a time, or both at once on separate ports:

```bash
npm i -g mint
cd cs && mint dev                 # → http://localhost:3000
cd en && mint dev --port 3001     # → http://localhost:3001
```

`Error generating favicons` on startup is expected locally: the favicon is a
remote URL that the CLI cannot fetch. It does not affect the preview.

## Editing

- **Pages** are MDX under `cs/` and `en/`. Edit the matching file in **both**
  languages (Czech is the source of truth; keep English in sync).
- **Navigation** (which pages appear, in what order/tab/group) lives in each
  project's `docs.json` under `navigation.tabs[]`.
- **API reference** comes from `<lang>/openapi/…` — change the spec, not a page.
- **Header and footer** are `docs.json` too: `navbar.links` / `navbar.primary`
  for the header, and `footer.links` (marketing cross-links, max **4** columns)
  plus `footer.socials` for the footer. The Czech ↔ English switch is the last
  two items of the final footer column. Edit both projects.
- **Look & feel**: brand color and heading font are in `docs.json`; further
  tweaks (the dark header, footer colours) are in `style.css`. The two
  `style.css` files are byte-identical — keep them that way
  (`diff cs/style.css en/style.css`).
- Use the demo number `+420777123456` and the literal `YOUR_API_KEY` placeholder
  in examples — never commit a real key.

## Publishing

Pushing to the **`main`** branch auto-deploys to production via the Mintlify
GitHub App (installed on the `smsmngr` organization). Open a PR for review, or
push to `main` to ship.

## Related

- **Live docs:** https://smsmanager.cz/docs · https://smsmanager.com/docs
- **Code examples:** [`smsmngr/dev-examples`](https://github.com/smsmngr/dev-examples)
- **AI skills:** [`smsmngr/smsmanager-skills`](https://github.com/smsmngr/smsmanager-skills) · **MCP server:** [`smsmngr/smsmanager-mcp`](https://github.com/smsmngr/smsmanager-mcp)
- **API dashboard / keys:** https://app.smsmanager.com/app/developers/apikeys
