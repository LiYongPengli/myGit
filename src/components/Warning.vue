<template>
<!-- 警告 -->
  <div class="warning">
      <div class="warning_wrap">
          <div class="top">
              <span class="title">{{title}}</span>
              <span @click="ext" class="el-icon-close"></span>
          </div>
          <div class="content">
              <div class="warning_ico">
                  <img v-if="icon=='warning'" src="../assets/img/warning.png" alt="">
                  <img v-if="icon=='headimg'" src="../assets/img/headimg.png" alt="">
              </div>
              <p>{{text}}</p>
          </div>
          <div class="footer">
              <el-button size="small" @click="sure" style="width:120px;" type="primary">确认</el-button>
              <el-button size="small" @click="ext" style="width:120px;margin-left:20px;">取消</el-button>
          </div>
      </div>
  </div>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator'
@Component
export default class Warning extends Vue{
    @Prop({default:'',type:String}) title!:string;
    @Prop({default:'',type:String}) text!:string;
    @Prop({default:'',type:String}) top!:string;
    @Prop({default:'warning',type:String}) icon!:string;

    @Emit('ext')
    public ext():boolean{
        return false;
    }

    @Emit('sure')
    public sure():boolean{
        return true;
    }
}
</script>

<style lang="scss" scoped>
.warning{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 200;
    background: rgba(0,0,0,0.5);
    &_wrap{
        width: 600px;
        margin: auto;
        background: #3a3a48;
        padding-bottom: 50px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        .top{
            height: 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 30px;
            border-bottom: 1px solid #4d4d5d;
            color: white;
            .title{
                font-size: 17px;
            }
            span:last-of-type{
                font-size: 20px;
                cursor: pointer;
            }
        }
        .content{
            .warning_ico{
                width: 50px;
                margin: auto;
                margin-top: 50px;
                img{
                    width: 100%;
                }
            }
            p{
                margin-top: 20px;
                font-size: 20px;
                color: white;
                text-align: center;
            }
        }
        .footer{
            margin-top: 60px;
            text-align: center;
        }
    }
}
</style>