<template>
  <div class="editchannel transition-box">
    <div class="window_wrap">
      <div class="top">
        <span @click="toFinish">编辑完成</span>
      </div>
      <!-- 已关注 -->
      <div class="follow">
        <div class="follow_header">已关注</div>
        <div class="follow_list">
          <span
            style="margin: auto; width: max-content"
            v-show="!follow_channel.length"
            >还没有关注任何频道</span
          >
          <span v-for="(v, i) in follow_channel" :key="i"
            >{{ v.name }}<i class="el-icon-close" @click="unfollow(v, i)"></i
          ></span>
        </div>
      </div>
      <!-- 推荐频道 -->
      <div class="channel">
        <div class="channel_header">
          <div class="left">
            <p>推荐频道</p>
            <span>点击添加频道</span>
          </div>
          <div class="right">
            <img src="../../assets/img/sousuo.png" alt="">
            <input v-model="search_channel" type="text" placeholder="请输入关键词" />
          </div>
        </div>
        <div class="channel_list_warp">
          <my-scroll @loading="loadingUnSub">
            <div class="channel_list">
              <span
                style="margin: auto; width: max-content"
                v-show="!channel.length"
                >暂无要推荐的频道</span
              >
              <span
              v-show="showChannelName(v.name)"
                @click="tofollow(v, i)"
                v-for="(v, i) in channel"
                :key="i"
                >{{ v.name }}</span
              >
            </div>
          </my-scroll>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import EditChannelCom from "./EditChannel";
import MyScroll from "@/components/MyScroll.vue";
@Component({
  components: {
    MyScroll,
  },
})
export default class EditChannel extends mixins(EditChannelCom) {}
</script>

<style lang="scss" scoped>
@import "./EditChannel.scss";
</style>