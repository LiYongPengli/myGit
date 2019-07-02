<template>
  <div class="userFocusText" @click="hideSend()">
    <div class="content">
      <!-- 用户头像及其信息 -->
      <div class="head">
        <div class="left">
          <div class="userIco">
            <img :src="userPic" />
            <img v-if="info.Identity==1" src="../../../../static/img/v@2x.png" class="v" alt="">
          </div>
          <div class="userInfo">
            <p>{{info.user_name}}</p>
            <span>{{new Date().getHours()-(info.updated_at.split(" ")[1].split(":")[0])}}小时前</span>
          </div>
        </div>
        <div class="right">
          <img src="../img/组 4.png" alt="" v-show="!JSON.parse(foc)">
          <img src="../img/组 4(1).png" alt="" v-show="JSON.parse(foc)">
        </div>
      </div>
      <!-- 图片和视频 -->
      <div class="imgOrvideo">
        <!-- 图片 -->
        <div class="photos" v-if="info.type==1">
          <mt-swipe :style="{'height':cover_height+'px'}" :show-indicators="false" :auto="0" @change="handleChange" v-if="info.type==1&&getImg().length>1">
            <mt-swipe-item v-for="(v,i) in getImg()" :key="i">
              <img v-lazy="v" alt="" ref="moveImg" @load="setCoverHeight(i)">
            </mt-swipe-item>
          </mt-swipe>
          <span class="photoIndex" v-if="info.type==1&&getImg().length>1">{{index}}/{{imgNum}}</span>
          <img class="imgs" :src="getImg()[0]" v-if="info.type==1&&getImg().length==1">
        </div>
        <!-- 视频 -->
        <div class="video" v-if="info.type==2"><!-- 此处的video应该是后台传来的媒体类型 -->
          <video :src="info.video" ref="vdo" @ended="videoEnd()"></video>
          <img v-show="startShow" src="../img/组 14.png" class="videoStart" @click="videoStart()"/>
        </div>
      </div>
      <p class="text clear" :class="{'overflow':hidden==1}">
        {{info.body}}
        <!-- <img src="../img/展开 拷贝.png" alt="" v-show="hidden==1" class="m1" @click="hidden=0">
        <img src="../img/收起.png" alt="" v-show="hidden==0" class="m2" @click="hidden=1"> -->
      </p>
      <div class="lable" > <span v-for="(v,i) in tagName" :key="i"> <img src="../../../../static/img/组 8@2x.png" alt="">{{v}}</span></div>
      <div class="users_say">
        <!-- 评论 -->
        <p class="user_say" v-if="info.comment_num&&comment">
          <span>{{comment[0].from_user_name}}:</span>{{comment[0].comment}}
        </p>
        <div v-show="info.comment_num>1&&show==true" class="goodsNum" @click="showSay()">
          <span>查看剩余{{info.comment_num-1}}条评论</span>
          <div>
            <img src="../img/形状 1 拷贝 2.png" />
          </div>
        </div>
        <!-- 剩余的评论 -->
        <!-- <div class="all" v-if="show==false">
          <p class="user_say" v-for="i in goods" :key="i">
            <span>小明:</span>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
          </p>
          <span class="close" @click="show=!show">收起</span>
        </div> -->
      </div>
      <div class="last" ref="inputSend">
        <div class="writeImg" v-show="showSend">
          <span class="iconfont icon-combinedshapecopy2" @click="popupVisible=true"></span>
        </div>
        <p>
          <input type="text" :class="{'sending':!showSend}" placeholder="友善发言,运气不会差哦" @focus="showSend=false" v-model="sayText">
        </p>
        <div class="goods" @click="addLike()" v-show="showSend">
          <div>
            <img src="static/img/点赞默认状态@2x.png" v-show="!good" />
            <img src="static/img/已点赞@2x.png" v-show="good" />
          </div>
          <span class="good_num">{{info.like_num}}</span>
        </div>
        <div class="say" @click="showSay()" v-show="showSend">
          <img src="static/img/形状 13 拷贝 2.png" />
          <span class="say_num">{{info.comment_num}}</span>
        </div>
        <div  v-show="!showSend" class="sendBtn" @click.stop="sendSay1()">发送</div>
      </div>
    </div>
    <mt-popup
    v-model="popupVisible"
    position="bottom">
      <div class="head">
        <p>共{{info.comment_num}}条评论</p>
        <div class="close" @click="popupVisible=!popupVisible">
          <img src="../img/形状 18 (2).png" />
        </div>
      </div>
      <div class="sayText"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
      v-if="comment">
        <div class="noComment" v-if="!comment.length">暂时还没有评论哦,快来写写评论吧</div>
        <public-say v-for="(v,i) in comment" :key="i" :dat="v" :index="i" @user_reply2_obj="replyUserObj" :reply="JSON.stringify(replyComment)" :like="JSON.stringify(commentLike)" @click.native="replyUser(v,i)"></public-say>
      </div>
      <div class="foot" v-show="sendUser">{{listen}}
        <input type="text" placeholder="友善发言,运气不会差哦" v-model="sayText">
        <button class="send" @click="send2()">发送</button>
      </div>
    </mt-popup>
    <!-- <public-share v-if="share" :shares="share" v-on:fas="fn"></public-share> -->
  </div>
