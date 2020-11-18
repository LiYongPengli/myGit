import { baseApi } from '@/axios/axios';
import { AxiosResponse } from 'axios';
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class CountryCom extends Vue{
    public country_list:any[] = [];
    public country_follow_list:any[] = [];
    // public countrylist=[
    //     {

    //     }
    // ];

    public deleteli():void{
        this.$el.remove()
        // console.log(this.$el.innerHTML)
    }
    public created():void{
        this.getList();
    }
    private getList():void{
        this.getSubscriptions('country','sub',res=>{
            console.log(res.data)
        });
        this.getSubscriptions('country','ussub',res=>{
            console.log(res.data)
        });
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