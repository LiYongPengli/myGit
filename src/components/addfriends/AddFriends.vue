<template>
  <!-- 添加好友 -->
  <div class="addfriends">
    <div class="title">
      <span class="maybetitle">添加朋友</span>
      <span @click="$emit('update:visable', 1)" class="newfriend">
        返回
        <a>></a>
      </span>
    </div>
    <div class="search">
      <input
        type="text"
        @keypress="searchFriends"
        v-model="keyword"
        placeholder="搜索您想要添加的账号/手机号/微信名"
      />
      <img @click="searchFriends" src="../../assets/img/search.png" alt="" />
    </div>
    <div class="content_userlists">
      <ul>
        <my-scroll>
          <li
            v-for="(v, keys, i) in userlists"
            :index="i"
            :key="keys"
            @mouseover="showShare(keys)"
            @mouseout="hideShare(keys)"
            @click="showInfo(v)"
          >
            <div class="content_userlist">
              <div class="content_userlist_one">
                <img
                  class="header"
                  
                  :src="axios.defaults.baseURL+'/avatar/'+v.account"
                  alt=""
                />
                <!-- <img
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
                </p> -->
                <p class="content_userlist_chinename">
                  {{ v.nickname }}{{ v.remark_name }}
                </p>
              </div>
              <div class="content_userlist_two">
                <img
                  v-if="v.is_friend"
                  src="../../assets/img/sendmessage.png"
                  alt=""
                />
                <p
                  @click.stop="sendMessage(v)"
                  v-if="v.is_friend"
                  class="content_userlist_sendmessage"
                >
                  发送消息
                </p>

                <img
                  v-if="v.is_friend"
                  src="../../assets/img/share.png"
                  alt=""
                />
                <p
                  @click="toShare(v)"
                  v-if="v.is_friend"
                  class="content_userlist_share"
                >
                  分享名片
                </p>

                <img
                  v-if="!v.is_friend"
                  src="../../assets/img/fabuqingqiu.png"
                  alt=""
                />
                <p
                  @click="showInvInfo(v,keys)"
                  v-if="!v.is_friend"
                  class="content_userlist_sendmessage"
                >
                  添加朋友
                </p>
              </div>
            </div>
          </li>
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
            
            :src="axios.defaults.baseURL+'/avatar/'+userInfo.account"
            alt=""
          />
          <!-- <img
            class="header"
            v-if="!userInfo.headimg && userInfo.wechat_info.head_img"
            :src="userInfo.wechat_info.head_img"
            alt=""
          />
          <p
            v-if="!userInfo.headimg && !userInfo.wechat_info.head_img"
            class="head"
          >
            {{ userInfo.nickname.slice(0, 1) }}
          </p> -->
          <p class="name">{{ userInfo.nickname }}</p>
        </div>
        <div class="remarks_div">
          <span class="remarks_name">备注名：</span>
          <div v-show="remark" class="controls">
            <span @click.stop="changeRemark">确定</span>
            <span
              @click="
                remark = false;
                remark_name = userInfo.remark_name;
              "
              >取消</span
            >
          </div>
          <input
            @input="remark = true"
            v-model="remark_name"
            class="remarks_value"
            type="text"
            placeholder="设置备注"
          />
        </div>
        <span class="nick_name">备注信息：</span>
        <span class="nick_value">{{ userInfo.nickname }}</span>
        <div @click="sendMessage(userInfo)" class="sendmes">发送消息</div>
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
            :src="axios.defaults.baseURL+'/avatar/'+inv_userInfo.account"
            alt=""
          />
          <p class="name">{{ inv_userInfo.nickname }}</p>
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
        <div class="remarks_yanzheng">
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
import AddFriendsCom from "./AddFriends";
import MyScroll from "@/components/MyScroll.vue";
@Component({
  components: {
    MyScroll,
  },
})
export default class AddFriends extends mixins(AddFriendsCom) {}
</script>

<style lang="scss" scoped>
@import "./AddFriends.scss";
</style>