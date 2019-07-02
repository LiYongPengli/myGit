<template>
<!-- 评论弹框组件 -->
  <div class="public-say">
    <div class="content">
      <div class="top">
        <div class="left">
          <div class="img">
            <img :src="dat.from_user_picture||'../../../static/img/pic_Avatar_60@2x.png'" />
            <img v-if="dat.from_identity==1" src="../../../static/img/v@2x.png" class="v" alt="">
          </div>
          <div class="user">
            <p v-if="dat.from_user_name">{{dat.from_user_name}}</p>
            <p v-if="!dat.from_user_name">未知</p>
            <span>{{dat.updated_at.split(" ")[0].split("-")[1]}}月{{dat.updated_at.split(" ")[0].split("-")[2]}}日</span>
          </div>
        </div>
        <div class="right" @click.stop="addGood()">
          <span class="iconfont icon-zan" :class="{'active':active==1}"></span>
          <span class="good_num">{{dat.like_num}}</span>
        </div>
      </div>
      <!-- 内容主体 -->
      <div class="center">
        <p class="text">
          {{dat.comment}}
        </p>
        <!-- 评论 -->
        <p class="user_say" v-if="listen_reply_comment().length" @click.stop="reply2(listen_reply_comment()[0])">
          <span>{{listen_reply_comment()[0].from_user_name}}回复{{listen_reply_comment()[0].to_user_name}}:</span>{{listen_reply_comment()[0].comment}}
        </p>
        <div v-show="listen_reply_comment().length>1&&show==true" class="goodsNum" @click.stop="show=!show">
          <span>查看剩余的{{listen_reply_comment().length-1}}条回复</span>
          <div>
            <img src="./img/形状 1 拷贝 2.png" />
          </div>
        </div>
        <!-- 剩余的回复 -->
        <div class="all" v-if="show==false">
          <p class="user_say" v-for="(v,i) in listen_reply_comment()" :key="i" v-show="i>0" @click.stop="reply2(v)">
            <span>{{v.from_user_name}}回复{{v.to_user_name}}:</span>{{v.comment}}
          </p>
          <span class="close" @click.stop="show=!show">收起</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*
  主要用于弹出用户评论页面，
  弹出位置为屏幕下方，自下而上
*/
export default {
  name: 'publicSay',
  props:['dat','reply','like','index'],
  data () {
    return {
      act:0,
      goods:4,
      show:true,
      active:false,
      likeid:''//点赞id
    }
  },
  created(){
    this.getLike()
  },
  methods:{
    //添加和删除赞
    addGood(){
      if(!this.active){
        this.$axios.post('/likeAdd',{
          inv_id:this.dat.id,
          inv_type:1
        }).then(data=>{
          //console.log(data)
          this.likeid = data.data.data.id
          this.active = !this.active
          ++this.dat.like_num
        }).catch(err=>{
          console.log(err)
        })
      }else{
        this.$axios.delete('/delLike/'+this.likeid).then(data=>{
          //console.log(data)
          this.active = !this.active
          --this.dat.like_num
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    //获取点赞
    getLike(){
      console.log(this.like)
      let arr = JSON.parse(this.like)
      for(let i=0;i<arr.length;i++){
        if(arr[i].inv_id==this.dat.id){
          this.likeid = arr[i].id
          this.active = true;
        }
      }
    },
    //回复二级评论
    reply2(userObj){
      this.$emit('user_reply2_obj',JSON.stringify(userObj),this.index)
    },
    listen_reply_comment(){
      let arr = JSON.parse(this.reply);
      let returnArr = []
      for(let i=0;i<arr.length;i++){
        if(this.dat.id==arr[i].cid){
          returnArr.push(arr[i])
        }
      }
      return returnArr;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../iconfont/iconfont.css";
.public-say{
  .content{
    width: 708px;
    margin: 55px auto;
    .top{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left{
        display: flex;
        align-items: center;
        .img{
          width: 60px;
          position: relative;
          img{
            width: 100%;
            display: block;
          }
          .v{
            width: 30px;
            height: 30px;
            position: absolute;
            right: -2px;
            bottom: -2px;
          }
        }
        .user{
          margin-left: 13px;
          p{
            font-size:26px;
            font-family:PingFang-SC-Regular;
            font-weight:bold;
            color:rgba(51,51,51,1);
            line-height:24px;
          }
          span{
            font-size:22px;
            font-family:PingFang-SC-Regular;
            font-weight:bold;
            color:rgba(153,153,153,1);
            line-height:24px;
          }
        }
      }
      .right{
        .icon-zan{
          color: gray;
        }
        .active{
          color: #F44B4F;
        }
        .good_num{
          margin-left: 10px;
          font-size:22px;
          font-family:PingFang-SC-Regular;
          font-weight:bold;
          color:rgba(153,153,153,1);
          line-height:24px;
        }
      }
    }
    .center{
      padding-left: 73px;
      .text{
        word-break: break-all;
        width: 635px;
        font-size:24px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:40px;
      }
      .user_say{
        font-size:24px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:42px;
        span{
          font-size:24px;
          font-family:MicrosoftYaHei;
          font-weight:600;
          color:rgba(51,51,51,1);
          line-height:42px;
        }
      }
      .goodsNum{
        display: flex;
        align-items: center;
        span{
          font-size:22px;
          font-family:MicrosoftYaHei;
          font-weight:400;
          color:rgba(153,153,153,1);
          line-height:42px;
        }
        div{
          width: 15px;
          img{
            width: 100%;
            display: block;
          }
        }
      }
      .all{
        .close{
          display: inline-block;
          width: 100%;
          text-align: right;
          font-size:22px;
          font-family:MicrosoftYaHei;
          font-weight:400;
          color:rgba(153,153,153,1);
          line-height:42px;
        }
      }
    }
  }
}
</style>
