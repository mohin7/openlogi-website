/**
 * Adds a one-shot fade-and-rise as an element scrolls into view.
 *
 * IntersectionObserver rather than a scroll listener so the work happens off
 * the main thread, and `unobserve` on first hit so nothing keeps firing after
 * the animation has played. Elements start visible and are only hidden once
 * we know JS is running — that way a no-JS or failed-hydration render shows
 * the content rather than a blank page.
 */
export function useReveal() {
  const el = ref<HTMLElement | null>(null)

  onMounted(() => {
    if (!el.value) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    el.value.style.opacity = '0'
    el.value.style.transform = 'translateY(16px)'
    el.value.style.transition =
      'opacity 0.7s var(--ease-out-quint), transform 0.7s var(--ease-out-quint)'

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const node = entry.target as HTMLElement
          node.style.opacity = '1'
          node.style.transform = 'none'
          observer.unobserve(node)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    )

    observer.observe(el.value)
    onBeforeUnmount(() => observer.disconnect())
  })

  return el
}
