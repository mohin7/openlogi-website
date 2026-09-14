<script setup lang="ts">
const el = useReveal()

const steps = [
  {
    n: '01',
    title: 'Find the device',
    body: 'Endpoints are located by the shape of their HID report descriptor rather than by matching product ids, so receivers, Bluetooth and cabled devices all resolve the same way.',
    code: 'usage page 0xFF00 → hidraw node',
  },
  {
    n: '02',
    title: 'Ask what it can do',
    body: 'The device is queried for its feature table at runtime. Screens in the app appear because the hardware reports the matching feature, never because a model name was on a list.',
    code: 'feature 0x2201 → DPI panel',
  },
  {
    n: '03',
    title: 'Divert the button',
    body: 'For anything the firmware cannot do itself, OpenLogi tells it to stop emitting that button’s normal report and send a notification instead.',
    code: '0x1B04 setCidReporting',
  },
  {
    n: '04',
    title: 'Emit the real action',
    body: 'Notifications become input through the kernel’s uinput device. Because this happens below the display server, the same path works identically on Wayland and X11.',
    code: '/dev/uinput → keystroke',
  },
] as const
</script>

<template>
  <section class="border-t border-line bg-surface/40 py-24 md:py-32">
    <div class="container-page">
      <SectionHeading
        eyebrow="How it works"
        title="Four steps from plugged in to remapped"
        body="No kernel module, no patched driver, no reverse-engineered binary blob. Just the vendor protocol, spoken correctly."
      />

      <ol ref="el" class="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <li
          v-for="step in steps"
          :key="step.n"
          class="card card-lit flex flex-col p-6 hover:border-line-strong"
        >
          <span class="font-mono text-xs text-accent">{{ step.n }}</span>
          <h3 class="mt-3 text-[15px] font-semibold">{{ step.title }}</h3>
          <p class="mt-2.5 flex-1 text-sm leading-relaxed text-ink-2">
            {{ step.body }}
          </p>
          <code
            class="mt-5 block rounded-lg border border-line bg-canvas px-3 py-2 font-mono text-[11px] break-words text-ink-3"
          >
            {{ step.code }}
          </code>
        </li>
      </ol>
    </div>
  </section>
</template>
