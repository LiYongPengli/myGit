
import { Component,Prop,Vue } from 'vue-property-decorator'
@Component
export default class UserUsersAccountCom extends Vue{
    @Prop({}) user!:any;
    public resetPwd:boolean = false;
    public resPwd:string = "";
    public changePhone:boolean = false;
    public phone:string = "";
    public success:boolean = false;
    public showWarinig:boolean = false;

    //重置密码
    public async resetPassword():Promise<void>{
        try{
            let res = await this.axios.post('/v1/cmd/', {cmd: 'generate_password'});
            this.resPwd = res.data.data.password;
        }catch(err){
            console.log(err);
        }
        try{
            let res = await this.axios.post('/v1/cmd/', {
              cmd: 'reset_password',
              paras: {
                user_id: this.user.user_id,
              },
            })
            this.resetPwd = true;
        }catch(err){
            console.log(err);
        }
    }

    //复制密码
    public copyPwd():void{
        let pwdDom = this.$refs.newPwd as HTMLElement;
        let range = document.createRange();
        getSelection()?.removeAllRanges();
        range.selectNode(pwdDom);
        getSelection()?.addRange(range);
        if(!document.execCommand("copy")){
            this.$message.error('复制失败请手动复制');
        }else{
            this.$message.success('密码已复制');
        }
        getSelection()?.removeAllRanges();
    }

    public ext():void{
        this.showWarinig = false;
    }

    public async sure(){
        await this.resetPassword();
        this.showWarinig = false;
    }

    //更换手机号
    public changePhones():void{
        if(!(/^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone))){
            this.$message.error('手机号格式有误');
            return;
        }
        this.axios
        .post('/v1/cmd/', {
          cmd: 'change_phone_number',
          paras: {
            user_id: this.user.user_id,
            phone: this.phone,
          }
        }).then(res=>{
            console.log(res.data);
            this.changePhone = false;
            this.success = true;
            this.user.phone_number = this.phone;
        }).catch(err=>{
            console.log(err);
        })
    }
}