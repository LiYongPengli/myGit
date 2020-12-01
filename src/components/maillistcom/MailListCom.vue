<template>
  <!-- 通讯录 -->
  <div class="maillistcom">
    <div class="title">
      <span class="maybetitle">通讯录</span>
      <span @click="$emit('update:visable', 2)" class="newfriend">
        新的朋友
      </span>
      <span @click="$emit('update:visable', 4)" class="addfriend">+添加好友</span>
    </div>
    <div class="search">
      <input type="text" v-model="keyword" placeholder="通过账户/用户昵称/手机号/微信昵称搜索好友" />
      <img @click="searchFriends" src="../../assets/img/search.png" alt="" />
    </div>
    <div class="content_userlists">
      <ul>
        <my-scroll>
          <!-- 接收到的分享名片 -->
          <li
            v-show="v.status == 'pending'"
            v-for="(v, keys, i) in cardList"
            :index="i"
            :key="keys"
            class="recommend"
          >
            <div class="content_userlist new">
              <img
                class="header"
                v-if="v.recommended.headimg"
                :src="v.recommended.headimg"
                alt=""
              />
              <img
                class="header"
                v-if="!v.recommended.headimg && v.recommended.wechat_info.head_img"
                :src="v.recommended.wechat_info.head_img"
                alt=""
              />
              <p v-if="!v.recommended.headimg && !v.recommended.wechat_info.head_img" class="content_userlist_engname">
                {{ v.recommended.nickname.slice(0, 1) }}
              </p>
              <p class="content_userlist_chinename">
                {{ v.recommended.nickname }}
              </p>
              <p class="remarks">
                "{{ v.recommender.nickname }}"将"{{
                  v.recommended.nickname
                }}"的名片推荐给你
              </p>
              <p
                @click="showInvInfo(v)"
                class="content_userlist_fabuqingqiu"
              >
                <img src="../../assets/img/fabuqingqiu.png" alt="" />
                请求添加好友
              </p>
              <p @click="igron(v, keys)" class="content_userlist_hulve">
                <img src="../../assets/img/hulve.png" alt="" />
                忽略
              </p>
            </div>
          </li>
          <!-- 新好友 -->
          <li
            v-show="v.status == 'pending'"
            v-for="(v, i) in newFriendList"
            :key="i + 1"
            class="addnewfriend"
          >
            <div class="content_userlist new">
              <img
                class="header"
                v-if="!v.headimg && !v.wechat_info.head_img"
                :src="v.headimg"
                alt=""
              />
              <img
                class="header"
                v-if="!v.headimg && v.wechat_info.head_img"
                :src="v.wechat_info.head_img"
                alt=""
              />
              <p v-if="!v.headimg && !v.wechat_info.head_img" class="content_userlist_engname">
                {{ v.nickname.slice(0, 1) }}
              </p>
              <p class="content_userlist_chinename">{{ v.nickname }}</p>
              <!-- 备注 -->
              <p class="remarks">{{ v.message }}</p>
              <p @click.stop="toReject(v)" class="content_userlist_sendmessage">
                <img src="../../assets/img/refuse.png" alt="" />
                拒绝
              </p>
              <p @click.stop="toAgree(v)" class="content_userlist_share">
                <img src="../../assets/img/accept.png" alt="" />
                接受
              </p>
            </div>
          </li>
          <!-- 好友列表 -->
          <li
          v-show="!letterSearch||letterSearch==v.letter"
            @click="showInfo(v)"
            @mouseover="showShare(k)"
            @mouseout="hideShare(k)"
            v-for="(v, k) in userlists"
            :key="v.user_id"
          >
            <div class="content_userlist">
              <img
                class="header"
                v-if="!v.headimg && !v.wechat_info.head_img"
                :src="v.headimg"
                alt=""
              />
              <img
                class="header"
                v-if="!v.headimg && v.wechat_info.head_img"
                :src="v.wechat_info.head_img"
                alt=""
              />
              <p
                v-if="!v.headimg && !v.wechat_info.head_img"
                class="content_userlist_engname"
              >
                {{ v.nickname.slice(0, 1) }}
              </p>
              <p class="content_userlist_chinename">
                {{ v.nickname
                }}{{ v.remark_name ? "(" + v.remark_name + ")" : "" }}
              </p>
              <p
                @click="toShare(v)"
                v-show="v.share"
                class="content_userlist_share"
              >
                <img src="../../assets/img/share.png" alt="" />
                分享名片
              </p>
              <p @click.stop="sendMessage(v)" v-show="v.send" class="content_userlist_sendmessage">
                <img src="../../assets/img/sendmessage.png" alt="" />
                发送消息
              </p>
              <!-- <p v-show="v.num == 2" class="content_userlist_sharehe">
                  <img src="../../assets/img/share.png" alt="" />
                  分享给他
                </p> -->
            </div>
          </li>
          <div class="zm">
            <a :style="{'color':v1.name==letterSearch?'white':''}" @click="setLetterSearch(v1)" v-for="(v1, k1) in zmlist" :key="k1">{{ v1.name }}</a>
          </div>
        </my-scroll>
      </ul>
    </div>
    <!-- 用户信息 -->
    <div v-if="userInfo" class="chat">
      <div class="chatcontent">
        <div @click="userInfo = ''" class="close">
          <img src="../../assets/img/chatclose.png" alt="" />
        </div>
        <div class="username">
          <img
                class="header"
                v-if="!userInfo.headimg && !userInfo.wechat_info.head_img"
                :src="userInfo.headimg"
                alt=""
              />
              <img
                class="header"
                v-if="!userInfo.headimg && userInfo.wechat_info.head_img"
                :src="userInfo.wechat_info.head_img"
                alt=""
              />
          <p v-if="!userInfo.headimg && !userInfo.wechat_info.head_img" class="head">{{ userInfo.nickname.slice(0, 1) }}</p>
          <p class="name">{{ userInfo.nickname }}</p>
        </div>
        <div class="remarks_div">
          <span class="remarks_name">备注名：</span>
          <div v-show="remark" class="controls">
            <span @click.stop="changeRemark">确定</span>
            <span @click="remark=false;remark_name=userInfo.remark_name">取消</span>
          </div>
          <input @input="remark=true" v-model="remark_name" class="remarks_value" type="text" placeholder="设置备注" />
        </div>
        <span class="nick_name">昵称：</span>
        <span class="nick_value">{{ userInfo.nickname }}</span>
        <div class="sendmes">发送消息</div>
      </div>
    </div>

    <!-- 用户验证信息 -->
    <div v-if="inv_userInfo" class="chat">
      <div class="chatcontent">
        <div @click="inv_userInfo = ''" class="close">
          <img src="../../assets/img/chatclose.png" alt="" />
        </div>
        <div class="username">
          <img
                class="header"
                v-if="!inv_userInfo.recommended.headimg && !inv_userInfo.recommended.wechat_info.head_img"
                :src="inv_userInfo.recommended.headimg"
                alt=""
              />
              <img
                class="header"
                v-if="!inv_userInfo.recommended.headimg && inv_userInfo.recommended.wechat_info.head_img"
                :src="inv_userInfo.recommended.wechat_info.head_img"
                alt=""
              />
          <p v-if="!inv_userInfo.recommended.headimg && !inv_userInfo.recommended.wechat_info.head_img" class="head">{{ inv_userInfo.recommended.nickname.slice(0, 1) }}</p>
          <p class="name">{{ inv_userInfo.recommended.nickname }}</p>
        </div>
        <div class="remarks_div">
          <span class="remarks_name">备注名：</span>
          <input
            class="remarks_value"
            v-model="remark_name"
            type="text"
            placeholder="设置备注"
          />
        </div>
        <div class="remarks_div">
          <span class="remarks_name">验证消息：</span>
          <input
            class="remarks_value"
            v-model="inv_message"
            type="text"
            placeholder="请输入验证消息"
          />
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
import MailListComs from "./MailListCom";
import MyScroll from "@/components/MyScroll.vue";
@Component({
  components: {
    MyScroll,
  },
})
export default class MailListCom extends mixins(MailListComs) {}
</script>

<style lang="scss" scoped>
@import "./MailListCom.scss";
</style>