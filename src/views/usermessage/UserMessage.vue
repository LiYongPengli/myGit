<template>
  <div class="usermessage">
    <div v-show="!showInfo" class="mymessage">
      <el-row>
        <span> 我的消息 </span>
        <el-button size="mini" @click="allRead" class="yidu" type="info">全部已读</el-button>
        <el-button size="mini" @click="clearMessage" class="clear" type="info">全部清空</el-button>
      </el-row>
    </div>
    <div v-show="!showInfo" class="list">
      <div class="nodata" v-show="!messageList.length&&!loadingList">暂无消息</div>
      <ul>
        <li @click="toInfo(v)" @mouseenter="$set(messageList[i],'delete',true)" @mouseleave="$delete(messageList[i],'delete')" v-for="(v,i) in messageList" :key="i">
          <span class="weidu"> {{v.status=='unread'?'未读':'已读'}} </span>
          <a class="name"> {{v.title}} </a>
          <span class="time"> 时间：<span v-time="v.time"></span> </span>
          <el-button @click.stop="remove(v,i)" v-show="v.delete" class="shanchu" type="primary" icon="el-icon-delete"
            >删除</el-button
          >
        </li>
        <!-- <div class="jzgd">更多精彩内容，加载中</div> -->
      </ul>
    </div>
      <message-info @ext="back" :message="chooseMessage" v-if="showInfo" />
  </div>
      
</template>
<script lang="ts">
import Component, { mixins } from "vue-class-component";
import UserMessageCom from "./UserMessage";
import MessageInfo from "@/components/messageinfo/MessageInfo.vue";
@Component({
  components: {
    MessageInfo,
  },
})
export default class UserCollection extends mixins(UserMessageCom) {}
</script>


<style lang="scss" scoped>
@import "./UserMessage.scss";
</style>
<style lang="scss">
.usermessage {
  .clear,
  .yidu {
    float: right;
    margin-top: 20px;
    background-color: #494959;
    margin-top: 0;
  }
  .yidu {
    margin-left: 20px;
  }
  .list {
    ul {
      li {
        position: relative;
        .shanchu {
          position: absolute;
          right: 30px;
          top: 30px;
          background-color: #3a3a48;
          border: 0;
          font-size: 14px;
        }
      }
    }
  }
}
</style>