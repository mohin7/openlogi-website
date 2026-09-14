<template>
  <!-- An abstracted mouse silhouette: rounded body, scroll wheel, and a
       signal arc standing in for the wireless link. -->
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect width="32" height="32" rx="8" fill="url(#ol-bg)" />
    <rect
      x="0.5"
      y="0.5"
      width="31"
      height="31"
      rx="7.5"
      stroke="url(#ol-edge)"
    />
    <path
      d="M16 8.5c-3.04 0-5.5 2.46-5.5 5.5v4.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V14c0-3.04-2.46-5.5-5.5-5.5Z"
      stroke="currentColor"
      stroke-width="1.75"
      class="text-accent"
    />
    <path
      d="M16 12.25v3"
      stroke="currentColor"
      stroke-width="1.75"
      stroke-linecap="round"
      class="text-accent"
    />
    <defs>
      <!-- Token-driven so the mark inverts with the theme rather than staying
           a dark tile on a white page. -->
      <linearGradient id="ol-bg" x1="0" y1="0" x2="32" y2="32">
        <stop stop-color="var(--color-surface-2)" />
        <stop offset="1" stop-color="var(--color-surface)" />
      </linearGradient>
      <linearGradient id="ol-edge" x1="16" y1="0" x2="16" y2="32">
        <stop stop-color="var(--color-line-strong)" />
        <stop offset="1" stop-color="var(--color-line)" />
      </linearGradient>
    </defs>
  </svg>
</template>
