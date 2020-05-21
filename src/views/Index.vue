<template>
  <div id="index"></div>
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
</style>
