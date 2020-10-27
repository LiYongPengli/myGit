<template>
  <!-- 热门推荐 -->
  <div class="recommend">
    <div class="mainpage">
      <div @click="toNewsInfo" class="banner">
        <img src="../../assets/img/banner.png" alt="" />
        <a class="banner-p">福奇公开与特朗普唱反调 称美疫情或持续至明年底</a>
        <p class="load"></p>
      </div>
      <div class="list_wrap">
        <div class="list_nav">
          <span
            class="recommend"
            @click="change_recommend(0, '推荐')"
            :class="{ cur: active_recommend == 0 }"
            >推荐</span
          >
          <!-- <span class="selected swiper-slide-active">推荐</span> -->
          <div class="swiper-container" id="swiper1">
            <div class="swiper-wrapper">
              <!-- <span class="swiper-slide swiper-slide-next">菜单 2</span> -->
              <div v-for="(v, i) in channel" :key="i" class="swiper-slide">
                <span
                  @click="change_recommend(i + 1, v.name)"
                  :class="{ cur: active_recommend == i + 1 }"
                  >{{ v.name }}</span
                >
              </div>
            </div>
          </div>
          <span class="bj" @click="setEditChannel(true)">编辑</span>
        </div>
        <div class="list">
          <ul>
            <li v-for="(v, i) in newsList" :key="i">
              <div v-if="v.thumb" class="pic">
                <img :src="v.thumb" alt="" />
              </div>
              <div class="text">
                <p class="title">{{ v.title }}</p>
                <span class="mt">媒体: {{ v.media }} </span>
                <span class="time">时间: {{ init_time(v.time) }}</span>
                <span class="ll">浏览次数: {{ v.pv }}人</span>
              </div>

              <div class="zan">
                <img src="../../assets/img/zanpress.png" alt="" />
                <span>{{ v.like }}</span>
                <img src="../../assets/img/zhuanfafasong.png" alt="" />
              </div>
            </li>
            <div class="jzgd">更多精彩内容，加载中</div>
          </ul>
        </div>
      </div>
    </div>
    <div class="message">
      <!-- 国家媒体列表 -->
      <div class="top">
        <div class="media_nav">
          <span class="cur" @click="mediaTab(0)">国家</span>
          <span @click="mediaTab(1)">人物</span>
          <span @click="mediaTab(2)">媒体</span>
        </div>
        <div class="media_content">
          <div class="swiper-container" id="swiper2">
            <div class="swiper-wrapper">
              <!-- 国家 -->
              <div class="swiper-slide">
                <div class="country">
                  <div v-for="(v, i) in country" :key="i" class="item">
                    <img src="../../assets/img/weixin2.png" alt="" />
                    <p class="name">{{ v.name }}</p>
                  </div>
                </div>
              </div>
              <!-- 人物 -->
              <div class="swiper-slide">
                <div class="country">
                  <div v-for="(v, i) in people" :key="i" class="item">
                    <img src="../../assets/img/weixin2.png" alt="" />
                    <p class="name">{{ v.name }}</p>
                  </div>
                </div>
              </div>
              <!-- 媒体 -->
              <div class="swiper-slide">
                <div class="media">
                  <div v-for="(v, i) in media" :key="i" class="item">
                    <img src="../../assets/img/media.png" alt="" />

                    <p class="name">{{ v.name }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 24小时 -->
      <div class="eshour">
        <div class="bt">24小时</div>
        <div class="content">
          <ul>
            <li v-for="(v, i) in hours_24" :key="i">
              <div class="logo">
                <img
                  v-if="!v.media_logo"
                  src="../../assets/img/media.png"
                  alt=""
                />
                <img v-if="v.media_logo" :src="v.media_logo" alt="" />
                <span class="ly">
                  {{ v.media_name }}
                </span>
                <span class="sj">
                  {{ init_time(v.release_time) }}
                </span>
              </div>
              <a href="#">
                <p>
                  {{ v.news_title }}
                  <!-- 美国将中国旅行警告从“请勿前往”下调为“审慎考虑前往” -->
                </p>
              </a>
            </li>
          </ul>
          <div class="more">查看更多</div>
        </div>
      </div>
    </div>
    <transition name="el-zoom-in-top">
      <edit-channel :follow_channel="channel" v-if="index_channel_window" />
    </transition>
    <div class="fx">
      <a class="arrow" href=""><img title="置顶" src="../../assets/img/arrow-right.png" alt="" /></a>
      <a class="fenxiang" href=""><img title="分享" src="../../assets/img/fenxiang.png" alt="" /></a>
      <a class="chat" href=""> <img title="分享到微信" src="../../assets/img/chat.png" alt="" /></a>
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import RecommendCom from "./Recommend";
import EditChannel from "@/components/editchannel/EditChannel.vue";
@Component({
  components: {
    EditChannel,
  },
})
export default class Recommend extends mixins(RecommendCom) {}
</script>

<style lang="scss" scoped>
@import "./Recommend.scss";
</style>