<template>
  <div class="home">
    <div class="home__items">
      <GameMenu />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import GameMenu from "@/components/GameMenu.vue";

export default {
  name: "HomeView",
  components: {
    GameMenu,
  },
};
</script>

<style>
.home {
  /* margin 10% de la pantalla arriba y abajo */
  padding: 10vh 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: var(--color-white);
}

.home__items {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
