<script setup lang="ts">
// Used from Markdown as ::callout{icon="lucide:info"}
withDefaults(defineProps<{ icon?: string }>(), { icon: 'lucide:info' })
</script>

<template>
  <aside
    class="my-6 flex gap-3 rounded-xl border border-accent/25 bg-accent-dim/25 px-4 py-3.5"
  >
    <Icon :name="icon" class="mt-0.5 size-4 shrink-0 text-accent" />
    <div class="min-w-0 flex-1 text-sm leading-relaxed text-ink-2 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
      <slot />
    </div>
  </aside>
</template>
