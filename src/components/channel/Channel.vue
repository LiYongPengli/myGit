<template>
  <div class="channel">
    <!-- 已关注 -->
    <div
      class="concerned"
      v-loading="loadFollow"
      element-loading-background="rgba(58, 58, 72, 0.5)"
    >
      <p class="concerned_p">已关注</p>
      <ul>
        <li v-for="(v, i) in channelFollowList" :key="i">
          <div>
            <speed-text class="pname" width="124px" height="40px">
              {{ v.name }}
            </speed-text>
            <p class="i_mg">
              <img
                class="close"
                @click="unsub(v, i)"
                src="../../assets/img/close.png"
                alt=""
              />
            </p>
          </div>
        </li>
      </ul>
    </div>
    <!-- 未关注 -->
    <div
      class="noattention"
    >
      <p class="noattention_p">未关注</p>
      <p class="open" @click="showAll = !showAll">
        {{ word }}

        <img v-if="word == '展开'" src="../../assets/img/open.png" alt="" />
        <img v-else src="../../assets/img/shouqil.png" alt="" />
      </p>
      <ul>
        <li v-for="(v, i) in showlist" :key="i">
          <div class="no_noattention">
            <speed-text class="pname" width="124px" height="40px">
              {{ v.name }}
            </speed-text>
            <p class="i_mg">
              <img
                class="add"
                @click="addFollow(v, i)"
                src="../../assets/img/add.png"
                alt=""
              />
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import Component, { mixins } from "vue-class-component";
import ChannelCom from "./Channel";
import SpeedText from "@/components/SpeedText.vue";
@Component({
  components: {
    SpeedText,
  },
})
export default class Channel extends mixins(ChannelCom) {}
</script>
<style lang="scss" scoped>
@import "./Channel.scss";
</style>
