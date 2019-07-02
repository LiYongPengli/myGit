<template>
  <div class="position">
    <div class="header">
      <input type="text" placeholder="所在位置" v-model="posText" >

    </div>
    <div id="allmap" ref="allmap"></div>
    <div class="poslist">
      <div class="line" v-for="(v,i) in poslist" :key="i" @click="backRelease(i)">
        <div>{{v.title}}</div>
        <div class="address">{{v.details}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import BMap from 'BMap'
  import {Toast} from 'mint-ui'
    export default {
        name: "position",
        data(){
          return{
            posText:'',
            poslist:[],
            lat:'',
            lng:'',
            apiObj:{}
          }
        },
        methods:{
          getApi(resolve,reject){
            var that=this;
            let url=location.href.split('#')[0]
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
                that.getlocation()
              })
              resolve()
            })
          },
          backRelease(num){
              console.log(this.poslist[num])
              this.$store.commit('setPosition',this.poslist[num]);
              this.$router.push({path:'/release'})
          },
          getlocation(){
            var that=this;
            //如果不支持则不会执行
            wx.getLocation({
              success: function (res) {
                var geolocation = new BMap.Geolocation();
                var geoc = new BMap.Geocoder();
                  that.lng = res.longitude
                  that.lat = res.latitude
                  var mOption = {
                    poiRadius : 1000,           //半径为1000米内的POI,默认100米
                    numPois : 10               //列举出50个POI,默认10个
                  }
                  var point=new BMap.Point(that.lng, that.lat)
                  geoc.getLocation(point, function(rs){
                    var posArr=rs.surroundingPois;
                    posArr.forEach((val)=>{
                      let obj={
                        title:val.title,
                        details:val.address,
                        point:val.point
                      }
                      that.poslist.push(obj)
                    })
                  },mOption);
              },
              cancel: function (res) {
                alert('用户拒绝授权获取地理位置');
              }
            });

          }
        },
        mounted(){
         new Promise(this.getApi).then(res=>{
         })

        },
        watch:{
          posText(val){
            var that=this;
            var map = new BMap.Map(this.$refs.allmap);
            map.centerAndZoom(new BMap.Point(this.lng, this.lat), 11);
            var options = {
              onSearchComplete: function(rs){
                if(!rs){
                  return
                }
                var posArr=rs.Ar;
                if(posArr.length<=0){
                  Toast({
                    message:"附近位置信息不存在",
                    position:"middle",
                    duration:"2000"
                  })
                  return
                }
                that.poslist=[]
                posArr.forEach((val)=>{
                  let obj={
                    title:val.title,
                    details:val.address,
                    point:val.point
                  }
                  that.poslist.push(obj)
                })
              }
            };
            var mPoint = new BMap.Point(this.lng, this.lat);
            console.log(mPoint)
            var local = new BMap.LocalSearch(map, options);
            local.searchNearby(val,mPoint, 5000);
          }
        }

    }
</script>
<style lang="scss" scoped>
  .position{
    height: 100%;
    width: 750px;
    background: #fff;
    position: absolute;
    left: 0;
    top: 0;
    overflow-x: hidden;
    z-index: 300;
  .header {
    height: 134px;
    display: flex;
    justify-content: center;
    align-items: center;
    input {
      width: 580px;
      height: 70px;
      padding-left: 30px;
      border: 2px solid #999999;
      border-radius: 40px;
    //outline: 1px dashed #999999;
      outline: none;
      font-size: 26px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 44px;
      -webkit-appearance: none;
    }
    input::-webkit-input-placeholder {
      font-size: 26px;
      font-family: PingFang-SC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 44px;
    }
    .sure{
      font-size:36px;
      font-family:PingFang-SC-Medium;
      font-weight:500;
      color:#262626;
      line-height:44px;
      margin-left: 10px;
    }

  }
  #container{
    display: none;
  }
  .poslist{
    font-size: 30px;
    padding: 0 40px;
    .line{
      padding: 10px 0px;
      border-bottom: 2px solid #f2f2f2;
      .address{
        font-size: 24px;
        color: #999;
      }
    }
  }
  }
</style>
