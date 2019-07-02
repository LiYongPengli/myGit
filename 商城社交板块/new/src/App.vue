<template>
  <div id="app">
    <div class="footer">
      <a href='http://m.nst1688.com'>首页</a>
      <a href='http://m.nst1688.com/index.php?m=category'>列表</a>
      <router-link to="/add" id="add" @click.native="setact()"><img class="find" src="../static/img/发现@2x.png" alt=""></router-link>
      <a href="http://m.nst1688.com/mobile/index.php?m=cart">购物车</a>
      <a href="http://m.nst1688.com/mobile/index.php?m=user">我的</a>
    </div>
    <keep-alive include="Add" >
      <router-view  />
    </keep-alive>

  </div>
</template>

<script>
  /*
    组件入口，其中包含底部一级导航
  */
export default {
  name: 'App',
  data(){
    return {
      act:0,//控制底部导航激活状态
    }
  },
  created(){
    let url=window.location.href
    if(url.indexOf('from')!=-1){
      window.location.href=window.location.origin+'/'+window.location.hash;
      return;
    }
  },
  methods:{
    setact(){
      this.act=2
      sessionStorage.acts = JSON.stringify({act:0})
      //this.$router.go(0)
    }
  }
}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
}
.toast-s{
  font-size: 32px;
}
.toast-s .mint-toast-text{
  font-size: 32px;
}
.mint-indicator-wrapper{
  z-index: 200;
}
#app {
  width: 100%;

  box-sizing: border-box;

  .footer{
    display: flex;
    padding: 0 20px;
    align-items: center;
    width:100%;
    height:97px;
    background:rgba(255,255,255,1);
    box-shadow:0px -1px 0px 0px rgba(225,225,225,1);
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 100;
    a{
      -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
      -webkit-user-select: none;
      -moz-user-focus: none;
      -moz-user-select: none;
      display: block;
      text-decoration: none;
      display: inline-block;
      background:rgba(255,255,255,1);
      /*box-shadow:0px 0px 6px 0px rgba(171,151,150,0.5);*/
      line-height: 98px;
      text-align: center;
      font-size:34px;
      width: 142px;
      height: 98px;
      color: #000;
    }
    .find{
      display: block;
      width: 142px;
      height: 98px;
      background: #fff;
    }
    #add{
      line-height: 100%;
      border-radius:16px;
      font-size: 60px;
      font-weight: 600;
      color: white;
    }
    .active{

      /*font-family:FZLTZHK--GBK1-0;*/
      /*font-weight:normal;*/
      /*background:rgba(255,255,255,1);*/
      /*box-shadow:0px 0px 6px 0px rgba(171,151,150,0.5);*/
      /*line-height: 98px;*/
      /*text-align: center;*/
      /*font-size:34px;*/
      /*width: 142px;*/
      /*height: 98px;*/
    }
  }
}
#app::-webkit-scrollbar{
  display: none;
}

</style>
