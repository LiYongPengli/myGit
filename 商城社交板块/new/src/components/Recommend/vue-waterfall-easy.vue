<!-- —————————————↓SCSS———————分界线————————————————————————— -->
<style lang="scss">
@import "../../common/common.scss";
  .vue-waterfall-easy {
    background: $bgColor;
    position: relative;
    width: 100%; // 移动端生效
    height: 100%;
    .img-box {
      display: flex;
      width: 50%; // 移动端生效
      box-sizing: border-box;
      float: left; // 首行排版
      transition: left 1s, top 1s;
      background: $bgColor;
      padding: 10px 10px;
      justify-content: center;
      .img-inner-box {
        box-shadow:0px 1px 6px 0px rgba(241,241,241,1);
        border-radius:6px ;
        .img-wraper {
          width: 100%;
          background: yellow;
        }
        img {
          width: 344px;
          vertical-align: bottom;
          border-radius:6px 6px 0px 0px;
        }
        .img-info {
          background: #fff;
          border-radius:0px 0px 6px 6px;
        }
      }
    }
    .loading {
      text-align: center;
      width: 100%;
      position: fixed;
      bottom: 97px;
      left: 50%;
      margin-left: -15px;
      width: 30px;
      height: 30px;
    }
    .loading.first-loading {
      //  首次预加载白屏，让加载动画处于中间
      top: 50%;
      margin-top: -15px;
    }
    .double-bounce1,
    .double-bounce2 {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #67CF22;
      opacity: 0.6;
      position: absolute;
      top: 0;
      left: 0;
      animation: bounce 2.0s infinite ease-in-out;
    }

    .double-bounce2 {
      animation-delay: -1.0s;
    }
    @keyframes bounce {
      0%,
      100% {
        transform: scale(0.0);
      }
      50% {
        transform: scale(1.0);
      }
    }
  }
</style>

<!-- —————————————↓HTML————————分界线———————————————————————— -->
<template >
  <div class="vue-waterfall-easy" :style="{height:colsHeight+'px'}" ref="scrollEl">
      <div class="img-box"  v-for="(v,i) in imgsArrC" :key="i"
           :style="{width: isMobile ? '' : colWidth+'px'}">
            <div class="img-inner-box">
              <img :src="v.src" :style="{height:v.height+'px'}" class='img' @click="videos(v,v.link)">
              <div class="img-info">
                <slot :index="i" :value="v"></slot>
              </div>
            </div>
      </div>
      <div class="loading" v-if="isPreloadingC" :class="{'first-loading':isFirstTIme}">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
      </div>
  </div>


</template>

