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

// The FAQ is rendered on this page, so it is declared here too — Google only
// grants the rich result when the answers are visible on the same URL.
useSchemaOrg([
  defineSoftwareApp({
    name: site.name,
    description: site.description,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Linux',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  }),
  ...faqs.map((f) => defineQuestion({ name: f.q, acceptedAnswer: f.a })),
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
