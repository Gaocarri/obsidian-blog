<template>
  <div id="index">
    <section class="blog-posts">
      <router-link
        class="item"
        v-for="(blog,index) in blogs"
        :key="index"
        :to="`/detail/${blog.id}`"
      >
        <figure class="avatar">
          <img :src="blog.user.avatar" :alt="blog.user.username" />
          <figcaption>{{blog.user.username}}</figcaption>
        </figure>
        <h3>
          {{blog.title}}
          <span>{{friendlyDate(blog.createdAt)}}</span>
        </h3>
        <p>{{blog.description}}</p>
      </router-link>
    </section>

    <section class="pagination">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
        @current-change="onPageChange"
      ></el-pagination>
    </section>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

import blog from "@/api/blog.ts";
import dayjs from "dayjs";

@Component
export default class Index extends Vue {
  blogs: [] = [];
  total: number = 0;
  page: number = 1;
  created() {
    this.page = Number(this.$route.query.page) || 1;
    blog.getIndexBlogs({ page: this.page }).then(res => {
      this.blogs = res.data;
      this.total = res.total;
      this.page = res.page;
    });
  }

  getTime(createdAt: any) {
    return (
      dayjs(createdAt).year() +
      "-" +
      (dayjs(createdAt).month() + 1) +
      "-" +
      dayjs(createdAt).date()
    );
  }

  onPageChange(newPage: number) {
    blog.getIndexBlogs({ page: newPage }).then(res => {
      this.blogs = res.data;
      this.total = res.total;
      this.page = res.page;
      const params: any = { page: newPage };
      this.$router.push({ path: "/", query: params });
    });
  }
}
</script>

<style lang='scss' scoped>
@import "~@/assets/style/base.scss";

#index {
  .item {
    display: grid;
    grid: auto auto / 80px 1fr;
    margin: 40px 0;

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

  .pagination {
    display: grid;
    justify-items: center;
    margin-bottom: 30px;
  }
}
</style>