<!-- ——————————————↓JS—————————分界线———————————————————————— -->
<script>
  //import XXX from './components/XXX'

  export default
  {
    name: 'vue-waterfall-easy',
    //组件参数
    props: {
      gap: {    //图片间隔
        type: Number,
        default: 20
      },
      maxCols: {    //最大的列数
        type: Number,
        default: 5
      },
      imgsArr: {    //请求返回的图片数据
        type: Array,
        required: true
      },
      imgWidth: {   //制定图片的同一宽度
        type: Number,
        default: 346
      },
      load:{
        type:Boolean,
        required:true
      },
      timeOut: { // 预加载事件小于500毫秒就不显示加载动画，增加用户体验
        type: Number,
        default: 500
      }
    },
    data() {
      return {
        msg: 'this is from vue-waterfall-easy.vue',
        columnCount: NaN, // 列数，根据窗口大小初始化
        isMobile: true, // 初始化移动端
        beginIndex: NaN, // 第二列首张图片的index，从这一张开始重新计算图片位置
        colsHeightArr: [], // 每一列的图片总和高度为元素组成的数组
        imgBoxEls: null, // 所有的.img-box元素
        isPreloading: true, // 预加载状态中（1.以等待图片替换 2.图片全部预加载完显示）
        isPreloadingC: true,
        imgsArrC: [], // 预加载完之后再才开始
        loadedCount: 0, // 已经加载图片数量
        isFirstTIme: true, // 首次加载
        colsHeight:0,
        loading:true
      }
    },
    computed: {
      colWidth() { // 每一列的宽度
        return this.imgWidth + this.gap/2*3;
      },
      imgWidthC() { // 对于移动端重新计算图片宽度
        return this.isMobile ? window.innerWidth / 2 - this.gap*2 : this.imgWidth
      }
    },
    methods: {
      waterfall() { // 执行瀑布布局
        console.log(this.imgBoxEls)
        for (var i = this.beginIndex; i < this.imgsArr.length; i++) {
          var minHeight = Math.min.apply(null, this.colsHeightArr);
          var minIndex = this.colsHeightArr.indexOf(minHeight) // 最低高度的索引
          var width = this.imgBoxEls[0].offsetWidth // 图片的宽度获取
          // 设置元素定位的位置
          this.imgBoxEls[i].style.position = 'absolute'
          this.imgBoxEls[i].style.left = minIndex * width + 'px'
          this.imgBoxEls[i].style.top = minHeight + 'px'
          // 更新colsHeightArr
          this.$set(this.colsHeightArr, minIndex, minHeight + this.imgBoxEls[i].offsetHeight)
        }
        console.log(this.colsHeightArr)
        this.colsHeight=Math.max.apply(null, this.colsHeightArr)
        this.beginIndex = this.imgsArr.length;


      },
      videos(v,url){
        console.log(v)
        this.$router.push({
            path:url,
            query:{
              id:v.id,
            }
          })
        return;
      },
      loadFn(e, oImg, i) { // 每张图片预加载完成执行函数
        this.loadedCount++

        if (e.type === 'load') { // 使用图片原始宽度计算图片的高度

          this.$set(this.imgsArr[i], 'height', Math.round(this.imgWidthC / (oImg.width / oImg.height)))
        }
          if (e.type === 'error') { // 使用图片原始宽度计算图片的高度
          this.$set(this.imgsArr[i], 'height', Math.round(this.imgWidthC / (oImg.width / oImg.height)))
          this.$set(this.imgsArr[i], 'src', '../static/img/Rec_pic_hep_01.png')

        }
        if (this.loadedCount === this.imgsArr.length) {
          this.imgsArrC = this.imgsArr.concat([])
          this.isPreloading = false
          this.isFirstTIme = false
          // 预加载完毕

          this.$nextTick(() => {
            // this.imgBoxEls = document.getElementsByClassName('img');
            this.initImgBoxEls()
            this.$emit('preloaded')
          })
        }
      },
      preload() {
        var defaultImg=new Image();
        defaultImg.src='../static/img/Rec_pic_hep_01.png'
        this.imgsArr.forEach((v, i) => {
          if (i < this.loadedCount) return

          var oImg = new Image()

          oImg.addEventListener('load', (e) => {
            this.loadFn(e, oImg, i)
          })
          oImg.addEventListener('error', (e) => {
            this.loadFn(e,defaultImg, i)
          })
          oImg.src = v.src
        })
      },


      // -----------------初始化化------------------------

      initColsHeightArr() { // 第一行元素的高度组成的数组-初始化
        this.colsHeightArr = [] // 列数发生变化重新初始化
        for (var i = 0; i < this.columnCount; i++) {
          if(i>=this.imgBoxEls.length){
            return
          }
          this.imgBoxEls[i].style.position = 'static' // 重置下position
          var height = this.imgBoxEls[i].offsetHeight
          this.colsHeightArr.push(height);

        }
      },
      initImgBoxEls() { // 初始化所有装图片的元素集合,注意高度获取需要在图片加载完成之后，所以在window.onload 事件中初始化
        this.imgBoxEls=[]
        var that=this;
       this.imgBoxEls = document.getElementsByClassName('img-box');
        setTimeout(function () {
          that.imgBoxEls = document.getElementsByClassName('img-box');

        },1000)
      },
      initColumnCount() { // 列数初始化
        var winWidth = window.innerWidth
        var columnCount = parseInt(winWidth / this.colWidth)
        columnCount = columnCount === 0 ? 1 : columnCount
        this.columnCount = this.isMobile
          ? 2
          : (columnCount > this.maxCols ? this.maxCols : columnCount)

      },
    },
    mounted() {
      // ==1== 根据窗口大小初始化列数
      this.initColumnCount()
      this.beginIndex = this.columnCount // 开始排列的元素索引
      // ==2== 根据预加载完成的图片的长宽比，计算图片的高度
      this.preload()
      this.$on('preloaded', () => {
        if (this.colsHeightArr.length === 0) this.initColsHeightArr() // 第一次初始化
        this.waterfall()
      })
      window.addEventListener('resize', () => {
        var old = this.columnCount
        this.initColumnCount()
        if (old === this.columnCount) return // 列数不变直接退出
        this.beginIndex = this.columnCount // 开始排列的元素索引
        this.initColsHeightArr()
        this.waterfall()
      })
      var that=this
      window.addEventListener('scroll',()=>{

        if (that.isPreloading){
          return
        }else{
          //变量scrollTop是滚动条滚动时，距离顶部的距离
          var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
          //变量windowHeight是可视区的高度
          var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
          //变量scrollHeight是滚动条的总高度
          var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
          //滚动条到底部的条件
          const lastImgHeight = that.imgsArr[that.imgsArr.length - 1].height
          let [currentPage,nextPage,nextPage1,nextPage2] = [this.$store.getters.getCurrentPage,this.$store.getters.getNextPage,this.$store.getters.getNextPage1,this.$store.getters.getNextPage2]
          if(scrollTop+windowHeight>=this.colsHeight- lastImgHeight){
            if(nextPage){
              if(this.load&&this.loading){
                this.loading = false
                this.$emit('scrollLoadImg')
                //console.log(currentPage)
                //console.log(nextPage1)
              }else{
                this.loading = true
              }
            }
            if(nextPage1){
              //console.log('1111')
              if(this.load&&this.loading){
                this.loading = false
                this.$emit('scrollLoadImg1')
                //console.log(currentPage)
                //console.log(nextPage1)
              }else{
                this.loading = true
              }
            }
            if(nextPage2){
              //console.log('1111')
              if(this.load&&this.loading){
                this.loading = false
                this.$emit('scrollLoadImg2')
                //console.log(currentPage)
                //console.log(nextPage1)
              }else{
                this.loading = true
              }
            }
          }
        }


      })

    },
    watch: {
      imgsArr(newV, oldV) {

        if (newV.length === oldV.length) return
        this.isPreloading = true // 预加载新的图片资源
        this.preload()
      },
      isPreloading(v) {
        if (v) {
          setTimeout(() => {
            if (!this.isPreloading) return // 500毫秒内预加载完图片则不显示加载动画
            this.isPreloadingC = true
          }, this.timeOut)
        } else {
          this.isPreloadingC = false
        }
      }
    }
  }
</script>
