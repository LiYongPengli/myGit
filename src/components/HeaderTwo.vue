<template>
  <!-- 头部2 -->
  <div class="headertwo">
      <div class="logo">
        <img src="../assets/img/logo.png" alt="">
      </div>
      <div class="user">
        <div class="user_img">
          <img src="../assets/img/tx.png" alt="">
        </div>
        <div class="user_name">
          <el-dropdown class="select" @command="handleCommand" trigger="click">
            <span style="color: white" class="el-dropdown-link">
              username<i
                style="margin-left: 20px"
                class="el-icon-arrow-down el-icon--right"
              ></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="/user">个人中心</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
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

<script lang="ts">
import { baseApi } from '@/axios/axios';
import { Component,Vue } from 'vue-property-decorator'
@Component
export default class HeaderTwo extends Vue {
  public handleCommand(cmd:string):void{
    if(cmd=='logout'){
      this.logout();
    }else if(cmd=='/user'){
      this.$router.push(cmd);
    }
  }
  //登出
  private logout():void{
    this.axios.post(baseApi.api1+'/v1/user/login/logout').then(res=>{
      console.log(res.data)
      if(res.data.status==1){
        this.$router.push('/login');
        this.$message.success('已登出');
      }
    }).catch(err=>{
      console.log(err);
    })
  }
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
      display: flex;
      align-items: center;
      .user_img{
        width: 39px;
        height: 39px;
        margin-left: 31px;
      }
      .user_name{
        margin-left: 21px;
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