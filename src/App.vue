<template>
  <router-view />
</template>

<script>
/* si recarga */
export default {
  name: "App",
  mounted() {
    window.addEventListener("beforeunload", this.beforeunload);
    this.$router.push("/");
  },

  methods: {
    beforeunload(e) {
      e.preventDefault();
      e.returnValue = "";
    },
  },
};
</script>
