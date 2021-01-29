<template>
  <!-- 热门推荐 -->
  <div class="recommend">
    <div class="mainpage">
      <div class="banner">
        <router-link to="/xjpublicity">
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
          <div v-show="left_btn&&channel.length" class="page_left">
            <img
              @click="channel_swiper.slidePrev()"
              src="../../assets/img/page_left.png"
              alt=""
            />
          </div>
          <div v-show="right_btn&&channel.length" class="page_right">
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
                <span @click="change_recommend(i + 1, v.sub_id)">{{
                  v.name
                }}</span>
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
            <loading v-if="!finished&&mainPageLoading" />
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
            >媒体</span
          >
          <span
            :class="{ cur: mediaSwiperCurrentIndex == 2 }"
            @click="mediaTab(2)"
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
                  <div @click="$router.push('/user/follow/country')" class="item">
                    <div class="other">+</div>
                    <p class="name">添加</p>
                  </div>
                </div>
              </div>
              <!-- 媒体 -->
              <div class="swiper-slide">
                <div class="media country people">
                  <div
                    @click="toFollowPage('media', v)"
                    v-for="(v, i) in media"
                    :key="i"
                    class="item"
                  >
                    <div class="mttx">
                      <img :src="v.media_icon" alt="" />

                      <div v-if="v.media_source == 'Spider'" class="dgdiv">
                        <img
                          class="duigou"
                          src="../../assets/img/mtdg.png"
                          alt=""
                        />
                      </div>
                    </div>
                    <p :title="v.name_zh" class="name">{{ v.name_zh }}</p>
                  </div>
                  <div @click="$router.push('/user/follow/media')" class="item">
                    <div class="other">+</div>
                    <p class="name">添加</p>
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
                      :src="
                        axios.defaults.baseURL +
                        '/attachments/avator/' +
                        v.avatar
                      "
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
                  <div @click="$router.push('/user/follow/people')" class="item">
                    <div class="other">+</div>
                    <p class="name">添加</p>
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
import Loading from "@/components/Loading.vue";
@Component({
  components: {
    EditChannel,
    Hours24,
    ShareContent,
    ListItem,
    Loading
  },
})
export default class Recommend extends mixins(RecommendCom) {}
</script>

<style lang="scss" scoped>
@import "./Recommend.scss";
</style>
