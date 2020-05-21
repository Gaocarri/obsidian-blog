<template>
  <header>
    <h1>Let's Share</h1>
    <p>精品博客汇聚</p>
    <div class="btns">
      <el-button>登录</el-button>
      <el-button>注册</el-button>
    </div>
  </header>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class HeaderNav extends Vue {}
</script>

<style lang='scss' scoped>
</style>
