import { AxiosResponse } from 'axios';
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class CountryCom extends Vue {
    @Prop({}) search!:string;
    public country_list: any[] = [];
    public country_follow_list: any[] = [];
    //加载中
    public loading:boolean = true;
    public loadFollow:boolean = true;

    //定义数据是否需要完全显示的属性
    public showAll: boolean = false;
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
            this.country_follow_list.sort((a,b)=>{
                return a.name.charCodeAt(0)-b.name.charCodeAt(0);
            })
            this.loading = false;
        });
        this.getSubscriptions('country', 'unsub', res => {
            this.country_list = res.data.data;
            this.country_list.sort((a,b)=>{
                return a.name.charCodeAt(0)-b.name.charCodeAt(0);
            })
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
            sub_type: 'country',
            sub_oper_type: 'unsub',
        }).then(res=>{
            this.country_list.push(item);
            this.country_follow_list.splice(index,1);
            this.country_list.sort((a,b)=>{
                return a.name.charCodeAt(0)-b.name.charCodeAt(0);
            })
        }).catch(err=>{
            console.log(err);
        })
    }

    //添加到关注
    public addFollow(item:any,index:number):void{
        this.axios.post('/v1/user/sub/',{
            sub_id: item.sub_id,
            sub_type: 'country',
            sub_oper_type: 'sub',
        }).then(res=>{
            this.country_follow_list.push(item);
            this.country_list.splice(index,1);
            this.country_follow_list.sort((a,b)=>{
                return a.name.charCodeAt(0)-b.name.charCodeAt(0);
            })
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