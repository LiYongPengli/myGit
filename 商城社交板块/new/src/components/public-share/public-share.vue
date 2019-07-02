<template>
<!-- 分享插件 -->
  <div class="publicShare" @click="back()" @touchmove.prevent="">
    <transition name="fade"
    v-on:after-leave="afterLeave">
      <div class="share" v-if="show" @click.stop="">
        <ul>
          <li>
            <figure>
              <div>
                <div>
                  <img src="./img/形状 17.png" alt=""/>
                </div>
              </div>
              <figcaption>分享到微信</figcaption>
            </figure>
            <figure>
              <div>
                <div>
                  <img src="./img/形状 18.png" alt="">
                </div>
              </div>
              <figcaption>分享到朋友圈</figcaption>
            </figure>
          </li>
          <li><span @click.stop="back()">取消</span></li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
/* 
  显示微信分享和分享到朋友圈的组件
*/
export default {
  name: 'PublicShare',
  props:["shares"],
  data () {
    return {
      show:""
    }
  },
  mounted(){
    this.show = true
  },
  methods:{
    back(){
      this.show = false;
      //this.$emit("fas",false)
    },
    afterLeave(el,done){
      this.$emit("fas",false)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.publicShare{
  width: 750px;
  height: 100%;
  background: rgba(0,0,0,.5);
  position: fixed;
  left: 0;
  top:0;
  z-index: 100;
  .share{
    width: 750px;
    height: 314px;
    position: absolute;
    left: 0;
    bottom: 0;
    background: white;
    border-radius:12px 12px 0px 0px;
    ul{
      width: 100%;
      text-align: center;
      li:first-of-type{
        display: flex;
        justify-content: center;
        figure{
          width: 30%;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          padding: 26px;
          div{
            background: url("./img/椭圆1.png") no-repeat;
            background-size: 100%;
            box-sizing: border-box;
            width: 109px;
            height: 109px;
            margin: 0 auto;
            div{
              width: 65px;
              height: 65px;
              margin: 19px 0 0 20px;
              img{
                width: 100%;
                display: block;
              }
            }
          }
          figcaption{
            font-size:26px;
            font-family:PingFang-SC-Regular;
            font-weight:400;
            color:rgba(51,51,51,1);
            line-height:44px;
          }
        }
      }
      li:last-of-type{
        border-top: 1px solid lightgray;
        padding: 36px 0;
        align-items: center;
        font-size:32px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:44px;
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .4s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateY(314px);
  }
}
body{
  overflow: hidden;
}
</style>
