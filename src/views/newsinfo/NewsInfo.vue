<template>
  <div class="newsinfo">
    <header-two />
    <div class="wrap">
      <my-scroll>
        <div class="wrap_content">
          <div class="crumbs">
            <a @click="$router.push('/')">首页</a><b>&gt;</b><a>新闻详情</a>
          </div>
          <p class="title">{{ newsInfo.title }}</p>
          <div class="control_wrap">
            <div class="left">
              <span
                @click="tofollow"
                v-if="!newsInfo.subscribed"
                class="unfollow"
                >关注</span
              >
              <span @click="tofollow" v-if="newsInfo.subscribed" class="follow"
                >已关注</span
              >
              <span class="info"
                >{{ newsInfo.media_name }} 丨 {{ newsInfo.time }} 丨
                {{ newsInfo.favorite }}人收藏 丨 {{ newsInfo.pv }}次浏览量</span
              >
            </div>
            <div class="right">
              <span @click="showCollection = true" class="tool"
                ><i
                  class="el-icon-shoucang"
                  :class="{ actives: newsInfo.favorited }"
                ></i
                >收藏</span
              >
              <span @click="likes" class="tool"
                ><i class="el-icon-zan" :class="{ actives: newsInfo.liked }"></i
                >点赞</span
              >
              <span @click="notInterested" class="tool"
                ><i
                  class="el-icon-nozan"
                  :class="{ actives: newsInfo.not_interested }"
                ></i
                >不感兴趣</span
              >
              <div class="font">
                【 字体:<span
                  @click="fontSize = 14"
                  :class="{ fontActive: fontSize == 14 }"
                  >小</span
                ><span
                  @click="fontSize = 16"
                  :class="{ fontActive: fontSize == 16 }"
                  >中</span
                ><span
                  @click="fontSize = 20"
                  :class="{ fontActive: fontSize == 20 }"
                  >大</span
                >】
              </div>
            </div>
          </div>
          <!-- 文章主体 -->
          <div
            v-if="newsInfo"
            class="content"
            :style="{ 'font-size': fontSize + 'px' }"
          >
            <div
              v-if="newsInfo.media_name != 'YouTube'"
              v-html="getNewsContent()"
              class="news"
            ></div>
            <div v-if="newsInfo.media_name == 'YouTube'" class="youtube">
              <div class="video_wrap">
                <video :src="newsInfo.attachments[1].url" controls>
                  <track :src="newsInfo.attachments[2].url" label="中文" />
                  <track :src="newsInfo.attachments[3].url" label="原文" />
                </video>
              </div>
              <div class="vvts">
                <my-scroll>
                  <p
                    v-for="(v, i) in getYouTubeText(newsInfo.html.content)"
                    :key="i"
                  >
                    {{ v.innerHTML }}
                  </p>
                </my-scroll>
              </div>
            </div>
          </div>
          <!-- 底部操作 -->
          <div class="footer">
            <div class="left">
              <span @click="showDownLoad = true">附件下载</span>
            </div>
            <div class="right">
              <div class="download_this">
                <span @click="downloadWord"><i></i>下载到本地</span>
              </div>
            </div>
          </div>
          <my-footer />
        </div>
      </my-scroll>
    </div>
    <!-- 附件下载 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="showDownLoad"
      width="600px"
      top="28vh"
      title="附件下载"
    >
      <my-scroll>
        <ul class="download_list">
          <li v-for="(v, i) in newsInfo.attachments" :key="i">
            <span v-if="v.name" class="file_name">{{ v.name }}</span>
            <span v-if="!v.name" class="file_name">未知</span>
            <div class="downimg" @click="todownLoad(v)">
              <img src="../../assets/img/download.png" alt="" />
            </div>
          </li>
        </ul>
      </my-scroll>
      <span class="downloadClose" @click="showDownLoad = false">取消</span>
    </el-dialog>
    <!-- 收藏夹 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="showCollection"
      width="800px"
      top="28vh"
      title="收藏到我的"
      class="sc"
    >
      <div class="collectionList">
        <my-scroll>
          <ul>
            <li
              @mouseenter="showCollBtn(i)"
              @mouseleave="hideCollBtn(i)"
              v-for="(v, i) in favoriteList"
              :key="i"
            >
              <span>{{ v.name }}</span>
              <div class="collect_btn">
                <el-button
                  @click="toCollection(v)"
                  v-if="v.show"
                  size="mini"
                  type="primary"
                  >收藏</el-button
                >
              </div>
            </li>
          </ul>
        </my-scroll>
        <span @click="createNewCollection=true" class="addnew">创建新书签</span>
        <div v-show="createNewCollection" class="addnewcontent">
          <div>
            <span class="name"> 书签名称: </span>
            <input type="text" placeholder="请输入新书签名称" />
          </div>
          <div>
            <span class="sqfm"> 书签封面: </span>
            <span style="cursor: pointer"> 点击上传封面 </span>
          </div>
        </div>
        <div v-show="createNewCollection" class="caozuo">
          <span>创建并收藏</span>
          <span>取消创建</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import NewsInfoCom from "./NewsInfo";
