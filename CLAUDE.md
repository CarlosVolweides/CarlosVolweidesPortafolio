# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server at localhost:4321
npm run build    # build → dist/ + .vercel/output/
npm run preview  # preview the built dist/
```

## Architecture

Astro 6 + TypeScript + Tailwind CSS 4 + React (islands only).

`output: 'server'` with the Vercel adapter, but **every page except `/` sets `export const prerender = true`** — the site is effectively static. `/` is server-rendered on purpose (see i18n below).

```
src/
├── components/
│   ├── Header.astro      — fixed topbar with scroll-spy nav + LangToggle
│   ├── LangToggle.astro  — ES|EN switch; writes the `lang` cookie on click
│   ├── Footer.astro
│   ├── ContactForm.astro
│   ├── CmdK.tsx          — React island (client:load); Cmd+K palette
│   ├── ProjectCard.astro — one project row; shared by HomePage and ProjectsPage
│   ├── MediaSlot.astro   — project media: image, video, or scroll-snap carousel
│   ├── HomePage.astro    — the whole one-pager, takes a `lang` prop
│   ├── ProjectsPage.astro
│   └── ProjectPage.astro
├── i18n/
│   ├── ui.ts             — es/en/pt dictionaries + SECTIONS (ids ↔ label keys)
│   ├── visuals.ts        — per-project ASCII art + asciiCols()
│   └── utils.ts          — useTranslations, localizePath, getProjects, getCmdkItems
├── content/
│   └── projects/{es,en,pt}/ — one .md per project per locale (same slugs)
├── content.config.ts     — Content Collection schema (glob loader)
├── layouts/
│   └── BaseLayout.astro  — <head>: SEO, hreflang, og:locale, JSON-LD, fonts
├── middleware.ts         — first-visit locale detection
├── pages/
│   ├── index.astro                — prerender = false (see i18n)
│   ├── projects/{index,[slug]}.astro
│   ├── en/index.astro
│   ├── en/projects/{index,[slug]}.astro
│   ├── pt/index.astro
│   ├── pt/projects/{index,[slug]}.astro
│   └── api/contact.ts             — prerender = false
└── styles/
    └── global.css        — CSS vars design system + all component styles
