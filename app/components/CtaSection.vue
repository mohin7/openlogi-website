<script setup lang="ts">
const el = useReveal()
</script>

<template>
  <section class="pb-24 md:pb-32">
    <div class="container-page">
      <div
        ref="el"
        class="card card-lit relative overflow-hidden px-6 py-16 text-center md:px-16 md:py-20"
      >
        <div class="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            class="grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]"
          />
          <div
            class="absolute bottom-[-40%] left-1/2 h-[360px] w-[720px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
          />
        </div>

        <div class="relative">
          <h2
            class="text-gradient text-3xl font-semibold tracking-[var(--tracking-display)] text-balance sm:text-4xl"
          >
            Your mouse already supports this
          </h2>
          <p
            class="mx-auto mt-5 max-w-lg text-base text-pretty text-ink-2"
          >
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
        </div>
      </div>
    </div>
  </section>
</template>
