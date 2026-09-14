<script setup lang="ts">
const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', to: '/#features' },
      { label: 'Supported devices', to: '/devices' },
      { label: 'Download', to: '/download' },
    ],
  },
  {
    title: 'Documentation',
    links: [
      { label: 'Installation', to: '/docs/installation' },
      { label: 'Architecture', to: '/docs/architecture' },
      { label: 'Permissions', to: '/docs/permissions' },
      { label: 'Troubleshooting', to: '/docs/troubleshooting' },
    ],
  },
] as const

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-line bg-surface/50">
    <div class="container-page py-16">
      <div class="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <NuxtLink to="/" class="flex items-center gap-2.5 font-semibold">
            <BrandMark class="size-7" />
            <span>OpenLogi</span>
          </NuxtLink>
          <p class="mt-4 max-w-xs text-sm leading-relaxed text-ink-3">
            {{ site.description }}
          </p>
          <div class="mt-6 flex gap-2">
            <a
              :href="site.repo"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex size-9 items-center justify-center rounded-lg border border-line bg-surface-2 text-ink-3 transition-colors hover:border-line-strong hover:text-ink"
              aria-label="OpenLogi on GitHub"
            >
              <Icon name="simple-icons:github" class="size-4" />
            </a>
          </div>
        </div>

        <div v-for="col in columns" :key="col.title">
          <h3 class="text-xs font-semibold tracking-wider text-ink uppercase">
            {{ col.title }}
          </h3>
          <ul class="mt-4 space-y-3">
            <li v-for="link in col.links" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="text-sm text-ink-3 transition-colors hover:text-ink"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-xs font-semibold tracking-wider text-ink uppercase">
            Project
          </h3>
          <ul class="mt-4 space-y-3">
            <li>
              <a
                :href="site.repo"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm text-ink-3 transition-colors hover:text-ink"
              >
                Source code
              </a>
            </li>
            <li>
              <a
                :href="`${site.repo}/issues`"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm text-ink-3 transition-colors hover:text-ink"
              >
                Report an issue
              </a>
            </li>
            <li>
              <a
                :href="`${site.repo}/blob/master/LICENSE`"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm text-ink-3 transition-colors hover:text-ink"
              >
                Licence
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="mt-14 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between"
      >
        <p class="text-sm text-ink-4">
          © {{ year }} OpenLogi · {{ site.licence }}
        </p>
        <p class="text-sm text-ink-4">
          Not affiliated with or endorsed by Logitech.
        </p>
      </div>
    </div>
  </footer>
</template>
