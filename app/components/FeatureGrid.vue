<script setup lang="ts">
const el = useReveal()
</script>

<template>
  <section id="features" class="scroll-mt-24 py-24 md:py-32">
    <div class="container-page">
      <SectionHeading
        eyebrow="Capabilities"
        title="Everything Options+ does, minus the parts you didn’t want"
        body="Built directly on Logitech’s HID++ protocol, so the app talks to your hardware the same way the official software does — just without the account, the telemetry, or the missing Linux build."
      />

      <div ref="el" class="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(feature, i) in features"
          :key="feature.title"
          class="card card-lit group p-6 hover:border-line-strong hover:bg-surface-2"
          :style="{ transitionDelay: `${i * 40}ms` }"
        >
          <span
            class="inline-flex size-10 items-center justify-center rounded-xl border border-line bg-surface-2 text-accent transition-colors group-hover:border-accent/30 group-hover:bg-accent/10"
          >
            <Icon :name="feature.icon" class="size-5" />
          </span>
          <h3 class="mt-5 text-[15px] font-semibold">{{ feature.title }}</h3>
          <p class="mt-2.5 text-sm leading-relaxed text-ink-2">
            {{ feature.body }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
