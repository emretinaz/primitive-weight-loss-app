/** The non-standard event Chromium fires when the app can be installed. */
export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed', platform: string }>
}

/** iPhone, iPad and iPod never fire `beforeinstallprompt`, so they need a manual hint. */
export function isIosDevice(userAgent: string): boolean {
  return /iphone|ipad|ipod/i.test(userAgent)
}

/**
 * Install state for the PWA.
 * Chromium browsers give us a prompt to trigger later. iOS users get a text hint instead.
 */
export function usePwaInstall() {
  const deferredPrompt = shallowRef<BeforeInstallPromptEvent | null>(null)
  const isIos = ref(false)
  const isStandalone = ref(false)

  const canInstall = computed(() => deferredPrompt.value !== null && !isStandalone.value)
  const showIosHint = computed(() => isIos.value && !isStandalone.value)

  function onBeforeInstallPrompt(event: Event) {
    // Stop the browser's own mini-infobar so we control when the prompt appears.
    event.preventDefault()
    deferredPrompt.value = event as BeforeInstallPromptEvent
  }

  function onAppInstalled() {
    deferredPrompt.value = null
    isStandalone.value = true
  }

  onMounted(() => {
    isIos.value = isIosDevice(navigator.userAgent)
    isStandalone.value = window.matchMedia('(display-mode: standalone)').matches
      || (navigator as Navigator & { standalone?: boolean }).standalone === true
    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
    window.addEventListener('appinstalled', onAppInstalled)
  })

  onUnmounted(() => {
    window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt)
    window.removeEventListener('appinstalled', onAppInstalled)
  })

  // Shows the browser's install dialog. A saved prompt can only be used once.
  async function install(): Promise<'accepted' | 'dismissed' | null> {
    const event = deferredPrompt.value
    if (!event) return null
    await event.prompt()
    const { outcome } = await event.userChoice
    deferredPrompt.value = null
    return outcome
  }

  return { canInstall, showIosHint, install }
}
