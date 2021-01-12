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
    <!-- <div class="search">
      <input type="text" placeholder="搜索您想要添加的账号/手机号/微信名" />
      <img src="../../assets/img/search.png" alt="" />
    </div> -->
    <div class="content_userlists">
      <ul>
        <my-scroll>
          <li
            @mouseenter="showControl(keys)"
            @mouseleave="hideControl(keys)"
            v-for="(v, keys, i) in cardList"
            :index="i"
            :key="keys"
          >
            <div class="content_userlist">
              <div class="user_info">
                <img
                  class="header"
                  :src="axios.defaults.baseURL + '/avatar/' + v.account"
                  alt=""
                />
                <speed-text class="content_userlist_chinename" width="60px" height="40px" :text="v.recommended.nickname" />
               <speed-text class="remarks_p" width="300px" height="20px" :text="`“${v.recommender.nickname}”将“${v.recommended.nickname}”的名片推荐给你`" />
              </div>
              <div class="control">
                <p
                  v-show="
                    (v.status == 'ignored' ||
                      v.status == 'pending' ||
                      v.status == 'rejected')
                  "
                  @click="showInvInfo(v, keys)"
                  class="content_userlist_request request"
                >
                  <img src="../../assets/img/fabuqingqiu.png" alt="" />
                  请求添加好友
                </p>
                <p
                  @click.stop="igron(v, keys)"
                  v-show="v.status == 'pending'"
                  class="content_userlist_hulve hulve"
                >
                  <img src="../../assets/img/hulve.png" alt="" />
                  忽略
                </p>
                <p
                  v-show="v.status == 'ignored'"
                  class="content_userlist_share"
                >
                  已忽略
                </p>
                <p
                  v-show="v.status == 'requested'"
                  class="content_userlist_share"
                >
                  待验证
                </p>
                <p
                  v-show="v.status == 'accepted'"
                  class="content_userlist_share"
                >
                  已添加
                </p>
                <p
                  v-show="v.status == 'rejected'"
                  class="content_userlist_share"
                >
                  已拒绝
                </p>
              </div>
            </div>
          </li>
          <!-- 新朋友列表 -->
          <li @click="showInfo(v)" v-for="(v, i) in newFriendList" :key="i">
            <div class="new_user_list">
              <div class="left">
                <div class="user_info">
                <img
                  class="header"
                  style="height: 40px"
                  :src="axios.defaults.baseURL + '/avatar/' + v.account"
                  alt=""
                />
                <speed-text class="content_userlist_chinename" width="60px" height="20px" :text="v.nickname" />
              </div>
              <speed-text class="remarks_p" width="350px" height="20px" :text="v.message" />
              </div>
              <div class="control">
                <p
                  @click.stop="toReject(v)"
                  v-if="v.status == 'pending'"
                  class="btn reject"
                >
                  <img src="../../assets/img/refuse.png" alt="" />
                  拒绝
                </p>
                <p
                  @click.stop="toAgree(v)"
                  v-if="v.status == 'pending'"
                  class="btn"
                >
                  <img src="../../assets/img/accept.png" alt="" />
                  接受
                </p>
                <p
                  v-if="v.status == 'accepted'"
                  class="btn text"
                >
                  已添加
                </p>
                <p
                  v-if="v.status == 'rejected'"
                  class="btn text"
                >
                  已拒绝
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
            :src="axios.defaults.baseURL + '/avatar/' + userInfo.account"
            alt=""
          />
          <!-- <img
                class="header"
                v-if="!userInfo.headimg && userInfo.wechat_info.head_img"
                :src="userInfo.wechat_info.head_img"
                alt=""
              />
          <p v-if="!userInfo.headimg && !userInfo.wechat_info.head_img" class="head">{{userInfo.nickname.slice(0,1)}}</p> -->
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
        <span class="nick_name">昵称：</span>
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
            :src="axios.defaults.baseURL + '/avatar/' + inv_userInfo.account"
            alt=""
          />
          <!-- <img
                class="header"
                v-if="!inv_userInfo.recommended.headimg && inv_userInfo.recommended.wechat_info.head_img"
                :src="inv_userInfo.recommended.wechat_info.head_img"
                alt=""
              />
          <p v-if="!inv_userInfo.recommended.headimg && !inv_userInfo.recommended.wechat_info.head_img" class="head">{{inv_userInfo.recommended.nickname.slice(0,1)}}</p> -->
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
import NewFriendsCom from "./NewFriends";
import MyScroll from "@/components/MyScroll.vue";
import SpeedText from "@/components/SpeedText.vue";
@Component({
  components: {
    MyScroll,
    SpeedText
  },
})
export default class NewFriends extends mixins(NewFriendsCom) {}
</script>

<style lang="scss" scoped>
@import "./NewFriends.scss";
</style>