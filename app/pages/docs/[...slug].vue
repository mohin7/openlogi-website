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

// "Installation" alone says nothing in a results page, so each page sets a
// `seoTitle` naming the problem it solves; the suffix is only a fallback.
const seoTitle = page.value.seoTitle ?? `${page.value.title} · Linux docs`

useSeoMeta({
  title: seoTitle,
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

