<template>
  <!-- 热门推荐 -->
  <div class="recommend">
    <div class="mainpage">
      <div class="banner">
        <img src="../../assets/img/banner.png" alt="" />
        <a class="banner-p">福奇公开与特朗普唱反调 称美疫情或持续至明年底</a>
        <p class="load"></p>
      </div>
      <div class="list_wrap">
        <div class="list_nav">
          <span
            class="recommend_nav"
            @click="change_recommend(0, '推荐')"
            :class="{ cur: active_recommend == 0 }"
            >推荐</span
          >
          <!-- <span class="selected swiper-slide-active">推荐</span> -->
          <div class="swiper-container" id="swiper1">
            <div class="swiper-wrapper">
              <!-- <span class="swiper-slide swiper-slide-next">菜单 2</span> -->
              <div
                v-for="(v, i) in channel"
                :key="i"
                class="swiper-slide"
                :class="{ cur: active_recommend == i + 1 }"
              >
                <!-- <span
                  @click="change_recommend(i + 1, v.name)"
                  :class="{ cur: active_recommend == i + 1 }"
                  >{{ v.name }}</span
                > -->
                <span @click="change_recommend(i + 1, v.name)">{{
                  v.name
                }}</span>
              </div>
            </div>
          </div>
          <span class="bj" @click="setEditChannel(true)">编辑</span>
        </div>
        <div class="list">
          <ul>
            <li v-for="(v, i) in newsList" :key="i">
              <div class="pic">
                <video-thum-bnail v-if="v.cover.type=='video'" :video_photo="v.cover.url" :video_url="v.cover.video" />
                <img v-if="v.cover.type=='image'" :src="v.cover.url" alt="" />
              </div>
              <div class="text">
                
                <p
                  v-show="language == 'crawler'"
                  @click="toNewsInfo(v)"
                  class="title"
                >
                  {{ v.title.crawler }}
                </p>
                <p
                  v-show="language == 'en'"
                  @click="toNewsInfo(v)"
                  class="title"
                >
                  {{ v.title.en }}
                </p>
                <p
                  v-show="language == 'zh-CN'"
                  @click="toNewsInfo(v)"
                  class="title"
                >
                  {{ v.title["zh-CN"] }}
                </p>
                <span class="mt">媒体: {{ v.media_name }} </span>
                <span class="time">时间: {{ init_time(v.time) }}</span>
                <span class="ll">浏览次数: {{ v.pv }}人</span>
              </div>

              <div class="zan">
                <img src="../../assets/img/zanpress.png" alt="" />
                <span>{{ v.like }}</span>
                <share-content :content="v" type="news" class="sczhuanfa">
                  <img src="../../assets/img/sczhuanfa.png" alt="" />
                </share-content>
              </div>
            </li>
            <div @click="loading" v-show="!finished" class="jzgd">
              点击加载更多精彩内容
            </div>
          </ul>
        </div>
      </div>
    </div>
    <div class="message">
      <!-- 国家媒体列表 -->
      <div class="top">
        <div class="media_nav">
          <span
            :class="{ cur: mediaSwiperCurrentIndex == 0 }"
            @click="mediaTab(0)"
            >国家</span
          >
          <span
            :class="{ cur: mediaSwiperCurrentIndex == 1 }"
            @click="mediaTab(1)"
            >人物</span
          >
          <span
            :class="{ cur: mediaSwiperCurrentIndex == 2 }"
            @click="mediaTab(2)"
            >媒体</span
          >
        </div>
        <div class="media_content">
          <div class="swiper-container" id="swiper2">
            <div class="swiper-wrapper">
              <!-- 国家 -->
              <div class="swiper-slide">
                <div class="country">
                  <div
                    @click="toFollowPage('country', i)"
                    v-for="(v, i) in country"
                    :key="i"
                    class="item"
                  >
                    <img :src="v.flag" alt="" />
                    <p class="name">{{ v.name_zh }}</p>
                  </div>
                </div>
              </div>
              <!-- 人物 -->
              <div class="swiper-slide">
                <div class="country people">
                  <div
                    @click="toFollowPage('people', i)"
                    v-for="(v, i) in people"
                    :key="i"
                    class="item"
                  >
                    <img src="../../assets/img/media.png" alt="" />
                    <p class="name">{{ v.name }}</p>
                  </div>
                </div>
              </div>
              <!-- 媒体 -->
              <div class="swiper-slide">
                <div class="media">
                  <div
                    @click="toFollowPage('media', i)"
                    v-for="(v, i) in media"
                    :key="i"
                    class="item"
                  >
                    <!-- <img src="../../assets/img/media.png" alt="" /> -->

                    <p class="name">{{ v.name_zh }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 24小时 -->
      <hours-24 />
    </div>
    <transition name="el-zoom-in-top">
      <edit-channel :follow_channel="channel" v-if="index_channel_window" />
    </transition>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import RecommendCom from "./Recommend";
import EditChannel from "@/components/editchannel/EditChannel.vue";
import Hours24 from "@/components/hours24/Hours24.vue";
import ShareContent from "@/components/sharecontent/ShareContent.vue";
import VideoThumBnail from "@/components/videothumbnai/VideoThumbnail.vue";
@Component({
  components: {
    EditChannel,
    Hours24,
    ShareContent,
    VideoThumBnail
  },
})
export default class Recommend extends mixins(RecommendCom) {}
</script>

<style lang="scss" scoped>
@import "./Recommend.scss";
</style>