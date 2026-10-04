<script setup lang="ts">
const el = useReveal()
const open = ref<number | null>(0)

function toggle(i: number) {
  open.value = open.value === i ? null : i
}

// The FAQ structured data is declared once, on the landing page, next to the
// rendered answers — declaring it here as well would emit a duplicate
// FAQPage block, which Search Console reports as an error.
</script>

<template>
  <section class="rule-t">
    <div class="frame py-20 md:py-28">
      <div class="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div>
          <p class="caption mb-4 text-accent!">FAQ</p>
          <h2
            class="text-3xl leading-[1.08] font-semibold tracking-[var(--tracking-display)] text-balance sm:text-4xl md:text-[2.5rem]"
          >
            Questions worth answering up front
          </h2>
          <p class="mt-4 text-base text-ink-2">
            Something else? Open an issue on
            <a
              :href="`${site.repo}/issues`"
              target="_blank"
              rel="noopener noreferrer"
              class="font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
            >GitHub</a>.
          </p>
        </div>

        <div ref="el" class="border-t border-line">
          <div v-for="(faq, i) in faqs" :key="faq.q" class="border-b border-line">
            <h3>
              <button
                type="button"
                class="group flex w-full items-center gap-4 py-5 text-left"
                :aria-expanded="open === i"
                :aria-controls="`faq-panel-${i}`"
                @click="toggle(i)"
              >
                <span
                  class="flex-1 text-[15px] font-medium tracking-tight transition-colors group-hover:text-accent"
                >
                  {{ faq.q }}
                </span>
                <span
                  class="flex size-6 shrink-0 items-center justify-center rounded-md border border-line-strong text-ink-3 transition-colors"
                  :class="open === i ? 'border-accent/50 text-accent' : ''"
                >
                  <Icon
                    name="lucide:plus"
                    class="size-3.5 transition-transform duration-300 ease-[var(--ease-out-quint)]"
                    :class="open === i ? 'rotate-45' : ''"
                  />
                </span>
              </button>
            </h3>
            <div
              v-show="open === i"
              :id="`faq-panel-${i}`"
              class="max-w-xl pb-6 text-sm leading-relaxed text-ink-2"
            >
              {{ faq.a }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
