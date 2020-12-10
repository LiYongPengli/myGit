import { baseApi } from '@/axios/axios';
import { AxiosResponse } from 'axios';
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class MediaCom extends Vue{
    public mediaList:any[] = [];
    public mediaFollowList:any[] = [];

    public loading:boolean = true;
    public loadFollow:boolean = true;

    public created():void{
        this.getSubscriptions('media', 'sub', res => {
            console.log(res.data)
            this.mediaFollowList = res.data.data;
            this.loading = false;
        });
        this.getSubscriptions('media', 'unsub', res => {
            this.mediaList = res.data.data;
            this.loadFollow = false;
        });
    }

    //获取频道等列表
    public getSubscriptions(sub_type: string, sub_oper_type: string, call: (res: AxiosResponse<any>) => void): void {
        this.axios.get(baseApi.api2 + '/v1/user/sub/?sub_type=' + sub_type + '&sub_oper_type=' + sub_oper_type + '&limit=0').then(res => {
            call(res);
        }).catch(err => {
            console.log(err);
        })
    }

    //取消关注
    public unsub(item:any,index:number):void{
        this.axios.post(baseApi.api2+'/v1/user/sub/',{
            sub_id: item.sub_id,
            sub_type: 'media',
            sub_oper_type: 'unsub',
        }).then(res=>{
            this.mediaList.push(item);
            this.mediaFollowList.splice(index,1);
        }).catch(err=>{
            console.log(err);
        })
    }

    //添加到关注
    public addFollow(item:any,index:number):void{
        this.axios.post(baseApi.api2+'/v1/user/sub/',{
            sub_id: item.sub_id,
            sub_type: 'media',
            sub_oper_type: 'sub',
        }).then(res=>{
            this.mediaFollowList.push(item);
            this.mediaList.splice(index,1);
        }).catch(err=>{
            console.log(err);
        })
    }
}