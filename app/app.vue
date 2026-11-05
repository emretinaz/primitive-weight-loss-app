<template>
  <UContainer class="app">
    <header class="header">
      <h1 class="page-title">{{ $t('app.title') }}</h1>

      <div class="start-area">
        <UButton
          size="xl"
          color="primary"
          class="start-button"
          @click="start"
        >
          {{ $t('start.button') }}
        </UButton>
      </div>
    </header>

    <main class="timer-area">
      <div v-if="status === 'loading'" class="base-timer-placeholder" aria-hidden="true"></div>

      <div v-else-if="status === 'idle'" class="idle" role="status">
        <p class="idle__title">{{ $t('idle.title') }}</p>
        <p class="idle__text">{{ $t('idle.text', { hours: fastHours }) }}</p>
      </div>

      <div v-else-if="status === 'fasting'" class="base-timer">
        <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <g class="base-timer__circle">
            <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
            <path :stroke-dasharray="ringDash" class="base-timer__path-remaining" d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "></path>
          </g>
        </svg>

        <div class="base-timer__label">
          <p class="timer-title">{{ $t('timer.title') }}</p>
          <p class="timer-digits" role="timer">{{ clock.hours }} : {{ clock.minutes }} : {{ clock.seconds }}</p>
        </div>
      </div>

      <div v-else class="done" role="status" aria-live="polite">
        <p class="done__title">{{ $t('done.title') }}</p>
        <p class="done__emoji" aria-hidden="true">🥘</p>
      </div>
    </main>

    <footer class="footer">
      <p class="quote">
        {{ $t('quote.text') }} <br><i class="quote__author">{{ $t('quote.author') }}</i>
      </p>
      <p class="disclaimer">
        {{ $t('disclaimer.before') }}<b>{{ $t('disclaimer.emphasis') }}</b>{{ $t('disclaimer.after') }}
      </p>
    </footer>

    <div class="install-area">
      <UButton
        v-if="canInstall"
        color="primary"
        variant="soft"
        icon="i-lucide-download"
        @click="install"
      >
        {{ $t('install.button') }}
      </UButton>
      <p v-else-if="showIosHint" class="install-hint">
        {{ $t('install.iosHint') }}
      </p>
      <p v-else-if="showIosSafariHint" class="install-hint">
        {{ $t('install.safariHint') }}
      </p>
    </div>

    <div class="settings-area">
      <UButton
        icon="i-lucide-settings"
        color="neutral"
        variant="ghost"
        :aria-label="$t('settings.open')"
        @click="settingsOpen = true"
      />
    </div>

    <UModal v-model:open="settingsOpen" :title="$t('settings.title')">
      <template #body>
        <fieldset class="settings">
          <legend class="settings__legend">{{ $t('settings.fastLength') }}</legend>
          <URadioGroup
            v-model="fastHours"
            :items="fastLengthItems"
            orientation="vertical"
            size="xl"
            class="settings__options"
          />
        </fieldset>
      </template>
    </UModal>
  </UContainer>
</template>

<script setup lang="ts">
const { t } = useI18n()

// Keeps <html lang> in step with the active locale (en or de).
const localeHead = useLocaleHead({ addDirAttribute: true })
useHead(computed(() => ({ htmlAttrs: { lang: localeHead.value.htmlAttrs?.lang ?? 'en' } })))

// Labels are translated; the values stay numeric for the timer.
const fastLengthItems = computed(() =>
  FAST_LENGTH_OPTIONS.map(hours => ({ value: hours, label: t(`settings.options.${hours}`) })),
)

const settingsOpen = ref(false)
const { canInstall, showIosHint, showIosSafariHint, install } = usePwaInstall()
const { fastHours, durationSeconds } = useFastSettings()
const { status, progress, clock, start } = useFastingTimer(durationSeconds)

// The ring is a stroke-dash arc. 278 is the arc length and 283 the full circumference.
const RING_ARC_LENGTH = 278
const RING_CIRCUMFERENCE = 283

const ringDash = computed(() => `${(RING_ARC_LENGTH * progress.value).toFixed(2)} ${RING_CIRCUMFERENCE}`)
</script>

<style scoped>
.page-title {
  font-size: 1.875rem;
  font-weight: 700;
  text-align: center;
}

.start-area {
  height: 3rem;
  margin: 3rem 0;
  display: flex;
  justify-content: center;
}

.app {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  max-width: 24rem;
}

.header {
  text-align: center;
}

.install-area {
  display: flex;
  justify-content: center;
  text-align: center;
}

.install-hint {
  max-width: 18rem;
  font-size: 0.875rem;
  color: var(--ui-text-toned);
}

.settings-area {
  margin-top: 0rem;
  display: flex;
  justify-content: center;
}

.settings {
  border: 0;
  padding: 0;
  margin: 0;
}

.settings__legend {
  font-weight: 700;
  margin-bottom: 1rem;
}

/* Space out the options so each one is easier to tap */
.settings__options :deep([role="radiogroup"]) {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Tactile "pressed" button effect */
.start-button {
  border: 2px solid #d1d5db;
  border-bottom-width: 6px;
  font-size: 1.25rem;
  font-weight: 700;
  border-radius: 1rem;
  padding: 1rem 1.5rem;
}

.start-button:active {
  border-bottom-width: 2px;
  transform: translateY(4px);
}

.timer-area {
  margin-top: 3rem;
  display: flex;
  justify-content: center;
}

.base-timer,
.base-timer-placeholder {
  position: relative;
  width: 300px;
  height: 300px;
}

.idle {
  width: 300px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.idle__title {
  font-size: 2rem;
  font-weight: 700;
}

.idle__text {
  margin-top: 0.75rem;
  color: var(--ui-text-toned);
}

.base-timer__svg {
  transform: scaleX(-1);
}

.base-timer__circle {
  fill: none;
  stroke: none;
}

.base-timer__path-elapsed {
  stroke-width: 7px;
  stroke: rgb(246, 246, 246);
}

.base-timer__path-remaining {
  stroke-width: 6px;
  stroke-linecap: round;
  transform: rotate(90deg);
  transform-origin: center;
  transition: 1s linear all;
  fill-rule: nonzero;
  stroke: currentColor;
  color: orange;
}

.base-timer__label {
  position: absolute;
  top: 0;
  width: 300px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.timer-title {
  font-size: 3rem;
  line-height: 1;
}

.timer-digits {
  margin-top: 1.25rem;
  color: var(--ui-text-dimmed);
}

.done {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.done__title {
  font-size: 2.25rem;
  font-weight: 700;
}

.done__emoji {
  margin-top: 1.25rem;
  font-size: 8rem;
  line-height: 1;
}

.footer {
  margin-top: 3rem;
}

.quote {
  padding: 0.5rem;
  text-align: center;
  color: var(--ui-text-toned);
}

.quote__author {
  font-size: 0.875rem;
  color: var(--ui-text-toned);
}

.disclaimer {
  padding: 0.5rem;
  text-align: center;
  font-size: 0.75rem;
  color: var(--ui-text-toned);
}
</style>
