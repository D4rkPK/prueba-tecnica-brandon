<template>
<!--   <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/game">About</router-link>
  </nav> -->
  <router-view />
</template>

<style lang="css">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
  font-family: var(--font-family-montserrat);
  scroll-behavior: smooth;
}

:root {
  /* colors */
  --color-grey: #495259;
  --color-steelblue: #2b4457;
  --color-lightsteel-blue: #91a9bc;
  --color-mediumAquamarine: #00987e;
  --color-turquoise: #52e1c9;
  --color-fireBrick: #b60006;
  --color-lightCoral: #ff7c80;
  --color-azure: #ed2a2f;
  --color-steel: #6a7680;
  --color-white: #fff;
  --color-black: #000000;

  /* fonts */
  --font-family-montserrat: "Montserrat", sans-serif;
  --font-size: 1rem;
  --font-weight: 600;
  --font-weight-bold: 700;
}
</style>
