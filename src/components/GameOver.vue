<!-- endGame view, mostrar resultados -->
<template>
  <div class="endGame">
    <img src="../assets/Check.svg" alt="check" />
    <h3 class="endGame__title">DESEMPEÑO</h3>
    <h1 class="endGame__subtitle">{{ resultado }}%</h1>
    <!-- boton continuar push / -->
    <button class="endGame__button" v-on:click="goHome()">
      <span>Continuar</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "EndGame",
  data() {
    return {};
  },
  computed: {
    resultado() {
      console.log(this.$store.state.score, "score");
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

<style scoped>
.endGame {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: #fff;
}

.endGame__title {
  font-size: 3rem;
  font-weight: 700;
  color: var(--color-steel);
  letter-spacing: 0.03em;
}

.endGame__subtitle {
  font-size: 9.6rem;
  font-weight: 700;
  color: var(--color-black);
}

.endGame__button {
  width: 25.5rem;
  height: 7.6rem;
  border-radius: 40rem;
  background-color: var(--color-azure);
  border: none;
}

.endGame__button span {
  font-size: 2.4rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-white);
}
</style>
