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
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
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
