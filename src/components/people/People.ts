
import { AxiosResponse } from 'axios';
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class PeopleCom extends Vue {
    @Prop({}) search!:string;
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
        this.axios.post('/v1/user/sub/',{
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

    public noPeopleFollow(item:any):void{
        this.characterFollowList.push(item);
    }

    //图片加载失败
    public imgError(type:string,index:number):void{
        switch(type){
            case 'f':
                this.$set(this.characterFollowList[index],'error',true);
                break;
            case 'u':
                this.$set(this.characterList[index],'error',true);
                break;
        }
    }

    //搜索匹配
    public showItem(item:any):boolean{
        console.log(item);
        let ch = /[\u4E00-\u9FA5]+/;
        let flag = false;
        if(!ch.test(item.name)){
            if(~item.name.toLocaleLowerCase().indexOf(this.search.toLocaleLowerCase())){
                flag = true;
            }
        }else{
            if(~item.name.indexOf(this.search)){
                flag = true;
            }
        }

        if(!ch.test(item.description)){
            if(~item.description.toLocaleLowerCase().indexOf(this.search.toLocaleLowerCase())){
                flag = true;
            }
        }else{
            if(~item.description.indexOf(this.search)){
                flag = true;
            }
        }
        
        return flag;
    }
}