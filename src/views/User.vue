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
          <span class="month">{{splitDate(blog.createdAt).month}}</span>
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
    this.userId = this.$route.params.userId;
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
    blog.getIndexBlogs({ page: newPage }).then(res => {
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
.pagination {
  display: grid;
  justify-items: center;
  margin-bottom: 30px;
}
</style>
