<script setup lang="ts">
const el = useReveal()
</script>

<template>
  <section id="features" class="rule-t scroll-mt-16">
    <div class="frame py-20 md:py-28">
      <SectionHeading
        eyebrow="Capabilities"
        title="Everything Options+ does, minus the parts you didn’t want"
        body="Built directly on Logitech’s HID++ protocol, so the app talks to your hardware the same way the official software does — without the account, the telemetry, or the missing Linux build."
        caption="HID++ 2.0 · 7 features"
      />
    </div>

    <!-- Cells share their borders: the grid is one ruled table, not six
         cards. The outer edge is the frame and the section rules. -->
    <div class="border-t border-line">
      <div class="frame !px-0">
        <div
          ref="el"
          class="grid gap-px bg-line md:grid-cols-2 lg:grid-cols-3"
        >
          <article
            v-for="(f, i) in features"
            :key="f.title"
            class="group bg-canvas"
            :style="{ transitionDelay: `${i * 40}ms` }"
          >
            <div
              class="dot-bg h-56 border-b border-line bg-surface/50 px-4 py-5transition-colors group-hover:bg-surface-2/60"
            >
              <FeatureDiagram :kind="f.kind" />
            </div>
            <div class="p-6 pb-7">
              <h3 class="text-[15px] font-semibold tracking-tight">{{ f.title }}</h3>
              <p class="mt-2.5 text-sm leading-relaxed text-ink-2">{{ f.body }}</p>
              <p class="caption mt-5 normal-case! tracking-normal!">{{ f.spec }}</p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
