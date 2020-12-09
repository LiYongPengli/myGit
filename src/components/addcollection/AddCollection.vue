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
      <span @click="createNewCollection = true" class="addnew">创建新书签</span>
      <div v-show="createNewCollection" class="addnewcontent">
        <div>
          <span class="name"> 书签名称: </span>
          <input
            v-model="collection_name"
            type="text"
            placeholder="请输入新书签名称"
          />
        </div>
        <div>
          <span class="sqfm"> 书签封面: </span>
          <label for="upFile">
            <input
              style="display: none"
              id="upFile"
              type="file"
              ref="upFile"
              @change="upFile"
            />
            <span style="cursor: pointer"> 点击上传封面 </span>
          </label>
        </div>
      </div>
      <div v-show="createNewCollection" class="caozuo">
        <span @click="createCollection">创建并收藏</span>
        <span @click="extCreateCollection">取消创建</span>
      </div>
    </div>
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
@Component({
  components: {
    MyScroll,
    UpFile,
  },
})
export default class AddCollection extends mixins(AddCollectionCom) {}
</script>

<style lang="scss" scoped>
@import "./AddCollection.scss";
</style>