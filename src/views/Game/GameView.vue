<template>
  <div class="game">
    <div class="game__items">
      <GameLogic
        v-if="!this.$store.state.endGame"
        :sendCheckAnswer="CheckAnswer"
        @sendCheckAnswerBreak="CheckAnswerBreak"
        :sendNextQuestion="NextQuestion"
        @sendNextQuestionBreak="NextQuestionBreak"
      />
      <EndGame v-if="this.$store.state.endGame" />
    </div>

    <div
      v-if="!this.$store.state.endGame"
      class="game__controls"
      style="margin-top: 20rem"
    >
      <button
        v-if="!answered"
        class="game__controls__button --answer"
        v-on:click="CheckAnswer = true"
      >
        <span>Responder</span>
      </button>
      <!-- button siguiente -->
      <button
        v-else
        class="game__controls__button --next"
        v-on:click="NextQuestion = true"
      >
        <span>Continuar</span>
      </button>
    </div>
  </div>
</template>

<script>
import GameLogic from "@/components/GameArea.vue";
import EndGame from "@/components/GameOver.vue";

export default {
  name: "GameView",
  components: {
    GameLogic,
    EndGame,
  },
  data() {
    return {
      endGame: false,

      CheckAnswer: false,
      NextQuestion: false,

      answered: false,

      round: 1,
      answer: "_",
      items: [],
      correctAnswer: [],
      selections: [],
      progress: 10,
      index: 0,
      score: 0,
      statusQuestion: null,
      gameType: null, //pend
    };
  },

  methods: {
    CheckAnswerBreak() {
      this.CheckAnswer = false;
      this.answered = true;
      this.$store.commit("TimeOut", false);
    },
    NextQuestionBreak() {
      this.NextQuestion = false;
      this.answered = false;
      this.$store.commit("TimeOut", false);
    },
  },
};
</script>

<style scoped>
.game {
  /* margin 10% de la pantalla arriba y abajo */
  padding: 15vh 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: var(--color-white);
}

.game__items {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.game__controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

.game__controls__button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 17.4rem;
  height: 5.6rem;
  background-color: var(--color-grey);
  padding: 1rem 2rem;
  margin: 0 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.game__controls__button.--next {
  background-color: var(--color-azure);
}

.game__controls__button span {
  font-size: 1.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-white);
}
.game__controls__button:hover {
  background-color: var(--color-grey-dark);
}
</style>
