<template>
  <div class="public-text">
    <!-- 推荐、关注、附近的共有组件 -->
    <figure>
      <div class="Img">
        <img src="" alt="">
      </div>
      <div class="content">
        <p>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
        <div class="foot">
          <div class="user">
            <div class="userImg">
              <img src="" alt="">
            </div>
            <span>userName</span>
          </div>
          <div class="good">
            <div class="goodImg">
              <img src="" alt="">
            </div>
            <span>999</span>
          </div>
        </div>
      </div>
    </figure>
  </div>
</template>

<script>
/* 
  推荐，关注，附近三个组件共有的子组件
  主要用于渲染每个用户发布的内容
*/
export default {
  name: 'Public-text',
  data () {
    return {
      dat:""
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.public-text{
  margin: 9px 0;
  figure{
    width: 345px;
    border: 1px solid;
    .Img{
      width: 100%;
      height: 590px;
      img{
        width: 100%;
      }
    }
    .content{
      width: 305px;
      margin: 20px auto;
      p{
        word-break: break-all;
        font-size:28px;
        font-family:PingFang-SC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:39px;
      }
      .foot{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .user{
          display: flex;
          align-items: center;
          .userImg{
            width: 40px;
            border: 1px solid;
            img{
              width: 100%;
            }
          }
          span{
            width:120px;
            font-size:24px;
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(102,102,102,1);
            line-height:44px;
          }
        }
        .good{
          display: flex;
          .goodImg{
            width: 30px;
            border: 1px solid;
            img{
              width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
