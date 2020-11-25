<template>
  <!-- 聊天工具，可能认识 -->
  <div class="maybeknow">
    <div class="content">
      <div class="title">
        <p class="maybetitle">可能认识的人</p>
      </div>
      <div class="content_userlists">
        <ul>
          <!-- <li v-for="(v, k) in tableData" :key="k" :class="{'active':k%2 != 0}"> -->
          <my-scroll style="content_mt_onescroll">
            <li v-for="(v, k) in userlists" :key="k">
              <div class="content_userlist">
                <img v-if="v.headimg" :src="v.headimg" alt="" />
                <img
                  v-if="!v.headimg && v.wechat_info.head_img"
                  :src="v.wechat_info.head_img"
                  alt=""
                />
                <p
                  v-show="!v.headimg && !v.wechat_info.head_img"
                  class="content_userlist_engname"
                >
                  {{ v.nickname.slice(0, 1) }}
                </p>
                <p class="content_userlist_chinename">
                  {{ v.nickname }}
                </p>
                <p @click="toAdd(v)" class="content_userlist_add">+</p>
              </div>
            </li>
          </my-scroll>
        </ul>
      </div>
    </div>
    <el-dialog :modal="false" :close-on-click-modal="false" :visible.sync="dialogVisible" title="提示" width="500px" top="25vh">
      <el-form>
        <el-form-item label="请输入验证消息:" >
          <el-input v-model="message" type="text" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendMessage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import MaybeKnowCom from "./MaybeKnow";
import MyScroll from "@/components/MyScroll.vue";
@Component({
  components: {
    MyScroll,
  },
})
export default class MaybeKnow extends mixins(MaybeKnowCom) {}
</script>

<style lang="scss" scoped>
@import "./MaybeKnow.scss";
</style>