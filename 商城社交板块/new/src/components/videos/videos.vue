<template>
  <div class="videos" @click="hideSend()" id="videos" v-if="articleData">
    <header style="z-index:1000">
      <div class="left">
        <div class="back" @click="$router.back()">
          <img src="./img/形状 2.png" />
        </div>
        <div class="user">
          <div class="userImg">
            <img v-show="!articleData.article.user_picture" src="static/testImg/3178009_231026085605_2.jpg" />
            <img v-show="articleData.article.user_picture" :src="articleData.article.user_picture" />
          </div>
          <div class="userMsg">
            <p v-show="!articleData.article.user_name">未知</p>
            <p v-show="articleData.article.user_name">{{articleData.article.user_name}}</p>
            <span>{{showTime()[0]}}.{{showTime()[1]}}.{{showTime()[2]}}</span>
          </div>
        </div>
      </div>
      <div class="right" v-show="!fouce" @click="addFocus()">
        <img src="./img/组 4.png" />
      </div>
      <div class="right" v-show="fouce" @click="addFocus()">
        <img src="./img/组 4(1).png" />
      </div>
    </header>
    <div class="center">
      <!-- 这里用来放视频 -->
      <mt-swipe class="swipeImg" :show-indicators="false" :auto="0" :continuous="false" v-if="articleData.article.type==1&&getImg().length>1">
        <mt-swipe-item v-for="(v,i) in getImg()" :key="i">
          <img v-lazy="v" alt="">
        </mt-swipe-item>
      </mt-swipe>
      <img class="imgs" v-lazy="getImg()[0]" v-if="articleData.article.type==1&&getImg().length==1" />
      <video v-if="articleData.article.type==2" :src="articleData.article.video"  loop="loop" controls="controls"
             x5-playsinline="" playsinline="true" webkit-playsinline="true" x-webkit-airplay="true" x5-video-player-type="h5" x5-video-player-fullscreen="" x5-video-orientation="portraint"></video>
    </div>
    <footer>
      <div class="wrap">
        <!-- 标签 -->
        <p class="lable" ><span class="tag" v-for="(v,i) in tagArr()" :key="i"><img src="../../../static/img/组 8@2x.png" alt="">{{v.tag_name}}</span></p>
        <p class="text">
          {{articleData.article.body}}
          <!-- xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
          <span @click="hidden=!hidden" v-show="hidden">展开</span>
          xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
          <span @click="hidden=!hidden" v-show="hidden==0">收起</span> -->
        </p>
        <div class="position">
          <div><img src="./img/形状 9.png" /></div>
          <span v-show="!articleData.article.position">海鹰路</span>
          <span v-show="articleData.article.position">{{articleData.article.position}}</span>
        </div>
        <div class="last"  id="sendInput" :class="{'sendBackground':!showSend}" style="z-index:1000">
          <div class="writeImg" v-show="showSend">
            <img src="../../../static/img/形状 15@2x.png" alt="">
          </div>
          <p>
            <input  :class="{'sending':!showSend}" type="text" placeholder="友善发言,运气不会差哦" @focus="showSend=false" @blur="back()" v-model="sayText" maxlength="100">
          </p>
          <div class="goods" v-show="showSend" @click="addLike()">
            <img src="../../../static/img/已点赞@2x.png" alt="" v-if="good==1">
            <img src="../../../static/img/点赞默认状态@2x.png" alt="" v-else>
            <!--<span class="iconfont icon-zan" :class="{'icon-zan_active':good==1}"></span>-->
            <span class="good_num">{{articleData.article.like_num}}</span>
          </div>
          <!-- 评论 -->
          <div class="say" @click="showSay()" v-show="showSend">
            <img src="../../../static/img/形状 13 拷贝 3@2x.png" alt="">
            <span class="say_num">{{articleData.article.comment_num}}</span>
          </div>
          <!--<div class="share" @click="share=true" v-show="showSend">-->
            <!--<span class="iconfont icon-iconfontfenxiang"></span>-->
            <!--<span class="share_num">{{articleData.article.share_num}}</span>-->
          <!--</div>-->
          <div  v-show="!showSend" class="sendBtn" @click.stop="sendSay1()">发送</div>
        </div>

      </div>
    </footer>
    <mt-popup
      v-model="popupVisible"
      position="bottom">
      <div class="head">
        <p>共{{articleData.article.comment_num}}条评论</p>
        <div class="close" @click="popupVisible=!popupVisible">
          <img src="./img/形状 18 (2).png" />
        </div>
      </div>
      <div class="sayText"
           v-infinite-scroll="loadMore"
           infinite-scroll-disabled="loading"
           infinite-scroll-distance="10">
        <div class="noComment" v-if="!comment.length">暂时还没有评论哦,快来写写评论吧</div>
        <public-say v-for="(v,i) in comment" :key="i" :index="i" :dat="v" @user_reply2_obj="replyUserObj" :reply="JSON.stringify(replyComment)" :like="JSON.stringify(commentLike)" @click.native="replyUser(v,i)"></public-say>
      </div>
      <div class="foot" v-show="sendUser">{{listen}}
        <input type="text" placeholder="友善发言,运气不会差哦" @blur="back()" v-model="sayText">
        <button class="send" @click="send2()">发送</button>
      </div>
    </mt-popup>

  </div>
