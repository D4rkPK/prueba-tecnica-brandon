<!-- game__menu view, mostrar resultados -->
<template>
  <div class="game__menu">
    <div class="game__menu__items">
      <div class="game__menu__items__item">
        <h1 class="title">Completa la secuencia🚀</h1>
      </div>

      <div class="game__menu__items__item">
        <h3 class="subtitle">
          ¿Estás listo para encontrar los números que faltan en las siguientes
          secuencias?
        </h3>
      </div>

      <div class="game__menu__items__item">
        <div @click="goGame()">
          <PrimaryButton :name="'Continuar'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PrimaryButton from "@/components/UI_components/PrimaryButton.vue";

export default {
  name: "gameMenu",
  components: {
    PrimaryButton,
  },
  data() {
    return {};
  },

  methods: {
    goGame() {
      this.$router.push("/game");
    },
  },
};
</script>

<style scoped>
.game__menu {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--background-color);
}

.game__menu__items {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.game__menu__items__item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

</style>
