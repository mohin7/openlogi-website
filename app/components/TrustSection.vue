<script setup lang="ts">
const el = useReveal()

// Each point maps to a real, verifiable property of the codebase rather than
// a vague privacy promise.
const points = [
  {
    icon: 'lucide:lock',
    title: 'Runs as your user, never root',
    body: 'A single udev rule is installed once at setup. It grants an ACL through uaccess, so device access belongs to whoever is physically logged in and disappears at logout.',
  },
  {
    icon: 'lucide:wifi-off',
    title: 'No network code at all',
    body: 'There is no account, no sync, no telemetry and no update ping. The app talks to your hardware and to your desktop session — nothing else.',
  },
  {
    icon: 'lucide:file-search',
    title: 'Auditable end to end',
    body: 'Around 4,500 lines of Rust and Vue under GPL-3.0. The protocol layer, the input engine and this website are all public and readable in an afternoon.',
  },
  {
    icon: 'lucide:key-round',
    title: 'Minimum viable permissions',
    body: 'Input synthesis uses a dedicated group that grants write access to uinput only — deliberately not the input group, which would allow reading every keystroke on the system.',
  },
] as const
</script>

<template>
  <section class="relative overflow-hidden py-24 md:py-32">
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent"
      aria-hidden="true"
    />

    <div class="container-page">
      <div ref="el" class="grid gap-14 lg:grid-cols-2 lg:items-center">
        <div>
          <p
            class="mb-4 font-mono text-xs tracking-[0.18em] text-accent uppercase"
          >
            Trust
          </p>
          <h2
            class="text-gradient text-3xl font-semibold tracking-[var(--tracking-display)] text-balance sm:text-4xl"
          >
            A configuration tool should not be a security problem
          </h2>
          <p class="mt-5 text-base leading-relaxed text-pretty text-ink-2">
            Anything that can remap your mouse buttons can, by definition,
            synthesise keystrokes. That deserves a higher bar than the usual
            “trust us” — so the privilege model is deliberately narrow, and
            every line of it is public.
          </p>
          <div class="mt-8">
            <UiButton to="/docs/permissions" variant="secondary">
              How permissions work
              <Icon name="lucide:arrow-right" class="size-4" />
            </UiButton>
          </div>
        </div>

        <ul class="grid gap-3 sm:grid-cols-2">
          <li
            v-for="p in points"
            :key="p.title"
            class="card card-lit p-5 hover:border-line-strong"
          >
            <Icon :name="p.icon" class="size-5 text-accent" />
            <h3 class="mt-4 text-sm font-semibold">{{ p.title }}</h3>
            <p class="mt-2 text-[13px] leading-relaxed text-ink-2">
              {{ p.body }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
