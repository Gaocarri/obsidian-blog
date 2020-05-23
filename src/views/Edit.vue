<template>
  <div id="edit">
    <h1>编辑</h1>
    <h3>文章标题</h3>
    <el-input v-model="title"></el-input>
    <p class="msg">限30个字</p>
    <h3>内容简介</h3>
    <el-input v-model="description" type="textarea" :autosize="{minRows:2,maxRows:6}"></el-input>
    <p class="msg">限30个字</p>
    <h3>文章内容</h3>
    <el-input type="textarea" v-model="content" :autosize="{minRows:4,maxRows:30}"></el-input>
    <p class="msg">限30个字</p>
    <p>
      <label>是否展示到首页</label>
      <el-switch v-model="atIndex" active-color="#000" inactive-color="#ff4949"></el-switch>
    </p>
    <el-button type="info" plain @click="onEdit">确认修改</el-button>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";

import blog from "@/api/blog";

@Component
export default class Edit extends Vue {
  title: string = "";
  description: string = "";
  content: string = "";
  atIndex: boolean = true;
  blogId: number | null = null;
  created() {
    this.blogId = Number(this.$route.params.blogId);
    blog.getDetail({ blogId: this.blogId }).then((res: any) => {
      this.title = res.data.title;
      this.description = res.data.description;
      this.content = res.data.content;
      this.atIndex = res.data.atIndex;
    });
  }

  onEdit() {
    blog
      .updateBlog(
        { blogId: this.blogId },
        {
          title: this.title,
          content: this.content,
          description: this.description,
          atIndex: this.atIndex
        }
      )
      .then((res: any) => {
        this.$message.success(res.msg);
        this.$router.push({ path: `/detail/${res.data.id - 3795}` });
      });
  }
}
</script>

<style lang='scss' scoped>
#edit {
  padding-bottom: 20px;
  label {
    margin-right: 10px;
  }
}
</style>
