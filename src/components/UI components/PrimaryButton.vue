<template>
  <div class="button__animation">
    <button class="button">
      <span>{{ Name }}</span>
    </button>
  </div>

  <svg
    style="visibility: hidden; position: absolute"
    width="0"
    height="0"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
  >
    <defs>
      <filter id="goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
        <feColorMatrix
          in="blur"
          mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
          result="goo"
        />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
      </filter>
    </defs>
  </svg>
</template>

<script>
export default {
  name: "PrimaryButton",
  data() {
    return {
      Name: null,
    };
  },
  props: ["name"],
  created() {
    this.Name = this.name;
  },
};
</script>

<style scoped>
.button__animation {
  padding: 1.5rem 0;
  filter: url("#goo");
}

.button {
  width: 25.5rem;
  height: 7.6rem;
  border-radius: 40rem;
  background-color: var(--color-azure);
  border: none;
}

.button:before,
.button:after {
  width: 7.04em;
  height: 4.72em;
  position: absolute;
  content: "";
  display: inline-block;
  background: var(--color-azure);
  border-radius: 50%;
  transition: transform 1s ease;
  transform: scale(0);
  z-index: -1;
}

.button:hover {
  cursor: pointer;
}
.button:before {
  top: -5%;
  left: 25%;
}
.button:after {
  bottom: -5%;
  right: 25%;
}
.button:hover:before,
.button:hover:after {
  transform: none;
}

.button span {
  font-size: 2.4rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-white);
}
</style>
