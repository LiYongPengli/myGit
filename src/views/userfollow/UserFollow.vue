<template>
<!-- 个人中心 我的关注 -->
  <div class="userfollow">
    <div class="top">
      <ul class="top_nav">
        <li class="item">国家</li>
        <li class="item">媒体</li>
        <li class="item">人物</li>
        <li class="item">推荐频道</li>
      </ul>
      <div class="top_search">
        <input type="text" placeholder="请输入国家名称" />
      </div>
    </div>
    <div class="content">
      <!-- 国家 -->
      <country />
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import UserFollowCom from './UserFollow'
import Country from '@/components/country/Country.vue'
@Component({
  components:{
    Country
  }
})
export default class UserFollow extends mixins(UserFollowCom) {

}
</script>

<style lang="scss" scoped>
@import './UserFollow.scss';
</style>