<template>
  <div class="">
    <div>
      <div class="mt-4 mx-auto max-w-sm text-center">

        <h1 class="text-center font-bold text-3xl">Primitive Weight Loss App</h1>

        <div class="h-12 my-16">
          <button @click="saveCurrentTimeInSecondsToLocalStorage"
            class="py-4 px-6 text-white text-xl font-bold bg-blue-500 hover:bg-blue-600 rounded-2xl border-gray-300 border-2 border-b-[6px] active:border-b-[2px] active:translate-y-[4px] active:border-[2px] ">
            just 💩
          </button>
        </div>

      </div>

      <div class="mt-12 max-w-sm mx-auto flex justify-center">

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
            <p class="text-5xl">Don't Eat</p>
            <p class="text-gray-300 mt-5">{{ hours }} : {{ minutes }} : {{ seconds }}</p>
          </div>
        </div>

        <div v-else-if="(remainingSeconds < 1)"
          class="mt-12 max-w-sm mx-auto flex flex-col justify-center items-center">
          <p class="text-4xl font-bold text-center">Enjoy Your Meal</p>
          <p class="mt-5 text-9xl">🥘</p>
        </div>
      </div>

      <div class="mt-12 max-w-sm mx-auto">
        <p class="text-gray-500 p-2 text-center text-base">Simplicity is the ultimate sophistication <br><i
            class="text-sm text-gray-400">- Leonardo da Vinci</i></p>
        <p class="text-gray-300 text-xs p-2 text-center">P.S. This is not a dietary advice for
          anyone. This site is only made for <b> web development practices</b> and for 📱. <br> Enjoy your meal any time
          😋</p>
      </div>
    </div>
  </div>
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

const timer = setInterval(() => { remainingSeconds.value-- }, 1000)

const saveCurrentTimeInSecondsToLocalStorage = () => {
  const nowInSeconds = Math.floor(Date.now() / 1000);
  localStorage.setItem('savedTimeInSeconds', nowInSeconds);

  remainingSeconds.value = 86400;

  timer
}

onMounted(() => {
  const getTheSavedSecondsFromLocalStorage = localStorage.getItem('savedTimeInSeconds');
  if (getTheSavedSecondsFromLocalStorage !== null) {
    remainingSeconds.value = 86400 - (Math.floor((Date.now() / 1000) - parseInt(getTheSavedSecondsFromLocalStorage)));
    timer
  }
});

onUnmounted(() => {
  clearInterval(timer)
})

</script>

<style lang="scss">
.base-timer {
  position: relative;
  width: 300px;
  height: 300px;

  &__svg {
    transform: scaleX(-1);
  }

  &__circle {
    fill: none;
    stroke: none;
  }

  &__path-elapsed {
    stroke-width: 7px;
    stroke: rgb(246, 246, 246);
  }

  &__path-remaining {
    stroke-width: 6px;
    stroke-linecap: round;
    transform: rotate(90deg);
    transform-origin: center;
    transition: 1s linear all;
    fill-rule: nonzero;
    stroke: currentColor;
    color: orange;
  }

  &__label {
    position: absolute;
    width: 300px;
    height: 300px;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

.submit-button {
  border-radius: 16px;
  border: 2px solid lightgray;
  border-bottom: 6px solid lightgray;
  margin-top: 16px;
  transition: all 0.1s;
  display: inline-flex;
  padding: 12px 16px;
}

.submit-button:hover {
  // background-color: #ddf4ff;
  // border-color: #1cb0f6;
}

.submit-button:active {
  border-bottom: 2px solid #1cb0f6;
  transform: translateY(4px);
}
</style>
