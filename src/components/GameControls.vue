<template>
  <div class="game__controls">
    <button class="game__controls__button" v-on:click="this.$store.state.CheckAnswer = true">
      Responder
    </button>
    <!-- button siguiente -->
    <button class="game__controls__button" v-on:click="NextQuestion = true">
      Continuar
    </button>
  </div>
</template>

<script>


export default {
  name: "GameView",
  data() {
    return {

    };
  },

};
</script>
