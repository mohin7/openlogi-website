<script setup lang="ts">
const el = useReveal()
</script>

<template>
  <section class="border-y border-line bg-surface/40 py-14">
    <div ref="el" class="container-page">
      <p
        class="text-center font-mono text-xs tracking-[0.18em] text-ink-3 uppercase"
      >
        Speaks HID++ over every connection Logitech ships
      </p>
      <div
        class="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-3"
      >
        <div
          v-for="t in transports"
          :key="t.name"
          class="group flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2 transition-colors hover:border-line-strong"
        >
          <span class="size-1.5 rounded-full bg-accent" />
          <span class="text-sm font-medium">{{ t.name }}</span>
          <span class="hidden text-xs text-ink-3 sm:inline">{{ t.detail }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
