<template>
  <div class="wxlogin">
      <iframe scrolling="no" frameBorder="0" allowTransparency="true" :src="url"></iframe>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, } from 'vue-property-decorator';
@Component
export default class WxLogin extends Vue {
    @Prop({default:false,type:Boolean}) self_redirect!:boolean; 
    @Prop({default:'LoginBox',type:String}) id!:string; 
    @Prop({}) appid!:string; 
    @Prop({}) scope!:string; 
    @Prop({}) redirect_uri!:string; 
    @Prop({}) state!:string; 
    @Prop({default:'black',type:String}) styles!:string; 
    @Prop({default:'',type:String}) href!:string; 
    private url:string = "";
    private created():void{
        let url = 'https://open.weixin.qq.com/connect/qrconnect?appid='+ this.appid
              + '&id='+this.id
              + '&scope=' + this.scope
              + '&redirect_uri='  + this.redirect_uri
              + '&state=' + this.state
              + '&self_redirect=' + this.self_redirect
              + '&style=' + this.styles
              + '&href=' + this.href;
        this.url = url;
    }
}
</script>

<style lang="scss" scoped>
.wxlogin{
iframe{
    width: 100%;
    height: 100%;
}
}
</style>