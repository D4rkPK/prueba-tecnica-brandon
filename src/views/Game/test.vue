

<template>
    <div>
       <!-- test de preguntas con de 5 rondas -->
         <div class="game__question">
            <div class="game__question__round">
              <h2>Ronda {{ round }}</h2>
            </div>
            <div class="game__question__question">
              <h2>{{ answer }}</h2>
            </div>
            <div class="game__question__selections">
              <form>
                 <div class="game__question__selections__container">
                <div
                  class="game__question__selections__container__item"
                  v-for="(item, index) in items"
                  :key="index"
                >
                  <button
                     class="game__question__selections__container__item__button"
                     v-on:click="selectItem(item)"
                  >
                     {{ item }}
                  </button>
                </div>
                 </div>
                 <!-- generar botones a partir de items -->
              </form>
            </div>
    </div>
</template>

<script>
    import _ from "lodash";
    export default 


</script>