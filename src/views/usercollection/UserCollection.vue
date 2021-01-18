<template>
  <!-- 我的收藏 -->
  <div class="usercollection">
    <div v-if="show == 1" class="ss">
      <p>我的收藏({{ favoriteList.length }})</p>
      <div class="right">
        <input v-model="searchText" type="text" placeholder="请输入收藏夹名称" />
        <span @click="isShare = true" class="plfx" v-show="!isShare">批量分享</span>
        <div v-show="isShare" class="share_control">
          <div class="ext_share">
            <el-button
              @click="
                isShare = false;
                shares = [];
              "
              style="width: 80px"
              size="mini"
              type="danger"
              >取消分享</el-button
            >
          </div>
          <share-content :names="shares" v-show="isShare" type="collection">
            <el-button
              type="primary"
              :disabled="!shares.join('')"
              style="width: 80px"
              size="mini"
              >确认分享</el-button
            >
          </share-content>
        </div>
      </div>
    </div>
    <div v-if="show == 1" class="collectionlist">
      <my-scroll v-if="listshow">
        <ul class="collectionlist_wrap">
          <li
            v-show="~v.name.indexOf(searchText)"
            :style="{
              background: shares[i] == v.name ? '#409EFF' : ' #3a3a48',
            }"
            @click.stop="toCollectionList(v)"
            @mouseenter="showBtn(i)"
            @mouseleave="hideBtn(v, i)"
            v-for="(v, i) in favoriteList"
            :key="i"
          >
            <div class="collection">
              <div class="img_wrap">
                <img v-if="v.name == '默认'" src="../../assets/img/scmr.png" alt="" />
                <img v-if="v.name != '默认'" :src="v.cover" alt="" />
              </div>

              <div @click.stop="() => {}" class="name">
                {{ v.name == "默认" ? "默认标签" : v.name }}
                <share-content v-show="!isShare" :content="v" type="collection">
                  <img src="../../assets/img/sczhuanfa.png" alt="" />
                </share-content>
                <img
                  @click.stop="$set(shares, i, v.name)"
                  v-show="!shares[i] && isShare"
                  src="../../assets/img/checkbox.png"
                  alt=""
                />
                <img
                  @click.stop="$set(shares, i, null)"
                  v-show="shares[i] && isShare"
                  src="../../assets/img/checked.png"
                  alt=""
                />
              </div>
              <span class="time">{{ v.created_at.split(".")[0] }} 创建</span>
              <el-button
                @click.stop="toEdit(v)"
                v-show="v.showControl"
                class="edit"
                type="primary"
                icon="el-icon-edit-outline"
                >编辑</el-button
              >
              <el-button
                @click.stop="deleteFav(v, i)"
                v-show="v.showControl"
                class="delete"
                type="danger"
                icon="el-icon-delete"
              >
                删除
              </el-button>
            </div>
          </li>
          <li style="background: #3a3a48" @click="toCreateFavorite">
            <div class="collection cjsqhz">
              <img class="cjsq" src="../../assets/img/cjqs.png" alt="" />
              <span class="cjsqmz">创建收藏夹</span>
            </div>
          </li>
        </ul>
      </my-scroll>
    </div>
    <!-- 创建收藏夹 -->
    <el-dialog
      top="25vh"
      width="800px"
      :close-on-click-modal="false"
      element-loading-background="rgba(0, 0, 0, 0.2)"
      v-loading="isUpFile"
      :title="dialogTitle"
      :visible.sync="dialogVisible"
    >
      <div class="edit_wrap">
        <div>
          <span class="name">收藏夹名称：</span>
          <input
            v-model="favorite_form.name"
            class="nr"
            type="text"
            placeholder="请输入专题名称"
          />
        </div>
        <div ></div>
        <div class="sqfm">
          <span class="fm">收藏夹封面:</span>
          <div v-show="favorite_form.cover" class="sqcj_img">
            <img :src="favorite_form.cover" alt="" />
          </div>
          <span class="cxxz" v-show="favorite_form.cover" @click="choosePhoto = true"
            >重新选择...</span
          >
        </div>
        <div @click="choosePhoto = true" v-show="!favorite_form.cover" class="sqcj">
          <label>
            <img src="../../assets/img/cjqs.png" alt="" />

            <span class="scfm">上传封面</span>
          </label>
        </div>

        <div class="edit_wrap_footer">
          <el-button type="primary" @click="toSure">确 认</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 示例图片 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="choosePhoto"
      title="选择封面"
      width="800px"
    >
      <other-photos
        v-if="choosePhoto"
        @default_chg="default_chg"
        @close="choosePhoto = false"
        :default_photos="default_photos"
        @filechange="chooseFile"
      />
    </el-dialog>
    <!-- 上传封面 -->
    <el-dialog
      :visible.sync="upLoadPhoto"
      :close-on-click-modal="false"
      title="封面上传"
      width="800px"
      top="25vh"
    >
      <up-file v-if="upLoadPhoto" @ext="upRes" :img="favorite_form.coverFile" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import UserCollectionCom from "./UserCollection";
import MyScroll from "@/components/MyScroll.vue";
import UpFile from "@/components/upfile/UpFile.vue";
import ShareContent from "@/components/sharecontent/ShareContent.vue";
import OtherPhotos from "@/components/otherphotos/OtherPhotos.vue";
@Component({
  components: {
    MyScroll,
    UpFile,
    ShareContent,
    OtherPhotos,
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
    min-height: 475px;
  }
  .delete {
    .el-icon-delete {
      margin-left: -10px;
    }
    span {
      margin-left: 2px;
    }
  }
  // .edit_wrap_footer{
  //   .el-button--primary{
  //     width: 80px;
  //     height: 35px;
  //     line-height: 35px;
  //   }
  // }
}
</style>
