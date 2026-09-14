<script setup lang="ts">
const props = defineProps<{ code: string; label?: string }>()

const copied = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

async function copy() {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    clearTimeout(timer)
    timer = setTimeout(() => { copied.value = false }, 2000)
  } catch {
    // Clipboard access can be refused (insecure origin, denied permission).
    // The command is visible and selectable either way, so failing quietly is
    // better than an error the visitor can do nothing about.
  }
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div class="overflow-hidden rounded-xl border border-line bg-canvas">
    <div
      v-if="label"
      class="flex items-center justify-between border-b border-line bg-surface-2 px-4 py-2"
    >
      <span class="font-mono text-[11px] text-ink-3">{{ label }}</span>
    </div>
    <div class="relative">
      <pre
        class="overflow-x-auto p-4 pr-14 font-mono text-[13px] leading-relaxed text-ink-2"
      ><code>{{ code }}</code></pre>
      <button
        type="button"
        class="absolute top-3 right-3 inline-flex size-8 items-center justify-center rounded-lg border border-line bg-surface-2 text-ink-3 transition-colors hover:border-line-strong hover:text-ink"
        :aria-label="copied ? 'Copied' : 'Copy to clipboard'"
        @click="copy"
      >
        <Icon
          :name="copied ? 'lucide:check' : 'lucide:copy'"
          class="size-3.5"
          :class="copied ? 'text-success' : ''"
        />
      </button>
    </div>
  </div>
</template>
