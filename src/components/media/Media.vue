<template>
  <div class="media">
    <!-- 已关注 -->
    <div
      class="concerned"
      v-loading="loading"
      element-loading-background="rgba(58, 58, 72, 0.5)"
    >
      <p class="concerned_p">已关注</p>
      <div ref="list_wrap" class="list_wrap">
      <my-scroll :thumbColor="'#9292a7'" >
        <ul>
          <li
            v-show="showItem(v)"
            v-for="(v, i) in mediaFollowList"
            :key="v.sub_id"
          >
            <!-- <div>
            <speed-text class="pname" width="124px" height="40px" :text="v.name_zh" />
            <p class="i_mg">
              <img
                class="close"
                @click="unsub(v, i)"
                src="../../assets/img/close.png"
                alt=""
              />
            </p>
          </div> -->

            <a>
              <img
                class="mrtx"
                :src="v.media_icon"
                alt=""
              />
              <img v-if="v.media_source == 'Spider'" class="icon" src="../../assets/img/mtdg.png" alt="">
              <div class="zyname">
                <div class="chinese_gj mt">
                  <speed-text width="100px" height="20px" :text="v.name_zh" />
                </div>
                <div v-show="v.name_en" class="english_gj mt">
                  <speed-text width="100px" height="20px" :text="v.name_en" />
                </div>
              </div>
              <p class="i_mg">
                <img
                  class="close"
                  @click="unsub(v, i)"
                  src="../../assets/img/close.png"
                  alt=""
                />
              </p>
            </a>
          </li>
        </ul>
      </my-scroll>
       <no-data text="暂无关注" v-show="!mediaFollowList.length&&!loading" />
       </div>
    </div>
    <!-- 未关注 -->
    <div
      class="noattention"
      v-loading="loadFollow"
      element-loading-background="rgba(58, 58, 72, 0.5)"
    >
      <p class="noattention_p">未关注</p>
      <my-scroll :thumbColor="'#9292a7'" class="list_wrap">
        <ul>
          <li
            v-show="showItem(v)"
            v-for="(v, i) in mediaList"
            :key="v.sub_id"
          >
            <!-- <div class="no_noattention">
            <speed-text class="pname" width="124px" height="40px" :text="v.name_zh" />
            <p class="i_mg">
              <img
                class="add"
                @click="addFollow(v, i)"
                src="../../assets/img/add.png"
                alt=""
              />
            </p>
          </div> -->
            <a>
              <img :src="v.media_icon" alt="" />
              <img v-if="v.media_source == 'Spider'" class="icon" src="../../assets/img/mtdg.png" alt="">
              <div class="zyname">
                <div class="chinese_gj mt">
                  <speed-text width="100px" height="20px" :text="v.name_zh" />
                </div>
                <div v-show="v.name_en" class="english_gj mt">
                  <speed-text width="100px" height="20px" :text="v.name_en" />
                </div>
              </div>
              <p class="i_mg">
                <img
                  class="add"
                  @click="addFollow(v, i)"
                  src="../../assets/img/add.png"
                  alt=""
                />
              </p>
            </a>
          </li>
        </ul>
      </my-scroll>
    </div>
  </div>
</template>
<script lang="ts">
import Component, { mixins } from "vue-class-component";
import MediaCom from "./Media";
import SpeedText from "@/components/SpeedText.vue";
import MyScroll from "@/components/MyScroll.vue";
import NoData from "@/components/NoData.vue";
@Component({
  components: {
    SpeedText,
    MyScroll,
    NoData,
  },
})
export default class Media extends mixins(MediaCom) {}
</script>
<style lang="scss" scoped>
@import "./Media.scss";
</style>
