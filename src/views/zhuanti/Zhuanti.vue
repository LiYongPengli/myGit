<template>
  <div class="zhuanti">
    <div class="mycollect">
      <ul class="position">
        <li class="L">
          <a href=""> 我的收藏 </a>
          >
          <a href=""> 特朗普系列 </a>
          <span class="tongji"> 共8篇文章 </span>
        </li>
      </ul>
      <span class="plfx right">批量分享</span>
    </div>
    <div class="list">
      <ul>
        <li>
          <div class="pic">
            <img src="../../assets/img/sylbtp.png" alt="" />
          </div>
          <div class="text">
            <p class="title">
              美国财长谈TikTok解决方案 不涉及出售和技术转让 #新冠疫情 #美国大选
            </p>
            <span class="mt">媒体: TechWeb.com.cn </span>
            <span class="time">时间: 10分钟前</span>
            <span class="ll">浏览次数: 32人</span>
          </div>

          <div class="zan">
            <span class="shanchu"> 删除</span>
            <span class="fenxiang">分享</span>
          </div>
        </li>
        <li>
          <div class="pic">
            <img src="../../assets/img/sylbtp.png" alt="" />
          </div>
          <div class="text">
            <p class="title">
              美国财长谈TikTok解决方案 不涉及出售和技术转让 #新冠疫情 #美国大选
            </p>
            <span class="mt">媒体: TechWeb.com.cn </span>
            <span class="time">时间: 10分钟前</span>
            <span class="ll">浏览次数: 32人</span>
          </div>

           <div class="zan">
            <span class="shanchu"> 删除</span>
            <span class="fenxiang">分享</span>
          </div>
        </li>
        <li>
          <div class="pic">
            <img src="../../assets/img/sylbtp.png" alt="" />
          </div>
          <div class="text">
            <p class="title">
              美国财长谈TikTok解决方案 不涉及出售和技术转让 #新冠疫情 #美国大选
            </p>
            <span class="mt">媒体: TechWeb.com.cn </span>
            <span class="time">时间: 10分钟前</span>
            <span class="ll">浏览次数: 32人</span>
          </div>

         <div class="zan">
            <span class="shanchu"> 删除</span>
            <span class="fenxiang">分享</span>
          </div>
        </li>

        <div class="jzgd">更多精彩内容，加载中</div>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import ZhuantiCom from "./Zhuanti";
@Component
export default class Zhuanti extends mixins(ZhuantiCom) {}
</script>

<style lang="scss">
@import "./Zhuanti.scss";
</style>