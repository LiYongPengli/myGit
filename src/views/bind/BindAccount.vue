<template>
<!-- 绑定睿读账号 -->
  <div class="bindAccount">
    <div class="login_wrap">
      <div class="logo">
        <img src="../../assets/logo.png" alt="" />
      </div>
      <p class="title">微信授权成功,请绑定睿读账号</p>
      <div class="inputs">
        <div class="item username">
          <span class="icon el-icon-user"></span>
          <input
            type="text"
            v-model="form.account"
            placeholder="请输入账户名称"
          />
        </div>
        <div class="item password">
          <span class="icon el-icon-lock"></span>
          <span
            @click="show_password = !show_password"
            class="show el-icon-view"
          ></span>
          <input
            v-show="show_password"
            type="text"
            v-model="form.password"
            placeholder="请输入密码"
          />
          <input
            v-show="!show_password"
            type="password"
            v-model="form.password"
            placeholder="请输入密码"
          />
        </div>
        <div class="item VerificationCode">
          <span class="icon el-icon-warning-outline"></span>
          <input type="text" v-model="form.vc" placeholder="请输入验证码" />
          <img @click="getImgCode" class="code" :src="img_vc" alt="" />
        </div>
        <div class="sub_btn">
          <el-button @click="toLogin" style="flex: 3" type="primary"
            >绑定</el-button
          >
          <el-button @click="$router.back()" style="flex: 1" type="danger"
            >取消</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { baseApi } from "@/axios/axios";
import { Component, Vue } from "vue-property-decorator";
import qs from "qs";
@Component
export default class BindAccount extends Vue {
  //是否显示密码
  public show_password: boolean = false;
  //base64图片验证码
  public img_vc: string = "";
  //要提交的数据
  public form = {
    account: "",
    password: "",
    vc: "",
  };

  private created(): void {
    this.getImgCode();
  }

  //获取图片验证码
  public async getImgCode(): Promise<void> {
    try {
      let res = await this.axios.get(baseApi.api1 + "/v1/verify/img");
      this.img_vc = res.data.data;
    } catch (err) {
      console.log(err);
    }
  }
  //图片验证码确认
  public async imgCodeSure(img_code: string): Promise<boolean> {
    if (!img_code) {
      this.$message.error("请输入图片验证码");
      return false;
    }
    try {
      await this.axios.put(
        baseApi.api1 + "/v1/verify/img",
        qs.stringify({ vc: img_code })
      );
      return true;
    } catch (code_err) {
      if (code_err.response.data.message == "Verification code is uncorrect.") {
        this.$message.error("图片验证码错误");
        this.getImgCode();
      }
      console.log(code_err);
      return false;
    }
  }

  //账号登录
  public async toLogin(): Promise<void> {
    if (!this.form.account) {
      this.$message.error("请输入用户名");
      return;
    }
    if (!this.form.password) {
      this.$message.error("请输入密码");
      return;
    }
    if (this.form.password.length < 8) {
      this.$message.error("密码长度不可小于8位");
      return;
    }
    if (!this.form.vc) {
      this.$message.error("请输入验证码");
      return;
    }
    if (await this.imgCodeSure(this.form.vc)) {
      try {
        let data = {
          account: this.form.account,
          password: this.form.password,
        };
        let res = await this.axios.post(
          baseApi.api1 + "/v1/user/wechat/bind",
          qs.stringify(data)
        );
        if (!res.data.status) {
          this.$message.error(res.data.data.msg);
          return;
        }
        this.$message.success("登录成功!");
        //重置登录状态
        this.axios.put(baseApi.api1 + "/v1/user/wechat/");
        this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bindAccount {
  height: 100%;
  color: white;
  .login_wrap {
    width: 27%;
    min-width: 400px;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: relative;
    .logo {
      margin-left: 15%;
      padding-top: 50px;
    }
    .title {
      margin-left: 15%;
      margin-top: 100px;
      font-size: 18px;
      padding: 20px 0;
    }
    .inputs,
    .phoneLogin {
      margin-left: 15%;
      width: 70%;
      .item {
        position: relative;
        input {
          width: 100%;
          background: none;
          border: none;
          outline: none;
          border-bottom: 1px solid gray;
          color: white;
          box-sizing: border-box;
          padding: 20px 0 20px 50px;
        }
        input::-webkit-input-placeholder {
          color: white;
        }
        .icon {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
        }
        .show {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
        }
        .code {
          width: 100px;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
        }
        .get_code {
          display: block;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          font-size: 12px;
          border: 1px solid gray;
          padding: 6px 10px;
          border-radius: 5px;
          cursor: pointer;
        }
      }
      .password {
        input {
          padding-right: 30px;
        }
      }
      .sub_btn {
        display: flex;
        margin-top: 40px;
      }
      .other {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        .el-checkbox {
          color: white;
        }
        .foget_pwd {
          cursor: pointer;
        }
        .foget_pwd:hover {
          text-decoration: underline;
        }
      }
    }
    .bindAccount {
      width: 70%;
      margin-left: 15%;
      .top {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px 0;
        .left_log,
        .right_log {
          display: flex;
          width: 70px;
          height: 70px;
          box-sizing: border-box;
          border: 1px solid gray;
          border-radius: 50%;
          img {
            display: block;
            width: 50%;
            margin: auto;
          }
        }
        .center_ico {
          margin: 0 10px;
          font-size: 20px;
          transform: rotateZ(90deg);
        }
      }
      .center {
        margin-top: 10px;
      }
      .footer {
        text-align: center;
        font-size: 14px;
        padding: 20px 0;
        span {
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
    .weiChatLogin {
      margin-left: 15%;
      margin-top: 40px;
      display: flex;
      width: 70%;
      .code {
        width: 100%;
        img {
          width: 100%;
          display: block;
        }
      }
      .text {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p {
          padding: 5px 0;
        }
      }
    }
    footer {
      width: 100%;
      display: flex;
      position: absolute;
      left: 0;
      bottom: 0;
      padding: 20px 0;
      border-top: 1px solid gray;
      .weixin,
      .account,
      .phone {
        height: 15px;
        flex: 1;
        display: flex;
        align-items: center;
        font-size: 14px;
        box-sizing: border-box;
        cursor: pointer;
        img {
          width: 25px;
        }
        span {
          margin-left: 10px;
        }
      }
      .weixin,
      .account {
        justify-content: flex-end;
        padding-right: 40px;
      }
      .phone {
        border-left: 1px solid gray;
        padding-left: 40px;
      }
    }
  }
}
</style>