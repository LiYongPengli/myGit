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
          <li v-for="(v,keys,i) in userlists" :index="i" :key="keys">
            <div class="content_userlist">
              <img
                class="header"
                v-if="!v.recommended.headimg && !v.recommended.wechat_info.head_img"
                :src="v.recommended.headimg"
                alt=""
              />
              <img
                class="header"
                v-if="!v.recommended.headimg && v.recommended.wechat_info.head_img"
                :src="v.recommended.wechat_info.head_img"
                alt=""
              />
              <p v-if="!v.recommended.headimg && !v.recommended.wechat_info.head_img" class="content_userlist_engname">{{ v.recommended.nickname.slice(0, 1) }}</p>
              <p class="content_userlist_chinename">{{v.recommended.nickname}}</p>
              <p class="remarks_p">
                "{{v.recommender.nickname}}"将"{{v.recommended.nickname}}"的名片推荐给你
              </p>
              <p v-show="v.status=='ignored'||v.status=='pending'" @click="showInvInfo(v,keys)" class="content_userlist_request request">
                <img src="../../assets/img/fabuqingqiu.png" alt="" />
                请求添加好友
              </p>
              <p @click.stop="igron(v,keys)" v-show="v.status=='pending'" class="content_userlist_hulve hulve">
                <img src="../../assets/img/hulve.png" alt="" />
                忽略
              </p>
              <p v-show="v.status == 'ignored'" class="content_userlist_share">
                已忽略
              </p>
              <p v-show="v.status == 'requested'" class="content_userlist_share">
                待验证
              </p>
              <p v-show="v.status == 'accepted'" class="content_userlist_share">
                已添加
              </p>
              <p v-show="v.status == 'rejected'" class="content_userlist_share">
                已拒绝
              </p>
            </div>
          </li>
            </my-scroll>
          <!-- 新朋友列表 -->
          <!-- <li @click="showInfo(v)" v-for="(v, i) in newFriendList" :key="i">
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
              <p v-if="!v.headimg && !v.wechat_info.head_img" class="content_userlist_engname">
                {{ v.nickname.slice(0, 1) }}
              </p>
              <p class="content_userlist_chinename">{{ v.nickname }}</p>
              <p class="remarks_p">
                {{ v.message }}
              </p>
              <p
              @click.stop="toReject(v)"
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
                已添加
              </p>
              <p v-show="v.status == 'rejected'" class="content_userlist_share">
                已拒绝
              </p>
            </div>
          </li> 
        </my-scroll>-->
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