<template>
  <div id="app">
    <header-nav id="header" />
    <main id="main">
      <router-view />
    </main>
    <foot-nav id="footer" />
  </div>
</template>
  <script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

import HeaderNav from "@/components/HeaderNav.vue";
import FootNav from "@/components/FootNav.vue";

@Component({
  components: {
    HeaderNav,
    FootNav
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import "~@/assets/style/reset.scss";

html,
body,
#app {
  height: 100%;
}
#app {
  display: grid;
  grid-template-columns: 12% auto 12%;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header header"
    ".  main ."
    "footer footer footer";
}

#header {
  grid-area: header;
  padding-left: 12%;
  padding-right: 12%;
}

#main {
  grid-area: main;
}

#footer {
  grid-area: footer;
  padding-left: 12%;
  padding-right: 12%;
}

@media (max-width: 768px) {
  #app {
    grid-template-columns: 10px auto 10px;
  }
  #header,
  #footer {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
