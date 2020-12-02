<template>
<!-- 添加好友 -->
  <div class="addfriends">
      <div class="title">
      <span class="maybetitle">新的朋友</span>
      <span @click="$emit('update:visable', 1)" class="newfriend">
        返回
        <a>></a>
      </span>
    </div>
    <div class="search">
      <input type="text" v-model="keyword"  placeholder="搜索您想要添加的账号/手机号/微信名" />
      <img @click="searchFriends"  src="../../assets/img/search.png" alt="" />
    </div>
    <div class="content_userlists">
      <ul>
        <my-scroll>
          <li v-for="(v,keys,i) in userlists" :index="i" :key="keys"
           @mouseover="showShare(keys)"
           @mouseout="hideShare(keys)"
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
              <p v-if="!v.headimg && !v.wechat_info.head_img" class="content_userlist_engname">{{ v.nickname.slice(0, 1) }}</p>
              <p class="content_userlist_chinename">{{v.nickname}}</p>
              <!-- <p class="remarks_p">
                "{{v.nickname}}"将"{{v.nickname}}"的名片推荐给你
              </p> -->
              <p
                @click="toShare(v)"
                v-if="v.is_friend"
                class="content_userlist_share"
              >
                <img src="../../assets/img/share.png" alt="" />
                分享名片
              </p>
              <p
               @click="igron(v, keys)"
                v-if="!v.is_friend"
                class="content_userlist_share"
              >
                <img src="../../assets/img/share.png" alt="" />
                忽略
              </p>
              <!-- /&& v.send -->
               <p @click.stop="sendMessage(v)" v-if="v.is_friend" class="content_userlist_sendmessage">
                <img src="../../assets/img/sendmessage.png" alt="" />
                发送消息
              </p>
                <p @click="showInvInfo(v)" v-if="!v.is_friend " class="content_userlist_sendmessage">
                <img src="../../assets/img/sendmessage.png" alt="" />
                添加朋友
              </p>


            
            </div>
          </li>
            </my-scroll>
         
      </ul>
    </div>

  </div>
  
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import AddFriendsCom from './AddFriends'
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