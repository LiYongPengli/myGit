<template>
  <!-- 通讯录 -->
  <div class="maillistcom">
    <div class="title">
      <span class="maybetitle">通讯录</span>
      <span @click="$emit('update:visable', 2)" :class="{'newfriendActive':hasNewFriends}" class="newfriend">
        新的朋友
      </span>
      <span @click="$emit('update:visable', 4)" class="addfriend"
        >添加好友</span
      >
    </div>
    <div class="search">
      <input
        type="text"
        v-model="keyword"
        @keypress="keyPress"
        placeholder="通过账号/用户昵称/手机号/微信昵称搜索好友"
      />
      <img @click="searchFriends" src="../../assets/img/search.png" alt="" />
    </div>
    <div class="content_userlists">
      <ul>
        <my-scroll>
          <!-- 接收到的分享名片 -->
          <li
            v-show="v.status == 'pending'&&!v.overdue"
            v-for="(v, keys, i) in cardList"
            :index="i"
            :key="keys"
            class="recommend"
          >
            <div class="content_userlist new">
              <div class="content_userlist_one">
                <img
                  class="header"
                  :src="axios.defaults.baseURL+'/avatar/'+v.recommended.account"
                  alt=""
                />
                <speed-text class="content_userlist_chinename" width="60px" height="20px" :text="v.recommended.nickname" />
              </div>
              <speed-text class="remarks" width="300px" height="40px" :text="`“${v.recommender.nickname}”将“${v.recommended.nickname}”的名片推荐给你`" />
              <div class="content_userlist_three">
                 <img class="qq" src="../../assets/img/fabuqingqiu.png" alt="" />
                <span
                  @click="showInvInfo(v,keys)"
                  class="content_userlist_fabuqingqiu"
                >
                 
                  请求添加好友
                </span>
                 <img class="hl" src="../../assets/img/hulve.png" alt="" />
                <span @click="igron(v, keys)" class="content_userlist_hulve">
                 
                  忽略
                </span>
              </div>
            </div>
          </li>
          <!-- 新好友 -->
          <li
            v-show="v.status == 'pending'&&!v.overdue"
            v-for="(v, i) in newFriendList"
            :key="i + 1"
            class="addnewfriend"
          >
            <div class="content_userlist new">
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
                <speed-text class="content_userlist_chinename" width="60px" height="20px" :text="v.nickname" />
              </div>
              <!-- 备注 -->
              <speed-text class="remarks" width="340px" height="40px" :text="v.message" />
              <div class="content_userlist_three">
              <img class="qq" src="../../assets/img/refuse.png" alt="" />
                <span
                  @click.stop="toReject(v)"
                  class="content_userlist_sendmessage"
                >
                  拒绝
                </span>
                <img class="hl" src="../../assets/img/accept.png" alt="" />
                <span @click.stop="toAgree(v)" class="content_userlist_share">
                  接受
                </span>
              </div>
            </div>
          </li>
          <!-- 好友列表 -->
          <li
            v-show="!letterSearch || letterSearch == v.letter"
            @click="showInfo(v)"
            @mouseover="showShare(k)"
            @mouseout="hideShare(k)"
            v-for="(v, k) in userlists"
            :key="v.user_id"
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
                  <!-- content_userlist_chinename -->
                <p class="content_userlist_chinename">
                  {{ v.nickname
                  }}{{ v.remark_name ? "(" + v.remark_name + ")" : "" }}
                </p>
              </div>
              <div class="content_userlist_three">
                <img class="fs"
                  v-show="v.send"
                  src="../../assets/img/sendmessage.png"
                  alt=""
                />
                <span
                  @click.stop="sendMessage(v)"
                  v-show="v.send"
                  class="content_userlist_sendmessage"
                >
                  发送消息
                </span>
                 <img class="fxx" v-show="v.share" src="../../assets/img/share.png" alt="" />
                <span
                  @click="toShare(v)"
                  v-show="v.share"
                  class="content_userlist_share"
                >
                  分享名片
                </span>
              </div>
              <!-- <p v-show="v.num == 2" class="content_userlist_sharehe">
                  <img src="../../assets/img/share.png" alt="" />
                  分享给他
                </p> -->
            </div>
          </li>
        </my-scroll>
      </ul>
      <div class="zm">
        <a
          :style="{ color: v1.name == letterSearch ? 'white' : '' }"
          @click="setLetterSearch(v1)"
          v-for="(v1, k1) in zmlist"
          :key="k1"
          >{{ v1.name }}</a
        >
      </div>
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
    <inv-user-info v-if="inv_userInfo" :inv_userInfo.sync="inv_userInfo" />
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import MailListComs from "./MailListCom";
import MyScroll from "@/components/MyScroll.vue";
import SpeedText from "@/components/SpeedText.vue";
import InvUserInfo from "@/components/InvUserInfo.vue";
@Component({
  components: {
    MyScroll,
    SpeedText,
    InvUserInfo
  },
})
export default class MailListCom extends mixins(MailListComs) {}
</script>

<style lang="scss" scoped>
@import "./MailListCom.scss";
</style>