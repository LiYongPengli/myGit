import { baseApi } from '@/axios/axios';
import { AxiosResponse } from 'axios';
import { Component,Prop,Vue } from 'vue-property-decorator'
import { Mutation } from 'vuex-class';
@Component
export default class EditChannelCom extends Vue{
    //频道列表
    @Prop({}) follow_channel!:any[];
    public channel:any[] = [];
    //是否显示频道编辑框
    @Mutation('setIndexChannelWindow') setEditChannel:any;

    public created():void{
        //获取频道列表
        this.getSubscriptions("channel", "unsub", (res) => {
            console.log(res.data);
            this.channel = res.data.data.subscriptions;
        });
    }

    //获取频道等列表
    public getSubscriptions(sub_type: string, sub_oper_type: string, call: (res: AxiosResponse<any>) => void): void {
        this.axios.get(baseApi.api2 + '/v1/user/sub/?sub_type=' + sub_type + '&sub_oper_type=' + sub_oper_type+'&limit=10').then(res => {
            call(res);
        }).catch(err => {
            console.log(err);
        })
    }

    
    //取消订阅频道
    public unfollow(item:any,index:number):void{
        this.axios.post(baseApi.api2+'/v1/user/sub/',{
            sub_id: item.sub_id,
            sub_type: 'channel',
            sub_oper_type: 'unsub',
          }).then(res=>{
              this.channel.push({
                name:item.name,
                sub_id:item.sub_id
            })
            this.follow_channel.splice(index,1);
          }).catch(err=>{
              console.log(err);
          })
    }

    //频道订阅
    public tofollow(item:any,index:number):void{
        this.axios.post(baseApi.api2+'/v1/user/sub/',{
            sub_id: item.sub_id,
            sub_type: 'channel',
            sub_oper_type: 'sub',
          }).then(res=>{
            this.follow_channel.push({
                name:item.name,
                sub_id:item.sub_id
            })
            this.channel.splice(index,1);
        }).catch(err=>{
            console.log(err);
        })
    }



    //编辑完成
    public toFinish():void{
        this.setEditChannel(false);
    }
}