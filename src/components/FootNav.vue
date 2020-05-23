<template>
  <footer>
    <p>@GaoCarri 2020</p>
  </footer>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class FootNav extends Vue {}
</script>

<style lang='scss' scoped>
footer {
  align-self: end;
  background-color: #d7d7d7;
  color: #666;
  font-size: 13px;
  padding: 10px;
  text-align: center;
}
</style>
