<template>
  <div class="game__board">
    <div class="game__board__row">
      <!-- title -->
      <h1 class="game__board__row__title">Completa la secuencia</h1>
      <!-- form  -->
      <form class="game__board__row__form">
        <div class="game__board__row__item" v-for="item in items" :key="item">
          <img
            v-if="item !== items[0]"
            class="game__board__row__item__img"
            src="../assets/Union.svg"
            alt="union"
          />
          <div>
            <div v-if="item != '?' && item != answer">
              <span>{{ item }}</span>
            </div>
            <div v-if="item == answer">
              <div
                class="game__board__row__item__answer --correct"
                v-if="statusQuestion.status === 'correct'"
              >
                <span>{{ answer }}</span>
                <img src="../assets/Check.svg" alt="check">
              </div>

              <div
                class="game__board__row__item__answer --incorrect"
                v-if="statusQuestion.status === 'incorrect'"
              >
                <span>{{ answer }}</span>
                <span>{{statusQuestion.result}}</span>
              </div>
            </div>

            <div class="game__board__row__item__answer" v-if="item == '?'">
              <span>{{ answer }}</span>

              <div class="game__board__row__item__answer__buttons">
                <div class="game__board__row__item__answer__buttons__button">
                  <button
                    class="game__board__row__item__answer__buttons__button__item"
                    v-for="selection in selections"
                    :key="selection.id"
                    v-on:click="answer = selection"
                  >
                    {{ selection }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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

      resultQuestion: [],
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
      /* genera un numero randon entre 1 y 3 */
      let random = Math.floor(Math.random() * 3) + 1;

      /* genera un array con el numero random de items */
      const items = _.sortBy(_.range(random, random + 7));

      this.correctAnswer = Object.assign([], items);
      console.log("correctAnswer", this.correctAnswer);
      const randomIndex = _.random(0, items.length - 1);
      console.log("randomIndex", randomIndex);
      this.index = randomIndex;
      items[randomIndex] = "?";
      this.items = items;

      if (randomIndex === 0) {
        this.selections = this.correctAnswer.slice(
          randomIndex,
          randomIndex + 2
        );
        this.selections.unshift(this.selections[0] - 1);
      } else if (randomIndex === 6) {
        this.selections = this.correctAnswer.slice(
          randomIndex - 1,
          randomIndex + 1
        );
        this.selections.push(this.selections[1] + 1);
      } else {
        this.selections = this.correctAnswer.slice(
          randomIndex - 1,
          randomIndex + 2
        );
      }
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
        result = { result: "correct", status: "correct" };
      } else {
        result = {
          result:
            "La respuesta correcta es " +
            this.correctAnswer[this.index],
          status: "incorrect",
        };
      }
      this.$emit("sendCheckAnswerBreak", false);
      return (this.resultQuestion = result);
    },

    /* se acabo el tiempo, respuesta incorrecta */
    timeOut() {
      return (this.resultQuestion =
        "El tiempo se acabo, la respuesta correcta es: " +
        this.correctAnswer[this.index]);
    },

    /* reiniciar juego */
  },
};
</script>

<style scoped>
.game__board {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 1rem;
}

.game__board__row {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 1rem;
}

.game__board__row__title {
  font-size: 3.6rem;
  font-weight: var(--font-weight);
  color: var(--color-black);
  text-align: center;
  margin-bottom: 1rem;
}

.game__board__row__form {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 1rem;
}

.game__board__row__item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  font-size: 9.6rem;
  font-weight: var(--font-weight);
  color: var(--color-black);
  text-align: center;
}

.game__board__row__item__img {
  padding: 3rem;
}

.game__board__row__item__answer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 12.5rem;
  height: 12.5rem;
  align-items: center;
  background: var(--color-white);
  border: 1px dashed #a4a4a4;
  box-shadow: 0px 30px 30px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  font-size: 9.6rem;
  font-weight: var(--font-weight);
  color: var(--color-black);
  text-align: center;
}

/* si .game__board__row__item__answer es correcta  */
.game__board__row__item__answer.--correct {
  border: 0.3rem solid var(--color-turquoise);
  box-shadow: 0px 30px 30px rgba(0, 234, 194, 0.3);
}

.game__board__row__item__answer.--correct img {
  position: absolute;
  padding-top: 25rem;
}

/* si .game__board__row__item__answer es incorrecta  */
.game__board__row__item__answer.--incorrect {
  border: 0.3rem solid var(--color-lightCoral);
  box-shadow: 0px 28.6166px 28.6166px rgba(255, 124, 128, 0.3);
}

.game__board__row__item__answer.--incorrect  span:nth-child(2) {
  position: absolute;
  max-width: 16.8rem;
  padding-top: 25rem;
  font-size: 2.4rem;
  font-weight: var(--font-weight);
  color: var(--color-fireBrick);
}



.game__board__row__item__answer__buttons {
  position: absolute;
  z-index: 1;
}

.game__board__row__item__answer__buttons__button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 15rem;
  gap: 0.97rem;
  background-color: var(--color-lightsteel-blue);
  border: 0.93rem solid var(--color-lightsteel-blue);
  border-radius: 0.97rem;
  box-shadow: 0px 9.7335px 9.7335px #b4d8f4;
}

.game__board__row__item__answer__buttons__button__item {
  /* tamaño cuadrado */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5.3rem;
  height: 5.3rem;
  padding: 1.5rem;
  border: 1px solid var(--color-lightsteel-blue);
  border-radius: 0.436rem;
  font-size: 3.2rem;
  font-weight: var(--font-weight);
  color: var(--color-black);
}

.game__board__row__item__answer__buttons__button__item:hover {
  transform: scale(1.1);
  cursor: pointer;
}
</style>
