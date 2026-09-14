<script setup lang="ts">
useSeoMeta({
  title: 'Supported devices',
  description:
    'OpenLogi supports any Logitech device speaking HID++ over Bolt, Unifying, Lightspeed, Bluetooth or USB. Capabilities are discovered from the hardware at runtime.',
})

defineOgImageComponent('Default', {
  title: 'Supported devices',
  description: 'Discovered from your hardware, not matched against a list.',
})

// Families rather than individual SKUs — the point of the page is that
// support is not a model list, so listing models would undercut it.
const families = [
  {
    name: 'MX series',
    examples: 'MX Master 3S, MX Master 3, MX Anywhere 3, MX Vertical',
    support: 'full',
    note: 'Extensive onboard configuration, many divertable controls',
  },
  {
    name: 'Signature series',
    examples: 'M650, M750, MK650',
    support: 'partial',
    note: 'Fewer onboard slots; most remapping runs host-side',
  },
  {
    name: 'G / Lightspeed',
    examples: 'G Pro Wireless, G502, G305',
    support: 'full',
    note: 'Onboard DPI and profiles over the Lightspeed receiver',
  },
  {
    name: 'MX Keys and ERGO',
    examples: 'MX Keys, MX Keys Mini, ERGO K860',
    support: 'partial',
    note: 'Battery and device info; remapping depends on firmware',
  },
  {
    name: 'Receivers',
    examples: 'Bolt, Unifying, Lightspeed',
    support: 'full',
    note: 'Enumeration, pairing state and notification forwarding',
  },
] as const

const tones = {
  full: 'border-success/30 bg-success/10 text-success',
  partial: 'border-warn/30 bg-warn/10 text-warn',
} as const
</script>

<template>
  <div class="container-page py-16 md:py-24">
    <div class="mx-auto max-w-2xl text-center">
      <UiBadge tone="accent" icon="lucide:scan-search">
        Runtime discovery
      </UiBadge>
      <h1
        class="text-gradient mt-6 text-4xl font-semibold tracking-[var(--tracking-display)] text-balance sm:text-5xl"
      >
        There is no supported device list
      </h1>
      <p class="mx-auto mt-5 text-base text-pretty text-ink-2">
        OpenLogi asks your hardware which features it implements and shows only
        those. A device it has never seen before is not unsupported — it simply
        gets the controls it actually reports.
      </p>
    </div>

    <!-- Capability matrix -->
    <section class="mx-auto mt-16 max-w-4xl">
      <h2 class="text-lg font-semibold">What gets queried</h2>
      <p class="mt-2 max-w-2xl text-sm text-ink-2">
        On connection, the device is asked for its HID++ feature table. Each
        feature it reports unlocks the matching part of the interface.
      </p>

      <div class="card card-lit mt-6 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-line bg-surface-2 text-left">
                <th class="px-5 py-3 font-mono text-[11px] font-medium tracking-wider text-ink-3 uppercase">
                  Feature
                </th>
                <th class="px-5 py-3 font-mono text-[11px] font-medium tracking-wider text-ink-3 uppercase">
                  Capability
                </th>
                <th class="hidden px-5 py-3 font-mono text-[11px] font-medium tracking-wider text-ink-3 uppercase sm:table-cell">
                  Unlocks
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="cap in capabilities"
                :key="cap.id"
                class="border-b border-line last:border-0 transition-colors hover:bg-surface-2"
              >
                <td class="px-5 py-3.5 font-mono text-[13px] text-accent">
                  {{ cap.id }}
                </td>
                <td class="px-5 py-3.5 font-medium">{{ cap.name }}</td>
                <td class="hidden px-5 py-3.5 text-ink-2 sm:table-cell">
                  {{ cap.note }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Families -->
    <section class="mx-auto mt-16 max-w-4xl">
      <h2 class="text-lg font-semibold">How common families behave</h2>
      <p class="mt-2 max-w-2xl text-sm text-ink-2">
        A rough guide to what to expect. Your device reports the truth — this
        table only describes the pattern.
      </p>

      <ul class="mt-6 grid gap-3">
        <li
          v-for="f in families"
          :key="f.name"
          class="card card-lit flex flex-wrap items-start gap-4 p-5 hover:border-line-strong"
        >
          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-center gap-2.5">
              <h3 class="text-[15px] font-semibold">{{ f.name }}</h3>
              <span
                class="rounded-full border px-2 py-0.5 text-[11px] font-medium capitalize"
                :class="tones[f.support]"
              >
                {{ f.support }}
              </span>
            </div>
            <p class="mt-1.5 font-mono text-[12px] text-ink-3">
              {{ f.examples }}
            </p>
            <p class="mt-2 text-sm text-ink-2">{{ f.note }}</p>
          </div>
        </li>
      </ul>
    </section>

    <!-- Check your own -->
    <section class="mx-auto mt-16 max-w-4xl">
      <div class="card card-lit p-6 md:p-8">
        <h2 class="text-lg font-semibold">Check your own device</h2>
        <p class="mt-2 max-w-2xl text-sm text-ink-2">
          The bundled probe prints your hardware's real capability list —
          connection path, firmware, battery support and every divertable
          control. This is also the most useful thing to attach to a bug report.
        </p>
        <CodeBlock
          class="mt-5"
          code="./target/release/logi-probe"
          label="terminal"
        />
        <div class="mt-5 flex flex-wrap gap-3">
          <UiButton to="/docs/troubleshooting" variant="secondary">
            Reading the output
            <Icon name="lucide:arrow-right" class="size-4" />
          </UiButton>
          <UiButton :href="`${site.repo}/issues`" variant="ghost">
            Report a device
          </UiButton>
        </div>
      </div>
    </section>
  </div>
</template>
