<template>
  <!-- 聊天工具，可能认识 -->
  <div class="maybeknow">
    <div class="content">
      <div class="title">
        <p class="maybetitle">可能认识的人</p>
      </div>
      <div class="content_userlists">
        <ul>
          <!-- <li v-for="(v, k) in tableData" :key="k" :class="{'active':k%2 != 0}"> -->
          <my-scroll style="content_mt_onescroll">
            <li v-for="(v, k) in userlists" :key="k">
              <div class="content_userlist">
                <img
                  style="height: 40px"
                  :src="axios.defaults.baseURL + '/avatar/' + v.account"
                  alt=""
                />

                <p class="content_userlist_chinename">
                  {{ v.nickname }}
                </p>
                <p @click="toAdd(v)" class="content_userlist_add"></p>
              </div>
            </li>
          </my-scroll>
        </ul>
      </div>
    </div>

    <!-- 用户验证信息 -->
    <inv-user-info v-if="inv_userInfo" :inv_userInfo.sync="inv_userInfo" />
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import MaybeKnowCom from "./MaybeKnow";
import MyScroll from "@/components/MyScroll.vue";
import InvUserInfo from "@/components/InvUserInfo.vue";
@Component({
  components: {
    MyScroll,
    InvUserInfo
  },
})
export default class MaybeKnow extends mixins(MaybeKnowCom) {}
</script>

<style lang="scss" scoped>
@import "./MaybeKnow.scss";
</style>
