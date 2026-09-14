<script setup lang="ts">
const { theme, toggle, apply } = useTheme()

// The server renders dark, so until this runs the icon could contradict the
// page. Reading the class the inline head script already set keeps them
// agreed, and mounted gates the icon so no wrong glyph is ever painted.
const mounted = ref(false)
onMounted(() => {
  apply(document.documentElement.classList.contains('dark') ? 'dark' : 'light')
  mounted.value = true
})
</script>

<template>
  <button
    type="button"
    class="inline-flex size-9 items-center justify-center rounded-lg border border-line bg-surface text-ink-3 transition-colors duration-200 hover:border-line-strong hover:text-ink"
    :aria-label="`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`"
    :title="`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`"
    @click="toggle"
  >
    <Icon
      v-if="mounted"
      :name="theme === 'dark' ? 'lucide:sun' : 'lucide:moon'"
      class="size-4"
    />
    <span v-else class="size-4" />
  </button>
</template>
