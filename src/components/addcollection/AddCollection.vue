<template>
  <!-- 添加到收藏夹 -->
  <div class="addcollection">
    <!-- 收藏夹 -->
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
      <span @click="createNewCollection = true" class="addnew">创建收藏夹</span>
      <div v-show="createNewCollection" class="addnewcontent">
        <div class="scjmc">
          <span class="name"> 收藏夹名称： </span>
          <input
            v-model="collection_name"
            type="text"
            placeholder="请输入收藏夹名称"
           style=" border-bottom:1px solid #979797"
          />
        </div>
        <div class="sqfm">
          <span class="sqfms"> 收藏夹封面： </span>
          <label for="upFile">
            <!-- <input
              style="display: none"
              id="upFile"
              type="file"
              ref="upFile"
              @change="upFile"
            /> -->
              <span class="xzfm" v-show="!img_pv" @click="choosePhoto=true" :class="img_pv ? 'kaoyou':''" style="cursor: pointer;color:#8FC8FF;font-size:14px"> 
                <img  src="../../assets/img/cjqs1.png" alt="">
                 <p >选择封面</p>
                 </span>
            <img v-show="img_pv" style="width:170px;height:100px;" :src="~img_pv.indexOf('http')?img_pv:axios.defaults.baseURL+img_pv" alt="">
            <span  v-show="img_pv" @click="choosePhoto=true" :class="img_pv ? 'cxxz':''" >重新选择...</span>
            
          </label>
        </div>
      </div>
      <!-- <div v-show="createNewCollection" class="caozuo">
        <span @click="createCollection">确认</span>
        <span @click="extCreateCollection">取消</span>
      </div> -->
      <div v-show="createNewCollection"  class="edit_wrap_footer">
          <el-button size="small" style="width:80px;" type="primary" @click="createCollection" >确 认</el-button>
          <el-button size="small" style="width:80px;" @click="extCreateCollection" >取 消</el-button>
        </div>
    </div>

    <!-- 示例图片 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="choosePhoto"
      :append-to-body="true"
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
      :append-to-body="true"
      title="封面上传"
      width="800px"
      top="25vh"
    >
      <up-file v-if="upLoadPhoto" @ext="upRes" :img="upimg" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import AddCollectionCom from "./AddCollection";
import UpFile from "@/components/upfile/UpFile.vue";
import MyScroll from "@/components/MyScroll.vue";
import OtherPhotos from "@/components/otherphotos/OtherPhotos.vue"
@Component({
  components: {
    MyScroll,
    UpFile,
    OtherPhotos
  },
})
export default class AddCollection extends mixins(AddCollectionCom) {}
</script>

<style lang="scss" scoped>
@import "./AddCollection.scss";
</style>