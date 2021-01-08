<template>
  <div class="messageinfo">
    <div class="mycollect">
      <ul class="position">
        <li class="L">
          <a> 我的消息 </a>
          >
          <a> 消息详情 </a>
        </li>
      </ul>
      <a @click="back" class="fanhui">返回 ></a>
    </div>
    <div class="content">
      <h2 class="title">{{message.title}}</h2>
      <span v-time="message.time" class="time"></span>
      <p class="contentp">
        {{message.text}}
      </p>
      <div class="btn">
           <div @click="remove" class="shanchu">删  除</div>
          <div @click="back" class="return">返 回</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import MessageInfoCom from "./MessageInfo";
@Component
export default class messageinfo extends mixins(MessageInfoCom) {}
</script>

<style lang="scss" scoped>
@import "./MessageInfo.scss";
</style>