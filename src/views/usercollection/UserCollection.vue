<template>
  <!-- 我的收藏 -->
  <div class="usercollection">
    <div v-if="show" class="ss">
      <p>我的收藏({{favoriteList.length}})</p>
      <input type="text" placeholder="请输入关键词" />
      <span class="plfx">批量分享</span>
    </div>
    <div class="collectionlist">
      <my-scroll v-if="listshow">
        <ul>
          <li @mouseover="showBtn(i)" @mouseout="hideBtn(v,i)" v-for="(v,i) in favoriteList" :key="i">
            <div class="collection">
              <img v-if="v.name=='默认'" src="../../assets/img/scmr.png" alt="" />
              <img v-if="v.name!='默认'" :src="v.cover" alt="" />
              <span class="name">{{v.name=='默认'?'默认标签':v.name}}</span>
              <span class="time">{{v.created_at.split(".")[0]}} 创建</span>
              <el-button
                @click="dialogVisible = true"
                v-show="v.showControl"
                class="edit"
                type="primary"
                icon="el-icon-edit-outline"
                >编辑</el-button
              >

              <el-button
                @click="dialogVisible = true"
                v-show="v.showControl"
                class="delete"
                type="danger"
                icon="el-icon-delete"
              >
                删除
              </el-button>
            </div>
          </li>
          <li>
            <div class="collection cjsqhz">
              <img class="cjsq" src="../../assets/img/cjqs.png" alt="" />
              <span class="cjsqmz">拜登系列</span>
            </div>
          </li>
        </ul>
      </my-scroll>
    </div>
    <el-dialog
      top="390px"
      width="800px"
      title="编辑书签标题"
      :visible.sync="dialogVisible"
    >
      <span class="name">书签名称：</span>
      <span class="nr">请输入专题名称</span>
      <span class="fm">书签封面:</span>
      <div class="sqcj">
        <img src="../../assets/img/cjqs.png" alt="" />
        <span class="scfm">上传封面</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确 认</el-button
        >
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- <zhuan-ti /> -->
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import UserCollectionCom from "./UserCollection";
import ZhuanTi from "@/components/zhuanti/Zhuanti.vue";
import MyScroll from "@/components/MyScroll.vue";
@Component({
  components: {
    ZhuanTi,
    MyScroll,
  },
})
export default class UserCollection extends mixins(UserCollectionCom) {}
</script>

<style lang="scss" scoped>
@import "./UserCollection.scss";
</style>
<style lang="scss">
.usercollection {
  .el-dialog {
    background: #3a3a48;
    height: 475px;
    .el-dialog__header {
      border-bottom: 1px solid #4d4d5d;
      padding: 0;
      line-height: 80px;
      .el-dialog__title {
        color: white;
        font-size: 20px;
        padding-left: 50px;
        padding-top: 30px;
      }
      .el-dialog__headerbtn {
        .el-dialog__close {
          color: #c3c3c7;
        }
      }
    }

    .el-dialog__body {
      height: 200px;
      position: relative;
      color: white;
      font-size: 16px;
      padding: 0;
      padding-left: 65px;
      .fm {
        display: block;
        margin-top: 35px;
      }
      .nr {
        display: inline-block;
        width: 400px;
        border-bottom: 1px solid #4d4d5d;
        padding-bottom: 20px;
      }
      .name {
        display: inline-block;
        margin-top: 60px;
        margin-right: 40px;
      }
      .sqcj {
        width: 200px;
        height: 100px;
        border: 2px dashed #9499aa;
        position: absolute;
        top: 110px;
        left: 184px;
        img {
          margin-left: 80px;
          margin-top: 20px;
        }
        .scfm {
          display: block;
          text-align: center;
        }
      }
    }
    .el-dialog__footer {
      padding: 10px 20px 20px;
      text-align: right;
      box-sizing: border-box;
      /* margin-bottom: 50px; */
      margin-top: 70px;
      text-align: center;
      .dialog-footer {
        .el-button--primary {
          width: 190px;
        }
        .el-button--default {
          width: 190px;
        }
      }
    }
  }
}
</style>