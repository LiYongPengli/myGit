<template>
  <div class="near">
    <!-- 附近 -->
    <div class="content">
      <vueWaterfallEasy
      :imgsArr="imgsArr"
      @scrollLoadImg2="fetchImgsData2"
      :load="lading"
      v-if="neardat.length">
        <template  v-slot="props" >
          <div class="player_info">
            <p class="line-2">{{props.value.info}}</p>
            <div class="foot">
              <div class="user">
                <div class="userImg">
                  <img :src="props.value.avaUrl||'../../../static/img/pic_Avatar_40@2x.png'" alt="">
                  <img v-if="props.value.Identity==1" src="../../../static/img/v@2x.png" class="v" alt="">
                </div>
                <span>{{props.value.avaName}}</span>
              </div>
              <div class="good" @click="changeState(props.index)" >
                <img src="../../../static/img/形状 1@2x.png" alt="">
                <span>{{props.value.distance}}</span>
              </div>
            </div>
          </div>
        </template>
      </vueWaterfallEasy>
      <div id="allmap" ref="allmap" style="display: none"></div>
    </div>
  </div>
</template>

<script>
/*
  显示附近内容，与推荐和关注类似
*/
export default {
  name: 'Near',
  data () {
    return {
      imgsArr: [],
      fetchImgsArr: [],
      neardat:[],
      lng:'',
      lat:'',
      lading:true,
      likeList:[]
    }
  },
  methods:{
    /* videos(){
      this.$router.push({path:"/videos"})
    }, */
    changeState(num){
      if( !this.imgsArr[num].dianzanState){
        this.$axios.post('/likeAdd',{
          inv_id:this.imgsArr[num].id,
          inv_type:0
        }).then(data=>{
          console.log(data)
          this.neardat[num].likeid = data.data.data.id;
          ++this.neardat[num].like_num
          this.imgsArr[num].dianzanState = true
        }).catch(err=>console.log(err))
      }else{
        this.$axios.delete('/delLike/'+this.neardat[num].likeid).then(data=>{
          console.log(data)
          --this.neardat[num].like_num;
          this.imgsArr[num].dianzanState = false
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    // 假数据
    initImgsArr(n, m) { //num 图片数量
      var arr = []
      var map = new BMap.Map(this.$refs.allmap);
      map.centerAndZoom(new BMap.Point(this.lng, this.lat), 11);
      var pointA = new BMap.Point(this.lng, this.lat);  // 创建点坐标A--大渡口区

      for (var i = n; i < m; i++) {
        var pointB = new BMap.Point(this.neardat[i].lng,this.neardat[i].lat);
        let dis=map.getDistance(pointA,pointB).toFixed(2)/1000>1?((map.getDistance(pointA,pointB)/2)/1000).toFixed(2)+'km':(map.getDistance(pointA,pointB)).toFixed(2)+'m'
        arr.push({ id:this.neardat[i].id,user:this.neardat[i],userLike_list:this.likeList,src:(this.isType(this.neardat[i]))?this.isType(this.neardat[i]): `../static/img/Rec_pic_hep_0${i}.png`, link: '/videos', info:this.neardat[i].body,avaUrl:this.neardat[i].user_picture,dianzanState:this.isZan(this.neardat[i],i),dianzanNum:this.neardat[i].like_num,avaName:this.neardat[i].user_name,Identity:this.neardat[i].identity,
          distance: dis })
      }
      return arr
    },
    fetchImgsData2() {
      this.lading = false
      new Promise(this.loading).then(res=>{
        this.lading = true
      }).catch(err=>{
        console.log('sss')
      })
    },
    isZan(m){
      for(let i=0;i<this.likeList.length;i++){
        if(m.id==this.likeList[i].inv_id){
          m.likeid = this.likeList[i].id;
          return true
        }
      }
    },
    //判断用户发布类型(0:文章1:图片2:视频)
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
    loading(resolve,reject){
      let currentPage = this.$store.getters.getCurrentPage2
      this.$axios.post('/articles/articlesNearby',{
        lng:this.lng,
        lat:this.lat,
        page : currentPage+1,
        lng:this.lng,
        lat:this.lat,
        f_time : (new Date()-0).toString()
      }).then(data=>{
        console.log(data)
        this.neardat = this.neardat.concat(data.data.data.articles_list.data)
        this.likeList = data.data.data.articles_like_list;
        this.fetchImgsArr=this.initImgsArr(this.neardat.length-data.data.data.articles_list.data.length,this.neardat.length)
        this.imgsArr = this.imgsArr.concat(this.fetchImgsArr)
        this.$store.commit('setCurrentPage2',data.data.data.articles_list.current_page)
        this.$store.commit('setNextPage2',data.data.data.articles_list.next_page_url)
        console.log(data.data.data.articles_list.next_page_url)
        resolve()
      }).catch(err=>{
        console.log(err)
      })
    },
    getData(){
      this.$axios.post('/articles/articlesNearby',{
        lng:this.lng,
        lat:this.lat,
        f_time:(new Date()-0).toString()
      }).then(data=>{
        console.log(data)
        this.neardat = data.data.data.articles_list.data;
        this.likeList = data.data.data.articles_like_list;
        this.$store.commit('setCurrentPage2',data.data.data.articles_list.current_page)
        this.$store.commit('setNextPage2',data.data.data.articles_list.next_page_url)
        this.imgsArr = this.initImgsArr(0,this.neardat.length)
      }).catch(err=>{

      })
    },

  },
  mounted() {

    var that=this;
    this.$axios.get('/jssdk').then(res=>{
      console.log(res.data);
      this.apiObj=res.data.data;
      wx.config({
        debug: false,
        appId:this.apiObj.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
        timestamp:this.apiObj.timestamp, // 必填，生成签名的时间戳
        nonceStr:this.apiObj.nonceStr, // 必填，生成签名的随机串
        signature: this.apiObj.signature,// 必填，签名，见附录1
        //需要分享的列表项:发送给朋友，分享到朋友圈，分享到QQ，分享到QQ空间
        jsApiList: [
          'openLocation',
          'getLocation'
        ]
      });
      //处理验证失败的信息
      wx.error(function (res) {
        alert('授权失败')
      });
      wx.ready(function (res) {
        wx.getLocation({
          success: function (res) {
            var geolocation = new BMap.Geolocation();
            var geoc = new BMap.Geocoder();
            that.lng = res.longitude
            that.lat = res.latitude
            that.getData()
          },
          cancel: function (res) {
            alert('用户拒绝授权获取地理位置');
          }
        });
      })

    })
    //console.log(geolocation)

    // 模拟每次请求的新的图片的数据数据
  },

  components:{
    vueWaterfallEasy:resolve=>require(['@/components/Recommend/vue-waterfall-easy'],resolve)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.near{
  background: $bgColor;
  min-height: 100vh;
  position: absolute;
  top:128px;
  left: 0;
  width: 100%;
  .content{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding:10px;
    padding-bottom: 107px;
    height: 100%;
    .player_info{
      width: 305px;
      padding: 20px ;
      p{
        font-size:28px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:#262626;
        line-height:39px;
        height: 80px;
      }
      .foot{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 17px;
        .user{
          display: flex;
          align-items: center;
          .userImg{
            width: 40px;
            margin-right: 10px;
            position: relative;
            img{
              width: 100%;
            }
            .v{
              width: 16px;
              height: 16px;
              position: absolute;
              right: -2px;
              bottom: -2px;
            }
          }
          span{
            display: inline-block;
            width:120px;
            font-size:24px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:#999999;
            line-height:44px;
          }
        }
        .good{
          display: flex;
          align-items: center;
          img{
            width: 100%;
            width: 18px;
            margin-right: 5px;
          }
          span {
            display: inline-block;
            font-size:20px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:#999999;
            line-height:44px;
          }
          .dianzan{
            color: #F44B4F;
          }

        }
      }
    }
  }
}
</style>
