export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'openlogi-theme'

/**
 * The active theme, shared across every component that calls this.
 *
 * `useState` rather than a module-level ref so the value is per-request on the
 * server; a module ref would leak one visitor's choice into another's render.
 * The site is prerendered as dark — see the inline script in nuxt.config —
 * and this syncs to the visitor's real preference once the client takes over.
 */
export const useTheme = () => {
  const theme = useState<Theme>('theme', () => 'dark')

  const apply = (next: Theme) => {
    theme.value = next
    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', next === 'dark')
      document.documentElement.style.colorScheme = next
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // Private mode, or storage disabled. The choice just will not persist.
      }
    }
  }

  const toggle = () => apply(theme.value === 'dark' ? 'light' : 'dark')

  return { theme, toggle, apply }
}
