<template>
  <!-- 24小时 -->
  <div
    class="hours24"
    
    :class="{ fixed: mainPageScrollTop >= 350 }"
  >
    <div class="bt">24小时</div>
    <div class="content">
      <vue-seamless-scroll :class-option="scrollOption" :data="hours_24" class="list24">
        <ul class="item">
          
          <li v-for="(v, i) in hours_24" :key="i">
            <div class="li">
              <div class="logo">
                <div class="left">
                  <div class="mttx">
                    <img
                      v-if="v.error"
                      src="../../assets/img/media_default.png"
                      alt=""
                    />
                    <img
                      @error="v.error = true"
                      v-if="v.media_icon && !v.error"
                      :src="v.media_icon"
                      alt=""
                    />
                    <div v-if="v.media_source == 'Spider'" class="dgdiv">
                      <img
                        class="duigou"
                        src="../../assets/img/mtdgx.png"
                        alt=""
                      />
                    </div>
                  </div>
                  <span @click="toFollowPage(v, i)" class="ly">
                    {{ v.media_name }}
                  </span>
                </div>
                <span v-time="v.release_time" class="sj"></span>
              </div>
              <a @click="toNewsInfo(v)">
                <p v-show="language == 'crawler'">{{ v.news_title.crawler }}</p>
                <p v-show="language == 'en'">{{ v.news_title.en }}</p>
                <p v-show="language == 'zh-CN'">{{ v.news_title["zh-CN"] }}</p>
              </a>
            </div>
          </li>

        </ul>
      </vue-seamless-scroll>
      <!-- <div class="more">查看更多</div> -->
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import Hours24Com from "./Hours24";

@Component
export default class Hours24 extends mixins(Hours24Com) {}
</script>

<style lang="scss" scoped>
@import "./Hours24.scss";
</style>
