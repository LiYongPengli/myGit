<template>
  <div class="sharecontent">
      <el-popover
        @after-enter="getFriendList"
        placement="left-start"
        width="400"
        trigger="click"
      >
        <friends-list :friend_list="friend_list" @show="setShare" />
        <slot slot="reference"></slot>
        <!-- <p slot="reference">11111111111</p> -->
      </el-popover>
      <!-- 分享弹窗 -->
      <el-dialog
      title="分享"
      :modal="false"
      :append-to-body="true"
      :close-on-click-modal="false"
      :visible.sync="shareWindow"
      width="800px"
      top="25vh"
    >
      <dialog-cm :type="type" @close="shareWindow=false" v-if="share_user" :share_user="share_user" :names="names" :content="content" />
      
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import ShareContentCom from './ShareContent'
import DialogCm from './DialogCm.vue'
import FriendsList from './FriendsList.vue'
@Component({
    components:{
        DialogCm,
        FriendsList
    }
})
export default class ShareContent extends mixins(ShareContentCom) {

}
</script>

<style lang="scss" scoped>
@import './sharecontent.scss';
</style>
