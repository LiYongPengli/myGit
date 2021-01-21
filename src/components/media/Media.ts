
import { AxiosResponse } from 'axios';
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class MediaCom extends Vue{
    @Prop({}) search!:string;
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
    public getSubscriptions(sub_type: string, sub_oper_type: string, call: (res: AxiosResponse<any>) => void,start:number=0): void {
        this.axios.get('/v1/user/sub/?sub_type=' + sub_type + '&sub_oper_type=' + sub_oper_type + '&limit=0&start='+start).then(res => {
            call(res);
        }).catch(err => {
            console.log(err);
        })
    }

    //取消关注
    public unsub(item:any,index:number):void{
        this.axios.post('/v1/user/sub/',{
            sub_id: item.sub_id,
            sub_type: 'media',
            sub_oper_type: 'unsub',
        }).then(res=>{
            this.mediaFollowList.splice(index,1);
            this.getSubscriptions('media', 'unsub', res => {
                this.mediaList = res.data.data;
            });
        }).catch(err=>{
            console.log(err);
        })
    }

    //添加到关注
    public addFollow(item:any,index:number):void{
        this.axios.post('/v1/user/sub/',{
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

    //搜索匹配
    public showItem(name:string):boolean{
        let ch = /[\u4E00-\u9FA5]+/;
        if(!ch.test(name)){
            if(~name.toLocaleLowerCase().indexOf(this.search.toLocaleLowerCase())){
                return true;
            }
        }else{
            if(~name.indexOf(this.search)){
                return true;
            }
        }
        
        return false;
    }
}