</template>

<script>
/*
  用户发布内容的主体，可以通过v-for在userFoucs里渲染多个
*/
//import publicSay from '@/components/public-say/public-say'
//import publicShare from '@/components/public-share/public-share'
export default {
  name: 'userFocusText',
  props:['info','like','foc'],//info=每个帖子详情，like=点赞列表,foc是否关注
  data () {
    return {
      //attention:JSON.parse(this.foc),//是否关注
      show:true,
      startShow:true,//控制视频播放的按钮是否显示
      good:0,
      goods:4,
      cover_height:"",
      share:false,
      sendUser:false,
      clickUser:'',//被点击的用户
      clickUserid:'',
      loading:false,//是否加载
      hidden:1,//展开与收起的控制项
      imgNum:this.getImg().length,//轮播图图片数量
      index:1,
      sayText:'',
      comment:'',
      replyComment:[],//回复
      commentLike:'',
      popupVisible:false,
      articleData:[],
      attention:[],
      fouce:false,
      current_page:'',
      last_page:'',
      clickUser:'',
      showSend:true,//是否显示发送
      userPic:this.info.user_picture.length>0?this.info.user_picture:'../../../static/img/pic_Avatar_40@2x.png',
      tagName:[]
    }
  },
  created(){
    this.getSayData()
    console.log(this.like)
    for(let i=0;i<this.like.length;i++){
      if(this.info.id==this.like[i].inv_id){
        this.good = 1
        this.info.likeid=this.like[i].id
        return
      }else{
        this.good = 0
      }
    }
    if(this.info.tag_names!=null){
      this.tagName=this.info.tag_names.split(',')
    }
  },
  methods:{
    handleChange(index) {
      this.index = index+1;
    },
    fn(n){
      this.share = n;
    },
    //播放视频
    videoStart(){
      this.$refs.vdo.play()
      this.startShow = false;
    },
    videoEnd(){
      this.startShow = true;
    },
    //二级回复中被点击的用户
    replyUserObj(n,i){
      this.sendUser = true;
      let obj = JSON.parse(n)
      this.sayText = "回复"+obj.from_user_name+":"
      this.clickUser = obj
      this.clickUserid = this.comment[i].id
    },
    //添加和删除赞
    addLike(){
      if(!this.good){
        this.$axios.post('/likeAdd',{
          inv_id:this.info.id,
          inv_type:0
        }).then(data=>{
          console.log(data.data.data.id);
          this.good = 1;
          this.info.like_num=this.info.like_num+1;
          this.info.likeid=data.data.data.id
        }).catch(err=>{
          console.log(err)
        })
      }else{
        this.$axios.delete('/delLike/'+this.info.likeid).then(data=>{
          console.log(data);
          this.info.like_num=this.info.like_num-1
          if(this.info.like_num<=0){
            this.info.like_num==0
          }
          this.good = 0
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    //取消关注
    /* deleteFocus(){
      this.$axios.delete('/delAttention/'+JSON.parse(this.foc).id).then(data=>{
        console.log(data)
      }).catch(err=>{
        console.log(err)
      })
    }, */
    //获取图片
    getImg(){
      let arr = []
      if(this.info.images.indexOf("|")==-1){
        arr.push(this.info.images);
        return arr
      }else {
        return this.info.images.split("|")
      }
    },
    //设置轮播图高度
    setCoverHeight(n){
      let arr = this.$refs.moveImg;
      if(arr[n].offsetHeight>this.cover_height){
        this.cover_height = arr[n].offsetHeight
      }
    },
    loadMore() {
      if(this.current_page<this.last_page&&(!this.loading)){
        this.loading = true;
        this.$axios.post('/comment/comments',{
          articleId:this.info.id,
          page:this.current_page+1,
          f_time:(new Date()-0).toString()
        }).then(data=>{
          this.comment = this.comment.concat(data.data.data.comment_list.data)
          this.replyComment = this.replyComment.concat(data.data.data.reply_comment_list);
          this.current_page++
          this.loading = false;
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    //显示评论
    showSay(){
      this.popupVisible = true;
      //this.getSayData()
    },
    //获取评论数据
    getSayData(){
      this.$axios.post('/comment/comments',{
        articleId:this.info.id,
        f_time:(new Date()-0).toString()
      }).then(data=>{
        //console.log("sayData",data)
        this.comment = data.data.data.comment_list.data;
        this.replyComment = data.data.data.reply_comment_list;
        this.commentLike = data.data.data.comment_like_list;
        this.current_page = data.data.data.comment_list.current_page;
        this.last_page = data.data.data.comment_list.last_page;
      }).catch(err=>{
        console.log(err)
      })
    },
    //点击显示回复框
    replyUser(n,i){
      this.sendUser = true
      this.sayText = "回复"+n.from_user_name+":"
      this.clickUser = n
      this.clickUserid = this.comment[i].id;
      console.log(this.clickUser)
    },
    sendSay1(){
      if(this.sayText){
        this.$axios.post('/comment/commentAdd',{
          article_id:this.info.id,
          comment:this.sayText
        }).then(data=>{
          //console.log(data)
          this.sayText = ""
          this.showSend = true;
          ++this.info.comment_num;
          this.getSayData()
        }).catch(err=>{
          console.log(err)
        })
        }else{
          this.showSend = !this.showSend;
        }
    },
    send2(){
      if(this.sayText){
        if(this.sayText.indexOf("回复"+this.clickUser.from_user_name+":")!=0){
          this.$axios.post('/comment/commentAdd',{
            article_id:this.info.id,
            comment:this.sayText
          }).then(data=>{
            //console.log(data)
            this.sayText = ""
            this.getSayData()
            this.info.comment_num++
          }).catch(err=>{
            console.log(err)
          })
        }else{
          let text = this.sayText.slice(this.sayText.split(":")[0].length+1)
          if(text==""){
            this.sendUser = false;
          }else{
            this.$axios.post('/comment/commentAdd',{
              article_id:this.info.id,
              comment : text,
              to_user:this.clickUser.from_user,
              cid:this.clickUserid
            }).then(data=>{
              //console.log(data)
              this.sayText = ""
              this.getSayData()
              this.info.comment_num++
            }).catch(err=>{
              console.log(err)
            })
          }
        }
      }else{
        this.sendUser = false
      }
    },
    hideSend(e){
      var con=this.$refs.inputSend;

      if(!con.contains(event.target)){
        this.showSend = true;
      }
    }
  },
  computed:{
    listen(){
      if(!this.popupVisible){
        this.sendUser = false
        this.sayText = ""
      }
    }
  },
  components:{
    publicSay:resolve=>require(['@/components/public-say/public-say'],resolve),
    publicShare:resolve=>require(['@/components/public-share/public-share'],resolve)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../../iconfont/iconfont.css";
.userFocusText{
  width: 750px;
  overflow-x: hidden;
  border-bottom: 2px dashed #999999;
  .content{
    width: 710px;
    margin: 10px auto;
    .head{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left{
        display: flex;
        align-items: center;
        .userIco{
          width: 60px;
          position: relative;
          img{
            width: 100%;
            display: block;
          }
        }
        .userInfo{
          p{
            font-size:30px;
            font-family:PingFang-SC-Regular;
            font-weight:bold;
            color:rgba(51,51,51,1);
            line-height:44px;
          }
          span{
            font-size:22px;
            font-family:PingFang-SC-Regular;
            font-weight:400;
            color:rgba(153,153,153,1);
            line-height:44px;
          }
        }
      }
      .right{
        width: 115px;
        img{
          width: 100%;
          display: block;
        }
      }
    }
    .imgOrvideo{
      margin-top: 18px;
      .photos{
        position: relative;
        .mint-swipe{
          img{
            width: 100%;
            //height: 100%;
            display: block;
          }
        }
        .imgs{
          width: 100%;
          display: block;
        }
        .photoIndex{
          width:63px;
          height:31px;
          text-align: center;
          font-size:22px;
          font-family:PingFang-SC-Regular;
          font-weight:400;
          color:rgba(255,255,255,1);
          //line-height:44px;
          position: absolute;
          left: 626px;
          top: 21px;
          background:rgba(0,0,0,0.5);
          border:1px solid rgba(195, 195, 195, 1);
          border-radius:16px;
        }
      }
      .video{
        position: relative;
        video{
          width: 100%;
        }
        .videoStart{
          width: 20%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
        }
      }
    }
    .text{
      word-break: break-all;
      font-size:28px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height:42px;
      img{
        float: right;
        width: 66px;
      }
    }
    .lable{
      display: flex;
      height: 38px;
      margin-top: 30px;
      font-size:24px;
      font-family:PingFang-SC-Regular;
      font-weight:400;
      color:rgba(239,133,19,1);
      span{
        display: flex;
        margin-right: 40px;
        color: #FB8627;
        background:rgba(236,176,34,0.2);
        padding: 0 10px;
        height: 38px;
        line-height: 38px;
        font-size: 24px;
        border-radius: 19px;
        align-items: center;
        img{
          width: 30px;
          height: 30px;
          margin-right: 5px;
        }
      }
    }
    .users_say{
      box-sizing: border-box;
      margin-top: 20px;
      padding: 30px 19px;
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
    .last{
      display: flex;
      align-items: center;
      justify-content: space-around;
      border-top: 2px solid #FFFFFF;
      padding: 32px 0;
      .writeImg{
        .icon-combinedshapecopy2{
          color:rgba(153,153,153,1);
          font-size: 34px;
        }
      }
      p{
        input{
          background: none;
          font-size:26px;
          border: none;
          outline: none;
          font-family:PingFang-SC-Regular;
          font-weight:400;
          color:rgba(153,153,153,1);
          line-height:44px;
        }
        .sending{
          width: 600px;
          height: 60px;
          line-height: 60px;
          border: 2px solid #f2f2f2;
          border-radius: 40px;
          padding-left: 20px;
        }
        input::-webkit-input-placeholder{
          font-family:PingFang-SC-Regular;
          font-weight:400;
          color:rgba(153,153,153,1);
          line-height:44px;
        }
      }
      .goods{
        margin-left: 66px;
        display: flex;
        align-items: center;
        div:first-of-type{
          width: 34px;
          img{
            width: 100%;
            display: block;
          }
        }
        .good_num{
          font-size:22px;
          font-family:PingFang-SC-Regular;
          font-weight:400;
          color:rgba(102,102,102,1);
          line-height:44px;
          margin-left: 10px;
        }
      }
      .say{
        margin-left: 40px;
        display: flex;
        align-items: center;
        .say_num{
          font-size:22px;
          font-family:PingFang-SC-Regular;
          font-weight:400;
          color:rgba(102,102,102,1);
          line-height:44px;
          margin-left: 10px;
          //text-shadow:0px -1px 2px rgba(102,102,102,1);
        }
      }
      .share{
        margin-left: 40px;
        .icon-iconfontfenxiang{
          font-size: 32px;
          color:rgba(102,102,102,1);
        }
        .share_num{
          font-size:22px;
          font-family:PingFang-SC-Regular;
          font-weight:400;
          color:rgba(102,102,102,1);
          line-height:44px;
          //text-shadow:0px -1px 2px rgba(102,102,102,1);
        }
      }
    }
  }
  .overflow{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
}
.mint-popup-bottom{
  width: 750px;
  height: 1000px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  .head{
    display: flex;
    align-items: center;
    padding: 20px 0;
    p{
      font-size:30px;
      font-family:PingFang-SC-Regular;
      font-weight:bold;
      color:rgba(51,51,51,1);
      line-height:24px;
      margin-left: 305px;
    }
    .close{
      width: 44px;
      margin-left: 241px;
      img{
        width: 100%;
        display: block;
      }
    }
  }
  .sayText{
    height: 900px;
    border-top: 3px dashed #999999;
    overflow-y:auto;
  }
  .sayText::-webkit-scrollbar{
    display: none;
  }
  .foot{
    width: 750px;
    height: 134px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    position: fixed;
    left: 0;
    bottom: 0;
    input{
      width: 580px;
      height: 86px;
      padding-left: 30px;
      border: 2px solid #999999;
      border-radius: 40px;
      //outline: 1px dashed #999999;
      outline: none;
      font-size:26px;
      font-family:PingFang-SC-Regular;
      font-weight:400;
      color:rgba(153,153,153,1);
      line-height:44px;
    }
    input::-webkit-input-placeholder{
      font-size:26px;
      font-family:PingFang-SC-Regular;
      font-weight:400;
      color:rgba(153,153,153,1);
      line-height:44px;
    }
    button{
      border: none;
      background: none;
      font-size:36px;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:#262626;
      line-height:44px;
      outline: none;
      margin-left: 17px;
    }
  }
  .noComment{
    width:100%;
    text-align: center;
    font-size: 40px;
  }
}
.clear:after{
  width: 0;
  height: 0;
  display: block;
  content: "";
  visibility: hidden;
  clear: both;
}
</style>
