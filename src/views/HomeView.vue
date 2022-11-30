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
  methods: {

    reload() {
      /* push home */
      this.$router.push("/s");
    },
  },
};
</script>

<style scoped>
.home {
  padding: 15vh 0;
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
