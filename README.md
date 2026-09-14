# OpenLogi — website

Marketing site and documentation for [OpenLogi](https://github.com/mohin7/openlogi),
a Linux alternative to Logitech Options+.

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

## Development

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## Build

```bash
pnpm generate     # static output in .output/public
pnpm preview
```

Every route is prerendered, so the result deploys to any static host — Vercel,
Netlify, Cloudflare Pages or a plain bucket. No server runtime required.

## Layout

```
app/
  assets/css/main.css     design tokens — the whole palette lives here
  components/             UI and landing-page sections
  components/content/     components usable from Markdown (::callout)
  components/OgImage/     social card template
  composables/            scroll reveal
  pages/                  index, download, devices, docs/[...slug]
  utils/site.ts           shared copy: nav, features, FAQ, install commands
content/docs/             the documentation, as Markdown
```

### Editing content

**Copy that appears on more than one page** — navigation, features, the FAQ,
install commands — lives in `app/utils/site.ts`. Change it there once.

**Documentation** is Markdown in `content/docs/`. The numeric filename prefix
sets sidebar order; `title` and `description` in the frontmatter are required
and validated at build time by `content.config.ts`.

**Colours** are defined once as tokens in `app/assets/css/main.css` under
`@theme`. Everything else references them, so the palette can be changed in one
place.

## Deployment

Set the canonical URL in `nuxt.config.ts` (`site.url`) before going live —
sitemap, robots and OG image URLs are all derived from it.

## Licence

GPL-3.0-or-later, matching the application.
