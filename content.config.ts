import { defineCollection, defineContentConfig, z } from '@nuxt/content'

// Declaring the schema explicitly means a missing title or a mistyped `order`
// fails the build rather than rendering a broken docs sidebar in production.
export default defineContentConfig({
  collections: {
    docs: defineCollection({
      type: 'page',
      source: 'docs/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        // The <title> for search results, when the on-page heading is too
        // short to say what the page is for. Falls back to `title`.
        seoTitle: z.string().optional(),
        // Controls sidebar position; lower sorts first.
        order: z.number().default(100),
        icon: z.string().optional(),
      }),
    }),
    // Per-model guides under /devices/<slug>. Only models we can describe
    // truthfully get a page: what OpenLogi does on them today, and what not.
    devices: defineCollection({
      type: 'page',
      source: 'devices/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        seoTitle: z.string(),
        // Short label for cards on /devices, e.g. "MX Master 3S, 3, 2S".
        models: z.string(),
        // "measured": a capture from real hardware is in the app repo.
        status: z.enum(['measured', 'discovered']),
        order: z.number().default(100),
      }),
    }),
  },
})
