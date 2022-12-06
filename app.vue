<template>
  <div>
    <div class="">
      <div class="my-8 mx-auto max-w-sm text-center">

        <h1 class="text-center font-bold text-3xl">Primitive Weight Loss App</h1>

        <button @click="saveCurrentTimeInSecondsToLocalStorage"
          class="mt-8 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">just
          💩</button>
      </div>

      <div class="mt-12 max-w-sm mx-auto text-center">
        <div class="text-2xl font-bold">{{ hours }} : {{ minutes }} : {{ seconds }}</div>
        <div class="text-2xl my-2">until</div>
        <div class="text-8xl">
          <p>🥘</p>
        </div>
      </div>

      <p class="text-gray-300 text-xs absolute w-full p-2 bottom-1 text-center">P.S. This is not a dietary advice for
        anyone. This site is only made for <b> web development practices</b>. Enjoy your meal any time 😋</p>
      <div class="hidden">{{ ticker }}</div>
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

const remainingSeconds = ref(86400);

const ticker = () => {
  if (remainingSeconds.value > 0) {
    setInterval(() => {remainingSeconds.value-- }, 1000)
    clearInterval()
  }
}


const saveCurrentTimeInSecondsToLocalStorage = () => {
  const nowInSeconds = Math.floor(Date.now() / 1000);
  localStorage.setItem('savedTimeInSeconds', nowInSeconds);
  
  ticker();
}

onMounted(() => {
  const getTheSavedSecondsFromLocalStorage = localStorage.getItem('savedTimeInSeconds');
  if (getTheSavedSecondsFromLocalStorage !== null) {
    remainingSeconds.value = 86400 - (Math.floor((Date.now() / 1000) - parseInt(getTheSavedSecondsFromLocalStorage)));
    ticker();
  }
});

</script>
