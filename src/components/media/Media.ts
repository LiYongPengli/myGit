
import { AxiosResponse } from 'axios';
import { Component, Prop,Ref, Vue } from 'vue-property-decorator'
@Component
export default class MediaCom extends Vue{
    @Prop({}) search!:string;
    public mediaList:any[] = [];
    public mediaFollowList:any[] = [];

    public loading:boolean = true;
    public loadFollow:boolean = true;

    @Ref('list_wrap') readonly list_wrap!: HTMLElement;

    public created():void{
        this.getSubscriptions('media', 'sub', res => {
            console.log(res.data)
            this.mediaFollowList = res.data.data;
            this.loading = false;
            setTimeout(() => {
                let dom = this.list_wrap.children[0].children[0].children[0].children[0] as HTMLElement;
                console.log('初始化获取高度'+dom.offsetHeight);
                if (dom.offsetHeight >= 346) {
                    this.list_wrap.style.height = 346 + 'px';
                } else {
                    this.list_wrap.style.height = "auto";
                }
            }, 200)
        });
        this.getSubscriptions('media', 'unsub', res => {
            this.mediaList = res.data.data;
            this.loadFollow = false;
            this.mediaList.sort(function(a,b){
                return new Date(b.update_time).getTime() - new Date(a.update_time).getTime();
            })
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
            setTimeout(() => {
                let dom = this.list_wrap.children[0].children[0].children[0].children[0] as HTMLElement;
                if (dom.offsetHeight >= 346) {
                    this.list_wrap.style.height = 346 + 'px';
                } else {
                    this.list_wrap.style.height = "auto";
                }
            }, 200)
            this.getSubscriptions('media', 'unsub', res => {
                this.mediaList = res.data.data;
                this.mediaList.sort(function(a,b){
                    return new Date(b.update_time).getTime() - new Date(a.update_time).getTime();
                })
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
            setTimeout(() => {
                let dom = this.list_wrap.children[0].children[0].children[0].children[0] as HTMLElement;
                if (dom.offsetHeight >= 346) {
                    this.list_wrap.style.height = 346 + 'px';
                } else {
                    this.list_wrap.style.height = "auto";
                }
            }, 200)
            
        }).catch(err=>{
            console.log(err);
        })
    }

    //搜索匹配
    public showItem(item:any):boolean{
        let ch = /[\u4E00-\u9FA5]+/;
        if(!ch.test(item.name)){
            if(~item.name.toLocaleLowerCase().indexOf(this.search.toLocaleLowerCase())){
                return true;
            }
        }else{
            if(~item.name.indexOf(this.search)){
                return true;
            }
        }
        if(!ch.test(item.name_zh)){
            if(~item.name_zh.toLocaleLowerCase().indexOf(this.search.toLocaleLowerCase())){
                return true;
            }
        }else{
            if(~item.name_zh.indexOf(this.search)){
                return true;
            }
        }
        
        return false;
    }
}