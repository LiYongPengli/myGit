<template>
  <!-- 我的收藏 -->
  <div class="usercollection">
    <div v-if="show" class="ss">
      <p>我的收藏({{ favoriteList.length }})</p>
      <input type="text" placeholder="请输入关键词" />
      <span class="plfx">批量分享</span>
    </div>
    <div class="collectionlist">
      <my-scroll v-if="listshow">
        <ul>
          <li
            @mouseover="showBtn(i)"
            @mouseout="hideBtn(v, i)"
            v-for="(v, i) in favoriteList"
            :key="i"
          >
            <div class="collection">
              <img
                v-if="v.name == '默认'"
                src="../../assets/img/scmr.png"
                alt=""
              />
              <img v-if="v.name != '默认'" :src="v.cover" alt="" />
              <span class="name">{{
                v.name == "默认" ? "默认标签" : v.name
              }}</span>
              <span class="time">{{ v.created_at.split(".")[0] }} 创建</span>
              <el-button
                @click="toEdit(v)"
                v-show="v.showControl&&v.name!='默认'"
                class="edit"
                type="primary"
                icon="el-icon-edit-outline"
                >编辑</el-button
              >

              <el-button
                @click="deleteFav(v)"
                v-show="v.showControl&&v.name!='默认'"
                class="delete"
                type="danger"
                icon="el-icon-delete"
              >
                删除
              </el-button>
            </div>
          </li>
          <li @click="toCreateFavorite">
            <div class="collection cjsqhz">
              <img class="cjsq" src="../../assets/img/cjqs.png" alt="" />
              <span class="cjsqmz">拜登系列</span>
            </div>
          </li>
        </ul>
      </my-scroll>
    </div>
    <el-dialog
      top="25vh"
      width="800px"
      :title="dialogTitle"
      :visible.sync="dialogVisible"
    >
      <div class="edit_wrap">
        <span class="name">书签名称：</span>
        <input v-model="favorite_form.name" class="nr" type="text" placeholder="请输入专题名称" />
        <span class="fm">书签封面:</span>
        <div v-show="favorite_form.cover" class="sqcj_img">
          <img :src="favorite_form.cover" alt="" />
        </div>
        <div class="sqcj">
          <label for="file">
            <img src="../../assets/img/cjqs.png" alt="" />
            <input @change="chooseFile" ref="fileipt" style="display:none;" accept="image/*" type="file" id="file" />
            <span class="scfm">上传封面</span>
          </label>
        </div>
        
        <div class="edit_wrap_footer">
          <el-button type="primary" @click="toSure"
            >确 认</el-button
          >
          <el-button @click="dialogVisible = false">取 消</el-button>
        </div>
      </div>
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
  }
}
</style>