<script setup lang="ts">
useHead({
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
    <SiteHeader />
    <main id="main" class="flex-1 pt-16">
      <NuxtPage />
    </main>
    <SiteFooter />
  </div>
</template>
