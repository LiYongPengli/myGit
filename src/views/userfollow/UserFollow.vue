<template>
  <!-- 个人中心 我的关注 -->
  <div class="userfollow">
    <div class="top">
      <ul class="top_nav">
        <li class="item" @click="chooseItem('country')" :class="{active:$route.params.type=='country'}">国家</li>
        <li class="item" @click="chooseItem('media')" :class="{active:$route.params.type=='media'}">媒体</li>
        <li class="item" @click="chooseItem('people')" :class="{active:$route.params.type=='people'}">人物</li>
        <li class="item" @click="chooseItem('channel')" :class="{active:$route.params.type=='channel'}">推荐频道</li>
      </ul>
      <div class="top_search">
        <div @click="searchText=''" v-show="searchText" class="clear el-icon-close"></div>
        <img v-show="!searchText" src="../../assets//img/scsearch.png" alt="">
        <input v-model="searchText" type="text" :placeholder="getPlaceHolder()" />
      </div>
    </div>
    <div class="content">
      <!-- 国家 -->
      <div v-if="$route.params.type=='country'" class="country">
        <country :search="searchText" />
      </div>

      <div v-if="$route.params.type=='media'" class="media">
        <media :search="searchText" />
      </div>

      <div v-if="$route.params.type=='people'" class="media">
        <people :search="searchText" />
      </div>

       <div v-if="$route.params.type=='channel'" class="media">
        <channel :search="searchText" />
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