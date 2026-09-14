<script setup lang="ts">
// Rendered to a PNG at build time by nuxt-og-image (Satori), so this markup
// is restricted to the subset Satori supports: flexbox, inline styles, no
// external CSS, no CSS variables.
withDefaults(
  defineProps<{ title?: string; description?: string }>(),
  {
    title: 'Logitech devices, natively on Linux',
    description: 'Remap buttons, set DPI, read battery. No sudo, no account.',
  },
)
</script>

<template>
  <div
    style="
      width: 1200px;
      height: 630px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: #08090c;
      background-image: radial-gradient(
        circle at 50% 0%,
        #16233d 0%,
        #08090c 55%
      );
      padding: 72px;
      font-family: Inter, sans-serif;
    "
  >
    <div style="display: flex; align-items: center">
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: #12151c;
          border: 1px solid #2a2f3c;
          margin-right: 16px;
          font-size: 26px;
          color: #4d8dff;
        "
      >
        ◉
      </div>
      <div style="display: flex; font-size: 30px; font-weight: 600; color: #f2f4f8">
        OpenLogi
      </div>
    </div>

    <div style="display: flex; flex-direction: column">
      <div
        style="
          display: flex;
          font-size: 66px;
          font-weight: 600;
          line-height: 1.1;
          letter-spacing: -2.5px;
          color: #f2f4f8;
          max-width: 940px;
        "
      >
        {{ title }}
      </div>
      <div
        style="
          display: flex;
          margin-top: 26px;
          font-size: 28px;
          line-height: 1.4;
          color: #a7aebd;
          max-width: 820px;
        "
      >
        {{ description }}
      </div>
    </div>

    <div style="display: flex; align-items: center; font-size: 22px; color: #6d7585">
      <div style="display: flex">Open source · GPL-3.0</div>
      <div style="display: flex; margin: 0 14px; color: #2a2f3c">·</div>
      <div style="display: flex">Wayland and X11</div>
    </div>
  </div>
</template>
