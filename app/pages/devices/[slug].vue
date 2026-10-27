<script setup lang="ts">
const route = useRoute()

const path = `/devices/${route.params.slug}`

const { data: page } = await useAsyncData(`device-${path}`, () =>
  queryCollection('devices').path(path).first(),
)

const { data: others } = await useAsyncData(`device-others-${path}`, () =>
  queryCollection('devices')
    .where('path', '<>', path)
    .order('order', 'ASC')
    .select('path', 'title', 'models')
    .all(),
)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  })
}

useSeoMeta({
  title: page.value.seoTitle,
  description: page.value.description,
  ogTitle: `${page.value.seoTitle} · OpenLogi`,
  ogDescription: page.value.description,
})

defineOgImageComponent('Default', {
  title: page.value.title,
  description: page.value.models,
})

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [
      { name: 'Supported devices', item: '/devices' },
      { name: page.value.title, item: path },
    ],
  }),
])
</script>

<template>
  <div class="container-page py-12 md:py-16">
    <article class="mx-auto max-w-3xl">
      <nav aria-label="Breadcrumb" class="mb-6 text-[13px] text-ink-3">
        <NuxtLink to="/devices" class="transition-colors hover:text-ink">
          Supported devices
        </NuxtLink>
        <span class="mx-2" aria-hidden="true">/</span>
        <span class="text-ink-2">{{ page?.title }}</span>
      </nav>

      <header class="mb-10 border-b border-line pb-8">
        <UiBadge
          :tone="page?.status === 'measured' ? 'accent' : 'neutral'"
          :icon="page?.status === 'measured' ? 'lucide:gauge' : 'lucide:scan-search'"
        >
          {{ page?.status === 'measured' ? 'Measured on real hardware' : 'Runtime discovery' }}
        </UiBadge>
        <h1
          class="text-gradient mt-5 text-3xl font-semibold tracking-[var(--tracking-display)] text-balance sm:text-4xl"
        >
          {{ page?.title }}
        </h1>
        <p class="mt-3 text-base text-pretty text-ink-2">
          {{ page?.description }}
        </p>
        <p class="mt-3 font-mono text-[12px] text-ink-3">{{ page?.models }}</p>
      </header>

      <div class="prose-docs">
        <ContentRenderer v-if="page" :value="page" />
      </div>

      <div class="mt-14 flex flex-wrap gap-3 border-t border-line pt-8">
        <UiButton to="/docs/installation">
          Install OpenLogi
          <Icon name="lucide:arrow-right" class="size-4" />
        </UiButton>
        <UiButton to="/docs/troubleshooting" variant="secondary">
          Troubleshooting
        </UiButton>
      </div>

      <section v-if="others?.length" class="mt-12">
        <h2 class="text-sm font-semibold">Other device guides</h2>
        <ul class="mt-4 grid gap-3 sm:grid-cols-2">
          <li v-for="o in others" :key="o.path">
            <NuxtLink
              :to="o.path"
              class="card group block p-4 hover:border-line-strong hover:bg-surface-2"
            >
              <span class="block text-sm font-medium">{{ o.title }}</span>
              <span class="mt-1 block font-mono text-[12px] text-ink-3">{{ o.models }}</span>
            </NuxtLink>
          </li>
        </ul>
      </section>
    </article>
  </div>
</template>
