<template>
  <div id="detail">还没有写</div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Detail extends Vue {}
</script>

<style lang='scss' scoped>
@import "~@/assets/style/base.scss";
@import "~@/assets/style/article.scss";

#detail {
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
      height: 60px;
      border-radius: 50%;
    }

    h3 {
      grid-column: 2;
      grid-row: 1;

      margin: 5px 0;
    }

    p {
      grid-column: 2;
      grid-row: 2;

      margin-top: 0;
      font-size: 12px;
      color: $textLighterColor;

      a {
        color: $themeColor;
      }
    }
  }

  .article {
    padding: 30px 0;
  }
}
</style>
