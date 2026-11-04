/** Default length of one fast, in seconds (24 hours). */
export const FAST_DURATION_SECONDS = 86400

/** localStorage key holding the fast's start time as Unix seconds. */
export const STORAGE_KEY = 'savedTimeInSeconds'

export type FastStatus = 'loading' | 'idle' | 'fasting' | 'done'

export interface ClockParts {
  hours: string
  minutes: string
  seconds: string
}

/**
 * Seconds left in a fast that started at `startedAtSeconds` and lasts `durationSeconds`.
 * Clamped to [0, durationSeconds], so a start time in the future
 * (clock skew or a hand-edited value) cannot show more than a full fast.
 */
export function getRemainingSeconds(
  startedAtSeconds: number,
  nowSeconds: number,
  durationSeconds: number = FAST_DURATION_SECONDS,
): number {
  const elapsed = Math.max(0, Math.floor(nowSeconds - startedAtSeconds))
  return Math.min(durationSeconds, Math.max(0, durationSeconds - elapsed))
}

/** Splits seconds into zero-padded HH / MM / SS strings. */
export function formatClock(totalSeconds: number): ClockParts {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return {
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  }
}

/**
 * Timer state derived from a stored start time and a fast length.
 * The remaining time is computed from timestamps, so background tabs cannot drift.
 */
export function useFastingTimer(durationSeconds: Ref<number> = ref(FAST_DURATION_SECONDS)) {
  const startedAt = ref<number | null>(null)
  const mounted = ref(false)

  // Ticks once a second on the client only, and stops automatically when the component unmounts.
  const now = useNow({ interval: 1000 })

  const nowSeconds = computed(() => now.value.getTime() / 1000)

  const remainingSeconds = computed(() => {
    if (startedAt.value === null) return durationSeconds.value
    return getRemainingSeconds(startedAt.value, nowSeconds.value, durationSeconds.value)
  })

  const status = computed<FastStatus>(() => {
    if (!mounted.value) return 'loading'
    if (startedAt.value === null) return 'idle'
    return remainingSeconds.value > 0 ? 'fasting' : 'done'
  })

  // Fraction of the fast that has elapsed, from 0 to 1.
  const progress = computed(() => (durationSeconds.value - remainingSeconds.value) / durationSeconds.value)

  const clock = computed(() => formatClock(remainingSeconds.value))

  // Reads the stored start time after mount, so server and client never disagree.
  onMounted(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved !== null) {
      const parsed = Number.parseInt(saved, 10)
      if (!Number.isNaN(parsed)) startedAt.value = parsed
    }
    mounted.value = true
  })

  // Starts a new fast now. Pressing the button again restarts the countdown.
  function start() {
    const nowInSeconds = Math.floor(Date.now() / 1000)
    localStorage.setItem(STORAGE_KEY, String(nowInSeconds))
    startedAt.value = nowInSeconds
  }

  return { status, remainingSeconds, progress, clock, start }
}
