<script setup lang="ts">
useHead({
  meta: [
    { name: 'theme-color', content: '#ffffff', media: '(prefers-color-scheme: light)' },
    { name: 'theme-color', content: '#08090c', media: '(prefers-color-scheme: dark)' },
  ],
  titleTemplate: (title?: string) =>
    title ? `${title} · OpenLogi` : 'OpenLogi — Logitech devices, natively on Linux',
})
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
    >
      Skip to content
    </a>
    <!-- The two vertical hairlines of the frame. Fixed, so they run the full
         height of every page without each section redrawing them. -->
    <div
      class="pointer-events-none fixed inset-y-0 left-1/2 z-0 hidden w-full max-w-7xl -translate-x-1/2 border-x border-line xl:block"
      aria-hidden="true"
    />
    <SiteHeader />
    <main id="main" class="relative z-[1] flex-1 pt-16">
      <NuxtPage />
    </main>
    <SiteFooter />
  </div>
</template>
