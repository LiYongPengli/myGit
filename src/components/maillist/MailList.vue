<template>
  <!-- 聊天工具，通讯录 -->
  <div class="maillist">
    <!-- 通讯录 -->
    <mail-list-coms @share="shareMethod" v-if="newfriendid==1" :visable.sync="newfriendid" />
    <!-- 新朋友 -->
    <new-friends  v-if="newfriendid==2" :visable.sync="newfriendid" />
    <!-- 添加朋友 -->
    <add-friends @share="shareMethod" v-if="newfriendid==4" :visable.sync="newfriendid" />
    <!-- 分享给Ta -->
    <share v-if="newfriendid==3" :user="shareUser" :visable.sync="newfriendid" />
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import MailListCom from "./MailList";
import MailListComs from "@/components/maillistcom/MailListCom.vue"
import NewFriends from "@/components/newfriends/NewFriends.vue"
import AddFriends from "@/components/addfriends/AddFriends.vue"
import Share from '@/components/share/Share.vue'
@Component({
  components: {
    MailListComs,
    NewFriends,
    AddFriends,
    Share
  },
})
export default class MailList extends mixins(MailListCom) {}
</script>

<style lang="scss" scoped>
@import "./MailList.scss";
</style>