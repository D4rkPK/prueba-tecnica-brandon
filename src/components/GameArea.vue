<template>
  <div class="timeBar">
    <TimeBar
      :setTimeOut="1000"
      :timerStatus="timerStatus"
      @setTimeOutBreak="checkAnswer"
    />
  </div>
  <div class="game__area">
    <div class="game__area__row">
      <!-- title -->
      <h1 class="game__area__row__title">Completa la secuencia</h1>

      <div class="game__area__row__container">
        <div class="game__area__row__items" v-for="item in items" :key="item">
          <div class="game__area__row__items__item">
            <img
              v-if="item !== items[0]"
              class="game__area__row__items__img"
              src="../assets/Union.svg"
              alt="union"
            />
            <div v-if="item != '?'">
              <span>{{ item }}</span>
            </div>

            <div v-if="item == '?'">
              <div
                class="game__area__row__items__answer --correct"
                v-if="statusQuestion.status === 'correct'"
              >
                <span>{{ answer }}</span>
                <img src="../assets/Check.svg" alt="check" />
              </div>

              <div
                class="game__area__row__items__answer --incorrect"
                v-if="statusQuestion.status === 'incorrect'"
              >
                <span>{{ answer }}</span>
                <span>{{ statusQuestion.result }}</span>
              </div>

              <div
                class="game__area__row__items__answer"
                v-if="statusQuestion.status == null"
              >
                <span>{{ answer }}</span>

                <div class="game__area__row__items__answer__buttons">
                  <div class="game__area__row__items__answer__buttons__button">
                    <button
                      class="
                        game__area__row__items__answer__buttons__button__item
                      "
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import TimeBar from "./TimeBar.vue";

export default {
  name: "GameLogic",
  components: {
    TimeBar,
  },
  data() {
    return {
      round: 1,
      answer: null,

      items: [],
      correctAnswer: [],
      selections: [],
      progress: 0,
      index: 0,
      score: 0,
      timerStatus: false,
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
    console.log("created", this.$store.state.difficulty);
    /* log emit difficulty */
    console.log(this.$emit('difficulty'), "emit difficulty");
    await this.generateItems(this.$store.state.difficulty);
    this.timerStatus = true;
  },

  methods: {
    nextQuestion() {
      console.log("nextQuestion");
      /* hacer hasta que round sea igual a 5 */
      if (this.round < 5) {
        this.round++;
        this.answer = null;
        this.generateItems(this.$store.state.difficulty);
        this.timerStatus = true;
      } else {
        this.$store.commit("EndGame", true);
        this.$store.commit("Score", this.score);
        this.$store.commit("Rounds", this.round);
      }
      this.statusQuestion.status = null;
      this.$emit("sendNextQuestionBreak", false);
    },

    /* verificar si son primos */
    isPrime(num) {
      for (let i = 2; i < num; i++) {
        if (num % i === 0) {
          return false;
        }
      }
      return num > 1;
    },

    async generateItems(gameType) {
      console.log(gameType, "gameType");
      let items = [];
      if (gameType == 1 || gameType == 2) {
        let random = Math.floor(Math.random() * 3) + 1;
        /* genera un array con el numero random de items */
        items = _.sortBy(_.range(random, random + 7));
      } else if (gameType == 3) {
        /* genera un numero random maximo a 67, para dejar 7 posibilidades hasta el 97 */
        let random = Math.floor(Math.random() * 67) + 1;
        let primeNumbers = [];
        let number = random;
        while (primeNumbers.length < 7) {
          if (this.isPrime(number)) {
            primeNumbers.push(number);
          }
          number++;
        }
        items = primeNumbers;
        console.log(items, "primeNumbers");
      }

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

      if(gameType != 1){
        /* sumar numeros random al inicio y al final */
        this.selections[0] = this.selections[0] + Math.floor(Math.random() * 10) + 1;
        this.selections[2] = this.selections[2] + Math.floor(Math.random() * 10) + 1;

        /* mezclar selections */
        this.selections = _.shuffle(this.selections);
        
      }
      console.log(this.selections, "selections");
    },

    checkAnswer() {
      this.timerStatus = false;
      let newArray = Object.assign([], this.items);
      console.log("newArray", newArray);
      const index = newArray.indexOf("?");
      console.log("index newArray", index);
      newArray[index] = parseInt(this.answer);
      console.log("newArray2", newArray);
      console.log(this.items, "items");
      console.log(newArray, "newArray");
      console.log(this.correctAnswer, "correctAnswer");

      /* comparar arrays */
      const isEqual = _.isEqual(newArray, this.correctAnswer);
      let result = null;
      if (isEqual) {
        this.score += 1;
        result = { result: "correct", status: "correct" };
        console.log("correct");
      } else {
        result = {
          result: "La respuesta correcta es " + this.correctAnswer[this.index],
          status: "incorrect",
        };
        console.log("incorrect");
      }
      this.$emit("sendCheckAnswerBreak", false);
      return (this.resultQuestion = result);
    },
  },
};
</script>

<style scoped>
.timeBar {
  width: 100%;
}
.game__area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 1rem;
}

.game__area__row {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 1rem;
}

.game__area__row__title {
  font-size: 3.6rem;
  font-weight: var(--font-weight);
  color: var(--color-black);
  text-align: center;
  margin-bottom: 1rem;
}

.game__area__row__container {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  max-width: 1200px;
  height: 100%;
  padding: 0 1rem;
  margin-left: -100px;
}

.game__area__row__items {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 9.6rem;
  font-weight: var(--font-weight);
  color: var(--color-steelblue);
  text-align: center;
}

.game__area__row__items__item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.game__area__row__items:nth-child(1) {
  padding-left: 100px;
}

