<template>
<!-- 发布页面 -->
  <div class="release">
    <!-- 页面头部 -->
    <header>
      <button @click="cancel()">取消</button>
      <button @click="send()">发布</button>
    </header>
    <!-- 发布内容及其上传的附件 -->
    <div class="text">

      <textarea placeholder="快来表达你这一刻的想法吧..." v-model="content" maxlength="500"></textarea>
      <div class="upImg">
        <div class="userImg" v-for="(v,i) in fileURL" :key="i">
          <img :src=v v-if="video==false"/>
          <div class="videoImg">
            <img src="./img/组 14.png" v-if="video">
          </div>
          <div @click="del(i)" class="del">
            <img src="static/img/删除.png"/>
          </div>
        </div>
        <div class="upFile" v-show="video==false&&fileURL.length<9">
          <!-- 用来上传图片或者视频的 -->
          <input type="file" accept="image/*" multiple @change="chg()" ref="file">
          <img src="./img/rel_icon_upl.png" />
          <span class="limit">(最多可上传九张图片)</span>
        </div>
      </div>
    </div>
    <!-- 标签部分 -->
    <div class="lable">
      <ul>
        <li @click="toTopic()" v-if="tabList.length<=0">
          <span class="lab">#</span> 参与话题
        </li>
        <li v-else @click="toTopic()">

          <div v-for="(val,i) in  tabList" class="tab" :key="i">
            <span class="lab">#</span>
                    {{val.tab}}
                    <span @click.stop="delTab(i)" class="del">
                      <img src="static/img/删除.png"/>
                    </span>
          </div>
        </li>
        <li @click="toPosition()">
          <div>
            <img src="./img/rel_icon_add.png" alt="">
          </div>
          {{position}}
        </li>
      </ul>
    </div>
    <div>

    </div>
  </div>

</template>

