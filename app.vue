<template>
  <div>
    <div class="container mt-2 text-center">
      <div>

        <h1 class="text-center font-bold text-3xl">Primitive Weight Loss App</h1>

        <button @click="saveCurrentTimeInSecondsToLocalStorage"
          class="mt-8 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">just
          💩</button>
      </div>

      <div class="mt-12">
        <div class="text-2xl font-bold">{{ hours }} : {{ minutes }} : {{ seconds }}</div>
        <div class="text-2xl my-2">until</div>
        <div class="text-8xl">🥘</div>
      </div>

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

const remainingSeconds = ref(0);
const ticker = computed(() => { setInterval(function () { remainingSeconds.value-- }, 1000) })


const saveCurrentTimeInSecondsToLocalStorage = () => {
  const nowInSeconds = Math.floor(Date.now() / 1000);
  localStorage.setItem('savedTimeInSeconds', nowInSeconds);

  return remainingSeconds.value = 86399;
}

onMounted(() => {
  const getTheSavedSecondsFromLocalStorage = localStorage.getItem('savedTimeInSeconds');

  let sinceSeconds = 0;
  if (getTheSavedSecondsFromLocalStorage !== null) {
    sinceSeconds = Math.floor((Date.now() / 1000) - getTheSavedSecondsFromLocalStorage);
  }

  remainingSeconds.value = 86400 - sinceSeconds;

});

</script>

<style scoped>

</style>
