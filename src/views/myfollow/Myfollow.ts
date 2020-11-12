import { baseApi } from '@/axios/axios';
import { AxiosResponse } from 'axios';
import { Component,Vue } from 'vue-property-decorator'
@Component
export default class MyFollowCom extends Vue{
    public country = [];
    public people = [];
    public media = [];

    public chooseNav:string = 'all';

    public created():void{
        //获取国家列表
        this.getSubscriptions("country", "sub", (res) => {
            this.country = res.data.data;
        });
        //获取人物列表
        this.getSubscriptions("character", "sub", (res) => {
            this.people = res.data.data;
        });
        //获取媒体列表
        this.getSubscriptions("media", "sub", (res) => {
            this.media = res.data.data;
        });
    }

    //获取频道等列表
    private getSubscriptions(sub_type: string, sub_oper_type: string, call: (res: AxiosResponse<any>) => void): void {
        this.axios.get(baseApi.api2 + '/v1/user/sub/?sub_type=' + sub_type + '&sub_oper_type=' + sub_oper_type + '&limit=10').then(res => {
            call(res);
        }).catch(err => {
            console.log(err);
        })
    }
}