<script setup lang="ts">
const el = useReveal()

// The first thing a visitor reads is the protocol and every way it connects —
// the same facts the transport strip used to state lower down, promoted
// because they are the product's credibility in one line.
const tags = ['HID++', 'Bolt', 'Unifying', 'Lightspeed', 'Bluetooth LE', 'USB']
const formats = ['.deb', '.rpm', 'AppImage']
</script>

<template>
  <section class="relative overflow-hidden">
    <!-- One faint grid, masked out well before the content. No colour bloom:
         the accent is reserved for things the visitor can act on. -->
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div
        class="grid-bg absolute inset-0 opacity-[0.45] [mask-image:radial-gradient(ellipse_60%_55%_at_50%_0%,black,transparent)]"
      />
    </div>

    <div ref="el" class="frame relative pt-16 pb-0 md:pt-24">
      <div class="mx-auto max-w-3xl text-center">
        <ul
          class="caption flex flex-wrap items-center justify-center gap-x-4 gap-y-2 normal-case! tracking-normal!"
          aria-label="Supported connections"
        >
          <li
            v-for="(t, i) in tags"
            :key="t"
            class="flex items-center gap-4"
            :class="i === 0 ? 'text-ink!' : ''"
          >
            <span v-if="i > 0" class="size-1 rounded-full bg-line-strong" />
            {{ t }}
          </li>
        </ul>

        <h1
          class="mt-8 text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.04em] text-balance sm:text-6xl md:text-[4.5rem]"
        >
          Logitech devices,
          <span class="relative inline-block whitespace-nowrap">
            natively
            <svg
              class="absolute -bottom-1 left-0 h-[0.28em] w-full text-accent"
              viewBox="0 0 200 12"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 8.5C46 3 108 2.5 198 7"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
              />
            </svg>
          </span>
          on Linux.
        </h1>

        <p
          class="mx-auto mt-7 max-w-xl text-base leading-relaxed text-pretty text-ink-2 md:text-lg"
        >
          Remap buttons, set DPI and read real battery levels — without
          proprietary software, a cloud account, or
          <code class="font-mono text-[0.92em] font-medium text-ink">sudo</code>.
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

        <p
          class="caption mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 normal-case! tracking-normal!"
        >
          <Icon name="simple-icons:linux" class="size-3.5" />
          <span v-for="(f, i) in formats" :key="f" class="flex items-center gap-3">
            <span v-if="i > 0" class="text-line-strong">/</span>
            {{ f }}
          </span>
          <span class="text-line-strong">·</span>
          <span>{{ site.licence }}</span>
        </p>
        <p class="caption mt-2 normal-case! tracking-normal!">
          Not affiliated with Logitech
        </p>
      </div>

      <!-- The stage: the app window sits on engineering paper, cropped by the
           section rule so it reads as emerging from the page. -->
      <div
        class="dot-bg relative mx-auto mt-14 max-w-5xl rounded-t-2xl border border-b-0 border-line bg-surface/60 px-3 pt-3 md:mt-16 md:px-6 md:pt-6"
      >
        <AppPreview class="rounded-b-none! border-b-0" />
      </div>
    </div>
  </section>
</template>
