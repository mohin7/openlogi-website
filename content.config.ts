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
        // Controls sidebar position; lower sorts first.
        order: z.number().default(100),
        icon: z.string().optional(),
      }),
    }),
  },
})
