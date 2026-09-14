<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <SiteHeader />
    <main class="container-page flex flex-1 items-center justify-center py-24">
      <div class="max-w-md text-center">
        <p class="font-mono text-sm text-accent">{{ error.statusCode }}</p>
        <h1
          class="text-gradient mt-4 text-3xl font-semibold tracking-[var(--tracking-display)] sm:text-4xl"
        >
          {{ error.statusCode === 404 ? 'Page not found' : 'Something broke' }}
        </h1>
        <p class="mt-4 text-base text-pretty text-ink-2">
          {{
            error.statusCode === 404
              ? 'That page does not exist. It may have moved, or the link may be wrong.'
              : 'An unexpected error occurred. Try again, or head back to the start.'
          }}
        </p>
        <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <UiButton to="/">
            <Icon name="lucide:arrow-left" class="size-4" />
            Back home
          </UiButton>
          <UiButton to="/docs" variant="secondary">Read the docs</UiButton>
        </div>
      </div>
    </main>
    <SiteFooter />
  </div>
</template>
