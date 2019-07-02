<template>
<!-- 消息组件 -->
  <div class="message">
    <header>
      <div @click="$router.back()">
        <img src="./img/形状 2.png" />
      </div>
      <div>消息</div>
    </header>
    <div class="main-body" ref="wrapper" :style="{ height: (wrapperHeight) + 'px' }">
      <mt-loadmore :bottom-method="loadBottom" ref="loadmore" class="center" :bottom-all-loaded="allLoaded" :auto-fill="true">
        <ul>
          <li v-for="(val,i) in infoList" @click="toPage(i)">
            <div class="img" v-if="val.article_id">
              <img src="./img/组 16.png" alt="">
            </div>
            <div class="img" v-if="val.id">
              <img src="./img/组 16(1).png" alt="">
            </div>
            <div class="img" v-if="val.inv_id">
              <img src="./img/组 16(3).png" alt="">
            </div>
            <div class="text" v-if="val.article_id">
              <p>我的评论</p>
              <p><span>@{{val.from_user_name}}</span><span class="commit">评论了我的"{{val.body}}"</span></p>
            </div>
            <div class="text" v-if="val.id">
              <p>我的关注</p>
              <p><span>@{{val.follower_user_name}}</span>关注了我</p>
            </div>
            <div class="text" v-if="val.inv_id">
              <p>我的点赞</p>
              <p><span>@{{val.from_user_name}}</span>赞了我的"{{val.title}}"</p>
            </div>
          </li>
        </ul>
      </mt-loadmore>
    </div>

  </div>
</template>

<script>
/*
  显示关于我的消息，
  点击页面右上角的消息图标跳转到改组件
*/
import {Loadmore} from 'mint-ui';
export default {
  name: 'message',
  data () {
    return {
      infoList:[],
      page:0,
      allLoaded:false,
      wrapperHeight: 0,
      autoFill:true
    }
  },
  /* created(){
    this.$store.commit('routerUshow')
  }, */
  methods:{
    toPage(num){
      // console.log(this.infoList[num])
      if(this.infoList[num].article_id||this.infoList[num].inv_id){
        let id=this.infoList[num].article_id||this.infoList[num].inv_id
        this.$router.push({
          path:'/videos',
          query:{
            id:id
          }})
      }
    },
    loadTop() {　　//下拉刷新
    },
    loadBottom() {　　//上拉加载　　
      this.loading()
    },
    loading(){
      this.page++;
      var time=(new Date()-0).toString();
      this.$axios.post('/message/messageList',{f_time:time,page:this.page}).then(res=>{
        let obj=res.data.data
        let arr =[];
        arr=arr.concat(obj.comment_list).concat(obj.attention_list).concat(obj.like_list);
        let arr1=arr.sort((a,b)=>{
          // console.log(a)
          return (new Date(b.created_at)).getTime()-(new Date(a.created_at)).getTime()
        })
        if(arr.length<=0){
          this.allLoaded=true
        }
        let arr2=this.infoList
        this.infoList=arr2.concat(arr1)
      })
    }
  },
  mounted(){
    this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top;
    this.loading()
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.message{
  width: 100%;
  height: 100%;
  background: white;
  z-index: 200;
  position: absolute;
  left: 0;
  top: 0;
  overflow-x: hidden;
  z-index: 200;
  header{
    width: 100%;
    height: 128px;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 6px 0px rgba(225,225,225,1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 13px;
    div:first-of-type{
      width: 27px;
      img{
        width: 100%;
        display: block;
      }
    }
    div:last-of-type{
      width: 400px;
      text-align: left;
      font-size:40px;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:rgba(51,51,51,1);
    }
  }
  .main-body {
    /* 加上这个才会有当数据充满整个屏幕，可以进行上拉加载更多的操作 */
    overflow: scroll;
    .center{

      ul{
        padding:0 30px;
        li{
          display: flex;
          box-sizing: border-box;
          padding: 16px 0;
          border-bottom: 2px #999 solid;
          .img{
            width: 96px;
            img{
              width: 100%;
              display: block;
            }
          }
          .text{
            margin-left: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            p:first-of-type{
              font-size:30px;
              font-family:PingFang-SC-Regular;
              font-weight:bold;
              color:rgba(51,51,51,1);
            }
            p:last-of-type{
              font-size:30px;
              font-family:PingFang-SC-Regular;
              font-weight:400;
              display: flex;
              align-items: center;
              span{
                color:rgba(0,153,255,1);
              }
              .commit{
                font-weight:400;
                color:#666666;
                display: inline-block;
                width: 300px;
                @include ellipsis;
              }
            }
          }
        }
        li:last-child{
          border-bottom: none;
        }
      }
    }
  }

}
</style>
