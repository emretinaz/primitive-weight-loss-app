/** Fast lengths the user can choose from, in hours. Labels come from the i18n files. */
export const FAST_LENGTH_OPTIONS = [16, 20, 24] as const

export const DEFAULT_FAST_HOURS = 24

/** localStorage key holding the chosen fast length in hours. */
export const FAST_HOURS_STORAGE_KEY = 'fastDurationHours'

/** Parses a stored value, falling back to the default when it isn't a known option. */
export function parseFastHours(raw: string | null): number {
  const parsed = Number.parseInt(raw ?? '', 10)
  return (FAST_LENGTH_OPTIONS as readonly number[]).includes(parsed) ? parsed : DEFAULT_FAST_HOURS
}

/** User settings, persisted in localStorage. Read after mount so SSR matches the first render. */
export function useFastSettings() {
  const fastHours = ref<number>(DEFAULT_FAST_HOURS)
  const durationSeconds = computed(() => fastHours.value * 3600)

  onMounted(() => {
    fastHours.value = parseFastHours(localStorage.getItem(FAST_HOURS_STORAGE_KEY))
  })

  watch(fastHours, (hours) => {
    localStorage.setItem(FAST_HOURS_STORAGE_KEY, String(hours))
  })

  return { fastHours, durationSeconds }
}
