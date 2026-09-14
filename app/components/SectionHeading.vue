<script setup lang="ts">
defineProps<{ eyebrow?: string; title: string; body?: string }>()
const el = useReveal()
</script>

<template>
  <div ref="el" class="mx-auto max-w-2xl text-center">
    <p
      v-if="eyebrow"
      class="mb-4 font-mono text-xs tracking-[0.18em] text-accent uppercase"
    >
      {{ eyebrow }}
    </p>
    <h2
      class="text-gradient text-3xl font-semibold tracking-[var(--tracking-display)] text-balance sm:text-4xl md:text-[2.75rem] md:leading-[1.1]"
    >
      {{ title }}
    </h2>
    <p v-if="body" class="mt-5 text-base text-pretty text-ink-2 md:text-lg">
      {{ body }}
    </p>
  </div>
</template>
