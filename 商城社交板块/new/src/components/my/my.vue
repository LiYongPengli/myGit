<template>
  <div class="my">
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
                  <img :src="props.value.avaUrl" alt="">
                </div>
                <span>{{props.value.avaName}}</span>
              </div>
              <div class="good" @click="del(props.index)">
                删除
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
    name: 'my',
    data () {
      return {
        imgsArr:[],
        userdat:[],
        lading:true,
        likeList:[]
      }
    },
    methods:{
      /* userFocus(){
        this.$router.push({path:"/userFocus"})
      }, */
      del(index){
          this.$axios.delete('/articles/articlesDel/'+this.userdat[index].id).then(res=>{
            if(res.code==200){
              this.$axios.post('/articles/myArticles',{
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
            }
          })
      },
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
            arr.push({ id:this.userdat[i].id,user:this.userdat[i],src:(this.isType(this.userdat[i]))?this.isType(this.userdat[i]): `../static/img/Rec_pic_hep_0${i}.png`, link: '/videos', info: this.userdat[i].body,avaUrl:'../../../static/img/He p_pic_02.png',dianzanState:this.isZan(this.userdat[i]),dianzanNum: this.userdat[i].like_num,avaName:this.userdat[i].user_name })
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
        this.$axios.post('/articles/articlesmy',{
          page : currentPage+1,
          f_time : (new Date()-0).toString()
        }).then(data=>{
          console.log(data)
          this.userdat = this.userdat.concat(data.data.data.articles_list.data)
          this.fetchImgsArr=this.initImgsArr(this.userdat.length-data.data.data.articles_list.data.length,this.userdat.length)
          this.imgsArr = this.imgsArr.concat(this.fetchImgsArr)
          this.$store.commit('setCurrentPage1',data.data.data.articles_list.current_page)
          this.$store.commit('setNextPage1',data.data.data.articles_list.next_page_url)
          console.log(data.data.data.articles_list.next_page_url)
          resolve()
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    created() {
      this.$axios.post('/articles/myArticles',{
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
  .my{
    background: $bgColor;
    position: absolute;
    top:0;
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
              img{
                width: 100%;
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
            .goodImg{
              width: 30px;
              margin-right: 10px;
              img{
                width: 100%;
              }
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




