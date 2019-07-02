<template>
  <div class="add">
    <header>
      <div class="nav">
        <div class="navSon">
          <router-link to="/add/recommend" tag="p" @click.native="setact(0)" :class="{'active':act==0}">推荐</router-link>
          <div v-show="act==0"></div>
        </div>
        <div class="navSon">
          <router-link to="/add/focus" tag="p" @click.native="setact(1)" :class="{'active':act==1}">关注</router-link>
          <div v-show="act==1"></div>
        </div>
        <div class="navSon">
          <router-link to="/add/near" tag="p" @click.native="setact(2)" :class="{'active':act==2}">附近</router-link>
          <div v-show="act==2"></div>
        </div>
      </div>
      <div class="Img" @click="message()">
        <img src="../../static/img/notice_icon.png" />
        <div class="newMsg" v-show="msg"></div>
      </div>
    </header>
    <div class="write" @click="release()">
      <img src="./Rec_icon_edit.png"/>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  /*
    主要是页面顶部的二级导航
    以及悬浮到页面上的发布按钮
  */
export default {
  name: 'Add',
  data () {
    return {
      act:0,
      messages:0,
      msg:false
    }
  },

  created(){

    if(window.location.hash.indexOf('recommend')!=-1){
      localStorage.acts = JSON.stringify({act:0});
      this.act=0
    }
    if(window.location.hash.indexOf('focus')!=-1){
      localStorage.acts = JSON.stringify({act:1});
      this.act=1
    }
    if(window.location.hash.indexOf('near')!=-1){
      localStorage.acts = JSON.stringify({act:2});
      this.act=2
    }
    // if(localStorage.acts){
    //   this.act = JSON.parse(localStorage.acts).act;
    // }else{
    //   localStorage.act = JSON.stringify({
    //     act:0
    //   })}
    //console.log(window.location)
    var that=this
    this.$axios.post('/message/newMessage',{last_time:localStorage.infoTime||'122121'}).then(res=>{
      console.log(res)
      if(res.data.data.new_message==1){
        that.msg=true;
      }else {
        that.msg=false;
      }
    })

  },
  methods:{
    message(){
      var time=(new Date()-0).toString()
      localStorage.infoTime=time;
      this.$router.push({path:"/msg"})
    },
    setact(n){
      this.act = n;
      localStorage.acts = JSON.stringify({act:n})
    },
    release(){
      this.$router.push({path:"/release"})
    }
  },
  computed:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.add{
  header{
    width:750px;
    height:128px;
    background:rgba(255,255,255,1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
    .nav{
      width: 357px;
      display: flex;
      margin-left: 93px;
      justify-content: space-between;
      .navSon{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width:90px;
        div{
          width:50px;
          height:6px;
          background:rgba(244,75,79,1);
          border-radius:3px;
          margin: 0 auto;
        }
        p{
          font-size:32px;
          text-align: center;
          display: flex;
          align-items: center;
          font-family:MicrosoftYaHei;
          font-weight:400;
          color:rgba(51,51,51,1);
          padding-bottom: 5px;
        }
        .active{
          font-size:40px;
          font-family:PingFang-SC-Bold;
          font-weight:bold;
          color:rgba(51,51,51,1);
        }
      }
    }
    .Img{
      width: 44px;
      margin-right: 25px;
      position: relative;
      img{
        width: 100%;
      }
      .newMsg{
        width: 15px;
        height: 15px;
        background: red;
        border-radius: 50%;
        position: absolute;
        top: 0;
        left: 30px;
      }
    }
  }
  .write{
    width: 141px;
    position: fixed;
    z-index: 200;
    left: 608px;
    bottom: 214px;
    img{
      width: 100%;
    }
  }
}
</style>
