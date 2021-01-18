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
          <p>
            {{ user_message.phone_number.slice(0, 3) }}****{{
              user_message.phone_number.slice(7)
            }}
          </p>
        </div>
        <div class="right">
          <p>如需更换手机号请联系运维人员</p>
          <!-- <p>0452-1212454</p> -->
        </div>
      </div>
      <div
        class="telephone"
        :class="{ bangding: !user_message.wechat_info.binding }"
      >
        <img
          class="wechatimg"
          src="../../assets/img/useraccountweixin.png"
          alt=""
        />
        <div class="left">
          <p>微信昵称</p>
          <p>
            {{
              user_message.wechat_info.binding
                ? user_message.wechat_info.nickname
                : "暂未绑定微信"
            }}
          </p>
        </div>
        <div class="right  right_p">
          <span
            v-show="user_message.wechat_info.binding"
            @click="unbinding = true"
            >解绑></span
          >
          <span
            v-show="!user_message.wechat_info.binding"
            @click="binding = true"
            >绑定></span
          >
        </div>
      </div>
      <!-- 头像 -->
      <div class="telephone">
        <img
        
          class="ninameing"
          src="../../assets/img/useraccountniname.png"
          alt=""
        />
        <div class="left">
          <p>昵称</p>
          <p>{{ user_message.nickname }}</p>
        </div>
        <div class="right  right_p">
          <span @click="ninameupdate = true">修改></span>
        </div>
      </div>
    </div>
    <div class="body">
      
      
      <!-- 微信绑定 -->
      <el-dialog
        :visible.sync="binding"
        @opened="bindWechat"
        title="微信绑定"
        width="800px"
        top="25vh"
      >
        <div class="wchatimg">
          <wxlogin
            v-if="wx_data"
            :state="wx_data.state"
            :theme="'white'"
            :redirect_uri="wx_data.redirect_uri"
            :appid="wx_data.appid"
            :scope="wx_data.scope"
          ></wxlogin>
        </div>
      </el-dialog>
      <!-- 昵称修改 -->
      <el-dialog
        :visible.sync="ninameupdate"
        :close-on-click-modal="false"
        title="昵称修改"
        class="ghsjh  nc"
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
      <transition name="el-fade-in-linear">
        <warning
          @ext="unbinding = false"
          @sure="unbindingWechat"
          v-if="unbinding"
          title="提示"
          top="25vh"
          text="确定要解绑微信账号吗?"
        />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from "vue-class-component";
import UserAccountCom from "./UserAccount";
import Warning from "@/components/Warning.vue";
import wxlogin from "@/components/vue-wxlogin.vue";

@Component({
  components: {
    Warning,
    wxlogin
  },
})
export default class UserCollection extends mixins(UserAccountCom) {}
</script>

<style lang="scss" scoped>
@import "./UserAccount.scss";
</style>