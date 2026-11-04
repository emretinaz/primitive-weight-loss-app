<template>
  <UContainer class="py-6 max-w-sm">
    <header class="text-center">
      <h1 class="page-title">Primitive Weight Loss App</h1>

      <div class="start-area">
        <UButton
          size="xl"
          color="primary"
          class="start-button"
          @click="saveCurrentTimeInSecondsToLocalStorage"
        >
          just 💩
        </UButton>
      </div>
    </header>

    <main class="timer-area">
      <div v-if="(remainingSeconds > 0)" class="base-timer">
        <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g class="base-timer__circle">
            <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
            <path :stroke-dasharray="remainingTimeForDash" class="base-timer__path-remaining" d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "></path>
          </g>
        </svg>

        <div class="base-timer__label">
          <p class="timer-title">Don't Eat</p>
          <p class="timer-digits">{{ hours }} : {{ minutes }} : {{ seconds }}</p>
        </div>
      </div>

      <div v-else-if="(remainingSeconds < 1)" class="done">
        <p class="done__title">Enjoy Your Meal</p>
        <p class="done__emoji">🥘</p>
      </div>
    </main>

    <footer class="footer">
      <p class="quote">Simplicity is the ultimate sophistication <br><i class="quote__author">- Leonardo da Vinci</i></p>
      <p class="disclaimer">P.S. This is not a dietary advice for
        anyone. This site is only made for <b> web development practices</b> and for 📱. <br> Enjoy your meal any time
        😋</p>
    </footer>
  </UContainer>
</template>

<script setup>

const hours = computed(() => {
  const hoursMakeup = Math.floor(remainingSeconds.value / 3600);
  return hoursMakeup < 10 ? `0${hoursMakeup}` : hoursMakeup;
})
const minutes = computed(() => {
  const minutesMakeup = Math.floor((remainingSeconds.value - (hours.value * 3600)) / 60)
  return minutesMakeup < 10 ? `0${minutesMakeup}` : minutesMakeup;
})
const seconds = computed(() => {
  const secondMakeup = remainingSeconds.value - (hours.value * 3600) - (minutes.value * 60);
  return secondMakeup < 10 ? `0${secondMakeup}` : secondMakeup;
})

const remainingTimeForDash = computed(() => {
  const timeFraction = (278 * (1 - (remainingSeconds.value / 86400))).toFixed(2);
  return `${timeFraction} 283`
})

const remainingSeconds = ref(0);

let timer

const saveCurrentTimeInSecondsToLocalStorage = () => {
  const nowInSeconds = Math.floor(Date.now() / 1000);
  localStorage.setItem('savedTimeInSeconds', nowInSeconds);

  remainingSeconds.value = 86400;
}

onMounted(() => {
  // Browser-only: the interval must not start during SSR.
  timer = setInterval(() => { remainingSeconds.value-- }, 1000)

  const getTheSavedSecondsFromLocalStorage = localStorage.getItem('savedTimeInSeconds');
  if (getTheSavedSecondsFromLocalStorage !== null) {
    remainingSeconds.value = 86400 - (Math.floor((Date.now() / 1000) - parseInt(getTheSavedSecondsFromLocalStorage)));
  }
});

onUnmounted(() => {
  clearInterval(timer)
})

</script>

<style scoped>
.page-title {
  font-size: 1.875rem;
  font-weight: 700;
  text-align: center;
}

.start-area {
  height: 3rem;
  margin: 4rem 0;
  display: flex;
  justify-content: center;
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

.base-timer {
  position: relative;
  width: 300px;
  height: 300px;
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
  color: var(--ui-text-muted);
}

.quote__author {
  font-size: 0.875rem;
  color: var(--ui-text-dimmed);
}

.disclaimer {
  padding: 0.5rem;
  text-align: center;
  font-size: 0.75rem;
  color: var(--ui-text-dimmed);
}
</style>
