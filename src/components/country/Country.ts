import { baseApi } from '@/axios/axios';
import { AxiosResponse } from 'axios';
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class CountryCom extends Vue {
    public country_list: any[] = [];
    public country_follow_list: any[] = [];
    //加载中
    public loading:boolean = true;
    public loadFollow:boolean = true;

    //定义数据是否需要完全显示的属性
    public showAll: boolean = false;
    
    public get showlist(): any {

        if (this.showAll == false) {
            let showlist: any = [];
            if (this.country_list.length > 10) {
                for (var i = 0; i < 10; i++) {
                    showlist.push(this.country_list[i])
                }
            }
            else {
                showlist = this.country_list
            }
            return showlist;
        }
        else {
            return this.country_list;
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

    public created(): void {
        this.getList();
    }
    private getList(): void {
        this.getSubscriptions('country', 'sub', res => {
            console.log(res.data)
            this.country_follow_list = res.data.data;
            this.loading = false;
        });
        this.getSubscriptions('country', 'unsub', res => {
            this.country_list = res.data.data;
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
            sub_type: 'country',
            sub_oper_type: 'unsub',
        }).then(res=>{
            this.country_list.push(item);
            this.country_follow_list.splice(index,1);
        }).catch(err=>{
            console.log(err);
        })
    }

    //添加到关注
    public addFollow(item:any,index:number):void{
        this.axios.post(baseApi.api2+'/v1/user/sub/',{
            sub_id: item.sub_id,
            sub_type: 'country',
            sub_oper_type: 'sub',
        }).then(res=>{
            this.country_follow_list.push(item);
            this.country_list.splice(index,1);
        }).catch(err=>{
            console.log(err);
        })
    }
}