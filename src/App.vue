<template>
  <main>
    <the-loader v-if="isLoading"/>
    <weather-card v-else 
      :locationName="locationName"
      :temp="temp"
      :tempMin="tempMin"
      :tempMax="tempMax"
      :weatherType="weatherType"
      :currentDate="currentDate"/>
  </main>
</template>

<script>
import TheLoader from '@/components/TheLoader.vue';
import WeatherCard from '@/components/WeatherCard.vue';
import { DateTime } from "luxon";

const API_KEY = '13dd38fa18c0081a1a495152c1ecaeb8';

export default {
  components: {
    WeatherCard,
    TheLoader
  },
  data() {
    return {
      latitude: '',
      longitude: '',
      locationName: '',
      temp: '',
      tempMin: '',
      tempMax: '',
      weatherType: '',

      isLoading: true,
      currentDate: DateTime.now().toFormat("cccc ',' LL LLLL")
    }
  },
  computed: {
    url() {
      return `https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=${API_KEY}`
    },
  },
  methods: {
    getTemperature(tempValue) {
      const GAP = 273;
      const temp = Math.round(tempValue - GAP);
      return temp
    },
    getCurrentCoordinates() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async position => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          const data = await this.loadData();
          console.log(data);

          this.locationName = data.name;
          this.temp = this.getTemperature(data.main.temp);
          this.tempMin = this.getTemperature(data.main.temp_min);
          this.tempMax = this.getTemperature(data.main.temp_max);
          this.weatherType = data.weather[0].main;
          this.isLoading = false;
        });
      } else {
        /* местоположение НЕ доступно */
        // как-то сообщение нужно выводить о том, чтобы разрешили доступ к геолокации 
        console.log('Местоположение недоступно');
      }

    },
    async loadData() {
      const response = await fetch(this.url);
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    }
  },
  mounted() {
    this.getCurrentCoordinates();
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
