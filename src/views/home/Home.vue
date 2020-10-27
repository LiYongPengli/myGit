<template>
  <div class="home">
    <!-- 头部导航 -->

    <header-one />
    <!-- 聊天工具 -->
    <transition name="topic">
      <div v-if="topic_show" class="topic">
        <!-- 聊天工具组件 -->
      </div>
    </transition>
    <div class="body">
      <!-- 内容主体 -->
      <div class="wrap">
        <router-view />
      </div>
      <footer>
        <p>睿读v2.1.35 2018 © 中经软件</p>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import HomeCom from "./Home";
import Component, { mixins } from "vue-class-component";
import HeaderOne from '@/components/HeaderOne.vue'
@Component({
  components:{
    HeaderOne
  }
})
export default class Home extends mixins(HomeCom) {}
</script>
<style lang="scss" scoped>
@import "./Home.scss";
</style>
