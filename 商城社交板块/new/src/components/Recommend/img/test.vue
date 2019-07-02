<template>
  <div class="recommend">
    <div class="write" @click="release()">
      <img src="./img/Rec_icon_edit.png"/>
    </div>
    <div class="content">
      <vueWaterfallEasy :imgsArr="imgsArr" @scrollLoadImg="fetchImgsData">
        <template slot-scope="props">
          <div class="player_info">
            <div class="title"><i class="tt tt-quanburen"></i>{{props.value.info}}</div>
            <div class="ticket">
              <mt-button @click="upLoadTicket(props.value.id)" size="small"><i class="tt tt-quanburen"></i>投票</mt-button>
            </div>
            <p class="num">{{props.index+1}}票</p>
          </div>
        </template>
      </vueWaterfallEasy>
    </div>
  </div>
</template>

<script>
  import vueWaterfallEasy from './vue-waterfall-easy.vue'
  export default {
    name: 'Recommend',
    data () {
      return {
        imgsArr: [],
        fetchImgsArr: []
      }
    },
    components:{
      vueWaterfallEasy
    },
    methods:{
      release(){
        this.$router.push({path:"/release"})
      },
      videos(){
        this.$router.push({path:"/videos"})
      },
      // 假数据
      initImgsArr(n, m) { //num 图片数量
        var arr = []
        for (var i = n; i < m; i++) {
          arr.push({ id:i,src: `../static/img/Rec_pic_hep_0${i+1}.png`, link: '/videos', info: '一些图片描述文字' })
        }
        return arr
      },
      fetchImgsData() {

        this.fetchImgsArr=this.initImgsArr(6,12)
        this.imgsArr = this.imgsArr.concat(this.fetchImgsArr)
      },

    },
    created() {
      this.imgsArr = this.initImgsArr(0,6)
      // 模拟每次请求的新的图片的数据数据
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .recommend{

    .write{
      width: 141px;
      position: fixed;
      left: 608px;
      bottom: 214px;
      z-index: 100;
      img{
        width: 100%;
      }
    }
    .content{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0 10px;
      margin-bottom: 107px;
      height: 100%;

    }
  }
</style>



