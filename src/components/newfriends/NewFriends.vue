<template>
  <!-- 新朋友 -->
  <div class="newfriends">
    <div class="title">
      <span class="maybetitle">新的朋友</span>
      <span @click="$emit('update:visable', 1)" class="newfriend">
        返回
        <a>></a>
      </span>
    </div>
    <div class="search">
      <input type="text" placeholder="搜索您想要添加的账号/手机号/微信名" />
      <img src="../../assets/img/search.png" alt="" />
    </div>
    <div class="content_userlists">
      <ul>
        <my-scroll>
          <li v-for="(v,keys,i) in cardList" :index="i" :key="keys">
            <div class="content_userlist">
              <p class="content_userlist_engname">{{ v.recommended.nickname.slice(0, 1) }}</p>
              <p class="content_userlist_chinename">{{v.recommended.nickname}}</p>
              <p class="remarks_p">
                "{{v.recommender.nickname}}"将"{{v.recommended.nickname}}"的名片推荐给你
              </p>
              <p v-show="v.status!='requested'" @click="showInvInfo(v,keys)" class="content_userlist_request request">
                <img src="../../assets/img/fabuqingqiu.png" alt="" />
                请求添加好友
              </p>
              <p @click="igron(v,keys)" v-show="v.status=='pending'" class="content_userlist_hulve hulve">
                <img src="../../assets/img/hulve.png" alt="" />
                忽略
              </p>
              <p v-show="v.status == 'ignored'" class="content_userlist_share">
                已忽略
              </p>
              <p v-show="v.status == 'requested'" class="content_userlist_share">
                已添加
              </p>
            </div>
          </li>
          <!-- 新朋友列表 -->
          <li @click="showInfo(v)" v-for="(v, i) in newFriendList" :key="i">
            <div class="content_userlist">
              <p class="content_userlist_engname">
                {{ v.nickname.slice(0, 1) }}
              </p>
              <p class="content_userlist_chinename">{{ v.nickname }}</p>
              <p class="remarks_p">
                {{ v.message }}
              </p>
              <p
              @click="toReject(v)"
                v-show="v.status == 'pending'"
                class="content_userlist_hulve hulve"
              >
                <img src="../../assets/img/refuse.png" alt="" />
                拒绝
              </p>
              <p
                @click.stop="toAgree(v)"
                v-show="v.status == 'pending'"
                class="content_userlist_share share"
              >
                <img src="../../assets/img/accept.png" alt="" />
                接受
              </p>
              <p v-show="v.status == 'accepted'" class="content_userlist_share">
                已接受
              </p>
              <p v-show="v.status == 'rejected'" class="content_userlist_share">
                已拒绝
              </p>
            </div>
          </li>
        </my-scroll>
      </ul>
    </div>
    <!-- 用户信息 -->
    <div v-if="userInfo" class="chat">
      <div class="chatcontent">
        <div @click="userInfo=''" class="close">
          <img src="../../assets/img/chatclose.png" alt="" />
        </div>
        <div class="username">
          <p class="head">{{userInfo.nickname.slice(0,1)}}</p>
          <p class="name">{{userInfo.nickname}}</p>
        </div>
        <div class="remarks_div">
          <span class="remarks_name">备注名：</span>
          <input class="remarks_value" type="text" placeholder="设置备注" />
        </div>
        <span class="nick_name">昵称：</span>
        <span class="nick_value">{{userInfo.nickname}}</span>
        <div class="sendmes">发送消息</div>
      </div>
    </div>
    <!-- 用户验证信息 -->
    <div v-if="inv_userInfo" class="chat">
      <div class="chatcontent">
        <div @click="inv_userInfo=''" class="close">
          <img src="../../assets/img/chatclose.png" alt="" />
        </div>
        <div class="username">
          <p class="head">{{inv_userInfo.recommended.nickname.slice(0,1)}}</p>
          <p class="name">{{inv_userInfo.recommended.nickname}}</p>
        </div>
        <div class="remarks_div">
          <span class="remarks_name">备注名：</span>
          <input class="remarks_value" v-model="remark_name" type="text" placeholder="设置备注" />
        </div>
        <div class="remarks_div">
          <span class="remarks_name">验证消息：</span>
          <input class="remarks_value" v-model="inv_message" type="text" placeholder="请输入验证消息" />
        </div>
        <!-- <span class="nick_name">昵称：</span>
        <span class="nick_value">{{inv_userInfo.nickname}}</span> -->
        <div @click="toAddMaiList" class="sendmes">添加到通讯录</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import NewFriendsCom from "./NewFriends";
import MyScroll from "@/components/MyScroll.vue";
@Component({
  components: {
    MyScroll,
  },
})
export default class NewFriends extends mixins(NewFriendsCom) {}
</script>

<style lang="scss" scoped>
@import "./NewFriends.scss";
</style>