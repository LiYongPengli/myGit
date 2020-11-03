<template>
  <div class="homeset">
    <header>
      <div class="header">
        <h1>选择您感兴趣的选项</h1>
        <span> 至少选择3个，后期可以调整 </span>
        <div class="tab">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">国家</el-breadcrumb-item>
            <el-breadcrumb-item>媒体</el-breadcrumb-item>
            <el-breadcrumb-item>人物</el-breadcrumb-item>
            <el-breadcrumb-item>推荐频道</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="search">
            
        </div>
      </div>
    </header>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import HomeSetCom from "./HomeSet";
@Component
export default class HomeSet extends mixins(HomeSetCom) {}
</script>

<style lang="scss">
@import "./HomeSet.scss";
</style>
