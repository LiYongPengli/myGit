import { baseApi } from '@/axios/axios';
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class AddFriendsCom extends Vue{
    @Prop({}) visable!:number;
     //搜索好友关键字
     public keyword:string = "";
    public userlists:any[] = [];

     //搜索好友
     public searchFriends():void{
        this.axios
        .post(baseApi.api2+'/v1/cmd/', {
            cmd: 'search_user',
            paras: { keyword: this.keyword },
          }).then(res=>{
            this.userlists = res.data.data;
        }).catch(err=>{
            console.log(err);
        })
    }
}