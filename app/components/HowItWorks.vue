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
  <section class="rule-t">
    <div class="frame py-20 md:py-28">
      <SectionHeading
        eyebrow="How it works"
        title="Four steps from plugged in to remapped"
        body="No kernel module, no patched driver, no reverse-engineered binary blob. Just the vendor protocol, spoken correctly."
        caption="hidraw → uinput"
      />
    </div>

    <div class="border-t border-line">
      <div class="frame !px-0">
        <ol ref="el" class="grid gap-px bg-line md:grid-cols-2 lg:grid-cols-4">
          <li
            v-for="step in steps"
            :key="step.n"
            class="group flex flex-col bg-canvas p-6 pb-7 transition-colors hover:bg-surface"
          >
            <span
              class="flex size-8 items-center justify-center rounded-lg border border-line-strong bg-surface font-mono text-[11px] text-accent transition-colors group-hover:border-accent/50"
            >
              {{ step.n }}
            </span>
            <h3 class="mt-6 text-[15px] font-semibold tracking-tight">{{ step.title }}</h3>
            <p class="mt-2.5 flex-1 text-sm leading-relaxed text-ink-2">
              {{ step.body }}
            </p>
            <code
              class="mt-6 block rounded-md border border-line bg-surface px-3 py-2 font-mono text-[11px] break-words text-ink-3"
            >
              {{ step.code }}
            </code>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
