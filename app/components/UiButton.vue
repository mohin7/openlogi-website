<script setup lang="ts">
// Renders as <NuxtLink> when given a destination, <button> otherwise, so the
// same visual treatment works for navigation and for actions.
const props = withDefaults(
  defineProps<{
    to?: string
    href?: string
    variant?: 'primary' | 'secondary' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
  }>(),
  { variant: 'primary', size: 'md' },
)

const variants = {
  primary:
    'bg-accent text-white hover:bg-accent-hover shadow-[0_0_0_1px_var(--color-accent),0_8px_24px_-8px_var(--color-accent-glow)]',
  secondary:
    'bg-surface-2 text-ink border border-line-strong hover:bg-surface-3 hover:border-ink-4',
  ghost: 'text-ink-2 hover:text-ink hover:bg-surface-2',
} as const

const sizes = {
  sm: 'h-8 px-3 text-[13px] gap-1.5 rounded-lg',
  md: 'h-10 px-4 text-sm gap-2 rounded-xl',
  lg: 'h-12 px-6 text-[15px] gap-2 rounded-xl',
} as const

const classes = computed(() => [
  'inline-flex items-center justify-center font-medium whitespace-nowrap',
  'transition-all duration-200 ease-[var(--ease-out-quint)] active:scale-[0.98]',
  variants[props.variant],
  sizes[props.size],
])

const external = computed(() => Boolean(props.href))
</script>

<template>
  <a
    v-if="external"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    :class="classes"
  >
    <slot />
  </a>
  <NuxtLink v-else-if="to" :to="to" :class="classes">
    <slot />
  </NuxtLink>
  <button v-else type="button" :class="classes">
    <slot />
  </button>
</template>
