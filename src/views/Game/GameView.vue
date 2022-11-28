<template>
  <!-- juego de encontrar el numero faltante -->
  <div class="game">

    <TimeBar />

    <!-- Aca va componente -->
    <GameLogic 
      v-if="!this.$store.state.endGame"
      :sendCheckAnswer="CheckAnswer"
      @sendCheckAnswerBreak="CheckAnswerBreak"
      :sendNextQuestion="NextQuestion"
      @sendNextQuestionBreak="NextQuestionBreak"
    />

    <EndGame v-if="this.$store.state.endGame" />

    <!-- componetne -->

    <div class="game__controls">
      <button class="game__controls__button" v-on:click="CheckAnswer=true">
        Responder
      </button>
      <!-- button siguiente -->
      <button class="game__controls__button" v-on:click="NextQuestion=true">
        Continuar
      </button>
    </div>
  </div>
</template>

<script>
import GameLogic from "@/components/GameLogic.vue";
import EndGame from "@/components/EndGame.vue";
import TimeBar from "@/components/TimeBar.vue";

export default {
  name: "GameView",
  components: {
    GameLogic,
    EndGame,
    TimeBar,
  },
  data() {
    return {
      endGame: false,

      CheckAnswer: false,
      NextQuestion: false,

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
  async created() {
    /*     setInterval(() => {
      this.progress += 10;
      if (this.progress >= 100) {
        this.progress = 0;
        this.generateItems();
      }
    }, 1000); */
  },


  methods: {

    CheckAnswerBreak(){
      this.CheckAnswer = false;
    },

    NextQuestionBreak(){
      this.NextQuestion = false;
    },

  },
};
</script>

<style scoped src="./Game.css"></style>
