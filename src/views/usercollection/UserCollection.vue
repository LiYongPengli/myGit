<template>
  <!-- 我的收藏 -->
  <div class="usercollection">
    <div v-if="show" class="ss">
      <p>我的收藏(8)</p>
      <input type="text" placeholder="请输入关键词" />
      <span class="plfx">批量分享</span>
    </div>
    <vue-scroll>
      <div class="collectionlist">
        <ul>
          <li>
            <div class="collection">
              <img src="../../assets/img/scmr.png" alt="" />
              <span class="name">默认标签</span>
              <span class="time"></span>
              <el-button class="edit" type="primary" icon="el-icon-edit-outline"
                >编辑</el-button
              >

              <el-button
                @click="dialogVisible = true"
                class="delete"
                type="danger"
                icon="el-icon-delete"
              >
                删除
              </el-button>
            </div>
          </li>
          <li>
            <div class="collection">
              <img src="../../assets/img/sylbtp.png" alt="" />
              <span class="name">拜登系列</span>
              <span class="time">2020年10月21日 创建</span>
              <span class="edit"> 编辑 </span>
              <span class="delete"> 删除 </span>
            </div>
          </li>
          <li>
            <div class="collection">
              <img src="../../assets/img/sylbtp.png" alt="" />
              <span class="name">拜登系列</span>
              <span class="time">2020年10月21日 创建</span>
              <span class="edit"> 编辑 </span>
              <span class="delete"> 删除 </span>
            </div>
          </li>
          <li>
            <div class="collection">
              <img src="../../assets/img/sylbtp.png" alt="" />
              <span class="name">拜登系列</span>
              <span class="time">2020年10月21日 创建</span>
            </div>
          </li>
          <li>
            <div class="collection">
              <img src="../../assets/img/sylbtp.png" alt="" />
              <span class="name">拜登系列</span>
              <span class="time">2020年10月21日 创建</span>
            </div>
          </li>
          <li>
            <div class="collection cjsqhz">
              <img class="cjsq" src="../../assets/img/cjqs.png" alt="" />
              <span class="cjsqmz">拜登系列</span>
              <span class="time"></span>
            </div>
          </li>
          <li>
            <div class="collection">
              <img src="../../assets/img/sylbtp.png" alt="" />
              <span class="name">拜登系列</span>
              <span class="time">2020年10月21日 创建</span>
            </div>
          </li>
          <li>
            <div class="collection">
              <img src="../../assets/img/sylbtp.png" alt="" />
              <span class="name">拜登系列</span>
              <span class="time">2020年10月21日 创建</span>
            </div>
          </li>
          <li>
            <div class="collection">
              <img src="../../assets/img/sylbtp.png" alt="" />
              <span class="name">拜登系列</span>
              <span class="time">2020年10月21日 创建</span>
            </div>
          </li>
          <li>
            <div class="collection">
              <img src="../../assets/img/sylbtp.png" alt="" />
              <span class="name">拜登系列</span>
              <span class="time">2020年10月21日 创建</span>
            </div>
          </li>
        </ul>
      </div>
    </vue-scroll>
    <zhuanti />
    <el-dialog title="编辑书签标题" :visible.sync="dialogVisible">
      <span>专题书签标题</span>
      <span>专题书签标题</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import UserCollectionCom from "./UserCollection";
import Zhuanti from '@/components/zhuanti/Zhuanti.vue';
@Component({
  components:{
    Zhuanti
  }
})
export default class UserCollection extends mixins(UserCollectionCom) {}
</script>

<style lang="scss" scoped>
@import "./UserCollection.scss";
</style>
<style lang="scss">
.usercollection{
  .el-dialog{
    background: black;
  }
}
</style>