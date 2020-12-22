<template>
  <div class="media">
    <!-- 已关注 -->
    <div
      class="concerned"
      v-loading="loadFollow"
      element-loading-background="rgba(58, 58, 72, 0.5)"
    >
      <p class="concerned_p">已关注</p>
      <ul>
        <li v-for="(v, i) in mediaFollowList" :key="v.sub_id">
          <div>
            <speed-text class="pname" width="124px" height="40px">
              {{ v.name_zh }}
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
      v-loading="loadFollow"
      element-loading-background="rgba(58, 58, 72, 0.5)"
    >
      <p class="noattention_p">未关注</p>
      <p class="open" @click="showAll = !showAll">
        {{ word }}

        <img v-if="word == '展开'" src="../../assets/img/open.png" alt="" />
        <img v-else src="../../assets/img/shouqil.png" alt="" />
      </p>
      <ul>
        <li v-for="(v, i) in showlist" :key="v.sub_id">
          <div class="no_noattention">
            <!-- <p>{{v.name_zh}}<img @click="addFollow(v,i)" src="../../assets/img/add.png" alt=""></p> -->
            <speed-text class="pname" width="124px" height="40px">
              {{ v.name }}
            </speed-text>
            <!-- <p class="pname"> -->

            <!-- </p> -->
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
import MediaCom from "./Media";
import SpeedText from "@/components/SpeedText.vue";
@Component({
  components: {
    SpeedText,
  },
})
export default class Media extends mixins(MediaCom) {}
</script>
<style lang="scss" scoped>
@import "./Media.scss";
</style>
