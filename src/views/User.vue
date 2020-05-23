<template>
  <div id="user">
    <section class="user-info">
      <img :src="user.avatar" :alt="user.username" class="avatar" />
      <h3>{{user.username}}</h3>
    </section>
    <section>
      <router-link class="item" v-for="blog in blogs" :key="blog.id" :to="`/detail/${blog.id}`">
        <div class="date">
          <span class="day">{{splitDate(blog.createdAt).date}}</span>
          <span class="month">{{splitDate(blog.createdAt).month}}月</span>
          <span class="year">{{splitDate(blog.createdAt).year}}</span>
        </div>
        <h3>{{blog.title}}</h3>
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

import blog from "@/api/blog";

@Component
export default class User extends Vue {
  blogs: [] = [];
  user: {} = {};
  page: number = 1;
  total: number = 0;
  userId: any = 0;
  created() {
    this.page = Number(this.$route.query.page) || 1;
    this.userId = Number(this.$route.params.userId) + 2015;
    blog.getBlogsByUserId(this.userId, { page: this.page }).then((res: any) => {
      this.page = res.page;
      this.total = res.total;
      this.blogs = res.data;
      if (res.data.length > 0) {
        this.user = res.data[0].user;
      }
    });
  }

  splitDate(dataStr: any) {
    let dateObj = typeof dataStr === "object" ? dataStr : new Date(dataStr);
    return {
      date: dateObj.getDate(),
      month: dateObj.getMonth() + 1,
      year: dateObj.getFullYear()
    };
  }

  onPageChange(newPage: any) {
    blog.getIndexBlogs({ page: newPage }).then((res: any) => {
      this.blogs = res.data;
      this.total = res.total;
      this.page = res.page;
      const params: any = { page: newPage };
      this.$router.push({ path: `"/user/${this.userId}"`, query: params });
    });
  }
}
</script>

<style lang='scss' scoped>
@import "~@/assets/style/base.scss";

#user {
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
