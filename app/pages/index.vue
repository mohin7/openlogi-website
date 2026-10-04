<script setup lang="ts">
// The template in app.vue appends "· OpenLogi", so the title here is just the
// distinguishing half — otherwise the brand name appears twice.
useSeoMeta({
  title: 'Logitech devices, natively on Linux',
  description: site.description,
  ogTitle: 'OpenLogi — Logitech devices, natively on Linux',
  ogDescription: site.description,
})

defineOgImageComponent('Default', {
  title: 'Logitech devices, natively on Linux',
  description: 'Remap buttons, set DPI, read battery. No sudo, no account.',
})

// The FAQ is rendered on this page, so it is declared here too — the answers
// must be visible on the same URL. The Questions have to hang off a FAQPage:
// emitted as loose top-level nodes they are not a FAQ to anything that reads
// the markup.
useSchemaOrg([
  defineSoftwareApp({
    name: site.name,
    description: site.description,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Linux',
    softwareVersion: version,
    downloadUrl: `${site.repo}/releases/latest`,
    license: 'https://www.gnu.org/licenses/gpl-3.0.html',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  }),
  defineWebPage({
    '@type': ['WebPage', 'FAQPage'],
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      'name': f.q,
      'acceptedAnswer': { '@type': 'Answer', 'text': f.a },
    })),
  }),
])
</script>

<template>
  <div>
    <HeroSection />
    <TransportStrip />
    <FeatureGrid />
    <HowItWorks />
    <TrustSection />
    <FaqSection />
    <CtaSection />
  </div>
</template>
