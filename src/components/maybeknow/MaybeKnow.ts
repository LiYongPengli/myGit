
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class MaybeKnowCom extends Vue {
    public userlists: any[] = []
    public message: string = "";
    public inv_userInfo:any = "";
    public remark_name:string = "";
   

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

    public sendMessage(): void {
        this.axios
            .post('/v1/cmd/', {
                cmd: 'request_add_friend',
                paras: { 
                    user_id: this.inv_userInfo.user_id, 
                    message: this.message,
                    remark_name:this.remark_name,
                    r_id:'' 
                }
            }).then(res=>{
                this.$message.success('验证发送成功，等待对方通过!');
            }).catch(err=>{
                console.log(err);
            })
    }

    public toAdd(user: any): void {
        this.inv_userInfo = user;
        this.remark_name = "";
        this.message = "";
    }

    //请求添加好友详情显示
    public showInvInfo(user:any):void{
        this.remark_name = "";
        this.message = "";
        this.inv_userInfo = user;
    }
}