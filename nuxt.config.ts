import { execFileSync } from 'node:child_process'
import { readdirSync } from 'node:fs'
import tailwindcss from '@tailwindcss/vite'

const buildTime = new Date().toISOString()

// Last commit that touched any of `paths`. Falls back to the build time when
// git has no answer — no .git directory, or a clone too shallow to know.
function lastCommit(...paths: string[]): string {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...paths], {
      encoding: 'utf8',
    }).trim()
    return out ? new Date(out).toISOString() : buildTime
  } catch {
    return buildTime
  }
}

// One sitemap entry per Markdown file, with the numeric sort prefix stripped
// the same way Nuxt Content strips it when it builds the page path.
function contentRoutes(dir: string, base: string) {
  return readdirSync(`content/${dir}`)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/^\d+\./, '').replace(/\.md$/, '')
      return {
        loc: slug === 'index' ? base : `${base}/${slug}`,
        lastmod: lastCommit(`content/${dir}/${file}`),
      }
    })
}

// The marketing site for OpenLogi. Deliberately a separate project from the
// app: it ships on its own cadence, to a CDN, with no Rust toolchain in sight.
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxt/content', '@nuxt/fonts', '@nuxt/icon', '@nuxtjs/seo'],

  css: ['~/assets/css/main.css'],

  // Tailwind v4 is configured in CSS, not JS — see assets/css/main.css.
  vite: {
    plugins: [tailwindcss()],
  },

  // The site is fully static: every route is known at build time, so we
  // prerender the lot and serve plain HTML. Nothing here needs a server.
  nitro: {
    prerender: {
      crawlLinks: true,
      // Write /devices.html, not /devices/index.html: Pages serves the first
      // at /devices, matching our canonical URLs and sitemap, and redirects
      // /devices/ to it. The default layout inverts that.
      autoSubfolderIndex: false,
      routes: ['/', '/docs', '/download', '/devices'],
    },
  },

  site: {
    url: 'https://openlogi.uxatom.com',
    name: 'OpenLogi',
    description:
      'Configure Logitech mice and keyboards natively on Linux. No proprietary software, no sudo, no cloud account.',
    defaultLocale: 'en',
  },

  // lastmod is the last commit to the files behind each page. Stamping every
  // URL with the build time instead tells crawlers everything changed on each
  // deploy, which teaches them to ignore the field.
  sitemap: {
    urls: [
      { loc: '/', lastmod: lastCommit('app/pages/index.vue', 'app/components', 'app/utils/site.ts') },
      { loc: '/download', lastmod: lastCommit('app/pages/download.vue', 'app/utils/site.ts') },
      { loc: '/devices', lastmod: lastCommit('app/pages/devices/index.vue', 'content/devices') },
      ...contentRoutes('docs', '/docs'),
      ...contentRoutes('devices', '/devices'),
    ],
  },

  // @nuxtjs/seo generates the OG images; this is the shared component.
  ogImage: {
    defaults: { component: 'Default' },
  },

  content: {
    build: {
      markdown: {
        toc: { depth: 3, searchDepth: 3 },
        highlight: {
          // Two themes: shiki emits the dark colours as CSS variables that
          // main.css switches under .dark, so code follows the page instead
          // of staying dark on a white background.
          theme: {
            default: 'github-light',
            dark: 'github-dark-dimmed',
          },
          langs: ['bash', 'rust', 'toml', 'json', 'ts', 'vue', 'ini', 'diff'],
        },
      },
    },
  },

  fonts: {
    families: [
      { name: 'Inter', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'JetBrains Mono', provider: 'google', weights: [400, 500] },
    ],
  },

  icon: {
    mode: 'svg',
    clientBundle: { scan: true },
  },

  app: {
    head: {
      // Prerendered as dark; the script below corrects it before first paint
      // for anyone who chose light or whose OS asks for it.
      htmlAttrs: { lang: 'en', class: 'dark' },
      link: [
        // The .ico is for clients that request /favicon.ico directly and
        // ignore <link> tags; browsers that read SVG prefer the second.
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      script: [
        {
          // Must run synchronously in <head>: any later and the dark palette
          // has already painted, which shows as a flash on a light-theme load.
          // Deliberately tiny and dependency-free for the same reason.
          innerHTML: `(function(){try{var s=localStorage.getItem('openlogi-theme');var d=s?s==='dark':!window.matchMedia('(prefers-color-scheme: light)').matches;document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light'}catch(e){}})()`,
          tagPosition: 'head',
        },
      ],
    },
  },

  future: { compatibilityVersion: 4 },
})
