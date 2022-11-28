<!-- endGame view, mostrar resultados -->
<template>
  <div class="endGame">
    <h1>DESEMPEÑO</h1>
    <p>{{resultado}}%</p>
    <!-- boton continuar push / -->
    <button class="endGame__button" v-on:click="goHome()">
      Continuar
    </button>
  </div>
</template>

<script>

export default {
  name: "EndGameView",
  data() {
    return {
      score: 3,  
      rounds: 5,
    };
  },

  computed: {
    /* obtener score de this.$store.commit("setScore", this.score); */
    resultado() {
      /* porcentaje entre score y round sobre el 100% */
        return (this.score / this.rounds) * 100;
    },

  },

  methods: {
    goHome() {
      this.$router.push("/");
    },
  },


};
</script>
