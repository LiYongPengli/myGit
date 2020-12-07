<template>
  <div :style="{'padding-left':topic_show?'10px':''}" class="home">
    <my-scroll @loading="toLoading" @myscroll="mainPageScroll" class="sydht">
      <div class="body">
        <!-- 头部导航 -->
        <header-one />
        <!-- 内容主体 -->
        <router-view />
        <footer-two />
      </div>
    </my-scroll>
  </div>
</template>

<script lang="ts">
import HomeCom from "./Home";
import Component, { mixins } from "vue-class-component";
import HeaderOne from "@/components/HeaderOne.vue";
import MyScroll from "@/components/MyScroll.vue";
import FooterTwo from "@/components/FooterTwo.vue";
@Component({
  components: {
    HeaderOne,
    MyScroll,
    FooterTwo,
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
