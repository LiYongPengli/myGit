<template>
  <!-- 个人中心 我的关注 -->
  <div class="userfollow">
    <div class="top">
      <ul class="top_nav">
        <li class="item" @click="pageIndex=0" :class="{active:pageIndex==0}">国家</li>
        <li class="item" @click="pageIndex=1" :class="{active:pageIndex==1}">媒体</li>
        <li class="item" @click="pageIndex=2" :class="{active:pageIndex==2}">人物</li>
        <li class="item" @click="pageIndex=3" :class="{active:pageIndex==3}">推荐频道</li>
      </ul>
      <div class="top_search">
        <input type="text" placeholder="请输入国家名称" />
      </div>
    </div>
    <div class="content">
      <!-- 国家 -->
      <div v-if="pageIndex == 0" class="country">
        <country />
      </div>

      <div v-if="pageIndex == 1" class="media">
        <media />
      </div>

      <div v-if="pageIndex == 2" class="media">
        <people />
      </div>

       <div v-if="pageIndex == 3" class="media">
        <channel />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import UserFollowCom from "./UserFollow";
import Country from "@/components/country/Country.vue";
import Media from "@/components/media/Media.vue";
import People from "@/components/people/People.vue";
import Channel from "@/components/channel/Channel.vue";
@Component({
  components: {
    Country,
    Media,
    People,
    Channel
  },
})
export default class UserFollow extends mixins(UserFollowCom) {}
</script>

<style lang="scss" scoped>
@import "./UserFollow.scss";
</style>