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
  <section class="rule-t">
    <div ref="el" class="frame !px-0">
      <div class="grid lg:grid-cols-[5fr_7fr]">
        <div class="px-5 py-20 md:px-10 md:py-28 lg:border-r lg:border-line">
          <p class="caption mb-4 text-accent!">Trust</p>
          <h2
            class="text-3xl leading-[1.08] font-semibold tracking-[var(--tracking-display)] text-balance sm:text-4xl md:text-[2.5rem]"
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

        <ul class="grid gap-px bg-line max-lg:border-t max-lg:border-line sm:grid-cols-2">
          <li
            v-for="p in points"
            :key="p.title"
            class="bg-canvas p-6 transition-colors hover:bg-surface md:p-8"
          >
            <span
              class="inline-flex size-9 items-center justify-center rounded-lg border border-line-strong bg-surface text-accent"
            >
              <Icon :name="p.icon" class="size-4" />
            </span>
            <h3 class="mt-5 text-sm font-semibold tracking-tight">{{ p.title }}</h3>
            <p class="mt-2 text-[13px] leading-relaxed text-ink-2">{{ p.body }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
