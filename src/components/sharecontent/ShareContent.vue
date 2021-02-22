<template>
  <div class="sharecontent">
      <el-popover
        @after-enter="getDataList"
        placement="left-start"
        width="400"
        trigger="click"
      >
        <friends-list :grop_list="grop_list" :friend_list="friend_list" @show="setShare" />
        <slot slot="reference"></slot>
        <!-- <p slot="reference">11111111111</p> -->
      </el-popover>
      <!-- 分享弹窗 -->
      <el-dialog
      title="分享"
      @closed="clear=true"
      :modal="false"
      :append-to-body="true"
      :close-on-click-modal="false"
      :visible.sync="shareWindow"
      width="800px"
      top="25vh"
    >
      <dialog-cm :clear="clear" :type="type" @close="shareWindow=false" :share_type="share_type" v-if="share_user" :share_user="share_user" :names="names" :content="content" />
      
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
