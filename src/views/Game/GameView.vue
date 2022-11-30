<template>
  <div class="game">
    <div class="game__items">
      <GameArea
        v-if="!this.$store.state.endGame"
        :sendCheckAnswer="CheckAnswer"
        @sendCheckAnswerBreak="CheckAnswerBreak"
        :sendNextQuestion="NextQuestion"
        @sendNextQuestionBreak="NextQuestionBreak"
      />
      <GameOver v-if="this.$store.state.endGame" />

      <div v-if="!this.$store.state.endGame" class="game__controls">
        <button
          v-if="!answered"
          class="game__controls__button"
          v-on:click="CheckAnswer = true"
        >
          <span>Responder</span>
        </button>

        <div v-else class="game__controls__button__next">
          <SecondaryButton @click="NextQuestion = true" :name="'Continuar'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GameArea from "@/components/GameArea.vue";
import GameOver from "@/components/GameOver.vue";
import SecondaryButton from "@/components/UI_components/SecondaryButton.vue";

export default {
  name: "GameView",
  components: {
    GameArea,
    GameOver,
    SecondaryButton,
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
    },
    NextQuestionBreak() {
      this.NextQuestion = false;
      this.answered = false;
    },
  },
};
</script>

<style scoped>
.game {
  padding: 15vh 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.game__items {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: var(--background-color);
}

.game__controls {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
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

.game__controls__button span {
  font-size: 1.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-white);
}
.game__controls__button:hover {
  background-color: var(--color-azure);
  transform: scale(1.05);
}

.game__controls__button__next {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  padding-right: 50px;
}

/* breakpoint pantalla menor de 650px */
@media (max-width: 650px) {
  .game__controls__button__next {
    padding-right: 20px;
  }
}
</style>
