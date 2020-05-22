<template>
  <div id="index">
    <section class="blog-posts">
      <div class="item">
        <figure class="avatar">
          <img src="http://cn.gravatar.com/avatar" alt />
          <figcaption>Gaocarri</figcaption>
        </figure>
        <h3>
          前端异步大揭秘
          <span>3天前</span>
        </h3>
        <p>十大打撒撒旦撒还是打算结婚的喀什的空间dsahddshsdhjahdkasdhdskh飒飒大苏打撒旦大苏打大撒大苏打倒萨倒萨的撒大苏打萨达第三代撒谎第卅打...</p>
      </div>

      <div class="item">
        <figure class="avatar">
          <img src="http://cn.gravatar.com/avatar/1?s=128&d=identicon" alt />
          <figcaption>carrigao</figcaption>
        </figure>
        <h3>
          前端css大揭秘
          <span>3天前</span>
        </h3>
        <p>是的撒到啊撒旦吉萨大开大时代精神的卡了大飒飒的都是撒大大飒飒的开打开打目的是撒旦飒飒的...</p>
      </div>
    </section>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

import request from "@/helpers/request.ts";
import auth from "@/api/auth.ts";
import blog from "@/api/blog.ts";

@Component
export default class Index extends Vue {}
</script>

<style lang='scss' scoped>
@import "~@/assets/style/base.scss";

#index {
  .item {
    display: grid;
    grid: auto auto / 80px 1fr;
    margin: 20px 0;

    .avatar {
      grid-column: 1 / 2;
      grid-row: 1 / 3;
      justify-self: center;
      margin-left: 0;
      text-align: center;

      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }

      figcaption {
        font-size: 12px;
        color: $textLighterColor;
      }
    }
    h3 {
      grid-column: 2/3;
      grid-row: 1/2;
      & > span {
        color: $textLighterColor;
        font-size: 12px;
        font-weight: normal;
      }
    }
  }
  p {
    grid-column: 2;
    grid-row: 2;
    margin-top: 0;
  }
}
</style>
