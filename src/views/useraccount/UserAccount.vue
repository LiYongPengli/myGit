<template>
  <div class="useraccount">
    <div class="usermanage">账号管理</div>
    <div class="useraccountlist" v-if="user_message">
      <div class="telephone">
        <img
          class="telephoneimg"
          src="../../assets/img/useraccountshouji.png"
          alt=""
        />
        <div class="left">
          <p>手机号码</p>
          <p>{{user_message.phone_number.slice(0,3)}}****{{user_message.phone_number.slice(7)}}</p>
        </div>
        <div class="right">
          <p>如需更换手机号请联系运维人员</p>
          <p>0452-1212454</p>
        </div>
      </div>
      <div class="telephone" :class="{ bangding: !user_message.wechat_info.binding }">
        <img
          class="wechatimg"
          src="../../assets/img/useraccountweixin.png"
          alt=""
        />
        <div class="left">
          <p>微信昵称</p>
          <p>{{ user_message.wechat_info.binding ? user_message.wechat_info.nickname : "赞未绑定微信" }}</p>
        </div>
        <div class="right">
          <span v-show="user_message.wechat_info.binding" @click="unbinding = true">解绑></span>
          <span v-show="!user_message.wechat_info.binding" @click="binding = true">绑定></span>
        </div>
      </div>
      <!-- 头像 -->
      <div class="telephone">
        <img
          class="ninameing"
          @click="headportraitupdate = true"
          src="../../assets/img/useraccountniname.png"
          alt=""
        />
        <div class="left">
          <p>昵称</p>
          <p>{{user_message.nickname}}</p>
        </div>
        <div class="right">
          <span @click="ninameupdate = true">修改></span>
        </div>
      </div>
    </div>
    <div class="body">
      <!-- 上传头像 -->
    <el-dialog
      :visible.sync="upLoadPhoto"
      :close-on-click-modal="false"
      :append-to-body="true"
      title="头像上传"
      width="800px"
      top="25vh"
    >
      <up-file v-if="upLoadPhoto" @ext="upRes" :img="upimg" />
    </el-dialog>
      <!-- 头像修改 -->
      <el-dialog
        :visible.sync="headportraitupdate"
        title="头像修改"
        class="ghsjh"
        width="800px"
        top="25vh"
      >
        <div class="niname">
          <div class="ninam_top">
            <span>头像:</span>
            <div v-show="!headerPhoto" class="headportraitchoice">
              <label for="up">
                <input ref="file" style="display:none;" type="file" id="up" name="">
                <img src="../../assets/img/cjqs.png" alt="" />
              </label>
              <p>上传头像</p>
            </div>
          </div>
          <div class="niname_foot">
            <el-button
              @click="changeheadportrait"
              style="width: 190px"
              type="primary"
              >确认</el-button
            >
            <el-button @click="headportraitupdate = false" style="width: 190px"
              >取消</el-button
            >
          </div>
        </div>
      </el-dialog>
      <!-- 微信绑定 -->
      <el-dialog
        :visible.sync="binding"
        @opened="bindWechat"
        title="微信绑定"
        class="ghsjh wbind"
        width="800px"
        top="25vh"
      >
        <div class="wchatimg">
          <wxlogin v-if="wx_data" :state="wx_data.state" :theme="'white'" :redirect_uri="wx_data.redirect_uri" :appid="wx_data.appid" :scope="wx_data.scope"></wxlogin>
        </div>
      </el-dialog>
      <!-- 昵称修改 -->
      <el-dialog
        :visible.sync="ninameupdate"
        title="昵称修改"
        class="ghsjh"
        width="800px"
        top="40vh"
      >
        <div class="niname">
          <div class="ninam_top">
            <span>昵称:</span>
            <input v-model="niname" placeholder="请输入昵称" />
          </div>
          <div class="niname_foot">
            <el-button @click="changeniname" style="width: 190px" type="primary"
              >确认</el-button
            >
            <el-button @click="ninameupdate = false" style="width: 190px"
              >取消</el-button
            >
          </div>
        </div>
      </el-dialog>
      <!-- 警告 -->
      <transition name="el-zoom-in-top">
        <warning @ext="unbinding=false" @sure="unbindingWechat" v-if="unbinding" title="提示" top="25vh" text="确定要解绑微信账号吗?" />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import UserAccountCom from "./UserAccount";
import Warning from "@/components/Warning.vue"
import wxlogin from '@/components/vue-wxlogin.vue'
import UpFile from '@/components/upfile/UpFile.vue'
@Component({
  components:{
    Warning,
    wxlogin,
    UpFile
  }
})
export default class UserCollection extends mixins(UserAccountCom) {}
</script>

<style lang="scss" scoped>
@import "./UserAccount.scss";
</style>
<style lang="scss">
.useraccount {
  .wbind {
    .el-dialog {
      top: 15px;
      .el-dialog__body {
        padding-top: 40px !important;
        .wchatimg {
          text-align: center !important;
          padding-bottom: 50px;
          p {
            color: white;
            font: 16px;
            padding-top: 20px;
          }
        }
      }
    }
  }
  .ghsjh {
    .el-dialog {
      background: #3a3a48;
      //   height: 330px;
      .el-dialog__header {
        padding-top: 30px;
        height: 80px;
        padding-left: 50px;
        border-bottom: 1px solid #4d4d5d;
        .el-dialog__title {
          font-size: 20px;
          color: white;
        }
        .el-dialog__headerbtn {
          margin-right: 30px;
          color: white;
          top: 30px;
          color: #c3c3c7;
          background: url("../../assets/img/dialogclose.png") left no-repeat !important;
        }
      }
      .el-dialog__body {
        padding: 60px 100px 0;

        .niname {
          .ninam_top {
            font-size: 16px;
            color: white;
            position: relative;
            input {
              margin-left: 40px;
              background: #3a3a48;
              outline: none;
              border: none;
              color: white;
              height: 35px;
              padding-bottom: 16px;
              border-bottom: 1px solid #4d4d5d;
              width: 400px;
              font-size: 16px;
            }
            input::-webkit-input-placeholder {
              /* WebKit browsers */
              color: white;
            }
            input:-moz-placeholder {
              /* Mozilla Firefox 4 to 18 */
              color: white;
            }
            input::-moz-placeholder {
              /* Mozilla Firefox 19+ */
              color: white;
            }
            input:-ms-input-placeholder {
              /* Internet Explorer 10+ */
              color: white;
            }
            span{
                position: absolute;
                top: 0;
            }
            .headportraitchoice{
                height: 112px;
                width: 112px;
                
                display: inline-block;
                border: 1px dashed #9499aa;
                margin-left: 50px;
                text-align: center;
                img{
                margin-top: 22px;
                }
                
            }
          }
        }
        .niname_foot {
          padding-bottom: 50px;
          margin-top: 60px;
          text-align: center;
          button {
            height: 50px;
          }
        }
      }
    }
  }
}
</style>