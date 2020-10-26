import { Component,Vue } from 'vue-property-decorator'
@Component
export default class UserPassWordCom extends Vue{
    public form = {
        oldpwd:'',
        newpwd:'',
        surenewpwd:''
    }
    public rules = {
        oldpwd:{ required: true, message: '请输入旧密码', trigger: 'blur' },
        newpwd:{ required: true, message: '请输入新密码', trigger: 'blur' },
        surenewpwd:{ required: true, message: '请输入确认密码', trigger: 'blur' },
    }

    private async init_form():Promise<boolean>{
        return new Promise((resolve,reject)=>{
            (this.$refs['form'] as any).validate((valid:any) => {
                if (valid) {
                  resolve(true);
                } else {
                  reject(false);
                }
              })
        })
    }

    //确认修改密码
    public async toEditPassword(){
        try{
            this.init_form();
        }catch(err){
            console.log(err);
        }
    }
}