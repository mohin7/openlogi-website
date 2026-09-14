<script setup lang="ts">
const el = useReveal()
const open = ref<number | null>(0)

function toggle(i: number) {
  open.value = open.value === i ? null : i
}

// Feed the same Q&A to search engines as structured data. Google shows these
// as rich results, which is most of the SEO value of an FAQ block.
useSchemaOrg([
  defineQuestion(
    faqs.map((f) => ({ name: f.q, acceptedAnswer: f.a })),
  ),
])
</script>

<template>
  <section class="py-24 md:py-32">
    <div class="container-page">
      <SectionHeading eyebrow="FAQ" title="Questions worth answering up front" />

      <div ref="el" class="mx-auto mt-14 max-w-3xl space-y-2.5">
        <div
          v-for="(faq, i) in faqs"
          :key="faq.q"
          class="card overflow-hidden"
          :class="open === i ? 'border-line-strong bg-surface-2' : ''"
        >
          <h3>
            <button
              type="button"
              class="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:text-ink"
              :aria-expanded="open === i"
              :aria-controls="`faq-panel-${i}`"
              @click="toggle(i)"
            >
              <span class="flex-1 text-[15px] font-medium">{{ faq.q }}</span>
              <Icon
                name="lucide:plus"
                class="size-4 shrink-0 text-ink-3 transition-transform duration-300 ease-[var(--ease-out-quint)]"
                :class="open === i ? 'rotate-45 text-accent' : ''"
              />
            </button>
          </h3>
          <div
            v-show="open === i"
            :id="`faq-panel-${i}`"
            class="px-5 pb-5 text-sm leading-relaxed text-ink-2"
          >
            {{ faq.a }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
