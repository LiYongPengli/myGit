<template>
  <div class="useraccount">
    <div class="usermanage">账号管理</div>
    <div class="useraccountlist">
      <div class="telephone">
        <img
          class="telephoneimg"
          src="../../assets/img/useraccountshouji.png"
          alt=""
        />
        <div class="left">
          <p>手机号码</p>
          <p>176****9003</p>
        </div>
        <div class="right">
          <p>如需更换手机号请联系运维人员</p>
          <p>0452-1212454</p>
        </div>
      </div>
      <div class="telephone" :class="{ bangding: !bangding }">
        <img
          class="wechatimg"
          src="../../assets/img/useraccountweixin.png"
          alt=""
        />
        <div class="left">
          <p>微信昵称</p>
          <p>{{ bangding ? "Tc.Wang" : "赞未绑定微信" }}</p>
        </div>
        <div class="right">
          <span @click="binding = true">{{
            bangding ? "解绑 >" : "绑定 >"
          }}</span>
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
          <p>Tc.Wang</p>
        </div>
        <div class="right">
          <span @click="ninameupdate = true">修改></span>
        </div>
      </div>
    </div>
    <div class="body">
      <!-- 头像修改 -->
      <el-dialog
        :visible.sync="headportraitupdate"
        title="头像修改"
        class="ghsjh"
        width="800px"
        top="40vh"
      >
        <div class="niname">
          <div class="ninam_top">
            <span>头像:</span>
            <div class="headportraitchoice">
              <img src="../../assets/img/cjqs.png" alt="" />
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
        title="微信绑定"
        class="ghsjh wbind"
        width="800px"
        top="40vh"
      >
        <div class="wchatimg">
          <img src="../../assets/img/wchatbind.png" alt="" />
          <p>请使用微信扫描二维码</p>
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
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import UserAccountCom from "./UserAccount";

@Component
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