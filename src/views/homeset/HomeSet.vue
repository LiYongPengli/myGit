<template>
  <div class="homeset">
    <my-scroll>
      <header>
        <div class="header">
          <h1>选择您感兴趣的选项</h1>
          <!-- <span class="zssg">至少选择3个，后期可随时调整</span> -->
          <div class="tab">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :class="{ cur: pageIndex == 0 }" :to="{ path: '/' }"
                >国家
              </el-breadcrumb-item>
              <el-breadcrumb-item :class="{ cur: pageIndex == 1 }"
                >媒体
              </el-breadcrumb-item>
              <el-breadcrumb-item :class="{ cur: pageIndex == 2 }"
                >人物
              </el-breadcrumb-item>
              <el-breadcrumb-item :class="{ cur: pageIndex == 3 }"
                >推荐频道
              </el-breadcrumb-item>
            </el-breadcrumb>
            <input v-model="searchText" type="text" placeholder="请输入关键词" />
          </div>
        </div>
      </header>
      <!-- 国家 -->
      <div v-if="pageIndex == 0" class="content">
        <span class="yx">
          已选：<span v-for="(v, i) in sub_form.country" :key="i">
            {{ i == 0 ? "" : "、" }} {{ v.name }}</span
          >
        </span>
        <div
          class="content_wrap"
          v-loading="loadCountry"
          element-loading-background="rgba(0, 0, 0, 0.1)"
        >
          <my-scroll @loading="loadingCountry">
            <ul>
              <li
                @click="chooseItem('country', v, i)"
                v-for="(v, i) in country_list"
                :key="i"
                :class="{ cur: v.choose }"
              >
                <a>
                  <!-- 50*30 -->
                  <img style="margin-top: 20px" :src="v.flag" alt="" />

                  <span style="height: 20px; width: 130px" class="chinese_gj">
                    <speed-text width="130px" height="20px" :text="v.name_zh" />
                  </span>

                  <span style="width: 130px" class="english_gj"
                    ><speed-text width="130px" height="20px" :text="v.name"
                  /></span>
                </a>
              </li>
            </ul>
          </my-scroll>
        </div>
        <div class="footer">
          <el-button @click="toNext" style="width: 280px;font-size:16px;margin-left:320px" type="primary"
            >下一步</el-button
          >
          <a class="shsz" href="#">稍后设置</a>
        </div>
      </div>
      <!-- 媒体 -->
      <div v-if="pageIndex == 1" class="content content_mt">
        <span class="yx">
          已选：<span v-for="(v, i) in sub_form.media" :key="i">
            {{ i == 0 ? "" : "、" }} {{ v.name }}</span
          >
        </span>
        <!-- 7天活跃 -->
        <div v-show="media_list.week.length" class="content_wrap" style="height: 320px">
          <span class="qit">近7天内活跃的媒体</span>
          <div style="height: 285px; overflow: hidden">
            <my-scroll @loading="loadingMedia" style="content_mt_onescroll">
              <ul class="mt">
                <li
                  @click="chooseMediaItem('week', v, i)"
                  v-for="(v, i) in media_list.week"
                  :key="i"
                  :class="{ cur: v.choose }"
                >
                  <a>
                    <!-- 50*30 -->
                    <img class="mrtx" src="../../assets/img/media_default.png" alt="" />
                     <img class="duigou" src="../../assets/img/mtdg.png" alt="">
                    <div class="zyname">
                      <div class="">
                        <speed-text width="130px" height="20px" :text="v.name_zh" />
                      </div>
                    </div>
                    <!-- <a class="mtdg" href="">
                      <img src="../../assets/img/mtdg.png" alt="">
                    </a> -->
                  </a>
                </li>
              </ul>
            </my-scroll>
          </div>
        </div>
        <!-- 30天活跃 -->
        <div v-show="media_list.month.length" class="content_wrap" style="height: 320px">
          <span class="sst">近30天内活跃的媒体</span>
          <div style="height: 285px; overflow: hidden">
            <my-scroll @loading="loadingMedia">
              <ul class="mt">
                <li
                  @click="chooseMediaItem('month', v, i)"
                  v-for="(v, i) in media_list.month"
                  :key="i"
                  :class="{ cur: v.choose }"
                >
                  <a>
                    <!-- 50*30 -->
                    <img class="mrtx" src="../../assets/img/media_default.png" alt="" />

                    <div class="zyname">
                      <div class="">
                        <speed-text width="130px" height="20px" :text="v.name_zh" />
                      </div>

                      <!-- <div class="">
                        <speed-text width="130px" height="20px" :text="v.name" />
                      </div> -->
                    </div>
                    <a class="mtdg" href="">
                      <img src="../../assets/img/mtdg.png" alt="">
                    </a>
                  </a>
                </li>
              </ul>
            </my-scroll>
          </div>
        </div>
        <!-- 其他 -->
        <div v-show="!media_list.month.length" class="content_wrap">
          <span class="sst">30天前活跃媒体</span>
          <my-scroll>
            <ul class="mt">
              <li
                @click="chooseMediaItem('other', v, i)"
                v-for="(v, i) in media_list.other"
                :key="i"
                :class="{ cur: v.choose }"
              >
                <a>
                  <img class="mrtx" src="../../assets/img/media_default.png" alt="" />
                  <div class="zyname">
                    <div class="">
                      <speed-text width="110px" height="20px" :text="v.name_zh" />
                    </div>
                    <!-- <div class="">
                      <speed-text width="110px" height="20px" :text="v.name_zh" />
                    </div> -->
                  </div>
                  <a class="mtdg" href="">
                      <img src="../../assets/img/mtdg.png" alt="">
                    </a>
                </a>
              </li>
            </ul>
          </my-scroll>
        </div>
        <div class="footer" style="margin-bottom: 50px">
               <div @click="pageIndex--" class="up">上一步</div>
          <el-button @click="toNext" style="width: 280px;font-size:16px;margin-left:50px" type="primary"
            >下一步</el-button
          >
     
             <a class="shsz" href="#">稍后设置</a>
        </div>
      </div>
      <!-- 人物 -->
      <div v-if="pageIndex == 2" class="content">
        <span class="yx">
          已选：<span v-for="(v, i) in sub_form.character" :key="i">
            {{ i == 0 ? "" : "、" }} {{ v.name }}</span
          ></span
        >
        <div class="content_wrap">
          <my-scroll>
            <ul class="rw">
              <li
                @click="chooseItem('character', v, i)"
                :class="{ cur: v.choose }"
                v-for="(v, i) in character_list"
                :key="i"
                class=" "
              >
                <a>
                  <!-- 50*30 -->
                  <img
                    v-if="v.avatar != -1 && v.avatar != null"
                    :src="axios.defaults.baseURL + '/attachments/avator/' + v.avatar"
                    alt=""
                  />
                  <img
                    v-if="v.avatar == -1 || v.avatar == null"
                    src="../../assets/img/zwtx.png"
                    alt=""
                  />

                  <span style="top: -30px; width: 220px" class="chinese_gj mt">
                    <speed-text width="220px" height="20px" :text="v.zh_name" />
                  </span>

                  <span style="width: 220px" class="english_gj mt">
                    <speed-text width="220px" height="20px" :text="v.description" />
                  </span>
                </a>
              </li>
              <div
                data-v-49519b49=""
                style="content: ''; display: block; clear: both"
              ></div>
            </ul>
          </my-scroll>
        </div>

        <div class="footer">
          <div @click="pageIndex--" class="up">上一步</div>
          <el-button @click="toNext" style="width: 280px;font-size:16px;margin-left:50px" type="primary"
            >下一步</el-button
          >
          <a class="shsz" href="#">稍后设置</a>
        </div>
      </div>
      <!-- 推荐频道 -->
      <div v-if="pageIndex == 3" class="content">
        <span class="yx">
          已选：<span v-for="(v, i) in sub_form.channel" :key="i">
            {{ i == 0 ? "" : "、" }} {{ v.name }}</span
          ></span
        >
        <div class="content_wrap">
          <my-scroll @loading="loadingChannel">
            <ul class="tjpd">
              <li
                @click="chooseItem('channel', v, i)"
                :class="{ cur: v.choose }"
                v-for="(v, i) in channel_list"
                :key="i"
              >
                <div class="tjpddiv">
                  
                  <div style="width:160px" class="tjpddivname">
                    
                     <speed-text width="140px" height="40px" :text="v.name" />
                     </div>
                      
                </div>
              </li>
            </ul>
          </my-scroll>
        </div>
        <div class="footer">
         
          <div @click="pageIndex--" class="up">上一步</div>
           <el-button @click="toFinish" style="width: 280px;font-size:16px;margin-left:50px" type="primary"
            >完成</el-button
          >
        </div>
      </div>
    </my-scroll>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import HomeSetCom from "./HomeSet";
import SpeedText from "@/components/SpeedText.vue";
import MyScroll from "@/components/MyScroll.vue";

@Component({
  components: {
    SpeedText,
    MyScroll,
  },
})
export default class HomeSet extends mixins(HomeSetCom) {}
</script>

<style lang="scss">
@import "./HomeSet.scss";
</style>

<style lang="scss">
.homeset {
  .el-breadcrumb {
    width: 800px;
    height: 40px;
    line-height: 40px;
    display: flex;
    align-items: center;
  }
 
  .el-breadcrumb__inner,
  .el-breadcrumb__inner {
    color: #9898a9 !important;
  }
  span.cur .el-breadcrumb__inner {
    font-size: 20px;
    color: white !important;
  }
  .el-row {
    text-align: center;
    margin-top: 80px;

    .up {
      width: 140px;
      height: 60px;
      line-height: 60px;
      background-color: #272730;
      margin-left: 20px;
      display: inline-block;
      color: white;
      cursor: pointer;
    }
    .up:hover {
      font-size: 20px;
    }
  }
}
</style>
