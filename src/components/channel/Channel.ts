import { baseApi } from '@/axios/axios';
import { AxiosResponse } from 'axios';
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class ChannelCom extends Vue{
    public channelList:any[] = [];
    public channelFollowList:any[] = [];

    //加载中
    public loading:boolean = true;
    public loadFollow:boolean = true;

    //定义数据是否需要完全显示的属性
    public showAll: boolean = false;
    
    public get showlist(): any {

        if (this.showAll == false) {
            let showlist: any = [];
            if (this.channelList.length > 10) {
                for (var i = 0; i < 10; i++) {
                    showlist.push(this.channelList[i])
                }
            }
            else {
                showlist = this.channelList
            }
            return showlist;
        }
        else {
            return this.channelList;
        }
    }

    public get word(): any {
        if (this.showAll == false) {
            return '展开'
        }
        else {
            return '收起'
        }
    }

    public created():void{
        this.getSubscriptions('channel', 'sub', res => {
            console.log(res.data)
            this.channelFollowList = res.data.data;
            this.loading = false;
        });
        this.getSubscriptions('channel', 'unsub', res => {
            this.channelList = res.data.data;
            this.loadFollow = false;
        });
    }

    //获取频道等列表
    public getSubscriptions(sub_type: string, sub_oper_type: string, call: (res: AxiosResponse<any>) => void,start:number=0): void {
        this.axios.get(baseApi.api2 + '/v1/user/sub/?sub_type=' + sub_type + '&sub_oper_type=' + sub_oper_type + '&limit=0&start='+start).then(res => {
            call(res);
        }).catch(err => {
            console.log(err);
        })
    }


    //取消关注
    public unsub(item:any,index:number):void{
        this.axios.post(baseApi.api2+'/v1/user/sub/',{
            sub_id: item.sub_id,
            sub_type: 'channel',
            sub_oper_type: 'unsub',
        }).then(res=>{
            this.channelList.push(item);
            this.channelFollowList.splice(index,1);
        }).catch(err=>{
            console.log(err);
        })
    }

    //添加到关注
    public addFollow(item:any,index:number):void{
        this.axios.post(baseApi.api2+'/v1/user/sub/',{
            sub_id: item.sub_id,
            sub_type: 'channel',
            sub_oper_type: 'sub',
        }).then(res=>{
            this.channelFollowList.push(item);
            this.channelList.splice(index,1);
        }).catch(err=>{
            console.log(err);
        })
    }
}