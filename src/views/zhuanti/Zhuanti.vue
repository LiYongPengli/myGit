<template>
  <div class="zhuanti">
    <div class="mycollect">
      <ul class="position">
        <li class="L">
          <a @click="$router.push('/user/collection')"> 我的收藏 </a>
          >
          <a> 特朗普系列 </a>
          <span class="tongji"> 共{{ list.length }}篇文章 </span>
        </li>
      </ul>
      <span class="plfx right">批量分享</span>
    </div>
    <div class="list">
      <my-scroll>
        <ul>
          <li v-for="(v, i) in list" :key="i">
            <div class="pic">
              <img src="../../assets/img/sylbtp.png" alt="" />
            </div>
            <div class="text">
              <p @click="toNewsInfo(v)" class="title">
                {{ v.title }}
              </p>
              <span class="mt">媒体: {{ v.media_name }} </span>
              <span class="time">时间: {{ init_time(v.time) }}</span>
              <span class="ll">浏览次数: {{ v.pv }}</span>
            </div>

            <div class="zan">
              <span @click="toDelete(v, i)" class="shanchu"> 删除</span>
              <span class="fenxiang">分享</span>
            </div>
          </li>
          <!-- <div class="jzgd">更多精彩内容，加载中</div> -->
        </ul>
      </my-scroll>
    </div>
    <transition name="el-fade-in-linear">
      <warning
        v-if="showWarning"
        text="确认要删除该条收藏吗?"
        title="温馨提示"
        top="25vh"
        @sure="sure"
        @ext="ext"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import ZhuantiCom from "./Zhuanti";
import MyScroll from "@/components/MyScroll.vue";
import Warning from "@/components/Warning.vue";
@Component({
  components: {
    MyScroll,
    Warning,
  },
})
export default class Zhuanti extends mixins(ZhuantiCom) {}
</script>

<style lang="scss">
@import "./Zhuanti.scss";
</style>