<template>
<!-- 警告 -->
  <div class="warning">
      <div class="warning_wrap" :style="{'margin-top':top}">
          <div class="top">
              <span class="title">{{title}}</span>
              <span @click="ext" class="el-icon-close"></span>
          </div>
          <div class="content">
              <div class="warning_ico">
                  <img src="../assets/img/warning.png" alt="">
              </div>
              <p>{{text}}</p>
          </div>
          <div class="footer">
              <el-button @click="sure" style="width:190px;" type="primary">确认</el-button>
              <el-button @click="ext" style="width:190px;">取消</el-button>
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
        width: 800px;
        margin: auto;
        background: #3a3a48;
        padding-bottom: 50px;
        .top{
            height: 80px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 50px;
            border-bottom: 1px solid #4d4d5d;
            .title{
                font-size: 20px;
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