<!-- endGame view, mostrar resultados -->
<template>
  <div class="endGame">
    <h1>DESEMPEÑO</h1>
    <p>{{ resultado }}%</p>
    <!-- boton continuar push / -->
    <button class="endGame__button" v-on:click="goHome()">Continuar</button>
  </div>
</template>
  
<script>
export default {
  name: "EndGame",
  data() {
    return {
      
    };
  },
  computed: {
    resultado() {
      console.log(this.$store.state.score, 'score');
      return (this.$store.state.score / this.$store.state.rounds) * 100;
    },
  },

  methods: {
    goHome() {
      this.$store.commit("EndGame", false);
      this.$router.push("/");
    },
  },
};
</script>
  
