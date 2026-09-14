<script setup lang="ts">
const el = useReveal()
</script>

<template>
  <section class="relative overflow-hidden">
    <!-- Ambient backdrop: a faint grid, masked so it fades out before it
         reaches the content, plus one soft accent bloom behind the headline. -->
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div
        class="grid-bg absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,black,transparent)]"
      />
      <div
        class="absolute top-[-20%] left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]"
      />
    </div>

    <div ref="el" class="container-page relative pt-20 pb-20 md:pt-28">
      <div class="mx-auto max-w-3xl text-center">
        <UiBadge tone="accent" icon="lucide:git-commit-horizontal">
          Open source · GPL-3.0
        </UiBadge>

        <h1
          class="text-gradient mt-6 text-4xl leading-[1.05] font-semibold tracking-[var(--tracking-display)] text-balance sm:text-5xl md:text-[4rem]"
        >
          Logitech devices, natively on Linux
        </h1>

        <p
          class="mx-auto mt-6 max-w-xl text-base leading-relaxed text-pretty text-ink-2 md:text-lg"
        >
          Remap buttons, set DPI and read real battery levels — without
          proprietary software, without a cloud account, and without
          <code class="font-mono text-ink">sudo</code>.
        </p>

        <div
          class="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <UiButton to="/download" size="lg" class="w-full sm:w-auto">
            <Icon name="lucide:download" class="size-4" />
            Download for Linux
          </UiButton>
          <UiButton
            :href="site.repo"
            variant="secondary"
            size="lg"
            class="w-full sm:w-auto"
          >
            <Icon name="simple-icons:github" class="size-4" />
            View source
          </UiButton>
        </div>

        <p class="mt-5 font-mono text-xs text-ink-4">
          Wayland and X11 · No telemetry · No account
        </p>
      </div>

      <div class="mx-auto mt-16 max-w-4xl">
        <AppPreview />
      </div>
    </div>
  </section>
</template>
