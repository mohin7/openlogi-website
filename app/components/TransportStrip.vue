<script setup lang="ts">
const el = useReveal()
</script>

<template>
  <section class="rule-t">
    <div class="frame !px-0">
      <div
        ref="el"
        class="grid grid-cols-2 gap-px bg-line md:grid-cols-5"
      >
        <div
          v-for="t in transports"
          :key="t.name"
          class="bg-canvas px-5 py-6 transition-colors hover:bg-surface max-md:last:col-span-2 md:px-6"
        >
          <p class="flex items-center gap-2 text-sm font-semibold tracking-tight">
            <span class="size-1.5 rounded-full bg-accent" />
            {{ t.name }}
          </p>
          <p class="mt-1.5 text-[13px] leading-snug text-ink-3">{{ t.detail }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
