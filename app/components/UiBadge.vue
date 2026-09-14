<script setup lang="ts">
withDefaults(defineProps<{ icon?: string; tone?: 'accent' | 'neutral' }>(), {
  tone: 'neutral',
})
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium"
    :class="
      tone === 'accent'
        ? 'border-accent-dim bg-accent-dim/40 text-accent'
        : 'border-line bg-surface-2 text-ink-2'
    "
  >
    <Icon v-if="icon" :name="icon" class="size-3.5" />
    <slot />
  </span>
</template>
