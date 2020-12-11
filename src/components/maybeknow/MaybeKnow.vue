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
                <img style="height:40px;" :src="'http://zlbxxcj.bjceis.com/avatar/'+v.nickname" alt="" />
                <!-- <img
                  v-if="!v.headimg && v.wechat_info.head_img"
                  :src="v.wechat_info.head_img"
                  alt=""
                />
                <p
                  v-show="!v.headimg && !v.wechat_info.head_img"
                  class="content_userlist_engname"
                >
                  {{ v.nickname.slice(0, 1) }}
                </p> -->
                <p class="content_userlist_chinename">
                  {{ v.nickname }}
                </p>
                <p @click="toAdd(v)" class="content_userlist_add">+</p>
              </div>
            </li>
          </my-scroll>
        </ul>
      </div>
    </div>

    <!-- 用户验证信息 -->
    <div v-if="inv_userInfo" class="chat">
      <div class="chatcontent">
        <div @click="inv_userInfo=''" class="close">
          <img src="../../assets/img/chatclose.png" alt="" />
        </div>
        <div class="username">
          <img :src="'http://zlbxxcj.bjceis.com/avatar/'+inv_userInfo.nickname" alt="">
          <!-- <p class="head">{{inv_userInfo.nickname.slice(0,1)}}</p> -->
          <p class="name">{{inv_userInfo.nickname}}</p>
        </div>
        <div class="remarks_div">
          <span class="remarks_name">备注名：</span>
          <input class="remarks_value" v-model="remark_name" type="text" placeholder="设置备注" />
        </div>
        <div class="remarks_yanzheng">
          <span class="remarks_name">验证消息：</span>
          <input class="remarks_value" v-model="message" type="text" placeholder="请输入验证消息" />
        </div>
        <!-- <span class="nick_name">昵称：</span>
        <span class="nick_value">{{inv_userInfo.nickname}}</span> -->
        <div @click="sendMessage" class="sendmes">添加到通讯录</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import MaybeKnowCom from "./MaybeKnow";
import MyScroll from "@/components/MyScroll.vue";
@Component({
  components: {
    MyScroll,
  },
})
export default class MaybeKnow extends mixins(MaybeKnowCom) {}
</script>

<style lang="scss" scoped>
@import "./MaybeKnow.scss";
</style>