<template>
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
</template>

<script>
export default {
  name: "TimeBar",
  data() {
    return {
      progress: 0,
    };
  },

  created() {
    setInterval(() => {
      this.progress += 10;
      if (this.progress >= 100) {
        this.progress = 0;
      }
    }, 1000);
  },

  watch: {
    progress: function (val) {
      this.Progress = val;
    },
  },

};
</script>
<style scoped>
.progress{
    width: 100%;
    height: 20px;
    background-color: #f1f1f1;
    border-radius: 5px;
    margin: 10px 0;
}

.progress-bar{
    height: 100%;
    background-color: #4CAF50;
    border-radius: 5px;
    text-align: center;
    line-height: 20px;
    color: white;
}
</style>