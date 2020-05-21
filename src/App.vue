<template>
  <div id="app">
    <header-nav></header-nav>
    <main id="main">
      <router-view />
    </main>
    <footer id="footer"></footer>
  </div>
</template>
  <script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

import HeaderNav from "@/components/HeaderNav.vue";

@Component({
  components: {
    HeaderNav
  }
})
export default class Header extends Vue {}
</script>

<style lang="scss">
@import "~@/assets/style/reset.scss";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
