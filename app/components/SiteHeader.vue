<script setup lang="ts">
const open = ref(false)
const scrolled = ref(false)
const route = useRoute()

// Close the mobile sheet on navigation, otherwise it stays over the new page.
watch(() => route.fullPath, () => { open.value = false })

// Lock the body while the sheet is open so the page behind does not scroll.
watch(open, (isOpen) => {
  if (import.meta.client) {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  }
})

onMounted(() => {
  const onScroll = () => { scrolled.value = window.scrollY > 8 }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-[var(--ease-out-quint)]"
    :class="
      scrolled
        ? 'border-b border-line bg-canvas/80 backdrop-blur-xl'
        : 'border-b border-transparent'
    "
  >
    <div class="container-page flex h-16 items-center justify-between gap-6">
      <NuxtLink
        to="/"
        class="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight"
        aria-label="OpenLogi home"
      >
        <BrandMark class="size-7" />
        <span>OpenLogi</span>
      </NuxtLink>

      <nav class="hidden items-center gap-1 md:flex" aria-label="Main">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="rounded-lg px-3 py-2 text-sm font-medium text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="hidden items-center gap-2 md:flex">
        <UiButton :href="site.repo" variant="ghost" size="sm">
          <Icon name="simple-icons:github" class="size-4" />
          GitHub
        </UiButton>
        <UiButton to="/download" size="sm">Download</UiButton>
      </div>

      <button
        type="button"
        class="-mr-2 inline-flex size-10 items-center justify-center rounded-lg text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink md:hidden"
        :aria-expanded="open"
        aria-controls="mobile-nav"
        :aria-label="open ? 'Close menu' : 'Open menu'"
        @click="open = !open"
      >
        <Icon :name="open ? 'lucide:x' : 'lucide:menu'" class="size-5" />
      </button>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="open"
        id="mobile-nav"
        class="border-t border-line bg-canvas md:hidden"
      >
        <nav class="container-page flex flex-col gap-1 py-4" aria-label="Mobile">
          <NuxtLink
            v-for="item in nav"
            :key="item.to"
            :to="item.to"
            class="rounded-lg px-3 py-3 text-[15px] font-medium text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
          >
            {{ item.label }}
          </NuxtLink>
          <div class="mt-3 flex flex-col gap-2">
            <UiButton :href="site.repo" variant="secondary">
              <Icon name="simple-icons:github" class="size-4" />
              View source
            </UiButton>
            <UiButton to="/download">Download for Linux</UiButton>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>
