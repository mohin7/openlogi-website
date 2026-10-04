<script setup lang="ts">
const el = useReveal()
</script>

<template>
  <section class="rule-t">
    <div class="frame relative overflow-hidden">
      <div class="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          class="grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_55%_70%_at_50%_100%,black,transparent)]"
        />
      </div>

      <div ref="el" class="relative px-0 py-24 text-center md:py-32">
        <h2
          class="mx-auto max-w-2xl text-4xl leading-[1.04] font-semibold tracking-[-0.04em] text-balance sm:text-5xl"
        >
          Your mouse already supports this
        </h2>
        <p class="mx-auto mt-5 max-w-lg text-base text-pretty text-ink-2">
          The firmware has spoken HID++ the whole time. OpenLogi is just the
          first Linux app that asks it properly.
        </p>
        <div
          class="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <UiButton to="/download" size="lg" class="w-full sm:w-auto">
            <Icon name="lucide:download" class="size-4" />
            Get OpenLogi
          </UiButton>
          <UiButton
            to="/docs"
            variant="secondary"
            size="lg"
            class="w-full sm:w-auto"
          >
            Read the docs
            <Icon name="lucide:arrow-right" class="size-4" />
          </UiButton>
        </div>
        <p class="caption mt-7 normal-case! tracking-normal!">
          v{{ site.version }} · {{ site.licence }}
        </p>
      </div>
    </div>
  </section>
</template>
