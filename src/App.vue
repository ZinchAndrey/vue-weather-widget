<template>
  <main>
    <weather-card/>
  </main>
</template>

<script>
import WeatherCard from '@/components/WeatherCard.vue';

export default {
  components: {
    WeatherCard,
  }
}
</script>

<style scoped>
main {
  min-height: 100vh;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
