<template>
  <div class="home">
    <!-- 头部导航 -->

    <header>
      <div class="logo">
        <a href="/"></a>
      </div>
      <div class="search">
        <button value="" title="检索"></button>
        <input
          type="text"
          placeholder="大家正在搜：加码挑拨！美议员提决议案：呼吁美国恢复与台“邦交”，终结一中政策"
        />
      </div>
      <div class="bottom">
        <div class="user_info">
          <button value="" title="头像"></button>
          <!-- 头部下拉框 -->
          <el-dropdown class="select" @command="handleCommand" trigger="click">
            <span style="color: white" class="el-dropdown-link">
              username<i
                style="margin-left: 20px"
                class="el-icon-arrow-down el-icon--right"
              ></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="/user">个人中心</el-dropdown-item>
              <el-dropdown-item command="b">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <select>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select> -->
        </div>
        <div class="nav">
          <router-link to="/myfollow">我的关注</router-link
          >&nbsp;&nbsp;&nbsp;&nbsp;
          <router-link to="/recommend">热门推荐</router-link>
        </div>
        <div class="lang">
          <span @click="setLanguage('crawler')" :class="{'cur':language=='crawler'}">原文</span>
          <span @click="setLanguage('zh-CN')" :class="{'cur':language=='zh-CN'}">中文</span>
          <span @click="setLanguage('en')" :class="{'cur':language=='en'}">英文</span>
        </div>
      </div>
    </header>
    <!-- 聊天工具 -->
    <transition name="topic">
      <div v-if="topic_show" class="topic">
        <!-- 聊天工具组件 -->
      </div>
    </transition>
    <div class="body">
      <!-- 内容主体 -->
      <div class="wrap">
        <router-view />
      </div>
      <footer>
        <p>睿读v2.1.35 2018 © 中经软件</p>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import HomeCom from "./Home";
import Component, { mixins } from "vue-class-component";
@Component
export default class Home extends mixins(HomeCom) {}
</script>
<style lang="scss" scoped>
@import "./Home.scss";
</style>
