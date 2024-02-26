<template>
  <div class="card">
    <div class="card__top">
      <span class="card__temp">29</span>
      <span class="card__city">Moscow</span>
    </div>
    <div class="card__sub">
      <span class="card__date">
        Wednesday, 25 May
      </span>
      <div class="card__weather-block weather">
        <span class="weather__type">
          Mostly sunny
        </span>
        <span class="weather__temp">
          25 / 30
        </span>
      </div>
    </div>
  </div>
</template>

<script></script>

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