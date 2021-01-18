<template>
  <div class="publicity">
    <header-two />
    <div class="container">
      <div class="top">
        <h1>睿读使用指南</h1>
        <input type="text" placeholder="请输入收藏夹名称" />
      </div>
      <div class="content">
        <div class="content_left">
          <nav>
            <ul>
              <li @click="this.cur = 0" :class="{ active: this.cur == 0 }">
                <a class="rdgk">睿读概况</a>
              </li>
              <li @click="this.cur = 0" :class="{ active: this.cur == 1 }">
                <a class="rdgk">用户登录</a>
              </li>
              <li @click="this.cur = 0" :class="{ active: this.cur == 2 }">
                <a class="rdgk">用户注册 </a>
              </li>
              <li @click="cur = 0" :class="{ active: cur == 3 }">
                <a href="#">用户关注</a>
              </li>
              <li @click="cur = 0" :class="{ active: cur == 4 }">
                <a href="#">推荐新闻</a>
              </li>
              <li @click="cur = 0" :class="{ active: cur == 5 }">
                <a href="#">平台搜索</a>
              </li>
              <li @click="cur = 0" :class="{ active: cur == 6 }">
                <a href="#">即时通讯</a>
              </li>
              <li @click="cur = 0" :class="{ active: cur == 7 }">
                <a href="#">密码管理</a>
              </li>
              <li @click="cur = 0" :class="{ active: this.cur == 8 }">
                <a href="#">账号管理</a>
              </li>

              <!-- <li @click="cur=0" :class="{active:cur==0}" ><a class="rdgk" href="#">睿读概况</a></li>
              <li @click="cur=0" :class="{active:cur==1}"><a href="#">用户登录</a></li>
              <li @click="cur=0" :class="{active:cur==2}"><a href="#">用户注册</a></li>
              <li @click="cur=0" :class="{active:cur==3}"><a href="#">用户关注</a></li>
              <li @click="cur=0" :class="{active:cur==4}"><a href="#">推荐新闻</a></li>
              <li @click="cur=0" :class="{active:cur==5}"><a href="#">平台搜索</a></li>
              <li @click="cur=0" :class="{active:cur==6}"><a href="#">即时通讯</a></li>
              <li @click="cur=0" :class="{active:cur==7}"><a href="#">密码管理</a></li>
              <li @click="cur=0" :class="{active:cur==8}"><a href="#">账号管理</a></li> -->
            </ul>
          </nav>
        </div>
        <div class="content_right">
          <div class="rdgk" v-show="this.cur == 0">睿读概况</div>
          <div class="yhdl" v-show="this.cur == 1">用户登录</div>
          <div class="yhzc" v-show="this.cur == 2">
            <h2>用户登录</h2>
            <p>用户登录分为【账号登录】、【手机登录】、【微信登录】三种登录方式。</p>
            <p>
              用户登录系统无操作30分钟后，系统自动退出登录，再次点击任何页面均跳转登录页面重新进行登录。
            </p>
            <h3>账号登录：</h3>
            <p></p>

            <p>
              1.账号登录需提供“注册账号”时预留的手机号码或者账号，输入“密码”和“动态图形验证码”进行匹配校验。
            </p>
            <p>
              2.所有手机号/账号或密码输入框最长可输入30个字符，只可输入字符和数字，不可输入汉字。所有密码输入框为密文显示，所有输入框需过滤空格。
            </p>
            <p>3. 账号密码匹配不成功不可进入系统，提示“账号或密码错误，请重新输入”。</p>
            <p>
              4.用户累计密码输入错误5次，锁定账号5分钟，5分钟内不可再进行登录，5分钟过后可正常再次使用账号密码登录，在账号锁定期间，仍可通过微信和手机验证码进行登录。
            </p>
            <p>
              5.
              动态图形验证码检验不成功则提示：“图形验证码错误，请重新输入”且图形验证码立即刷新。图形验证码在输入四位数字后直接触发图形验证码是否正确并提示。
            </p>
            <p>6. 鼠标点击图形验证码可刷新该图形验证码。</p>
            <p>
              7.
              七天内免登录：勾选七天内免登录后，下次用户进入系统可直接进入首页，无需再经过登录页面，七天内有效。
            </p>
            <p>
              8.
              账号密码图形验证码均匹配成功后，检测该用户是否为第一次登录，否：直接进入系统到首页面。是：弹出绑定微信弹窗，提示用户进行微信绑定。
            </p>
            <p>
              9.
              账号与微信进行绑定后，直接进入系统到首页面，自动记录该用户的微信名称、微信头像。
            </p>
            <p>10. 点击【暂不绑定】后，该账号无绑定微信信息，可直接进入到首页面。</p>
            <p>
              11.提示用户绑定微信页面只在用户第一次登录时提示，如用户点击【暂不绑定】，则以后登录时均不再弹出此页面。
            </p>
            <p>
              12.点击【忘记密码】后，弹出重置密码的页面，需输入该用户预留的手机号验证码，校验通过后，输入新密码，确认新密码，即可使用新密码进行登录。两次密码输入不一致时，立即给出提示：两次密码输入不一致，请重新输入。
            </p>
            <p>13. 点击【注册】后，直接跳转注册页面，见【用户注册】模块。</p>
            <h3>手机登录</h3>
            <p>1.手机登录可直接使用已注册的手机号码加短信验证码登录。</p>
            <p>
              2.输入已注册的手机号码，点击获取验证码按钮，在进行手动验证通过后即可成功获取短信验证码，手动验证不通过不可发送短信验证码。
            </p>
            <p>
              3.短信验证码的有效时间为60秒，在60秒内不可重新发送验证码，60秒内关闭网页再次进入该页面后验证码仍然继续倒计时。
            </p>
            <p>
              4. 每个手机号每天接收短信验证码次数为10次，超出10次将不再发送短信验证码。
            </p>
            <p>
              5.手机号需验证格式，只有格式为数字1开头且11位数字方为正确，非此格式的手机号提示“手机格式错误，请重新输入”。
            </p>
            <p>
              6.输入短信验证码后校验该验证码是否正确，不正确则提示：“验证码错误，请重新输入”。
            </p>
            <p>7. 短信验证码正确后可直接点击登录按钮进行登录。</p>
            <p>
              8.进入系统首页前先检验该手机号是否已注册，如该手机号未注册，则提示：“该手机号尚未注册账号，请先注册账号”。已注册手机号直接登录成功进入首页。
            </p>
            <p>9. 手机登录流程图如下</p>
            <h3>微信登录</h3>
            <p>1.页面加载出微信登录接口的二维码。"</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script cript lang="ts">
import Component, { mixins } from "vue-class-component";
import PublicityCom from "./Publicity";
import HeaderTwo from "@/components/HeaderTwo.vue";
@Component({
  components: {
    HeaderTwo,
  },
})
export default class Publicity extends mixins(PublicityCom) {}
</script>

<style lang="scss" scoped>
@import "./Publicity.scss";
</style>
