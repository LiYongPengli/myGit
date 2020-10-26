import { baseApi } from '@/axios/axios'
import { AxiosResponse } from 'axios';
import { Component,Vue } from 'vue-property-decorator'
@Component
export default class UserCom extends Vue{
    //国家
    public country:any[] = [];
    //人物
    public people:any[] = [];

    public created(): void {
        /* //获取频道列表
        this.getSubscriptions("channel", "sub", (res) => {
            console.log(res.data);
            this.channel = res.data.data.subscriptions;
        }); */
        /* //获取国家列表
        this.getSubscriptions("country", "unsub", (res) => {
            console.log(res.data);
            this.country = res.data.data.subscriptions;
        }); */
        /* //获取人物列表
        this.getSubscriptions("character", "unsub", (res) => {
            console.log(res.data);
            this.people = res.data.data.subscriptions;
        }); */
        /* //获取媒体列表
        this.getSubscriptions("media", "sub", (res) => {
            console.log(res.data);
            this.media = res.data.data.subscriptions;
        }); */
    }
    public add_follow():void{
        this.axios.post(baseApi.api2+'/v1/user/sub/',{
            sub_id: "5f8848a35e3d43b0e0fcc6f3",
            sub_type: "character",
            sub_oper_type: 'sub',
          })
    }

    //获取频道等列表
    public getSubscriptions(sub_type: string, sub_oper_type: string, call: (res: AxiosResponse<any>) => void): void {
        this.axios.get(baseApi.api2 + '/v1/user/sub/?sub_type=' + sub_type + '&sub_oper_type=' + sub_oper_type + '&limit=10').then(res => {
            call(res);
        }).catch(err => {
            console.log(err);
        })
    }
}