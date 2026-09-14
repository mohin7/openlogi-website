<script setup lang="ts">
const selected = ref<string>('deb')
const current = computed(
  () => installTargets.find((t) => t.id === selected.value) ?? installTargets[0]!,
)

// Preselect the visitor's distro. Done on mount rather than during render
// because the page is prerendered — the HTML is built once, with no visitor
// to detect, so reading the user agent any earlier would bake one distro into
// the static file for everyone.
const detected = ref(false)
onMounted(() => {
  const ua = navigator.userAgent
  const match = installTargets.find((t) => t.detect?.test(ua))
  if (match) {
    selected.value = match.id
    detected.value = true
  }
})

useSeoMeta({
  title: 'Download',
  description:
    'Install OpenLogi on Debian, Ubuntu, Fedora, Arch Linux, or build it from source. Free and open source under GPL-3.0.',
})

defineOgImageComponent('Default', {
  title: 'Download OpenLogi',
  description: 'Debian, Ubuntu, Fedora, Arch, or from source.',
})
</script>

<template>
  <div class="relative overflow-hidden">
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div
        class="grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_40%_at_50%_0%,black,transparent)]"
      />
      <div
        class="absolute top-[-25%] left-1/2 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-accent/10 blur-[130px]"
      />
    </div>

    <div class="container-page relative py-16 md:py-24">
      <div class="mx-auto max-w-2xl text-center">
        <UiBadge tone="accent" icon="lucide:tag">
          Version {{ site.version }}
        </UiBadge>
        <h1
          class="text-gradient mt-6 text-4xl font-semibold tracking-[var(--tracking-display)] text-balance sm:text-5xl"
        >
          Download OpenLogi
        </h1>
        <p class="mx-auto mt-5 max-w-lg text-base text-pretty text-ink-2">
          Free and open source under {{ site.licence }}. No account, no
          telemetry, no licence key.
        </p>
      </div>

      <!-- Distro picker -->
      <div class="mx-auto mt-12 max-w-3xl">
        <div
          class="flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label="Choose your distribution"
        >
          <button
            v-for="target in installTargets"
            :key="target.id"
            type="button"
            role="tab"
            :aria-selected="selected === target.id"
            class="inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-200 ease-[var(--ease-out-quint)]"
            :class="
              selected === target.id
                ? 'border-accent/40 bg-accent-dim/40 text-ink'
                : 'border-line bg-surface text-ink-2 hover:border-line-strong hover:text-ink'
            "
            @click="selected = target.id"
          >
            <Icon :name="target.icon" class="size-4" />
            {{ target.label }}
          </button>
        </div>

        <div class="card card-lit mt-6 p-6">
          <div class="flex flex-wrap items-baseline justify-between gap-2">
            <p class="text-sm font-medium">
              Install on {{ current.label }}
            </p>
            <p v-if="detected" class="text-[13px] text-ink-3">
              Detected from your browser
            </p>
          </div>

          <!-- A downloadable build: offer the file, then what to do with it. -->
          <template v-if="current.ready && current.id !== 'source'">
            <div class="mt-4 flex flex-wrap items-center gap-3">
              <UiButton :href="assetUrl(current.file)" download>
                <Icon name="lucide:download" class="size-4" />
                Download {{ current.id === 'appimage' ? 'AppImage' : current.label }}
              </UiButton>
              <span class="font-mono text-[12px] text-ink-3">
                {{ current.file }} · x86_64
              </span>
            </div>
            <p class="mt-3 text-[13px] text-ink-3">
              {{
                current.id === 'appimage'
                  ? 'Then make it executable and run it — no installation needed:'
                  : 'Then install it from the directory you saved it in:'
              }}
            </p>
            <CodeBlock class="mt-2" :code="current.command" label="terminal" />

            <!-- The AppImage runs no install script, so the udev rule that
                 makes device access work is not set up. Saying so here avoids
                 the obvious "it does not detect my mouse" report. -->
            <p
              v-if="current.id === 'appimage'"
              class="mt-3 flex gap-2 text-[13px] text-ink-3"
            >
              <Icon name="lucide:info" class="mt-0.5 size-3.5 shrink-0 text-accent" />
              <span>
                The AppImage runs no install step, so the udev rule is not
                added for you. Run
                <code class="font-mono text-ink">sudo ./scripts/install-udev-rules.sh</code>
                from the repository once, then log out and back in.
              </span>
            </p>
          </template>

          <!-- The source tab. -->
          <template v-else>
            <p class="mt-1 text-[13px] text-ink-3">
              Requires a Rust toolchain and Node.js 20 or newer.
            </p>
            <CodeBlock class="mt-4" :code="current.command" label="terminal" />
          </template>
        </div>

        <p class="mt-4 text-center text-[13px] text-ink-3">
          Version {{ site.version }} · all releases on
          <a
            :href="`${site.repo}/releases`"
            class="text-ink-2 underline underline-offset-4 transition-colors hover:text-ink"
          >GitHub</a>, with
          <a
            :href="assetUrl('SHA256SUMS')"
            class="text-ink-2 underline underline-offset-4 transition-colors hover:text-ink"
          >checksums</a>.
        </p>
      </div>

      <!-- After install -->
      <div class="mx-auto mt-16 max-w-3xl">
        <h2 class="text-lg font-semibold">After installing</h2>
        <p class="mt-2 text-sm text-ink-2">
          OpenLogi needs one permission step to reach your hardware without
          running as root. Packages handle it automatically; source builds run
          it through <code class="font-mono text-ink">setup.sh</code>.
        </p>

        <div class="mt-6 grid gap-3 sm:grid-cols-3">
          <div class="card p-5">
            <span class="font-mono text-xs text-accent">01</span>
            <h3 class="mt-2 text-sm font-semibold">Log out and back in</h3>
            <p class="mt-1.5 text-[13px] leading-relaxed text-ink-2">
              Group membership only applies to new sessions.
            </p>
          </div>
          <div class="card p-5">
            <span class="font-mono text-xs text-accent">02</span>
            <h3 class="mt-2 text-sm font-semibold">Launch the app</h3>
            <p class="mt-1.5 text-[13px] leading-relaxed text-ink-2">
              Connected devices appear on their own. There is no pairing step.
            </p>
          </div>
          <div class="card p-5">
            <span class="font-mono text-xs text-accent">03</span>
            <h3 class="mt-2 text-sm font-semibold">Configure</h3>
            <p class="mt-1.5 text-[13px] leading-relaxed text-ink-2">
              Only the controls your hardware actually reports are shown.
            </p>
          </div>
        </div>

        <div class="mt-6 flex flex-wrap gap-3">
          <UiButton to="/docs/installation" variant="secondary">
            Full installation guide
            <Icon name="lucide:arrow-right" class="size-4" />
          </UiButton>
          <UiButton to="/docs/troubleshooting" variant="ghost">
            Troubleshooting
          </UiButton>
        </div>
      </div>

      <!-- Requirements -->
      <div class="mx-auto mt-16 max-w-3xl">
        <h2 class="text-lg font-semibold">Requirements</h2>
        <dl class="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
          <div
            v-for="req in [
              { k: 'Operating system', v: '64-bit Linux with systemd' },
              { k: 'Display server', v: 'Wayland or X11' },
              { k: 'Hardware', v: 'A Logitech device speaking HID++' },
              { k: 'Connection', v: 'Bolt, Unifying, Lightspeed, Bluetooth or USB' },
            ]"
            :key="req.k"
            class="border-t border-line pt-3"
          >
            <dt class="text-[13px] text-ink-3">{{ req.k }}</dt>
            <dd class="mt-0.5 text-sm">{{ req.v }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>
