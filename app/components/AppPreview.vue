<script setup lang="ts">
/**
 * An interactive mock of the OpenLogi window.
 *
 * This is the hero's centrepiece, so it is genuinely clickable rather than a
 * screenshot: hovering a hotspot on the mouse highlights the matching row in
 * the sidebar and vice versa, and the DPI slider moves. It is a faithful
 * representation of the real app's layout, not a fantasy UI — the features
 * shown are the ones actually implemented.
 */

type Binding = {
  id: string
  control: string
  action: string
  icon: string
  /** Position of the hotspot over the mouse illustration, in percent. */
  x: number
  y: number
  /** Onboard settings survive a reboot; host-side ones need the app running. */
  onboard: boolean
}

const bindings: Binding[] = [
  { id: 'mid', control: 'Middle click', action: 'Mission Control', icon: 'lucide:layout-grid', x: 50, y: 26, onboard: false },
  { id: 'back', control: 'Back', action: 'Previous workspace', icon: 'lucide:arrow-left', x: 21, y: 44, onboard: false },
  { id: 'fwd', control: 'Forward', action: 'Next workspace', icon: 'lucide:arrow-right', x: 21, y: 56, onboard: false },
  { id: 'gesture', control: 'Gesture button', action: 'Show all windows', icon: 'lucide:app-window', x: 21, y: 68, onboard: false },
]

const active = ref<string>('back')
const dpi = ref(1600)

// Cycle through the bindings until the visitor interacts, so the preview is
// alive on load without demanding attention.
const userEngaged = ref(false)
let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) return

  timer = setInterval(() => {
    if (userEngaged.value) return
    const i = bindings.findIndex((b) => b.id === active.value)
    active.value = bindings[(i + 1) % bindings.length]!.id
  }, 2600)
})

onBeforeUnmount(() => clearInterval(timer))

function select(id: string) {
  active.value = id
  userEngaged.value = true
}

const current = computed(
  () => bindings.find((b) => b.id === active.value) ?? bindings[0]!,
)
</script>

