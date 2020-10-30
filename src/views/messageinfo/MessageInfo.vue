<template>
  <div class="messageinfo">
    <div class="mycollect">
      <ul class="position">
        <li class="L">
          <a href=""> 我的消息 </a>
          >
          <a href=""> 消息详情 </a>
        </li>
      </ul>
      <a class="fanhui" href="#">返回 ></a>
    </div>
    <div class="content">
      <h2 class="title">系统通知</h2>
      <span class="time"> 2020-09-14 11:36 </span>
      <p class="contentp">
        亨廷顿因《文明的冲突与世界秩序的重建》而享誉世界，其生前最后一本书《我们是谁：美国国家认同面临的挑战》，却没有得到足够充分的讨论。这本书的主旨可以概括为：文明冲突演化成为美国的文化内战，激化了21世纪初美国的国家认同危机。而在作者看来，特朗普政府的内外政策倒很像根据此书制订而成，也注定酝酿其内部的认同危机。
      </p>
      <p class="contentp">
        亨廷顿因《文明的冲突与世界秩序的重建》而享誉世界，其生前最后一本书《我们是谁：美国国家认同面临的挑战》，却没有得到足够充分的讨论。这本书的主旨可以概括为：文明冲突演化成为美国的文化内战，激化了21世纪初美国的国家认同危机。而在作者看来，特朗普政府的内外政策倒很像根据此书制订而成，也注定酝酿其内部的认同危机。
      </p>
      <p class="contentp">
        亨廷顿因《文明的冲突与世界秩序的重建》而享誉世界，其生前最后一本书《我们是谁：美国国家认同面临的挑战》，却没有得到足够充分的讨论。这本书的主旨可以概括为：文明冲突演化成为美国的文化内战，激化了21世纪初美国的国家认同危机。而在作者看来，特朗普政府的内外政策倒很像根据此书制订而成，也注定酝酿其内部的认同危机。
      </p>
      <div class="btn">
           <div class="shanchu">删  除</div>
          <div class="return">返 回</div>
         
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