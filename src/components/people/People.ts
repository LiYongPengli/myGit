import { baseApi } from '@/axios/axios';
import { AxiosResponse } from 'axios';
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class PeopleCom extends Vue {
    public characterList:any[] = [];
    public characterFollowList:any[] = [];

    //搜索更多人物标志
    public searchpeople:boolean=false;

    //加载中
    public loading:boolean = true;
    public loadFollow:boolean = true;

    public created():void{
        this.getSubscriptions('character', 'sub', res => {
            console.log(res.data)
            this.characterFollowList = res.data.data;
            this.loading = false;
        });
        this.getSubscriptions('character', 'unsub', res => {
            this.characterList = res.data.data;
            this.loadFollow = false;
        });
    }

    //获取频道等列表
    public getSubscriptions(sub_type: string, sub_oper_type: string, call: (res: AxiosResponse<any>) => void,start:number=0): void {
        this.axios.get(baseApi.api2 + '/v1/user/sub/?sub_type=' + sub_type + '&sub_oper_type=' + sub_oper_type + '&limit=100&start='+start).then(res => {
            call(res);
        }).catch(err => {
            console.log(err);
        })
    }


    //取消关注
    public unsub(item:any,index:number):void{
        this.axios.post(baseApi.api2+'/v1/user/sub/',{
            sub_id: item.sub_id,
            sub_type: 'character',
            sub_oper_type: 'unsub',
        }).then(res=>{
            this.characterList.push(item);
            this.characterFollowList.splice(index,1);
        }).catch(err=>{
            console.log(err);
        })
    }

    //添加到关注
    public addFollow(item:any,index:number):void{
        this.axios.post(baseApi.api2+'/v1/user/sub/',{
            sub_id: item.sub_id,
            sub_type: 'character',
            sub_oper_type: 'sub',
        }).then(res=>{
            this.characterFollowList.push(item);
            this.characterList.splice(index,1);
        }).catch(err=>{
            console.log(err);
        })
    }
}