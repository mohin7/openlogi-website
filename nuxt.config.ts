import tailwindcss from '@tailwindcss/vite'

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

  // @nuxtjs/seo generates the OG images; this is the shared component.
  ogImage: {
    defaults: { component: 'Default' },
  },

  content: {
    build: {
      markdown: {
        toc: { depth: 3, searchDepth: 3 },
        highlight: {
          theme: { default: 'github-dark-dimmed' },
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
      htmlAttrs: { lang: 'en', class: 'dark' },
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },

  future: { compatibilityVersion: 4 },
})
