<script setup lang="ts">
defineProps<{
  links: Array<{ path: string; title: string; icon?: string }>
}>()
</script>

<template>
  <nav aria-label="Documentation">
    <p
      class="mb-3 px-3 font-mono text-[11px] tracking-[0.14em] text-ink-3 uppercase"
    >
      Guides
    </p>
    <ul class="space-y-0.5">
      <li v-for="link in links" :key="link.path">
        <NuxtLink
          :to="link.path"
          class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors"
          active-class="bg-surface-2 font-medium text-ink"
          exact-active-class="bg-surface-2 font-medium text-ink"
          :class="'text-ink-2 hover:bg-surface-2 hover:text-ink'"
        >
          <Icon
            v-if="link.icon"
            :name="link.icon"
            class="size-4 shrink-0 opacity-70"
          />
          {{ link.title }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
