<template>
  <div class="usermessage">
    <div class="mymessage">
      <el-row>
        <span> 我的消息 </span>
        <el-button class="yidu" type="info">全部已读</el-button>
        <el-button class="clear" type="info">全部清空</el-button>
      </el-row>
    </div>
    <div class="list">
      <ul>
        <li>
          <span class="weidu"> 未读 </span>
          <a class="name" href=""> 了解清楚文章到底是一种怎么样的存在 </a>
          <span class="time"> 时间：2020年10月13日16:26:33 </span>
        </li>
        <li>
          <span class="weidu"> 已读 </span>
          <a class="name" href="">了解清楚文章到底是一种怎么样的存在</a>
          <span class="time"> 时间：2020年10月13日16:26:33 </span>
        </li>
        <li>
          <span class="weidu"> 未读 </span>
          <a class="name" href="" >了解清楚文章到底是一种怎么样的存在</a>
          <span class="time"> 时间：2020年10月13日16:26:33 </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import Component, { mixins } from "vue-class-component";
import UserMessageCom from "./UserMessage";

@Component
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
}
</style>