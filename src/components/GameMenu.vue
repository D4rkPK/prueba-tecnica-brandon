<!-- gameMenu view, mostrar resultados -->
<template>
  <div class="gameMenu">
    <h1 class="gameMenu__title">Completa la secuencia</h1>
    <h3 class="gameMenu__subtitle">
      ¿Estás listo para encontrar los números que faltan en las siguientes secuencias?
    </h3>
    <!-- boton continuar push / -->
    <button class="gameMenu__button" v-on:click="goGame()">
      <span>Empezar</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "GameMenu",
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
.gameMenu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: #fff;
}

.gameMenu__title {
  font-size: 9.6rem;
  font-weight: 700;
  color: var(--color-black);
}

.gameMenu__subtitle {
  font-size: 3rem;
  font-weight: 700;
  color: var(--color-steel);
  letter-spacing: 0.03em;
}

.gameMenu__button {
  width: 25.5rem;
  height: 7.6rem;
  border-radius: 40rem;
  background-color: var(--color-azure);
  border: none;
}

.gameMenu__button span {
  font-size: 2.4rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-white);
}
</style>
