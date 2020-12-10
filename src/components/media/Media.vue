<template>
    <div class="media">
         <!-- 已关注 -->
    <div class="concerned">
      <p class="concerned_p">媒体已关注</p>
      <ul v-loading="loadFollow">
        <li v-for="(v,i) in mediaFollowList" :key="v.sub_id">
          <div>
            <img src="../../assets/img/followchina.png" alt="">
            <p>{{v.name_zh}}<img @click="unsub(v,i)" src="../../assets/img/close.png" alt=""></p>
          </div>
        </li>
      </ul>
    </div>
    <!-- 未关注 -->
    <div class="noattention">
      <p class="noattention_p">媒体未关注</p>
      <p class="open">
        展开
        <img src="../../assets/img/open.png" alt="">
      </p>
       <ul v-loading="loading">
        <li v-for="(v,i) in mediaList" :key="v.sub_id">
          <div>
            <img src="../../assets/img/followchina.png" alt="">
            <p>{{v.name_zh}}<img @click="addFollow(v,i)" src="../../assets/img/add.png" alt=""></p>
          </div>
        </li>
      </ul>
    </div>
    </div>
</template>
<script lang="ts">
import Component, { mixins } from "vue-class-component";
import MediaCom from "./Media";
@Component
export default class Media extends mixins(MediaCom) {}
</script>
<style lang="scss" scoped>
@import "./Media.scss";
</style>