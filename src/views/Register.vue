<template>
  <div id="register">
    <h4>用户名</h4>
    <input v-model="username" placeholder="用户名" />
    <h4>密码</h4>
    <input v-model="password" type="password" placeholder="密码" @keyup.enter="onRegister" />
    <el-button size="medium" @click="onRegister">立即注册</el-button>
    <p class="notice">
      已有账号?
      <router-link to="/register">立即登录</router-link>
    </p>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Register extends Vue {
  username: string = "";
  password: string = "";

  onRegister() {
    this.$store
      .dispatch("register", {
        username: this.username,
        password: this.password
      })
      .then(() => {
        this.$router.push("/");
      });
  }
}
</script>

<style lang='scss' scoped>
</style>
