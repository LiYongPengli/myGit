<template>
  <div class="home">
    <!-- 聊天工具 -->
    <transition name="topic">
      <div v-if="topic_show" class="topic">
        <!-- 聊天工具组件 -->
      </div>
    </transition>
    <div class="body">
      <my-scroll @loading="toLoading" @myscroll="mainPageScroll" class="sydht">
        <!-- 头部导航 -->
        <header-one />
        <!-- 内容主体 -->
        <div class="wrap">
          <router-view />
        </div>
        <footer-two />
      </my-scroll>
    </div>
  </div>
</template>

<script lang="ts">
import HomeCom from "./Home";
import Component, { mixins } from "vue-class-component";
import HeaderOne from "@/components/HeaderOne.vue";
import MyScroll from "@/components/MyScroll.vue";
import FooterTwo from "@/components/FooterTwo.vue"
@Component({
  components: {
    HeaderOne,
    MyScroll,
    FooterTwo
  },
})
export default class Home extends mixins(HomeCom) {}
</script>
<style lang="scss" scoped>
@import "./Home.scss";
</style>
<style lang="scss">
.home {
}
</style>
