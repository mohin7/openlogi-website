<script setup lang="ts">
const route = useRoute()

// `/docs` and `/docs/installation` both resolve through this route; the
// collection stores the index page at `/docs`.
const path = computed(() => route.path.replace(/\/$/, '') || '/docs')

const { data: page } = await useAsyncData(`docs-${path.value}`, () =>
  queryCollection('docs').path(path.value).first(),
)

const { data: nav } = await useAsyncData('docs-nav', () =>
  queryCollection('docs')
    .order('order', 'ASC')
    .select('path', 'title', 'icon', 'order')
    .all(),
)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  })
}

// Previous/next links, driven by the same order as the sidebar.
const siblings = computed(() => {
  const items = nav.value ?? []
  const i = items.findIndex((n) => n.path === path.value)
  return {
    prev: i > 0 ? items[i - 1] : undefined,
    next: i >= 0 && i < items.length - 1 ? items[i + 1] : undefined,
  }
})

useSeoMeta({
  title: page.value.title,
  description: page.value.description,
  ogTitle: `${page.value.title} · OpenLogi docs`,
  ogDescription: page.value.description,
})

defineOgImageComponent('Default', {
  title: page.value.title,
  description: page.value.description,
})
</script>

<template>
  <div class="container-page py-12 md:py-16">
    <div class="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)_200px]">
      <!-- Sidebar -->
      <aside class="lg:sticky lg:top-24 lg:self-start">
        <DocsSidebar :links="nav ?? []" />
      </aside>

      <!-- Content -->
      <article class="min-w-0">
        <header class="mb-10 border-b border-line pb-8">
          <h1
            class="text-gradient text-3xl font-semibold tracking-[var(--tracking-display)] text-balance sm:text-4xl"
          >
            {{ page?.title }}
          </h1>
          <p class="mt-3 text-base text-pretty text-ink-2">
            {{ page?.description }}
          </p>
        </header>

        <div class="prose-docs">
          <ContentRenderer v-if="page" :value="page" />
        </div>

        <!-- Prev / next -->
        <nav
          class="mt-14 grid gap-3 border-t border-line pt-8 sm:grid-cols-2"
          aria-label="Pagination"
        >
          <NuxtLink
            v-if="siblings.prev"
            :to="siblings.prev.path"
            class="card group p-4 hover:border-line-strong hover:bg-surface-2"
          >
            <span
              class="flex items-center gap-1.5 text-[11px] text-ink-3"
            >
              <Icon name="lucide:arrow-left" class="size-3" />
              Previous
            </span>
            <span class="mt-1 block text-sm font-medium">
              {{ siblings.prev.title }}
            </span>
          </NuxtLink>
          <NuxtLink
            v-if="siblings.next"
            :to="siblings.next.path"
            class="card group p-4 text-right hover:border-line-strong hover:bg-surface-2 sm:col-start-2"
          >
            <span
              class="flex items-center justify-end gap-1.5 text-[11px] text-ink-3"
            >
              Next
              <Icon name="lucide:arrow-right" class="size-3" />
            </span>
            <span class="mt-1 block text-sm font-medium">
              {{ siblings.next.title }}
            </span>
          </NuxtLink>
        </nav>
      </article>

      <!-- On this page -->
      <aside class="hidden lg:sticky lg:top-24 lg:block lg:self-start">
        <p
          class="mb-3 font-mono text-[11px] tracking-[0.14em] text-ink-3 uppercase"
        >
          On this page
        </p>
        <ul class="space-y-2 border-l border-line">
          <li
            v-for="link in page?.body?.toc?.links ?? []"
            :key="link.id"
            :class="link.depth > 2 ? 'pl-6' : 'pl-3'"
          >
            <a
              :href="`#${link.id}`"
              class="block text-[13px] leading-snug text-ink-3 transition-colors hover:text-ink"
            >
              {{ link.text }}
            </a>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<style>
/* Prose styling for rendered Markdown. Scoped by class rather than a plugin
   so the docs inherit the site's tokens instead of a separate typography
   palette that would need to be kept in sync. */
.prose-docs {
  color: var(--color-ink-2);
  font-size: 0.9375rem;
  line-height: 1.75;
}

.prose-docs h1 { display: none; } /* The page header already renders it. */

.prose-docs h2 {
  margin-top: 3rem;
  margin-bottom: 1rem;
  font-size: 1.375rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--color-ink);
  scroll-margin-top: 6rem;
}

.prose-docs h3 {
  margin-top: 2.25rem;
  margin-bottom: 0.75rem;
  font-size: 1.0625rem;
  font-weight: 600;
  color: var(--color-ink);
  scroll-margin-top: 6rem;
}

.prose-docs p { margin-block: 1.125rem; }

.prose-docs a {
  color: var(--color-accent);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: color-mix(in oklab, var(--color-accent) 40%, transparent);
  transition: text-decoration-color 0.2s;
}
.prose-docs a:hover { text-decoration-color: var(--color-accent); }

.prose-docs strong { color: var(--color-ink); font-weight: 600; }

.prose-docs ul, .prose-docs ol {
  margin-block: 1.125rem;
  padding-left: 1.25rem;
}
.prose-docs ul { list-style: disc; }
.prose-docs ol { list-style: decimal; }
.prose-docs li { margin-block: 0.5rem; padding-left: 0.25rem; }
.prose-docs li::marker { color: var(--color-ink-4); }

/* Inline code only — fenced blocks are handled below. */
.prose-docs :not(pre) > code {
  border-radius: 0.375rem;
  border: 1px solid var(--color-line);
  background: var(--color-surface-2);
  padding: 0.125rem 0.375rem;
  font-family: var(--font-mono);
  font-size: 0.85em;
  color: var(--color-ink);
}

.prose-docs pre {
  margin-block: 1.5rem;
  overflow-x: auto;
  border-radius: 0.75rem;
  border: 1px solid var(--color-line);
  background: #0a0c10 !important;
  padding: 1rem 1.125rem;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  line-height: 1.7;
}

.prose-docs table {
  margin-block: 1.5rem;
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  display: block;
  overflow-x: auto;
}
.prose-docs th {
  border-bottom: 1px solid var(--color-line-strong);
  padding: 0.625rem 0.875rem 0.625rem 0;
  text-align: left;
  font-weight: 600;
  color: var(--color-ink);
  white-space: nowrap;
}
.prose-docs td {
  border-bottom: 1px solid var(--color-line);
  padding: 0.625rem 0.875rem 0.625rem 0;
  vertical-align: top;
}

.prose-docs hr {
  margin-block: 2.5rem;
  border-color: var(--color-line);
}

.prose-docs blockquote {
  margin-block: 1.5rem;
  border-left: 2px solid var(--color-accent);
  padding-left: 1rem;
  color: var(--color-ink-3);
}
</style>