<template>
  <div
    class="card card-lit overflow-hidden shadow-[0_32px_80px_-24px_rgba(0,0,0,0.8)]"
  >
    <!-- Title bar -->
    <div
      class="flex items-center gap-3 border-b border-line bg-surface-2 px-4 py-3"
    >
      <div class="flex gap-1.5" aria-hidden="true">
        <span class="size-3 rounded-full bg-[#3a3f4b]" />
        <span class="size-3 rounded-full bg-[#3a3f4b]" />
        <span class="size-3 rounded-full bg-[#3a3f4b]" />
      </div>
      <div class="flex items-center gap-2 text-xs font-medium text-ink-3">
        <BrandMark class="size-4" />
        OpenLogi
      </div>
      <div class="ml-auto flex items-center gap-1.5">
        <span class="relative flex size-2">
          <span
            class="absolute inline-flex size-full animate-pulse-ring rounded-full bg-success"
          />
          <span class="relative inline-flex size-2 rounded-full bg-success" />
        </span>
        <span class="font-mono text-[11px] text-ink-3">Connected</span>
      </div>
    </div>

    <div class="grid md:grid-cols-[1fr_1.1fr]">
      <!-- Left: device + controls -->
      <div class="border-line p-5 md:border-r">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="text-sm font-semibold">MX Master 3S</p>
            <p class="mt-0.5 font-mono text-[11px] text-ink-3">
              Bolt · 0x4082
            </p>
          </div>
          <div class="flex items-center gap-1.5 text-ink-2">
            <Icon name="lucide:battery-medium" class="size-4 text-success" />
            <span class="font-mono text-xs">72%</span>
          </div>
        </div>

        <!-- Mouse illustration with interactive hotspots -->
        <div class="relative mx-auto mt-5 aspect-4/5 w-full max-w-[180px]">
          <svg
            viewBox="0 0 120 150"
            fill="none"
            class="size-full"
            aria-hidden="true"
          >
            <path
              d="M60 6c-24 0-42 17-42 40v58c0 23 18 40 42 40s42-17 42-40V46c0-23-18-40-42-40Z"
              fill="url(#mouse-body)"
              stroke="var(--color-line-strong)"
              stroke-width="1.5"
            />
            <path
              d="M60 6v42M18 48h84"
              stroke="var(--color-line-strong)"
              stroke-width="1.25"
            />
            <rect
              x="55"
              y="22"
              width="10"
              height="20"
              rx="5"
              fill="var(--color-surface-3)"
              stroke="var(--color-line-strong)"
              stroke-width="1.25"
            />
            <defs>
              <linearGradient id="mouse-body" x1="60" y1="6" x2="60" y2="144">
                <stop stop-color="#181c25" />
                <stop offset="1" stop-color="#0d0f14" />
              </linearGradient>
            </defs>
          </svg>

          <button
            v-for="b in bindings"
            :key="b.id"
            type="button"
            class="absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ease-[var(--ease-out-quint)]"
            :class="
              active === b.id
                ? 'size-4 bg-accent ring-4 ring-accent/25'
                : 'size-3 bg-ink-4 hover:bg-ink-3'
            "
            :style="{ left: `${b.x}%`, top: `${b.y}%` }"
            :aria-label="`${b.control}: ${b.action}`"
            :aria-pressed="active === b.id"
            @click="select(b.id)"
            @mouseenter="select(b.id)"
          />
        </div>

        <!-- DPI -->
        <div class="mt-5">
          <div class="flex items-center justify-between text-xs">
            <span class="font-medium text-ink-2">Sensitivity</span>
            <span class="font-mono text-ink">{{ dpi }} DPI</span>
          </div>
          <input
            v-model.number="dpi"
            type="range"
            min="200"
            max="8000"
            step="50"
            aria-label="Sensitivity in DPI"
            class="mt-2.5 h-1 w-full cursor-pointer appearance-none rounded-full bg-surface-3 accent-accent"
            @input="userEngaged = true"
          />
          <p class="mt-2 flex items-center gap-1.5 text-[11px] text-ink-3">
            <Icon name="lucide:hard-drive" class="size-3 shrink-0" />
            Stored onboard — survives a reboot
          </p>
        </div>
      </div>

      <!-- Right: bindings list -->
      <div class="p-5">
        <p
          class="font-mono text-[11px] tracking-[0.14em] text-ink-3 uppercase"
        >
          Button mappings
        </p>

        <ul class="mt-3 space-y-1.5">
          <li v-for="b in bindings" :key="b.id">
            <button
              type="button"
              class="flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-all duration-300 ease-[var(--ease-out-quint)]"
              :class="
                active === b.id
                  ? 'border-accent/40 bg-accent-dim/30'
                  : 'border-transparent hover:border-line hover:bg-surface-2'
              "
              @click="select(b.id)"
              @mouseenter="select(b.id)"
            >
              <span
                class="flex size-8 shrink-0 items-center justify-center rounded-lg border transition-colors"
                :class="
                  active === b.id
                    ? 'border-accent/30 bg-accent/15 text-accent'
                    : 'border-line bg-surface-2 text-ink-3'
                "
              >
                <Icon :name="b.icon" class="size-4" />
              </span>
              <span class="min-w-0 flex-1">
                <span class="block truncate text-[13px] font-medium">
                  {{ b.action }}
                </span>
                <span class="block truncate text-[11px] text-ink-3">
                  {{ b.control }}
                </span>
              </span>
              <Icon
                v-if="active === b.id"
                name="lucide:check"
                class="size-4 shrink-0 text-accent"
              />
            </button>
          </li>
        </ul>

        <!-- Detail strip reflecting the selected binding -->
        <div class="mt-4 rounded-xl border border-line bg-surface-2 p-3.5">
          <p class="text-[11px] text-ink-3">Delivered by</p>
          <p class="mt-1 flex items-center gap-1.5 text-[13px] font-medium">
            <Icon
              :name="current.onboard ? 'lucide:hard-drive' : 'lucide:cpu'"
              class="size-3.5 text-accent"
            />
            {{ current.onboard ? 'Device firmware' : 'Diversion + uinput' }}
          </p>
          <p class="mt-2 text-[11px] leading-relaxed text-ink-3">
            {{
              current.onboard
                ? 'Written to the device’s flash. Works with OpenLogi closed.'
                : 'The firmware stops sending this button’s normal report and notifies OpenLogi instead.'
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