</template>

<script>
  //import publicSay from '@/components/public-say/public-say'
  //import publicShare from '@/components/public-share/public-share'
  import {Toast} from 'mint-ui'
  export default {
    name: 'videos',
    data () {
      return {
        fouce:0,
        hidden:1,
        loading:false,//是否加载更多评论
        good:0,
        sayText:'',
        sendUser:false,//控制回复框的显示
        clickUser:'',//被点击的用户
        clickUserid:'',
        share:false,
        like:null,//判断是否点赞
        popupVisible:false,//是否显示评论弹窗
        showSend:true,//是否显示发送
        articleData:'',//文章数据
        attention:'',//关注情况
        comment:[],//评论列表
        commentLike:'',//评论列表点赞列表
        replyComment:[],//评论回复列表
        current_page:'',//评论列表但钱页
        last_page:'',//评论列表最后一页
        apiObj:{}
      }
    },
    created(){
      var time=(new Date()-0).toString()
      let url=window.location.href
      if(url.indexOf('from')!=-1){
        window.location.href=window.location.origin+'/'+window.location.hash;
        return;
      }
      this.getApi()
      new Promise(this.getData).then(res=>{

      })
    },
    methods:{
      getApi(){
        var that=this;
        let url=location.href.split('#')[0]
        this.$axios.get('/jssdk').then(res=>{
          console.log(res.data);
          this.apiObj=res.data.data;
          wx.config({
            debug:false,
            appId:this.apiObj.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
            timestamp:this.apiObj.timestamp, // 必填，生成签名的时间戳
            nonceStr:this.apiObj.nonceStr, // 必填，生成签名的随机串
            signature: this.apiObj.signature,// 必填，签名，见附录1
            //需要分享的列表项:发送给朋友，分享到朋友圈，分享到QQ，分享到QQ空间
            jsApiList: [
              'onMenuShareAppMessage','onMenuShareTimeline',
              'onMenuShareQQ','onMenuShareQZone'
            ]
          });
          //处理验证失败的信息
          wx.error(function (res) {
            alert('授权失败')
          });
          //处理验证成功的信息
          wx.ready(function () {
            // alert(111);
            console.log(that.articleData)
            var img=that.isType(that.articleData.article);

            wx.onMenuShareTimeline({
              title: that.articleData.article.body.lenth<15?that.articleData.article.body:that.articleData.article.body.substr(0,15), // 分享标题
              link: location.href.split('#')[0] + '#' + location.href.split('#')[1], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: img, // 分享图标
            });
            //分享给朋友
            wx.onMenuShareAppMessage({
              title: that.articleData.article.body.lenth<15?that.articleData.article.body:that.articleData.article.body.substr(0,15), // 分享标题
              desc: that.articleData.article.body, // 分享描述
              link: location.href.split('#')[0] + '#' + location.href.split('#')[1], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: img, // 分享图标
            });
            //分享到QQ
            wx.onMenuShareQQ({
              title:that.articleData.article.body.lenth<15?that.articleData.article.body:that.articleData.article.body.substr(0,15), // 分享标题
              desc: that.articleData.article.body, // 分享描述
              link:location.href.split('#')[0] + '#' + location.href.split('#')[1], // 分享链接
              imgUrl:img // 分享图标
            });


            wx.onMenuShareQZone({
              title: that.articleData.article.body.lenth<15?that.articleData.article.body:that.articleData.article.body.substr(0,15), // 分享标题
              desc: that.articleData.article.body, // 分享描述
              link: location.href.split('#')[0] + '#' + location.href.split('#')[1], // 分享链接
              imgUrl: img// 分享图标
            });
          });
        })
      },
      fn(n){
        this.share = n;
      },
      isType(n){
        switch(n.type){
          case 0:
            return false;
            break;
          case 1:
            if(n.images.indexOf("|")==-1){
              return n.images
            }else{
              return n.images.split("|")[0]
            }
            break;
          case 2:
            return n.cover_video;
            break;
          default:
            return false;
            break;
        }
      },
      back(){
        //window.scroll(0,0);
      },
      //二级回复中被点击的用户
      replyUserObj(n,i){
      let obj = JSON.parse(n)
      this.sendUser = true;
      this.sayText = "回复"+obj.from_user_name+":"
      this.clickUser = obj
      this.clickUserid = this.comment[i].id
    },
      getImg(){
        let arr = []
        if(this.articleData.article.images.indexOf("|")==-1){
          arr.push(this.articleData.article.images)
          return arr
        }else{
          return arr = this.articleData.article.images.split("|")
        }
      },
      loadMore() {
        if(this.current_page<this.last_page&&(!this.loading)){
          this.loading = true;
          this.$axios.post('/comment/comments',{
            articleId:this.articleData.article.id,
            page:this.current_page+1,
            f_time:(new Date()-0).toString()
          }).then(data=>{
            console.log(data)
            this.comment = this.comment.concat(data.data.data.comment_list.data);
            this.commentLike =data.data.data.comment_like_list;
            this.replyComment = this.replyComment.concat(data.data.data.reply_comment_list);
            this.current_page++
            this.loading = false;
          }).catch(err=>{
            console.log(err)
          })
        }
      },
      //点击显示回复框
      replyUser(n,i){
        this.sendUser = true;
        this.sayText = "回复"+n.from_user_name+":"
        this.clickUser = n
        this.clickUserid = this.comment[i].id;
      },
      //页面底部的评论
      sendSay1(){
        if(this.sayText){
          this.$axios.post('/comment/commentAdd',{
            article_id:this.articleData.article.id,
            comment:this.sayText
          }).then(data=>{
            //console.log(data)
            this.sayText = ""
            Toast({
              message:"发送成功",
              duration:2000
            })
            this.showSend = true;
            this.getData()
          }).catch(err=>{
            console.log(err)
          })
        }else{
          alert("请输入评论内容")
        }
      },
      //点击评论弹窗后的评论(直接发表)
      send2(){
        if(this.sayText){
          if(this.sayText.indexOf("回复"+this.clickUser.from_user_name+":")!=0){
            this.$axios.post('/comment/commentAdd',{
              article_id:this.articleData.article.id,
              comment:this.sayText
            }).then(data=>{
              //console.log(data)
              this.sayText = ""
              Toast({
                message:"发送成功",
                duration:2000
              })
              this.getData()
              this.getSayData()
            }).catch(err=>{
              console.log(err)
            })
          }else{
            let text = this.sayText.slice(this.sayText.split(":")[0].length+1)
            if(text){
              this.$axios.post('/comment/commentAdd',{
                article_id:this.articleData.article.id,
                comment : text,
                to_user:this.clickUser.from_user,
                cid:this.clickUserid
              }).then(data=>{
                //console.log(data)
                this.sayText = ""
                Toast({
                  message:"发送成功",
                  duration:2000
                })
                this.getData()
                this.getSayData()
              }).catch(err=>{
                console.log(err)
              })
            }else{
              this.sendUser = false;
            }
          }
        }else{
          this.sendUser = false
        }
      },
      getData(resolve,reject){
        this.$axios.post('/articles/articles',{articleId:this.$route.query.id}).then(data=>{
         // console.log(data)
          this.articleData = data.data.data
          this.like = data.data.data.like
          if(data.data.data.attention){
            this.attention = data.data.data.attention
            this.fouce = true;
          }else{
            this.fouce = false
          }
          if(data.data.data.like){
            this.good = 1
          }else{
            this.good = 0
          }
          resolve()
        }).catch(err=>{
          console.log(err)
        })
      },
      //判断是否是多张图片
      isImgs(){
        if(this.articleData.article.images.indexOf("|")==-1){

        }
      },
      //添加关注
      addFocus(){
        if(!this.fouce){
          this.$axios.post('/attentionAdd',{
            follower_user_id:this.articleData.article.user_id
          }).then(data=>{
            //console.log(data)
            this.getData()
          }).catch(err=>{
            console.log(err)
          })
        }else{
          this.$axios.delete('/delAttention/'+this.attention.id).then(data=>{
            //console.log(data)
            this.getData()
          }).catch(err=>{
            console.log(err)
          })
        }
      },
      //标签处理
      tagArr(){
        let arr = []
        //console.log(this.articleData)
        arr=this.articleData.tags;
        //console.log(arr)
        return arr
        // if(this.articleData.article.tag.indexOf("|")==-1){
        //   arr.push(this.articleData.article.tag);
        //   return arr;
        // }else{
        //   return this.articleData.article.tag.split("|")
        // }
      },
      //添加或删除赞
      addLike(){
        if(this.good){
          this.$axios.delete('/delLike/'+this.like.id).then(data=>{
            //console.log(data)
            this.getData()
          }).catch(err=>{
            console.log(err)
          })
        }else{
          this.$axios.post('/likeAdd',{
            inv_id:this.articleData.article.id,
            inv_type:0
          }).then(data=>{
            //console.log(data)
            this.getData()
          }).catch(err=>{
            console.log(err)
          })
        }
      },
      //评论的弹窗
      showSay(){
        this.popupVisible=true;
        this.getSayData()
      },
      //获取评论数据
      getSayData(){
        this.$axios.post('/comment/comments',{
          articleId:this.articleData.article.id,
          f_time:(new Date()-0).toString()
        }).then(data=>{
          //console.log(data)
          this.comment = data.data.data.comment_list.data;
          this.replyComment = data.data.data.reply_comment_list;
          this.commentLike = data.data.data.comment_like_list;
          this.current_page = data.data.data.comment_list.current_page;
          this.last_page = data.data.data.comment_list.last_page;
        }).catch(err=>{
          console.log(err)
        })
      },
      showTime(){
        if(this.articleData.article.updated_at){
          let time = this.articleData.article.updated_at;
          return time.split(" ")[0].split("-")
        }
      },
      hideSend(e){
        var con=document.getElementById('sendInput');
        if(!con.contains(event.target)){
          this.showSend = true;
          window.scroll(0,0);
        }else{

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
  @import "../../iconfont/iconfont.css";
  .videos{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: absolute;
    background: #000;
    z-index: 200;
    header{
      width: 750px;
      height: 128px;
      box-sizing: border-box;
      position: fixed;
      z-index:210;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      background: linear-gradient(rgba(0,0,0,.7),rgba(255,255,255,0.1));
      .left{
        display: flex;
        align-items: center;
        .back{
          width: 26px;
          img{
            width: 100%;
            display: block;
          }
        }
        .user{
          display: flex;
          align-items: center;
          margin-left: 20px;
          .userImg{
            width: 60px;
            height: 60px;
            border-radius: 50%;
            overflow: hidden;
            img{
              width: 100%;
              display: block;
            }
          }
          .userMsg{
            margin-left: 20px;
            p{
              font-size:30px;
              font-family:PingFang-SC-Regular;
              font-weight:bold;
              color:rgba(255,255,255,1);
              line-height:44px;
            }
            span{
              font-size:22px;
              font-family:PingFang-SC-Regular;
              font-weight:400;
              color:rgba(255,255,255,1);
              line-height:44px;
            }
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
    .center{
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      overflow: hidden;
      .swipeImg{
        height: 100%;
        width: 100%;
        .mint-swipe-item{
          display: flex !important;
          align-items: center;
        }
      }
      img{
        width:100%;
        display:block;
      }
      .imgs{
        width: 100%;
        display: block;
      }
      video{
        width: 100%;
        height: 100%;
      }
    }
    footer{
      width: 750px;
      position: fixed;
      left: 0;
      bottom: 0;
      background:linear-gradient(rgba(255,255,255,0),rgba(0,0,0,0.8));
      .wrap{
        width: 100%;
        padding:0 20px ;

        box-sizing: border-box;
        z-index: 200;
      }
      .lable{
        width: 100%;
        line-height: 50px;
        height: 50px;
        font-size: 23px;
        background-size:auto 100%;
        display: flex;
        align-items: center;
        .tag{
          display: flex;
          margin-right: 40px;
          color: #FB8627;
          background: rgba(0,0,0,0.2);
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
      .text{
        word-break: break-all;
        font-size:28px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:36px;
        text-shadow:0px -1px 2px rgba(102,102,102,1);
        max-height: 144px;
        overflow: auto;
        padding-top: 14px;
        span{
          float: right;
          font-size:30px;
          font-family:PingFang-SC-Regular;
          font-weight:bold;
          color:rgba(255,255,255,1);
          line-height:44px;
        }
      }
      .position{
        display: flex;
        align-items: center;
        font-size:24px;
        padding-bottom: 20px;
        line-height: 1;
        padding-top: 12px;
        div{
          width: 22px;
          img{
            width: 100%;
          }
        }
        span{
          font-size:24px;
          font-family:PingFang-SC-Regular;
          font-weight:400;
          color:rgba(225,225,225,1);
          line-height:1;
          text-shadow:0px -1px 2px rgba(51,51,51,1);
        }
      }
    }
    .last{
      display: flex;
      align-items: center;
      border-top: 2px solid #FFFFFF;
      padding: 32px 0;
      justify-content: space-around;
      .writeImg{
        img{
          width: 28px;
          height: 28px;
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
          color:rgba(225,225,225,1);
          line-height:44px;
        }
        input::-webkit-input-placeholder{
          font-family:PingFang-SC-Regular;
          font-weight:400;
          color:rgba(225,225,225,1);
          line-height:60px;
        }
        .sending{
          width: 600px;
          height: 60px;
          line-height: 60px;
          border: 2px solid #fff;
          border-radius: 40px;
          padding-left: 20px;
        }


      }
      .goods{
        margin-left: 66px;
        display: flex;
        align-items: center;
        img{
          width: 34px;
          height: 32px;
          margin-right: 10px;
        }
        .good_num{
          font-size:22px;
          font-family:PingFang-SC-Regular;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:44px;
        }
      }
      .say{
        /*margin-left: 40px;*/
        display: flex;
        align-items: center;
        img{
          width: 34px;
          height: 32px;
          margin-right: 10px;
        }
        .say_num{
          font-size:22px;
          font-family:PingFang-SC-Regular;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:44px;
          text-shadow:0px -1px 2px rgba(102,102,102,1);

        }
      }
      .share{
        margin-left: 40px;
        .icon-iconfontfenxiang{
          font-size: 32px;
          color: #FFFFFF;
        }
        .share_num{
          font-size:22px;
          font-family:PingFang-SC-Regular;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:44px;
          text-shadow:0px -1px 2px rgba(102,102,102,1);
        }
      }
      .sendBtn{
        font-size: 30px;
        color: #fff;
        padding-left: 20px;
        z-index: 1000;
      }
    }
    .overflow{
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .wx{
      background: green;
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
        width:38px;
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
        height: 70px;
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
    .sendBackground{
      background: white;
    }
  }

</style>
<style>

</style>
