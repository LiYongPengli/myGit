<template>
  <!-- 头部2 -->
  <div class="headertwo">
      <div class="logo">
        <img src="../assets/img/logo.png" alt="">
      </div>
      <div class="user"></div>
      <div class="search">
        <img src="../assets/img/search.png" alt="">
        <input type="text" placeholder="大家正在搜：加码挑拨！美议员提决议案：呼吁美国恢复与台“邦交”，终结一中政策" />
      </div>
      <div class="language">
        <span>原文</span>
        <span class="language_active">中文</span>
        <span>英文</span>
      </div>
    </div>
</template>

<script>
import { Component,Vue } from 'vue-property-decorator'
@Component
export default class HeaderTwo extends Vue {

}
</script>

<style lang="scss" scoped>
.headertwo {
    display: flex;
    height: 85px;
    background-image: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.2) 0%,
        rgba(138, 138, 138, 0.2) 100%
      ),
      linear-gradient(#30303c, #30303c);
    background-blend-mode: overlay, normal;
    .logo {
      display: flex;
      width: 210px;
      border-right: 1px solid #3a3a48;
      align-items: center;
      flex-shrink:0;
      img{
        display: block;
        width: 55%;
        margin: auto;
      }
    }
    .user{
      width: 266px;
      border-right: 1px solid #3a3a48;
      flex-shrink: 0;
    }
    .search {
      flex: 1;
      position: relative;
      input{
        width: 100%;
        height: 100%;
        background: #272731;
        border: none;
        outline: none;
        box-sizing: border-box;
        padding-left: 75px;
        color: white;
      }
      img{
        position: absolute;
        left: 31px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .language {
      width: 349px;
      flex-shrink: 0;
      border-left: 1px solid #3a3a48;
      display: flex;
      span{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        cursor: pointer;
      }
    }
    .language_active{
      background-color: #22222b;
    }
  }
</style>