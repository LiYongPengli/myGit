<template>
  <div class="invuserinfo" :style="{ height: height + 'px' }">
    <div class="chatcontent">
      <div @click="$emit('update:inv_userInfo', '')" class="close">
        <img src="../assets/img/chatclose.png" alt="" />
      </div>
      <div class="username">
        <img
          :src="axios.defaults.baseURL + '/avatar/' + inv_userInfo.account"
          alt=""
        />
        <!-- <p class="head">{{inv_userInfo.nickname.slice(0,1)}}</p> -->
        <p class="name">{{ inv_userInfo.nickname }}</p>
      </div>

      <div class="remarks_yanzheng">
        <span class="remarks_name">* 需要验证您的身份信息：</span>
        <!-- <input
            class="remarks_value"
            v-model="message"
            type="text"
            placeholder="请输入验证消息"
          /> -->
        <el-input
          type="textarea"
          :rows="5"
          class="remarks_value"
          placeholder="请输入您的请求信息(必填)"
          v-model="message"
        >
        </el-input>
      </div>
      <div class="remarks_div">
        <span class="remarks_name">备注名：</span>
        <input
          class="remarks_value"
          v-model="remark_name"
          type="text"
          placeholder="设置备注"
        />
      </div>
      <!-- <span class="nick_name">昵称：</span>
        <span class="nick_value">{{inv_userInfo.nickname}}</span> -->
      <el-button
        :disabled="!message"
        type="primary"
        @click="sendMessage"
        class="sendmes"
        >添加到通讯录</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
@Component
export default class InvUserInfo extends Vue {
  @Prop({}) inv_userInfo: any;
  public message: string = "";
  public remark_name: string = "";
  public height: number = 0;

  public created(): void {
    this.height = document.documentElement.clientHeight;
  }

  @Watch("inv_userInfo.user_id")
  public listenUserId(): void {
    this.message = "";
    this.remark_name = "";
  }

  public sendMessage(): void {
    this.axios
      .post("/v1/cmd/", {
        cmd: "request_add_friend",
        paras: {
          user_id: this.inv_userInfo.user_id,
          message: this.message,
          remark_name: this.remark_name,
          r_id: this.inv_userInfo.id ? this.inv_userInfo.id : "",
        },
      })
      .then((res) => {
        this.$message.success("验证发送成功，等待对方通过!");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
</script>

<style lang="scss" scoped>
.invuserinfo {
  width: 380px;
  position: absolute;
  background: #2f343d;
  left: 820px;
  top: 0;
  border-left: 1px solid #5e656e;
  .chatcontent {
    margin: 50px 30px 0;
    overflow: hidden;
    .close {
      img {
        width: 15px;
        height: 15px;
        float: right;
        cursor: pointer;
      }
    }
    img:after {
      display: block;
      content: "";
      clear: both;
    }
  }
  .username {
    margin-top: 80px;
    text-align: center;
    color: white;
    .head {
      width: 40px;
      height: 40px;
      background: #4caf50;
      line-height: 40px;
      text-align: center;
      margin-left: 139px;
    }
    img {
      width: 40px;
      display: block;
      margin: auto;
    }
    .name {
      margin-top: 20px;
      font-size: 20px;
    }
  }
  .remarks_div,
  .remarks_yanzheng {
    margin-top: 60px;
    color: white;
    font-size: 16px;
    input {
      background-color: #2f343d;
      outline: none;
      border: none;
      // padding-left: 10px;
      color: white;
      font-size: 16px;
    }
  }
  .remarks_div {
    margin-top: 20px;
    .remarks_name {
      padding-bottom: 15px;
    }
  }
  .remarks_yanzheng {
    .remarks_value {
      padding-top: 10px;
    }
  }
  .nick_name,
  .nick_value {
    margin-top: 20px;
    display: inline-block;
    color: white;
    font-size: 16px;
    text-align: right;
  }
  .nick_name {
    margin-left: 16px;
  }
  .nick_value {
    padding-left: 20px;
  }
  .sendmes {
    width: 319px;
    height: 60px;
    margin-top: 80px;
  }
}
</style>
<style lang="scss">
.invuserinfo {
  .chatcontent {
    .remarks_yanzheng {
      .remarks_value {
        .el-textarea__inner {
          background: #2f343d;
          border: 1px solid #5e656e;
          color: white;
          font-size: 16px;
        }
        textarea::-webkit-input-placeholder {
          /* WebKit browsers */
          color: #6d6d6e;
        }
        textarea:-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: #6d6d6e;
        }
        textarea::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: #6d6d6e;
        }
        textarea::-ms-input-placeholder {
          /* Internet Explorer 10+ */
          // color: #9c9c9c;
          color: #6d6d6e;
        }
      }
    }
  }
}
</style>