.game__area__row__items__img {
  display: flex;
  height: 100%;
  padding: 0 30px;
}

.game__area__row__items__answer {
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
  color: var(--color-steelblue);
  text-align: center;
}

/* si .game__area__row__items__answer es correcta  */
.game__area__row__items__answer.--correct {
  border: 0.3rem solid var(--color-turquoise);
  box-shadow: 0px 30px 30px rgba(0, 234, 194, 0.3);
}

.game__area__row__items__answer.--correct img {
  position: absolute;
  padding-top: 25rem;
}

/* si .game__area__row__items__answer es incorrecta  */
.game__area__row__items__answer.--incorrect {
  border: 0.3rem solid var(--color-lightCoral);
  box-shadow: 0px 30px 30px rgba(255, 124, 128, 0.3);
}

.game__area__row__items__answer.--incorrect span:nth-child(2) {
  position: absolute;
  max-width: 16.8rem;
  padding-top: 25rem;
  font-size: 2.4rem;
  font-weight: var(--font-weight);
  color: var(--color-fireBrick);
}

.game__area__row__items__answer__buttons {
  position: absolute;
  z-index: 1;
}

.game__area__row__items__answer__buttons__button {
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

.game__area__row__items__answer__buttons__button__item {
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
  color: var(--color-steelblue);
}

.game__area__row__items__answer__buttons__button__item:hover {
  transform: scale(1.1);
  cursor: pointer;
}

/* breakpoint pantalla menor de 1250px */
@media (max-width: 1250px) {
  .game__area__row__items {
    font-size: 6.2rem;
  }

  .game__area__row__container {
    max-width: 950px;
    margin-left: -50px;
  }

  .game__area__row__items__answer {
    font-size: 6.2rem;
  }

  .game__area__row__items__answer.--correct {
    box-shadow: 0px 20px 20px rgba(0, 234, 194, 0.3);
  }

  .game__area__row__items__answer.--correct img {
    position: absolute;
    padding-top: 22rem;
  }

  .game__area__row__items__answer.--incorrect {
    box-shadow: 0px 20px 20px rgba(255, 124, 128, 0.3);
  }

  .game__area__row__items__answer.--incorrect span:nth-child(2) {
    position: absolute;
    max-width: 16.8rem;
    padding-top: 20rem;
    font-size: 2.4rem;
  }

  .game__area__row__items:nth-child(1) {
    padding-left: 50px;
  }

  .game__area__row__items__img {
    padding: 0 15px;
  }
}

/* breakpoint pantalla menor de 850px */
@media (max-width: 850px) {
  .game__area__row__items {
    font-size: 3.8rem;
  }

  .game__area__row__items:nth-child(1) {
    padding-left: 0px;
  }

  .game__area__row__container {
    max-width: 550px;
    margin-left: -40px;
  }

  .game__area__row__items__answer {
    width: 8.5rem;
    height: 8.5rem;
    background: var(--color-white);
    box-shadow: 0px 15px 15px rgba(0, 0, 0, 0.05);
    border-radius: 20px;
    font-size: 3.8rem;
  }

  .game__area__row__items__answer.--correct {
    box-shadow: 0px 15px 15px rgba(0, 234, 194, 0.3);
  }

  .game__area__row__items__answer.--correct img {
    position: absolute;
    padding-top: 18rem;
  }

  .game__area__row__items__answer.--incorrect {
    box-shadow: 0px 15px 15px rgba(255, 124, 128, 0.3);
  }

  .game__area__row__items__answer.--incorrect span:nth-child(2) {
    position: absolute;
    max-width: 16.8rem;
    padding-top: 16rem;
    font-size: 2.4rem;
  }

  .game__area__row__items__img {
    padding: 0 10px;
  }
}

/* breakpoint pantalla menor de 650px */
@media (max-width: 650px) {

  .game__area__row {
    display: flex;
    flex-direction: column; 
    align-items: center;

    
  }
  .game__area__row__items {
    font-size: 3rem;
  }

  .game__area__row__items img {
    width: 3rem;
  }


  .game__area__row__container {
    grid-template-columns: repeat(7, 1fr);
    width: 270px;
    margin-left: -40px;
  }

  .game__area__row__items__answer {
    width: 4.5rem;
    height: 4.5rem;
    background: var(--color-white);
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    font-size: 2.8rem;
  }

  .game__area__row__items__answer.--correct {
    box-shadow: 0px 10px 10px rgba(0, 234, 194, 0.3);
  }

  .game__area__row__items__answer.--correct img {
    position: absolute;
    padding-top: 14rem;
  }

  .game__area__row__items__answer.--incorrect {
    box-shadow: 0px 10px 10px rgba(255, 124, 128, 0.3);
  }

  .game__area__row__items__answer.--incorrect span:nth-child(2) {
    position: absolute;
    max-width: 16.8rem;
    padding-top: 12rem;
    font-size: 1.6rem;
  }
  .game__area__row__items__img {
    padding: 0 5px;
  }

  .game__area__row__items__answer__buttons__button {
    margin-top: 8rem;
    gap: 0.5rem;
    background-color: var(--color-lightsteel-blue);
    border: 0.5rem solid var(--color-lightsteel-blue);
    border-radius: 0.97rem;
    box-shadow: 0px 7.7335px 7.7335px #b4d8f4;
  }

  .game__area__row__items__answer__buttons__button__item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3.5rem;
    height: 3.5rem;
    padding: 1.2rem;
    border: 1px solid var(--color-lightsteel-blue);
    border-radius: 0.436rem;
    font-size: 3rem;
    font-weight: var(--font-weight);
    color: var(--color-steelblue);
  }

  .game__area__row__items__answer__buttons__button__item:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
}
</style>
