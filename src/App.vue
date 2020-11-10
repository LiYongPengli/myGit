<template>
  <div id="app">
    <video
      class="back_video"
      v-if="isshow"
      autoplay
      muted
      loop
      src="./assets/video/index_back.mp4"
    ></video>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Mutation } from 'vuex-class';
import { baseApi } from './axios/axios';
@Component
export default class App extends Vue {
  private isshow = true;
  //设置用户信息
  @Mutation('setUserMessage') setUserMessage:any;

  @Watch("$route.name")
  listenRoute(newVal: string, oldVal: string): void {
    if (newVal == "Login" || newVal == "Register" || newVal == "Findpassword" || newVal == "BindAccount") {
      this.isshow = true;
    } else {
      this.isshow = false;
      this.userLoginType();
    }
  }
  
  private created():void{
    this.userLoginType();
  }

  private userLoginType():void{
    this.axios.get(baseApi.api2+'/v1/user/login/').then(res=>{
      this.getUserInfo(res.data.data.user_id);
    }).catch(err=>{
      console.log(err);
    })
  }

  /**
   * 获取用户信息
   * @param user_id 用户id
   */
  private getUserInfo(user_id:string):void{
    this.axios.post(baseApi.api2+'/v1/cmd/',{
      cmd:'user_info',
      paras: { user_id: user_id }
    }).then(res=>{
      this.setUserMessage(res.data.data);
      if(!res.data.data.sub_prompted&&this.$route.name!="HomeSet"){
        this.$router.push('/homeset');
      }
    }).catch(err=>{
      console.log(err);
    })
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  font-size: 16px;
  box-sizing: border-box;
}
html,
body {
  height: 100%;
}
#app {
  height: 100%;
  .back_video {
    width: 100%;
    height: 100%;
    position: fixed;
    object-fit: fill;
    left: 0;
    top: 0;
    z-index: -1;
  }
}
.clear:after {
  display: block;
  height: 0;
  content: ""; /*不用有内容也可以*/
  visibility: hidden;
  clear: both;
}
//下拉框样式
.el-popover {
  background: #2d2d39 !important;
  border: none!important;
  color: white!important;
  box-sizing: border-box;
}

/* .el-dropdown-menu li{
  color: white!important;
}
.el-dropdown-menu li:hover{
  background:  #2d2d39!important;
} */
.popper__arrow::after{
  border-color: #2d2d39!important;
}
.el-picker-panel__body{
  background: #494959;
}
</style>