import HeaderTwo from "@/components/HeaderTwo.vue";
import MyFooter from "@/components/FooterTwo.vue";
import MyScroll from "@/components/MyScroll.vue";
@Component({
  components: {
    HeaderTwo,
    MyFooter,
    MyScroll,
  },
})
export default class NewsInfo extends mixins(NewsInfoCom) {}
</script>

<style lang="scss" scoped>
@import "./NewsInfo.scss";
</style>
<style lang="scss">
.newsinfo {
  .el-dialog {
    background: #3a3a48;
    // height: 345px;
  }
  // .el-dialog__header {
  //   padding-bottom: 20px;
  //   padding-right: 15px;
  //   border-bottom: 1px solid #4d4d5d;
  // }
  .el-icon-close {
    line-height: 24px;
    color: white;
  }
  .el-icon-close:hover {
   
    color: white;
  }
  .el-dialog__title {
    color: white;
    margin-left: 30px;
  }
  // .el-dialog__body {
  //   padding: 0;
  //   .download_list {
  //     height: 180px;
  //     margin-top: 20px;
  //     li {
  //       height: 36px;
  //     }
  //   }
  //   .downloadClose {
  //     position: absolute;
  //     bottom: 28px;
  //     left: 256px;
  //     border: 1px solid #676770;
  //   }
  //   .downloadClose:hover {
  //     background-color: #0074ff;
  //   }
  // }
  .sc {
    // .el-dialog {
    //   width: 800px;
    //   height: 470px;
    //   .el-dialog__header {
    //     .el-dialog__title {
    //       font-size: 20px;
    //     }
    //   }
    //   .el-dialog__body {
    //     padding: 30px 50px;
    //     ul {
    //       height: 100px;
    //     }
    //     .addnew {
    //       cursor: pointer;
    //       margin-bottom: 20px;
    //       color: white;
    //     }
    //     .addnewcontent {
    //       width: 700px;
    //       height: 110px;
    //       margin-top: 20px;
    //       background-color: #4d4d5d;
    //       div {
    //         margin-top: 30px;
    //         width: 260px;
    //         float: left;
    //         height: 50px;

    //         color: white;
    //         margin-left: 30px;
    //         span {
    //           display: block;
    //           margin-bottom: 15px;
    //         }
    //         input {
    //           background-color: #4d4d5d;
    //           color: white;
    //           border: none;
    //           outline: none;
    //         }
    //       }
    //     }
    //     .caozuo {
    //       margin-top: 20px;
    //       text-align: center;
    //       span {
    //         margin-right: 10px;
    //         color: white;
    //         cursor: pointer;
    //         display: inline-block;
    //         width: 100px;
    //         height: 40px;
    //         line-height: 40px;
    //         border-radius: 3px;
    //       }
    //       span:hover {
    //         background-color: #0074ff;
    //       }
    //     }
    //     // .caozuo::after {
    //     //   content: "";
    //     //   display: block;
    //     //   clear: both;
    //     // }
    //   }
    // }
  }
}
</style>