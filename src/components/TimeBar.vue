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
      TimerStatus: false,
      Progress: 0,
      SetTimeOut: 0,
      interval: null,
    };
  },
  props: ["setTimeOut", "timerStatus"],
  created() {
    this.SetTimeOut = this.setTimeOut;
  },
  watch: {
    setTimeOut: function (val) {
      this.SetTimeOut = val;
    },
    timerStatus: function (val) {
      if (val) {
        this.start();
      } else {
        this.stop();
      }
    },
  },
  methods: {
    start() {
      this.Progress = 0;
      this.interval = setInterval(() => {
        this.Progress += 100 / 1000;
        if (this.Progress >= 100 || this.TimerStatus != false) {
          console.log("time out");
          this.$emit("setTimeOutBreak", true);
          clearInterval(this.interval);
        }
      }, this.SetTimeOut / 100);
    },
    stop() {
      this.Progress = 0;
      clearInterval(this.interval);
    },
  },
};
</script>
<style scoped>
.progress {
  width: 100%;
  height: 2rem;
  margin-bottom: 3rem;
}
.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #ff8001 0%, #ffcc0d 100%);
  border-radius: 0px 100px 100px 0px;
}
</style>