<!-- endGame view, mostrar resultados -->
<template>
  <div class="game__over">
    <div class="game__over__items">
      <div class="game__over__items__item">
        <img src="../assets/Check.svg" alt="check" />
      </div>

      <div class="game__over__items__item">
        <h3 class="subtitle">DESEMPEÑO</h3>
      </div>

      <div class="game__over__items__item">
        <h1 class="title">{{ resultado }}%</h1>
      </div>

      <div class="game__over__items__item">
        <div @click="goHome()">
          <PrimaryButton :name="'Continuar'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PrimaryButton from "@/components/UI_components/PrimaryButton.vue";

export default {
  name: "gameOver",
  components: {
    PrimaryButton,
  },
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
      console.log("go home");
      this.$store.commit("EndGame", false);
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.game__over {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 15vh 0;
}

.game__over__items {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 5vh 0;
}

.game__over__items__item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 15px 0;
}

</style>