```

Pages are thin wrappers: they set `lang` and render the matching `*Page.astro` component. Adding a locale means adding a dictionary in `i18n/ui.ts`, a content folder, and a page wrapper.

## i18n

Spanish is the default locale and lives at the root (`/`, `/projects`, `/projects/<slug>`). English lives under `/en`, Brazilian Portuguese under `/pt`. Configured via Astro's native `i18n` block with `prefixDefaultLocale: false`.

Nothing is hardcoded to two locales: `LOCALES` in `src/i18n/ui.ts` drives the `LangToggle`, the `hreflang` block and `og:locale:alternate` in `BaseLayout`, and `alternatePaths()` in `src/i18n/utils.ts`.

**All user-facing copy lives in `src/i18n/ui.ts`.** `es` is the source of truth for the shape — `en` and `pt` are typed as `Dict`, so a missing key fails the build. Never hardcode a string in a component.

Things that are deliberately **not** translated: `STACK[].items` (they double as `STACK_ICONS` keys), section ids (`home`/`about`/`stack`/`work`/`projects`/`contact`), the `status` enum, and the ASCII art in `src/i18n/visuals.ts` (hand-tuned column widths).

Client-side code can't read Astro frontmatter, so strings are injected: `<script define:vars={{ i18n }}>` in `ContactForm.astro` and `HomePage.astro`, and props for the `CmdK` island (`getCmdkItems(lang)`).

### Why `/` is server-rendered

Vercel serves prerendered files straight off the filesystem — its route config puts `{"handle": "filesystem"}` ahead of every middleware route. A static `/` would therefore **never reach `src/middleware.ts`**, and locale detection would silently no-op in production while working fine in `npm run dev`. Setting `prerender = false` on `src/pages/index.astro` is what puts `/` behind the middleware. Don't "optimize" it back to static without replacing the detection mechanism.

Detection order (first visit only, `/` only): `lang` cookie → `Accept-Language` → `x-vercel-ip-country`. The IP country maps through `langFromCountry()` in `src/middleware.ts`: `ES_COUNTRIES` → `es`, `PT_COUNTRIES` (BR, PT, AO, MZ, …) → `pt`, everything else → `en`. Redirects are 302 with `Vary`, and known crawler user-agents are skipped so every locale gets indexed. A manual `LangToggle` click writes the cookie, which outranks detection from then on.

`x-vercel-ip-country` only exists on Vercel's edge, so geo detection is a no-op in `npm run dev` — `Accept-Language` is what you'll be testing locally.

## Content

**Portfolio copy** (bio, experience, stack): `src/i18n/ui.ts`. `STACK` and `STACK_ICONS` are at the top of `src/components/HomePage.astro`; the per-project ASCII art lives in `src/i18n/visuals.ts`.

**To add/edit a project**: edit `src/content/projects/<lang>/<slug>.md` — the same slug must exist in **every** locale folder (`es/`, `en/`, `pt/`). Fields are defined in `src/content.config.ts`. The `idx` field controls sort order and display numbering.

`getProjects(lang)` (in `src/i18n/utils.ts`) filters the collection by the locale prefix in the entry `id` and exposes a clean `slug`. Always use it — a bare `getCollection('projects')` returns every file across every locale and inflates the project counter.

## Contact form

`src/pages/api/contact.ts` is language-agnostic: it answers with a machine-readable `{ code }` (e.g. `EMAIL_INVALID`), never prose. The copy for each code lives under `form.errors` in `src/i18n/ui.ts` and is resolved client-side. The notification email itself stays in Spanish — it goes to Carlos, not the visitor.

## Design system

All colors and spacing live in CSS custom properties in `src/styles/global.css`:

- `--accent` — oklch cyan (default `oklch(0.78 0.12 175)`)
- `--fg`, `--fg-mute`, `--fg-dim` — foreground hierarchy
- `--bg`, `--bg-elev`, `--bg-card` — background hierarchy
- `--line`, `--line-strong` — borders
- `--mono`, `--sans` — Geist Mono / Geist (Google Fonts)
- `--pad` — horizontal section padding (`6rem` desktop, `1.5rem` mobile)

### Global scale

**Every size is authored in `rem`, so `html { font-size }` is the single knob that scales the whole site.** 16px = 1×, 24px = 1.5×. It ramps fluidly from 16px at a 900px viewport to 24px at 1350px and above.

It deliberately stays at 16px below 900px: `@media` breakpoints are in *viewport* px and do **not** respond to the root font-size, so scaling up there would blow out the mobile layout without the breakpoints moving with it.

Things that stay in `px` on purpose: border widths, the `gap: 1px` hairlines in `.stack-grid`/`.projects-stack`/`.contact-grid`, `@media` breakpoints, the `.bg-grid` pattern, and `blur()` radii.

The `vw` terms inside `clamp()` (e.g. `.hero h1`) must **not** be converted — `vw` is already viewport-relative and scaling it would double-count.

## Interactivity

- **Scroll spy** (`Header.astro`) and **reveal animation** (`class="reveal"` → `class="reveal in"`) are vanilla JS `<script>` blocks. Scroll spy keys off section ids, so it is locale-independent.
- **Local time** (Caracas VET) is a vanilla JS interval in `HomePage.astro`, formatted with the active locale.
- **CmdK** is the only React island. It receives fully localized `items` and `labels` as props.

## AI-friendly files

- `public/llms.txt` — plain-text description of the site and author for LLM crawlers
- `public/robots.txt` — explicit allow for GPTBot, anthropic-ai, Claude-Web
- JSON-LD `Person` schema is inlined in `BaseLayout.astro`
- Sitemap auto-generated by `@astrojs/sitemap` with `xhtml:link` alternates → `dist/client/sitemap-index.xml`

## Deploy

Vercel. Push to `main` → auto-deploy.
Update `site` in `astro.config.mjs` if the domain changes — `robots.txt` and the JSON-LD `url` derive from it.
