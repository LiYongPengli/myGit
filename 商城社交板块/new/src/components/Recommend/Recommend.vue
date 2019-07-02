<template>
  <div class="recommend">
    <!-- 关注 -->
    <div class="content" v-if="userdat">
      <vueWaterfallEasy
      :imgsArr="imgsArr"
      @scrollLoadImg1="fetchImgsData1"
      :load="lading">
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
              <div class="good" @click="changeState(props.index)">
                  <img src="../../../static/img/点赞默认状态@2x.png" alt="" v-if="!props.value.dianzanState">
                  <img src="../../../static/img/已点赞@2x.png" alt="" v-else>
                <span :class="{dianzan:props.value.dianzanState}">{{userdat[props.index].like_num}}</span>
              </div>
            </div>
          </div>
        </template>
      </vueWaterfallEasy>
    </div>
  </div>
</template>

<script>
//import PublicText from '@/components/public-text/public-text';
export default {
  name: 'Recommend',
  data () {
    return {
      imgsArr:[],
      userdat:[],
      lading:true,
      likeList:[]
    }
  },
  activated(){
    console.log(this.$store.getters.getNextPage1)
    console.log(111)
  },
  deactivated(){
    console.log(2222)
  },
  methods:{
    /* userFocus(){
      this.$router.push({path:"/userFocus"})
    }, */

    changeState(num){
      if( !this.imgsArr[num].dianzanState){
        this.$axios.post('/likeAdd',{
          inv_id:this.imgsArr[num].id,
          inv_type:0
        }).then(data=>{
          console.log(data)
          this.userdat[num].likeid = data.data.data.id;
          ++this.userdat[num].like_num;
          this.imgsArr[num].dianzanState = true
        }).catch(err=>{
          console.log(err)
        })
      }else{
        this.$axios.delete('/delLike/'+this.userdat[num].likeid).then(data=>{
          console.log(data)
          --this.userdat[num].like_num;
          this.imgsArr[num].dianzanState = false
        }).catch(err=>{
          console.log(err)
        })
      }
      this.imgsArr[num].dianzanState=!this.imgsArr[num].dianzanState
    },
    // 假数据
    initImgsArr(n, m) { //num 图片数量
      var arr = []
      for (var i = n; i < m; i++) {
        if(this.userdat[i]){
          arr.push({ id:this.userdat[i].id,user:this.userdat[i],src:(this.isType(this.userdat[i]))?this.isType(this.userdat[i]): `../static/img/Rec_pic_hep_0${i}.png`, link: '/videos', info: this.userdat[i].body,avaUrl:this.userdat[i].user_picture,dianzanState:this.isZan(this.userdat[i]),dianzanNum: this.userdat[i].like_num,avaName:this.userdat[i].user_name||'佚名',Identity:this.userdat[i].identity })
        }
      }
      return arr
    },
    isZan(m){
      for(let i=0;i<this.likeList.length;i++){
        if(m.id==this.likeList[i].inv_id){
          m.likeid = this.likeList[i].id;
          return true
        }
      }
    },
    fetchImgsData1() {
      this.lading = false
      new Promise(this.loading).then(res=>{
        this.lading = true
      }).catch(err=>{
        console.log("加载出错")
      })
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
      let currentPage = this.$store.getters.getCurrentPage1
      this.$axios.post('/articles/articlesRecommend',{
        page : currentPage+1,
        f_time : (new Date()-0).toString()
      }).then(data=>{
        console.log(data)
        this.userdat = this.userdat.concat(data.data.data.articles_list.data)
        this.$store.commit('setCurrentPage1',data.data.data.articles_list.current_page)
        this.$store.commit('setNextPage1',data.data.data.articles_list.next_page_url)
        console.log(this.$store.getters.getNextPage1)
        this.fetchImgsArr=this.initImgsArr(this.userdat.length-data.data.data.articles_list.data.length,this.userdat.length)
        this.imgsArr = this.imgsArr.concat(this.fetchImgsArr)

        console.log(data.data.data.articles_list.next_page_url)
        resolve()
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  created() {

      this.$axios.post('/articles/articlesRecommend',{
        f_time:(new Date()-0).toString()
      }).then(data=>{
        console.log(data)
        this.userdat = data.data.data.articles_list.data;
        this.likeList = data.data.data.articles_like_list
        this.$store.commit('setCurrentPage1',data.data.data.articles_list.current_page)
        this.$store.commit('setNextPage1',data.data.data.articles_list.next_page_url)
        this.imgsArr = this.initImgsArr(0,this.userdat.length)
      }).catch(err=>{
        console.log(err)
      })

    // 模拟每次请求的新的图片的数据数据
  },
  components:{
    vueWaterfallEasy:resolve=>require(['@/components/Recommend/vue-waterfall-easy'],resolve)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.recommend{
  background: $bgColor;
  position: absolute;
  top:128px;
  left: 0;
  min-height: 100vh;
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
        word-break: break-all;
        font-size:28px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:#262626;
        line-height:39px;
        max-height: 80px;
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
            width:144px;
            font-size:24px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:#999999;
            line-height:44px;
            @include ellipsis
          }
        }
        .good{
          display: flex;
          align-items: center;
          img{
            width: 28px;
            margin-right: 10px;
          }
          span {
            display: inline-block;
            font-size:24px;
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



