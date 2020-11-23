<template>
  <!-- 24小时 -->
      <div
        class="hours24"
        v-show="eshour"
        @mouseover="clearAutoPlay"
        @mouseout="autoPlay"
        :class="{ fixed: mainPageScrollTop >= 350 }"
      >
        <div class="bt">24小时</div>
        <div class="content">
          <div @mousewheel="toWheel" class="swiper-container list24">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(v, i) in hours_24" :key="i">
                <div class="li">
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
                <a @click="toNewsInfo(v)">
                  <p v-show="language=='crawler'">{{ v.news_title.crawler }}</p>
                  <p v-show="language=='en'">{{ v.news_title.en }}</p>
                  <p v-show="language=='zh-CN'">{{ v.news_title['zh-CN'] }}</p>
                </a>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="more">查看更多</div> -->
        </div>
      </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import Hours24Com from './Hours24'
@Component
export default class Hours24 extends mixins(Hours24Com) {

}
</script>

<style lang="scss" scoped>
@import './Hours24.scss';
</style>