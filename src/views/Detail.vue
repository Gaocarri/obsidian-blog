<template>
  <div id="detail">
    <section class="user-info">
      <img :src="user.avatar" :alt="user.username" :title="user.username" class="avatar" />
      <h3>{{title}}</h3>
      <p>
        <router-link :to="`/user/${user.id}`">{{user.username}}</router-link>
        发布于{{friendlyDate(createdAt)}}
      </p>
    </section>

    <section class="article" v-html="markdown"></section>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import marked from "marked";

import blog from "@/api/blog";

@Component
export default class Detail extends Vue {
  title: string = "";
  rawContent: string = "";
  user: any = {};
  createdAt: string = "";
  blogId: number = 0;

  created() {
    this.blogId = Number(this.$route.params.blogId);
    blog.getDetail({ blogId: this.blogId }).then((res: any) => {
      this.title = res.data.title;
      this.rawContent = res.data.content;
      this.createdAt = res.data.createdAt;
      this.user = res.data.user;
    });
  }

  get markdown() {
    return marked(this.rawContent);
  }
}
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
        color: $themeLighterColor;
      }
    }
  }

  .article {
    padding: 30px 0;
    line-height: 50px;
  }
}
</style>
