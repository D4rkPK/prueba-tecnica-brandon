<template>
  <!-- progress bar -->
  <div class="progress">
    <div
      class="progress-bar"
      role="progressbar"
      :style="{ width: Progress + '%' }"
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
      Progress: 0,
      Time: 0,
    };
  },

  props: ["setTimeOut"],

  created() {
    this.Time = this.setTimeOut;
  },

  watch: {},

  methods: {
    start() {
      this.Progress = 0;
      this.Time = this.setTimeOut;
      this.timer = setInterval(() => {
        this.Progress += 100 / this.Time;
        this.Time--;
        if (this.Time < 0) {
          clearInterval(this.timer);
          this.$emit("timeOut");
        }
      }, 1000);
    },
    stop() {
      clearInterval(this.timer);
    },
  },
};
</script>
<style scoped>
.progress {
  width: 100%;
  height: 20px;
  background-color: #f1f1f1;
  border-radius: 5px;
  margin: 10px 0;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #ff8001 0%, #ffcc0d 100%);
  border-radius: 5px;
  text-align: center;
  line-height: 20px;
  color: white;
}
</style>
