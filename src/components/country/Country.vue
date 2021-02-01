<template>
  <!-- 个人中心 我的关注 国家列表 -->
  <div class="country">
    <!-- 已关注 -->
    <div class="concerned">
      <p class="concerned_p">已关注</p>
      <div ref="list_wrap" class="list_wrap">
        <my-scroll thumbColor="#9292a7">
          <ul
            element-loading-background="rgba(58, 58, 72, 0.5)"
            v-loading="loading"
          >
            <li
              v-show="showItem(v)"
              v-for="(v, k) in country_follow_list"
              :key="k"
            >
              <div>
                <img class="flag" :src="v.flag" alt="" />
                <speed-text width="60px" height="20px" :text="v.name" />
                <img
                  class="close"
                  @click.stop="unsub(v, k)"
                  src="../../assets/img/close.png"
                  alt=""
                />
              </div>
            </li>
          </ul>
        </my-scroll>
      </div>
    </div>
    <!-- 未关注 -->
    <div class="noattention">
      <p class="noattention_p">未关注</p>
      <my-scroll thumbColor="#9292a7" class="list_wrap">
        <ul
          element-loading-background="rgba(58, 58, 72, 0.5)"
          v-loading="loadFollow"
        >
          <li v-show="showItem(v1)" v-for="(v1, k1) in country_list" :key="k1">
            <div>
              <img class="flag" :src="v1.flag" alt="" />
              <!-- <el-tooltip class="item" effect="dark" :content="v1.name" placement="top">
            </el-tooltip> -->
              <speed-text width="60px" height="20px" :text="v1.name">
              </speed-text>
              <img
                class="add"
                @click="addFollow(v1, k1)"
                src="../../assets/img/add.png"
                alt=""
              />
            </div>
          </li>
          <div style="display: blcok; content: ''; clear: both"></div>
        </ul>
      </my-scroll>
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import CountryCom from "./Country";
import SpeedText from "@/components/SpeedText.vue";
import MyScroll from "@/components/MyScroll.vue";
@Component({
  components: {
    SpeedText,
    MyScroll,
  },
})
export default class Country extends mixins(CountryCom) {}
</script>

<style lang="scss" scoped>
@import "./Country.scss";
</style>
