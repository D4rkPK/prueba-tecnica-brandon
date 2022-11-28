<template>
  <!-- juego de encontrar el numero faltante -->
  <div class="game">
    <!-- progress bar -->
    <div class="progress">
      <div
        class="progress-bar"
        role="progressbar"
        :style="{ width: progress + '%' }"
        aria-valuenow="25"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>

    <h1>Completa la secuencia</h1>
    <p>score {{ score }}</p>
    <p>ronda {{ round }}</p>
    <div class="game__board">
      <div class="game__board__row">
        <!-- form  -->
        <form class="game__board__row__form">
          <div
            class="game__board__row__item"
            v-for="item in items"
            :key="item.id"
          >
            <h3 v-if="item != '?'">{{ item }}</h3>

            <div v-if="item == '?'">
              <h3>{{ answer }}</h3>
              <span v-if="statusQuestion">Correcto</span>
              <span v-if="statusQuestion == false"
                >La respuesta correcta es</span
              >
              <div v-else>
                <button
                  class="game__board__row__item__button"
                  v-for="item in selections"
                  :key="item.id"
                  @click="answer = item"
                >
                  {{ item }}
                </button>
              </div>
            </div>

            <!-- generar botones a partir de items -->
          </div>
        </form>
      </div>
    </div>
    <div class="game__controls">
      <button class="game__controls__button" v-on:click="checkAnswer()">
        Responder
      </button>
      <!-- button siguiente -->
      <button class="game__controls__button" v-on:click="nextQuestion()">
        Continuar
      </button>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "GameView",
  data() {
    return {
      round: 1,
      answer: "_",
      items: [],
      correctAnswer: [],
      selections: [],
      progress: 0,
      index: 0,
      score: 0,

      gameType: null,
    };
  },
  async created() {
    await this.generateItems();

    /*     setInterval(() => {
      this.progress += 10;
      if (this.progress >= 100) {
        this.progress = 0;
        this.generateItems();
      }
    }, 1000); */
  },

  computed: {
    /* actualizar span statusQuestion */
/*     statusQuestion() {
      if (this.answer == this.correctAnswer) {
        return CORREC;
      } else {
        return `${this.correctAnswer[this.index]}`;
      }
    }, */
  },

  methods: {
    nextQuestion() {
      /* hacer hasta que round sea igual a 5 */
      if (this.round < 5) {
        this.round++;
        this.statusQuestion = null;
        this.generateItems();
      } else {
        /* enviar score a /endGame */
        this.$emit("score", this.score);
        this.$router.push("/endGame");
      }
    },

    async generateItems() {
      //const items = _.sampleSize(_.range(1, 10), 7);
      const items = _.range(1, 9);

      /* ordenar items */
      const sortedItems = _.sortBy(items);

      const randomIndex = _.random(0, sortedItems.length - 1);
      this.index = randomIndex;
      sortedItems[randomIndex] = "?";
      this.items = sortedItems;

      this.correctAnswer = _.sortBy(items);

      this.selections = this.correctAnswer.slice(
        randomIndex - 1,
        randomIndex + 2
      );
      console.log(this.selections, "selections");
    },

    checkAnswer() {
      /* remplazar valor ? de items por answer */
      const index = this.items.indexOf("?");
      this.items[index] = parseInt(this.answer);

      console.log(this.items, "items");
      console.log(this.correctAnswer, "correctAnswer");

      /* comparar arrays */
      const isEqual = _.isEqual(this.items, this.correctAnswer);

      if (isEqual) {
        this.score += 1;
        this.statusQuestion = true;
        this.answer = "_";
      } else {
        this.statusQuestion = false;
        this.answer = "_";
        //alert(`Incorrecto, la respuesta es ${this.correctAnswer[this.index]}`);
      }
    },
  },
};
</script>

<style scoped src="./Game.css"></style>
