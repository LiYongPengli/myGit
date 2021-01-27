
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class MaybeKnowCom extends Vue {
    public userlists: any[] = []
    
    public inv_userInfo:any = "";
    
   

    public created(): void {
        this.getData();
    }

    private getData(): void {
        this.axios
            .post('/v1/cmd/', {
                cmd: 'people_you_may_know',
            }).then(res => {
                console.log(res.data);
                this.userlists = res.data.data;
            }).catch(err => {
                console.log(err);
            })
    }

    

    public toAdd(user: any): void {
        this.inv_userInfo = user;
        
    }

    //请求添加好友详情显示
    public showInvInfo(user:any):void{
        this.inv_userInfo = user;
    }
}