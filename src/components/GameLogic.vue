<template>
  <div class="game__board">
    <div class="game__board__row">
      <h1>Completa la secuencia</h1>
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
        <hr />
        <h3>R/{{ answer }}</h3>
        <span>Status:{{ statusQuestion }}</span>
      </form>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "GameLogic",
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
      gameType: null, //pend

      resultQuestion: null,
    };
  },
  props: ["sendCheckAnswer", "sendNextQuestion"],

  computed: {
    statusQuestion() {
      return this.resultQuestion;
    },
  },

  watch: {
    sendCheckAnswer: function (val) {
      if (val) {
        this.checkAnswer();
      }
    },
    sendNextQuestion: function (val) {
      if (val) {
        this.nextQuestion();
      }
    },
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

  methods: {
    nextQuestion() {
      console.log("nextQuestion");
      /* hacer hasta que round sea igual a 5 */
      if (this.round < 5) {
        this.round++;
        this.answer = "_";
        //this.statusQuestion = null;
        this.generateItems();
      } else {
        this.$store.commit("EndGame", true);
        this.$store.commit("Score", this.score);
        this.$store.commit("Rounds", this.round);
      }
      this.$emit("sendNextQuestionBreak", false);
    },

    async generateItems() {
      //const items = _.sampleSize(_.range(1, 10), 7);

      /* genera un rango en secuencua de 7 numeros, entre 1 a 9 */

      const items = _.sortBy(_.range(1, 9));

      this.correctAnswer = Object.assign([], items);
      const randomIndex = _.random(0, items.length - 1);
      this.index = randomIndex;
      items[randomIndex] = "?";
      this.items = items;

      this.selections = this.correctAnswer.slice(
        randomIndex - 1,
        randomIndex + 2
      );
      console.log(this.selections, "selections");
    },

    checkAnswer() {
      console.log("checkAnswer");
      /* remplazar valor ? de items por answer */
      const index = this.items.indexOf("?");
      this.items[index] = parseInt(this.answer);

      console.log(this.items, "items");
      console.log(this.correctAnswer, "correctAnswer");

      /* comparar arrays */
      const isEqual = _.isEqual(this.items, this.correctAnswer);
      let result = null;
      if (isEqual) {
        this.score += 1;
        result = "Correcto";
      } else {
        result =
          "Incorrecto la respuesta correcta es: " +
          this.correctAnswer[this.index];
        //alert(`Incorrecto, la respuesta es ${this.correctAnswer[this.index]}`);
      }
      this.$emit("sendCheckAnswerBreak", false);
      return (this.resultQuestion = result);
    },
  },
};
</script>