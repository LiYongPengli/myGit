<template>
  <div class="userFocus" :class="{'overFlow':hidden}">
    <!-- 关注页详情 -->
    <header>
      <div class="back" @click="$router.back()">
        <img src="./img/形状 2.png" />
      </div>
      关注
    </header>
    <!-- 主体内容 -->
    <div class="content"
         v-if="list.length"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10"
         infinite-scroll-immediate-check="false">
      <!--<userFocusText :info="first_data" v-if="first_data"></userFocusText>-->
      <userFocusText v-for="(v,i) in list" :key="i" :info="v" :like="likeList" :foc="JSON.stringify(attention)"></userFocusText>
    </div>
  </div>
</template>

<script>
  /*
    点击关注下的其中一条用户信息跳转到改组件
    主要用于渲染改用户发布的内容
  */
  //import userFocusText from '@/components/userFocus/userFocusText/userFocusText'
  export default {
    name: 'userFocus',
    data () {
      return {
        first_data:'',
        list:[],
        hidden:false,
        attention:null,
        likeList:[],
        current_page:'',
        next_page:'',
        loading:false
      }
    },
    created(){
      this.$axios.post('/articles/articlesConcernUser',{
        f_time:(new Date()-0).toString(),
        articleId:this.$route.query.id
      }).then(data=>{

        this.list = data.data.data.articles_list.data;
        this.likeList = data.data.data.articles_like_list;

        // this.first_data = data.data.data.articles_first
        this.current_page = data.data.data.articles_list.current_page;
        this.next_page = data.data.data.articles_list.next_page_url;
        this.attention = data.data.data.attention;
      }).catch(err=>{
        console.log(err)
      })
    },
    methods:{
      loadMore(){
        if(this.next_page!=""&&this.next_page!=null){
          //console.log(this.next_page)
          this.$axios.post('/articles/articlesConcernUser',{
            f_time:(new Date()-0).toString(),
            articleId:this.$route.query.id,
            page:++this.current_page
          }).then(data=>{
            //console.log(data)
            this.list = this.list.concat(data.data.data.articles_list.data);
            this.likeList = data.data.data.articles_like_list;
            console.log(this.likeList )
            console.log(this.list)
            this.next_page = data.data.data.articles_list.next_page_url;
          })
        }
      },
    },
    components:{
      userFocusText:resolve=>require(['@/components/userFocus/userFocusText/userFocusText'],resolve)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .userFocus{
    position: absolute;
    background: white;
    z-index: 200;
    header{
      width: 750px;
      height: 128px;
      display: flex;
      align-items: center;
      font-size:40px;
      font-family:FZLTZHK--GBK1-0;
      font-weight:400;
      color:rgba(51,51,51,1);
      box-sizing: border-box;
      padding: 0 20px;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 1000;
      background: white;
      .back{
        width: 26px;
        padding-right: 289px;
        img{
          width: 100%;
          display: block;
        }
      }
    }
    .content{
      width: 750px;
      margin-top: 128px;
    }
    .overFlow{
      width: 750px;
      height: 100%;
      overflow: hidden;
    }
  }
</style>
