# OpenLogi — website

Marketing site and documentation for [OpenLogi](https://github.com/mohin7/openlogi),
a Linux alternative to Logitech Options+.

Live at **[openlogi.uxatom.com](https://openlogi.uxatom.com)**.

This is a **separate project from the application** on purpose: the site ships
on its own cadence, to static hosting, and needs no Rust toolchain.

## Stack

| Piece | Choice |
| --- | --- |
| Framework | Nuxt 4 |
| Styling | Tailwind CSS v4 (configured in CSS, not JS) |
| Content | Nuxt Content 3, Markdown under `content/` |
| SEO | `@nuxtjs/seo` — sitemap, robots, OG images, schema.org |
| Output | Fully prerendered static HTML |
| Hosting | Cloudflare Pages |

## Development

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

The pnpm version is pinned in `package.json` (`packageManager`). It is not
cosmetic: `pnpm-workspace.yaml` uses `allowBuilds`, which pnpm 10 does not
understand — it fails with `packages field missing or empty`. Let corepack
honour the pin rather than running an older pnpm.

## Build

```bash
pnpm build        # or: pnpm generate — they are the same command
pnpm preview
```

`build` is deliberately aliased to `nuxt generate`. The site is fully static,
and `nuxt build` would make Nitro target a Cloudflare *Worker* instead, which
fails trying to bundle a runtime OG-image renderer that a prerendered site
never needs.

**The output directory depends on the preset**, which trips people up:

| Where | Preset | Output |
| --- | --- | --- |
| Local | `static` | `.output/public` |
| Cloudflare | `cloudflare-pages` | `dist` |

Nitro picks the preset from the environment, so the same command writes to a
different place on CI than it does on your machine. Point the host at `dist`.

## Deployment

Cloudflare **Pages** — not Workers. A Workers project runs `npx wrangler
deploy`, which looks for a server entry at `.output/server/index.mjs`; a static
build never produces one, so the deploy fails after a successful build.

| Setting | Value |
| --- | --- |
| Build command | `pnpm run build` |
| Build output directory | `dist` |
| Deploy command | *none — Pages has no such step* |

The canonical URL lives in `nuxt.config.ts` (`site.url`). Sitemap, robots and
OG image URLs are all derived from it, so a stale value silently tells search
engines to index a domain the site is not served from.

## Layout

```
app/
  assets/css/main.css     design tokens — both palettes live here
  components/             UI and landing-page sections
  components/content/     components usable from Markdown (::callout)
  components/OgImage/     social card template
  composables/            scroll reveal, theme switching
  pages/                  index, download, devices, docs/[...slug]
  utils/site.ts           shared copy: nav, features, FAQ, install targets
content/docs/             the documentation, as Markdown
```

### Editing content

**Copy that appears on more than one page** — navigation, features, the FAQ,
install commands — lives in `app/utils/site.ts`. Change it there once.

**The released version** is the `version` export at the top of that file. It
must match `version` in the application's `apps/desktop/src-tauri/
tauri.conf.json`: the download filenames are derived from it, so a stale value
produces 404 links. The app's release workflow refuses to build when a tag and
that file disagree.

**Download targets** are `installTargets` in the same file. Each has a
`ready` flag — set it to `false` when a distro has no published package yet,
and the page shows the from-source route instead of a button that 404s.

**Documentation** is Markdown in `content/docs/`. The numeric filename prefix
sets sidebar order; `title` and `description` in the frontmatter are required
and validated at build time by `content.config.ts`.

### Theming

The site ships a dark and a light theme. Every colour is a token in
`app/assets/css/main.css`: the light palette is defined in `@theme` (Tailwind
needs the names at build time) and the dark one overrides the same names under
`.dark`. Components reference tokens only, so a palette change touches one file
and nothing else.

Two things are easy to break:

- **Never hardcode a colour** in a component — including SVG `stop-color` and
  shadow values. It will look wrong in one of the two themes.
- **The inline script in `nuxt.config.ts` must stay in `<head>`**, before the
  stylesheet. It applies the stored theme before first paint; move it later and
  light-theme visitors see the dark palette flash first.

Code highlighting ships both a light and a dark shiki theme, switched by the
same `.dark` class.

## Licence

GPL-3.0-or-later, matching the application.
