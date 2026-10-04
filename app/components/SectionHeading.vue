<script setup lang="ts">
// Left-aligned, with an optional mono caption pinned to the right on wide
// screens — the headline carries the argument, the caption carries the spec.
defineProps<{
  eyebrow?: string
  title: string
  body?: string
  caption?: string
  /** Centre the block — only for pages that have no frame to align to. */
  center?: boolean
}>()
const el = useReveal()
</script>

<template>
  <div
    ref="el"
    class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
    :class="center ? 'mx-auto max-w-2xl text-center md:flex-col md:items-center' : ''"
  >
    <div :class="center ? '' : 'max-w-2xl'">
      <p v-if="eyebrow" class="caption mb-4 text-accent!">{{ eyebrow }}</p>
      <h2
        class="text-3xl leading-[1.08] font-semibold tracking-[var(--tracking-display)] text-balance sm:text-4xl md:text-[2.5rem]"
      >
        {{ title }}
      </h2>
      <p v-if="body" class="mt-4 max-w-xl text-base text-pretty text-ink-2">
        {{ body }}
      </p>
    </div>
    <p v-if="caption" class="caption shrink-0 md:pb-1.5">{{ caption }}</p>
  </div>
</template>
