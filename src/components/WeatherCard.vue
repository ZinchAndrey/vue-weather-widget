<template>
  <div class="card">
    <div class="card__top" :class="cardClasses">
      <span class="card__temp">{{ temp }}°</span>
      <span class="card__city">{{ locationName }}</span>
    </div>
    <div class="card__sub">
      <span class="card__date">
        {{ currentDate }}
      </span>
      <div class="card__weather-block weather">
        <span class="weather__type">
          {{ weatherType }}
        </span>
        <span class="weather__temp">
          {{ tempMin }}° / {{ tempMax }}°
        </span>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  props: {
    temp: {
      type: Number,
      reqiured: true
    },
    locationName: {
      type: String,
      default: ''
    },
    currentDate: {
      type: String,
      default: ''
    },
    weatherType: {
      type: String,
      default: ''
    },
    tempMin: {
      type: Number,
      reqiured: true
    },
    tempMax: {
      type: Number,
      reqiured: true
    },
  },
  computed: {
    cardClasses() {
      return {
        'card--freezing': this.temp <= -20,
        'card--cold': this.temp > -20 && this.temp <= 5,
        'card--normal': this.temp > 5 && this.temp <= 18,
        'card--warm': this.temp > 18 && this.temp <= 25,
        'card--hot': this.temp > 25,
      }
    }
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

  &--freezing {
    background: linear-gradient(90deg, rgba(15, 28, 130, 0.7) 40%, rgba(33, 23, 231, 0.7) 100%);
  }

  &--cold {
    background: linear-gradient(90deg, rgba(25, 48, 222, 0.7) 40%, rgba(54, 94, 234, 0.7) 100%);
  }

  &--normal {
    background: linear-gradient(90deg, rgba(209, 222, 25, 0.7) 40%, rgba(228, 234, 54, 0.7) 100%);
  }

  &--warm {
    background: linear-gradient(90deg, rgba(220, 153, 18, 0.7) 40%, rgba(233, 141, 36, 0.7) 100%);
  }

  &--hot {
    background: linear-gradient(90deg, rgba(205, 71, 22, 0.7) 40%, rgba(213, 66, 21, 0.7) 100%);
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
}
</style>