<script>
/* 发布页,点击悬浮图标进入 */
import {Toast} from 'mint-ui'
import { Indicator } from 'mint-ui';
export default {
  name: 'release',
  data () {
    return {
      video:false,//用来判断上传文件类型
      fileURL:[],//用来存放上传文件路径
      fileData:[],
      content:'',
      sendFileData:[],
      cover_width:0,
      cover_height:0,
      tabList:[],
      widthArr:[],
      lng:0,
      lat:0,
      position:'所在位置'
    }
  },
  methods:{
    //删除标签
    delTab(index){
      this.tabList.splice(index,1);
      this.$store.commit('setTabList',this.tabList)
    },
    //选择位置
    toPosition(){
      this.$store.commit('setContent',this.content);
      this.$store.commit('setFileURL',this.fileURL);
      this.$store.commit('setSendFileData',this.sendFileData);
      this.$store.commit('setWidthArr',this.widthArr);
      this.$router.push({path:"/position"});
    },
    //图片压缩转base64
    compress(file,index, callback) {
      console.log(file.size)
      var size=file.size/(100 * 1024);
      var quality=size>2?1:size/2
      var that=this;
      if (!window.FileReader || !window.Blob) {
        return errorHandler('您的浏览器不支持图片压缩')();
      }
      var reader = new FileReader();
      var mimeType = file.type || 'image/jpeg';
      reader.onload = createImage;
      reader.onerror = errorHandler('图片读取失败！');
      reader.readAsDataURL(file);
      function createImage() {
        var dataURL = this.result;
        var image = new Image();
        image.onload = compressImage;
        image.onerror = errorHandler('图片加载失败');
        image.src = dataURL;
      }
      function compressImage() {
        var canvas = document.createElement('canvas');
        var ctx;
        var dataURI;
        var result;
        canvas.width = this.naturalWidth;
        canvas.height = this.naturalHeight;
        let obj={
          height:this.naturalHeight,
          width:this.naturalWidth
        }

        ctx = canvas.getContext('2d');
        ctx.drawImage(this, 0, 0);
        dataURI = canvas.toDataURL(mimeType, quality);
        that.sendFileData.push(dataURI);
        that.widthArr.push(obj)
      }

      function errorHandler(message) {
        return function () {
          var error = new Error('Compression Error:', message);
          callback(error, null);
        };
      }
    },
    //监听选中的图片或者视频文件
    chg(){
       var that=this
      if(this.$refs.file.files){
        if(this.$refs.file.files.length>9){
          Toast({
            message:"只能上传9张图片",
            position:"middle",
            duration:"2000",
            className:'toast-s'
          })
          return
        }
        for(let i=this.fileData.length,j=0;i<9;i++,j++){
          if(!this.$refs.file.files[j]){
            break;
          }
          console.log(this.fileURL)
         this.compress(this.$refs.file.files[j],j)
          this.fileURL.push(URL.createObjectURL(this.$refs.file.files[j]))
        }

      }
    },
    //用来删除预览图片或视频
    del(i){
      var that=this
      this.fileURL.splice(i,1);
      that.sendFileData.splice(i,1);
      that.widthArr.splice(i,1);
      //this.$refs.file.files = this.fileData;
      console.log(this.fileData)
    },
    toTopic(){
      this.$store.commit('setContent',this.content);
      this.$store.commit('setFileURL',this.fileURL);
      this.$store.commit('setSendFileData',this.sendFileData);
      this.$store.commit('setWidthArr',this.widthArr);
      this.$store.commit('setTabList',this.tabList);
      if(this.tabList.length>=3){
        Toast({
          message:"标签不能超过三个",
          position:"middle",
          duration:"2000",
          className:'toast-s'
        })
        return
      }
      this.$router.push({path:"/topic"})
    },
    send(){
      var that=this

      if(that.sendFileData.length<=0){
        Toast({
          message:"请上传图片",
          position:"middle",
          duration:"2000",
          className:'toast-s'
        })
        return
      }
      if(that.content.length<=0){
        Toast({
          message:"请输入内容",
          position:"middle",
          duration:"2000",
          className:'toast-s'
        })
        return
      }
      if(that.content.length>=500){
        Toast({
          message:"文字内容不能超过500",
          position:"middle",
          duration:"2000",
          className:'toast-s'
        })
        return
      }
      Indicator.open('发布中');
      this.cover_width=this.widthArr[0].width;
      this.cover_height=this.widthArr[0].height;
      let tab=[]
      this.tabList.forEach((val,index)=>{
        tab.push(val.tab_id)
      })
      tab=tab.toString()

      let data={
        body:this.content,
        type:that.sendFileData.length>0?1:0,
        images:that.sendFileData,
        cover_width:that.cover_width,
        cover_height:that.cover_height,
        tag:tab,
        lat:that.lat,
        lng:that.lng,
        position:that.position
      }
      this.$axios.post('/articles/articlesStore',data).then(res=>{
        console.log(res)
        Indicator.close();
        this.cancel()
      })
    },
    cancel(){
      this.$store.commit('setContent','');
      this.$store.commit('setFileURL',[]);
      this.$store.commit('setSendFileData',[]);
      this.$store.commit('setWidthArr',[]);
      this.$store.commit('setPosition',{});
      this.$store.commit('setTabList',[]);
      let url=JSON.parse(localStorage.acts).act
      switch (url){
        case 0:
          this.$router.push({path:"/"});
          break;
        case 1:
          this.$router.push({path:"/add/focus"});
          break;
        case 2:
          this.$router.push({path:"/add/near"});
          break;
        default:
          break
      }

    }
  },
  mounted(){
    // console.log())
    this.tabList=this.$store.getters.getTabList
    if(this.$route.params.tab){
      let tab=this.$route.params.tab;
      let tab_id=this.$route.params.tab_id
      var tabObj={
        tab:tab,
        tab_id:tab_id
      }
      this.tabList.push(tabObj);
      this.$store.commit('setTabList',this.tabList);

    }
    this.content=this.$store.getters.getContent;
    this.fileURL=this.$store.getters.getFileURL;
    this.sendFileData=this.$store.getters.getSendFileData;
    this.widthArr=this.$store.getters.getWidthArr;
    if(JSON.stringify(this.$store.getters.getPosition)!='{}'){
      var posObj=this.$store.getters.getPosition
      this.lat=posObj.point.lat;
      this.lng=posObj.point.lng;
      this.position=posObj.title;
    };
  },
  beforeRouteLeave(to,from,leave){
    to.meta.keepAlive=true;
    leave()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.release{
  width: 750px;
  height: 100%;
  background:rgba(242,242,242,1);
  position: absolute;
  left: 0;
  top: 0;
  overflow-x: hidden;
  z-index: 200;
  header{
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    background: rgba(248,248,248,1);
    button{
      background: none;
      border: none;
      font-size:34px;
      font-family:PingFang-SC-Regular;
      font-weight:400;
      color:rgba(38,38,38,1);
      outline: none;
    }
  }
  .text{
    background: rgba(248,248,248,1);
    padding-bottom: 30px;
    textarea{
      width: 100%;
      height: 252px;
      font-size: 28px;
      color: #333333;
      line-height: 42px;
      border: none;
      outline: none;
      display: block;
      box-sizing: border-box;
      padding: 41px 66px 20px;
      background: rgba(248,248,248,1);
      -webkit-appearance: none;
      margin-bottom: 20px;
    }
    .upImg{
      width: 680px;
      margin-left: 66px;
      display: flex;
      flex-wrap: wrap;
      //justify-content: space-between;
      .userImg{
        position: relative;
        margin-right: 10px;
        padding-bottom: 10px;
        .del{
          width: 44px;
          height: 44px;
          //background: red;
          border-radius: 50%;
          text-align: center;
          //color: white;
          position: absolute;
          top: -10px;
          left: 160px;
          img{
            width: 100%;
          }
        }
        .videoImg{
          width: 50px;
          height: 50px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
          img{
            width: 100%;;
            display: block;
          }
        }
      }
      div{
        width: 200px;
        height: 200px;
        img{
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .upFile{
        position: relative;
        width: 200px;
        height: 200px;
        input{
          position: absolute;
          left: 0;
          top: 0;
          width: 200px;
          height: 200px;
          z-index: 100;
          outline: none;
          opacity: 0;
        }
        img{
          position: absolute;
          left: 0;
          top: 0;
        }
        .limit{
          width: 200px;
          position: absolute;
          top: 130px;
          font-size: 25px;
          color: #ff4d72;
          text-align: center;
        }
      }
    }
  }
  .lable{
    margin-top: 20px;
    padding: 0 20px;
    ul{
      li{
        display: flex;
        align-items: center;
        font-size:24px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(102,102,102,1);
        padding: 20px 0;
        border-bottom: 2px solid gray;
        flex-wrap: wrap;

      }
      li:first-of-type{
        padding-bottom: 10px;
        .tab{
          position: relative;
          margin-right: 40px;
          line-height: 60px;
          display: flex;
          align-items: center;
          .del{
            width: 25px;
            height: 25px;
            //background: red;
            border-radius: 50%;
            text-align: center;
            //color: white;
            position: absolute;
            top: 0px;
            right:-20px;
            font-size: 15px;
            line-height: 25px;
            img{
              width: 100%;
            }
          }
        }
        .lab{
          display: inline-block;
          width: 30px;
          height: 30px;
          background: lightgray;
          border-radius: 50%;
          text-align: center;
          color: white;
          margin-right: 10px;
          line-height: 30px;
        }
      }
      li:last-of-type{
        div{
          width: 30px;
          margin-right: 10px;
          img{
            width: 100%;
            display: block;
          }
        }
      }
    }
  }
}
</style>

