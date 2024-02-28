<template>
  <div class="card">
    <div class="card__top">
      <span class="card__temp">{{ temp }}°</span>
      <span class="card__city">{{ locationName }}</span>
    </div>
    <div class="card__sub">
      <span class="card__date">
        Wednesday, 25 May
      </span>
      <div class="card__weather-block weather">
        <span class="weather__type">
          {{weatherType}}
        </span>
        <span class="weather__temp">
          {{tempMin}}° / {{ tempMax }}°
        </span>
      </div>
    </div>
  </div>
</template>

<script>
const API_K = '13dd38fa18c0081a1a495152c1ecaeb8';

export default {
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
    }
  },
  computed: {
    url() {
      return `https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=${API_K}`
    }
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
    // this.getCurrentCoordinates();
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 400px;
  min-height: 500px;
  margin: 0 auto;

  border-radius: 20px;
  box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  &__top {
    font-size: 30px;
    line-height: 120%;
    font-weight: 700;
    color: var(--alt-text-color);

    padding: 40px;
    display: flex;
    flex-direction: column;
    background-color: #5f5f5f;

    min-height: 400px;
  }

  &__temp {
    font-size: 40px;
    margin-bottom: 10px;
  }

  &__sub {
    color: var(--text-color);

    display: flex;
    flex-direction: column;
    padding: 20px 30px;
  }

  &__date {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
}

.weather {
  font-weight: 600;
  color: var(--sub-text-color);

  display: flex;
  flex-direction: column;

  &__type {
    margin-bottom: 5px;
  }

  // &__temp {}
}
</style>