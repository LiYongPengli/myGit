<template>
  <div class="zhuanti">
    <div class="mycollect">
      <ul class="position">
        <li class="L">
          <a @click="$router.push('/user/collection/0')"> 我的收藏 </a>
          >
          <a> {{ name }} </a>
          <span class="tongji"> 共 {{ list.length }} 篇文章 </span>
        </li>
      </ul>
      <share-content :content="{ name: name }" type="collection">
        <span class="plfx right">分享收藏夹</span>
      </share-content>
    </div>
    <div class="list">
      <my-scroll>
        <ul>
          <list-item :shoControls="['share1','delete']" @ondelete="toDelete(v,i)" :item="v" v-for="(v, i) in list" :key="i" />
          <no-data style="margin-top:100px;" v-if="!loading&&!list.length" />
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
import ShareContent from "@/components/sharecontent/ShareContent.vue";
import VideoThumBnail from "@/components/videothumbnai/VideoThumbnail.vue";
import ListItem from "@/components/ListItem.vue";
import NoData from "@/components/NoData.vue";
@Component({
  components: {
    MyScroll,
    Warning,
    ShareContent,
    VideoThumBnail,
    ListItem,
    NoData
  },
})
export default class Zhuanti extends mixins(ZhuantiCom) {}
</script>

<style lang="scss">
@import "./Zhuanti.scss";
</style>