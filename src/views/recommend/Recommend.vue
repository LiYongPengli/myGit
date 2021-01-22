<template>
  <!-- 热门推荐 -->
  <div class="recommend">
    <div class="mainpage">
      <div class="banner">
        <router-link target="_blank" to="/xjpublicity">
          <img src="../../assets/img/banner.png" alt="" />
        </router-link>

        <!-- <a href="#">
        <img src="../../assets/img/banner.png" alt="" />
        </a> -->
        <!-- <a class="banner-p">福奇公开与特朗普唱反调 称美疫情或持续至明年底</a>
        <p class="load"></p> -->
      </div>
      <div class="list_wrap">
        <div class="list_nav">
          <div v-show="left_btn" class="page_left">
            <img
              @click="channel_swiper.slidePrev()"
              src="../../assets/img/page_left.png"
              alt=""
            />
          </div>
          <div v-show="right_btn" class="page_right">
            <img @click="next" src="../../assets/img/page_right.png" alt="" />
          </div>
          <span
            class="recommend_nav"
            @click="change_recommend(0, '推荐')"
            :class="{ cur: active_recommend == 0 }"
            >推荐</span
          >
          <!-- <span class="selected swiper-slide-active">推荐</span> -->
          <div class="swiper-container" id="swiper1">
            <div class="swiper-wrapper">
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
                <span @click="change_recommend(i + 1, v.sub_id)">{{ v.name }}</span>
              </div>
            </div>
          </div>
          <span class="bj" @click="setEditChannel(true)">编辑</span>
        </div>
        <div class="list">
          <ul>
            <list-item
              :shoControls="['like', 'share2']"
              :item="v"
              v-for="(v, i) in newsList"
              :key="i"
            />
            <!-- <li v-for="(v, i) in newsList" :key="i">
              <div v-if="v.cover.type != 'text'" class="pic">
                <video-thum-bnail
                  v-if="v.cover.type == 'video'"
                  :video_photo="v.cover.url"
                  :video_url="v.cover.video"
                />
                <el-image
                  :fit="'scale-down'"
                  class="img"
                  lazy
                  v-if="v.cover.type == 'image'"
                  :src="v.cover.url[0]"
                >
                  <div slot="error" class="image-slot">
                    <img
                      style="width: 200px"
                      src="../../assets/img/404.png"
                      alt=""
                    />
                  </div>
                </el-image>
              </div>
              <div class="text">
                <p
                  v-show="language == 'crawler'"
                  @click="toNewsInfo(v)"
                  class="title"
                  :title="v.title.crawler"
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
            </li> -->
            <div v-show="!finished" class="jzgd">正在加载更多精彩内容</div>
          </ul>
        </div>
      </div>
    </div>
    <div class="message">
      <!-- 国家媒体列表 -->
      <div class="top">
        <div class="media_nav">
          <span :class="{ cur: mediaSwiperCurrentIndex == 0 }" @click="mediaTab(0)"
            >国家</span
          >
          <span :class="{ cur: mediaSwiperCurrentIndex == 1 }" @click="mediaTab(1)"
            >媒体</span
          >
          <span :class="{ cur: mediaSwiperCurrentIndex == 2 }" @click="mediaTab(2)"
            >人物</span
          >
        </div>
        <div class="media_content">
          <div class="swiper-container" id="swiper2">
            <div class="swiper-wrapper">
              <!-- 国家 -->
              <div class="swiper-slide">
                <div class="country">
                  <div
                    @click="toFollowPage('country', v)"
                    v-for="(v, i) in country"
                    :key="i"
                    class="item"
                  >
                    <img :src="v.flag" alt="" />
                    <p :title="v.name_zh" class="name">{{ v.name_zh }}</p>
                  </div>
                </div>
              </div>
              <!-- 媒体 -->
              <div class="swiper-slide">
                <div class="media country people" style="width: 457px">
                  <div
                    @click="toFollowPage('media', v)"
                    v-for="(v, i) in media"
                    :key="i"
                    class="item"
                  >
                    <div class="mttx">
                      <img :src="v.media_icon" alt="" />

                      <div v-if="v.media_source=='Spider'" class="dgdiv">
                        <img class="duigou" src="../../assets/img/mtdg.png" alt="" />
                      </div>
                    </div>
                    <p :title="v.name_zh" class="name">{{ v.name_zh }}</p>
                  </div>
                </div>
              </div>
              <!-- 人物 -->
              <div class="swiper-slide">
                <div class="country people">
                  <div
                    @click="toFollowPage('people', v)"
                    v-for="(v, i) in people"
                    :key="i"
                    class="item"
                  >
                    <img
                      style="border-radius: 50%"
                      v-if="v.avatar != -1 && v.avatar != null && !v.error"
                      :src="axios.defaults.baseURL + '/attachments/avator/' + v.avatar"
                      alt=""
                    />
                    <img
                      v-if="v.avatar == -1 || v.avatar == null"
                      style="border-radius: 50%"
                      src="../../assets/img/zwtx.png"
                      alt=""
                    />
                    <p :title="v.name" class="name">{{ v.name }}</p>
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
import ListItem from "@/components/ListItem.vue";
@Component({
  components: {
    EditChannel,
    Hours24,
    ShareContent,
    ListItem,
  },
})
export default class Recommend extends mixins(RecommendCom) {}
</script>

<style lang="scss" scoped>
@import "./Recommend.scss";
</style>
