<template>
  <div class="topic">
    <div class="header">
      <input type="text" placeholder="请输入要发表的标签" v-model="tabText" maxlength="15" >
      <div class="sure" @click="$router.back()">取消</div>
    </div>
    <div class="tablist" v-if="show">
      <div class="line" v-for="(v,i) in tabList" :key="i" @click="backRelease(i)">#{{v.tag_name}}</div>
    </div>
    <div class="tablist" v-else @click="backRelease()">
      <p >没有找到你的标签</p>
      <p>创建新的标签：{{tabText}}</p>
    </div>
  </div>
</template>
<script>
  import {Toast} from 'mint-ui'
  export default {
    name:'topic',
    data(){
      return{
        tabList:[],
        tabText:'',
        newText:'',
        show:true
      }
    },
    methods:{
      backRelease(index){
          var that=this;
          if(index>=0){
            let tagName=that.tabList[index].tag_name;
            let tag_id=that.tabList[index].tag_id
            this.$router.push( {name: 'release', params:{tab:tagName,tab_id:tag_id }})
          }else{
            this.$axios.post('/tags/tagAdd',{tag_name:this.tabText}).then(res=>{
              console.log(res)
              if(res.data.code==200){
                this.$router.push( {name: 'release', params: { tab: res.data.data.tag_name,tab_id:res.data.data.tag_id }})
              }

            })

          }
      }
    },
    created(){
      this.$axios.get('/tags/tagList').then(res=>{
        if(res.data.code==200){
          this.tabList=res.data.data;
        }
      })
    },
    watch:{
      tabText(val){
        if(val.length>0){
          if(val.length>=15){
            Toast({
              message:"标签不能超过15字",
              position:"middle",
              duration:"2000",
              className:'toast-s'
            })
            return
          }
          this.$axios.post('/tags/tagSelect',{keywords:val}).then(res=>{
            console.log(res)
            if(res.data.code==200){
              this.tabList=[]
              if(res.data.data){
                this.show=true
                this.tabList=res.data.data;
              }else{
                this.newText=val;
                this.show=false
              }
            }
          })
        }else{
          this.$axios.get('/tags/tagList').then(res=>{
            if(res.data.code==200){
              this.tabList=res.data.data;
            }
          })
        }

      }
    }
  }
</script>
<style lang="scss">
  .topic{
    height: 100%;
    width: 750px;
    background: #fff;
    position: absolute;
    left: 0;
    top: 0;
    overflow-x: hidden;
    z-index: 100;
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
    .tablist{
      font-size: 30px;
      padding: 0 40px;
      .line{
        padding: 10px 0px;
        border-bottom: 2px solid #f2f2f2;
      }
      p:nth-child(2){
        border-bottom: 2px solid #f2f2f2;
      }
    }
  }
</style>
