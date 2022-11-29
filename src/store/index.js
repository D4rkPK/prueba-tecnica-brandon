import { createStore } from 'vuex'

export default createStore({
  state: {
    endGame: false,
    score: 0,
    rounds: 0,
  },
  getters: {
  },
  mutations: {
    EndGame(state, payload) {
      state.endGame = payload;
    },
    Score(state, payload) {
      state.score = payload;
    },
    Rounds(state, payload) {
      state.rounds = payload;
    },
  },
  actions: {
  },
  modules: {
  }
})
