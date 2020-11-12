<template>
  <!-- 热门推荐 -->
  <div class="myfollow">
    <div class="list_wrap">
      <div class="list_nav">
        <span @click="chooseNav='all'" :class="{'cur':chooseNav=='all'}">全部关注</span>
        <span @click="chooseNav='country'" :class="{'cur':chooseNav=='country'}">国家</span>
        <span @click="chooseNav='people'" :class="{'cur':chooseNav=='people'}">人物</span>
        <span @click="chooseNav='media'" :class="{'cur':chooseNav=='media'}">媒体</span>
      </div>
      <div class="gjlb">
        <p v-if="chooseNav=='country'" class="sx">选择相关国家可以进行信息筛选</p>
        <p v-if="chooseNav=='people'" class="sx">选择相关人物可以进行信息筛选</p>
        <p v-if="chooseNav=='media'" class="sx">选择相关媒体可以进行信息筛选</p>
        <!-- 筛选栏 -->
        <!-- 国家 -->
        <div v-show="chooseNav=='country'" class="erhang">
          <span class="all">全部</span>
           <div class="gd">更多+</div>
          <ul>
            <!-- <li><a>中国</a>X</li> -->
            <li v-for="(v,i) in country" :key="i"><a>{{v.name_zh}}</a></li>
          </ul>
          
        </div>
        <!-- 人物 -->
        <div v-show="chooseNav=='people'" class="erhang">
          <span class="all">全部</span>
           <div class="gd">更多+</div>
          <ul>
            <li><a>中国</a>X</li>
            <li v-for="(v,i) in people" :key="i"><a>{{v.name}}</a></li>
          </ul>
          
        </div>
        <!-- 媒体 -->
        <div v-show="chooseNav=='media'" class="erhang">
          <span class="all">全部</span>
           <div class="gd">更多+</div>
          <ul>
            <li><a>中国</a>X</li>
            <li v-for="(v,i) in media" :key="i"><a>{{v.name_zh}}</a></li>
          </ul>
          
        </div>
        
      </div>
      <div class="list">
        <ul>
          <li>
            <div class="ly">
              <div class="tx">
                <img src="../../assets/img/media.png" alt="" />
              </div>
              <div class="sjrs">
                <span class="mt">媒体: TechWeb.com.cn </span>
                <span class="time">时间: 10分钟前</span>
                <span class="ll">浏览次数: 32人</span>
              </div>
              <div class="zan">
                <img src="../../assets/img/zanpress.png" alt="" />
                <span>214</span>
                <img src="../../assets/img/zhuanfafasong.png" alt="" />
              </div>
            </div>
            <div class="content">
              <p class="title"><a href="">美国财长谈TikTok解决方案 不涉及出售和技术转让</a></p>
              <div class="ziyuan">
                <img src="../../assets/img/gztp.png" alt="" />
                <img src="../../assets/img/gztp.png" alt="" />
              </div>
            </div>
          </li>
          <li>
            <div class="ly">
              <div class="tx">
                <img src="../../assets/img/media.png" alt="" />
              </div>
              <div class="sjrs">
                <span class="mt">媒体: TechWeb.com.cn </span>
                <span class="time">时间: 10分钟前</span>
                <span class="ll">浏览次数: 32人</span>
              </div>
              <div class="zan">
                <img src="../../assets/img/zanpress.png" alt="" />
                <span>214</span>
                <img src="../../assets/img/zhuanfafasong.png" alt="" />
              </div>
            </div>
            <div class="content">
             <p class="title"><a href="">美国财长谈TikTok解决方案 不涉及出售和技术转让</a></p>
              <div class="ziyuan">
                <img src="../../assets/img/gzxwdt.png" alt="" />
              </div>
            </div>
          </li>
          <li>
            <div class="ly">
              <div class="tx">
                <img src="../../assets/img/media.png" alt="" />
              </div>
              <div class="sjrs">
                <span class="mt">媒体: TechWeb.com.cn </span>
                <span class="time">时间: 10分钟前</span>
                <span class="ll">浏览次数: 32人</span>
              </div>
              <div class="zan">
                <img src="../../assets/img/zanpress.png" alt="" />
                <span>214</span>
                <img src="../../assets/img/zhuanfafasong.png" alt="" />
              </div>
            </div>
            <div class="content">
              <p class="title"><a href="">美国财长谈TikTok解决方案 不涉及出售和技术转让</a></p>
            </div>
          </li>
          <li>
            <div class="ly">
              <div class="tx">
                <a href="">
                  <img src="../../assets/img/media.png" alt="" />
                </a>
              </div>
              <div class="sjrs">
                <span class="mt">新华社 </span>
                <span class="time">时间: 10分钟前</span>
                <span class="ll">浏览次数: 32人</span>
              </div>
              <div class="zan">
                <img src="../../assets/img/zanpress.png" alt="" />
                <span>214</span>
                <img src="../../assets/img/zhuanfafasong.png" alt="" />
              </div>
            </div>
            <div class="content">
              <p class="title"><a href="">美国财长谈TikTok解决方案 不涉及出售和技术转让</a></p>
              <div class="ziyuan">
                <img src="../../assets/img/gztp.png" alt="" />
                <img src="../../assets/img/gztp.png" alt="" />
              </div>
            </div>
          </li>
          <div class="jzgd">更多精彩内容，加载中</div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import MyFollowCom from './Myfollow'
@Component
export default class MyFollow extends mixins(MyFollowCom) {
  
}
</script>
 

<style lang="scss" scoped>
@import "./Myfollow.scss";
</style>