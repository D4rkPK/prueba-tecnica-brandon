import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/game',
    name: 'game',
    component: () => import(/* webpackChunkName: "about" */ '../views/Game/GameView.vue')
  },
  {
    path: '/endGame',
    name: 'endGame',
    component: () => import(/* webpackChunkName: "about" */ '../views/EndGame/EndGameView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
