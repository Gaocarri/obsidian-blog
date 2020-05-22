<template>
  <div id="my">
    <section class="user-info">
      <img src="123" alt class="avatar" />
      <h3>gaocarri</h3>
    </section>

    <section>
      <div class="item">
        <div class="date">
          <span class="day">20</span>
          <span class="month">5月</span>
          <span class="year">2018</span>
        </div>
        <h3>前端异步解密</h3>
        <p>山东省十大大苏打撒旦看sdsdssdadds撒大苏打实打实大苏打实打实大苏打实打实到你萨克那s撒旦飒飒的飒飒大苏打实打实大苏打实打实是的撒大苏打实打实实打实水水水水水水水杀杀杀杀杀杀杀杀杀你打算打算看看九十多岁的可是垃圾丢三落四看到就开始大肆罗迪克</p>
        <div class="actions">
          <router-link to="/edit">编辑</router-link>
          <a href="#">删除</a>
        </div>
      </div>

      <div class="item">
        <div class="date">
          <span class="day">20</span>
          <span class="month">5月</span>
          <span class="year">2018</span>
        </div>
        <h3>前端异步解密</h3>
        <p>山东省十大大苏打撒旦看到你萨克那你打算打算看看九十多岁的可是垃圾丢三落四看到就开始大肆罗迪克</p>
        <div class="actions">
          <router-link to="/edit">编辑</router-link>
          <a href="#">删除</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class My extends Vue {}
</script>

<style lang='scss' scoped>
@import "~@/assets/style/base.scss";

#my {
  .user-info {
    display: grid;
    grid: auto auto / 80px 1fr;

    margin-top: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ebebeb;
    .avatar {
      grid-column: 1;
      grid-row: 1 / span 2;
      width: 60px;
      height: 60x;
      border-radius: 50%;
    }
    h3 {
      grid-column: 2;
      grid-row: 1;
      margin-top: 10px;
    }
  }

  .item {
    display: grid;
    grid: auto auto auto / 80px 1fr;
    margin: 20px 0;

    .date {
      grid-column: 1;
      grid-row: 1 / span 3;
      justify-self: center;
      text-align: center;

      span {
        display: block;
        color: $textLighterColor;
      }

      .day {
        font-size: 40px;
      }
    }

    h3 {
      grid-column: 2;
      grid-row: 1;
    }

    p {
      grid-column: 2;
      grid-row: 2;
      margin-top: 0;
    }

    .actions {
      grid-column: 2;
      grid-row: 3;
      font-size: 12px;

      a {
        color: $themeLighterColor;
        margin-right: 20px;
      }
    }
  }
}
</style>
