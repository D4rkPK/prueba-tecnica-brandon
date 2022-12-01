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

      <div class="difficult">
        <!-- selecciona la dificultad -->
        <h1 class="paragraph">Elije una dificultad:</h1>
        <div class="difficult__items">
          <div id="radios">
            <label for="input1"></label>
            <input
              id="input1"
              name="radio"
              type="radio"
              v-model="difficulty"
              value="1"
            />

            <label for="input2"></label>
            <input
              id="input2"
              name="radio"
              type="radio"
              v-model="difficulty"
              value="2"
            />

            <label for="input3"></label>
            <input
              id="input3"
              name="radio"
              type="radio"
              v-model="difficulty"
              value="3"
            />

            <span id="slider"></span>
          </div>
        </div>
        <p class="paragraph">{{ difficulty_description }}</p>
      </div>

      <div class="game__menu__items__item">
        <div @click="goGame()">
          <PrimaryButton :name="'Empezar'" />
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
    return {
      difficulty: 1,
      difficulty_description: "Fácil 😁",
    };
  },

  created() {
    this.$store.commit("Difficulty", this.difficulty);
  },

  watch: {
    difficulty() {
      console.log(this.difficulty, "difficulty");
      this.$store.commit("Difficulty", this.difficulty);

      console.log("difficulty changed", this.$store.state.difficulty);
      if (this.difficulty == 1) {
        this.difficulty_description = "Fácil 😁";
      } else if (this.difficulty == 2) {
        this.difficulty_description = "Medio 😐";
      } else if (this.difficulty == 3) {
        this.difficulty_description = "Difícil 😰";
      }
    },
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

.difficult {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
  color: var(--color-black);
  padding-bottom: 10%;
}

.difficult__items {
  padding: 20px 0 15px 100px;
}

#radios {
  position: relative;
  width: 250px;
  margin: 0 auto;
}
input[type="radio"] {
  position: absolute;
  opacity: 0;
}
label {
  float: left;
  width: 15%;
  padding-bottom: 15%;
  margin: 0 2.5%;
  background: rgba(44, 44, 44, 0.2);
  border-radius: 50%;
  cursor: pointer;
}
#slider {
  position: absolute;
  left: 0%;
  top: 0;
  width: 10%;
  padding-bottom: 10%;
  margin: 2.5% 0 0 5%;
  background: var(--color-azure);
  transition: transform 1s;
  border-radius: 50%;
  animation-timing-function: ease-in-out;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
  transition: 0.2s left 0.05s ease-in-out;
}
#input1:checked ~ #slider {
  animation-name: input1;
  left: 0;
}
#input2:checked ~ #slider {
  animation-name: input2;
  left: 20%;
}
#input3:checked ~ #slider {
  animation-name: input3;
  left: 40%;
}

@keyframes input1 {
  30%,
  70% {
    transform: scale(0.5);
  }
}
@keyframes input2 {
  30%,
  70% {
    transform: scale(0.5);
  }
}
@keyframes input3 {
  30%,
  70% {
    transform: scale(0.5);
  }
}
</style>
