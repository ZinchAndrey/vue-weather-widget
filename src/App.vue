<template>
  <main>
    <the-loader v-if="isLoading"/>
    <weather-card v-else 
      :locationName="locationName"
      :temp="temp"
      :tempMin="tempMin"
      :tempMax="tempMax"
      :weatherType="weatherType"
      :iconCode="iconCode"
      :locationImage="locationImage"
      :currentDate="currentDate"/>
  </main>
</template>

<script>
import TheLoader from '@/components/TheLoader.vue';
import WeatherCard from '@/components/WeatherCard.vue';
import { DateTime } from "luxon";

const APP_ID = '13dd38fa18c0081a1a495152c1ecaeb8';
const CLIENT_ID = 'GenfkElXMTVdD04AQZ-ChLvnHTu-o2UvoKSZMF5tgco';

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
      iconCode: '',
      locationImage: '',

      isLoading: true,
      currentDate: DateTime.now().toFormat("cccc ',' dd LLLL"),
    }
  },
  methods: {
    getTemperature(tempValue) {
      const GAP = 273;
      const temp = Math.round(tempValue - GAP);
      return temp
    },
    async getWeatherData() {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=${APP_ID}`
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    },
    async getPhoto(query) {
      const url = `https://api.unsplash.com/search/photos?client_id=${CLIENT_ID}&query=${query}&per_page=1`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        if (data.results && data.results.length) {
          const targetImgSrc = data.results[0].urls.small;
          return targetImgSrc;
        }
        return;
      }
    },
    loadData() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async position => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;

          const data = await this.getWeatherData();

          this.locationName = data.name;
          this.temp = this.getTemperature(data.main.temp);
          this.tempMin = this.getTemperature(data.main.temp_min);
          this.tempMax = this.getTemperature(data.main.temp_max);
          this.weatherType = data.weather[0].main;
          this.iconCode = data.weather[0].icon;

          this.locationImage = await this.getPhoto(this.locationName);
          this.isLoading = false;
        });
      } else {
        /* местоположение НЕ доступно */
        // как-то сообщение нужно выводить о том, чтобы разрешили доступ к геолокации 
        console.log('Местоположение недоступно');
      }
    },
  },
  mounted() {
    this.loadData();
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
