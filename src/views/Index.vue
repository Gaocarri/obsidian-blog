<template>
  <div id="index">
    <el-button type="info" plain @click="click1()">信息按钮</el-button>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Index extends Vue {
  click1() {
    this.$alert("这是一段内容", "标题名称", {
      confirmButtonText: "确定",
      callback: action => {
        this.$message({
          type: "info",
          message: `action: ${action}`
        });
      }
    });
  }
}
</script>

<style lang='scss' scoped>
</style>
