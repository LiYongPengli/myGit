import { baseApi } from '@/axios/axios';
import { Component,Vue } from 'vue-property-decorator'
import qs from 'qs'
@Component
export default class UserPassWordCom extends Vue{
    public form = {
        oldpwd:'',
        newpwd:'',
        surenewpwd:''
    }
    public rules = {
        oldpwd:{ required: true, message: '请输入旧密码', trigger: 'blur' },
        newpwd:[{ validator: this.initNewPwd, trigger: 'blur' }],
        surenewpwd:[{ validator: this.initSurePwd, trigger: 'blur' }],
    }

    /**
     * 验证新密码
     * @param rule 校验规则 
     * @param value 新密码
     * @param callback 回调函数
     */
    private initNewPwd(rule:any, value:string, callback:any):void{
        if(!value){
            callback(new Error('请输入新密码!'));
            return;
        }
        if(value.length<8){
            callback(new Error('密码长度最小为8位!'));
            return;
        }
        if(!(/^[a-zA-Z0-9_]{0,}$/.test(value))){
            callback(new Error('密码中不可有汉字或其他特殊字符'));
            return;
        }
        if(!(/^(\d+[a-zA-Z]+|[a-zA-Z]+\d+)([0-9a-zA-Z]*)$/.test(value))){
            callback(new Error('密码强度过低，必须同时包含字母和数字'));
            return;
        }
        callback();
    }

    /**
     * 验证确认密码
     * @param rule 校验规则 
     * @param value 新密码
     * @param callback 回调函数
     */
    private initSurePwd(rule:any, value:string, callback:any):void{
        if(!value){
            callback(new Error('请输入确认密码!'));
            return;
        }
        if(value!=this.form.newpwd){
            callback(new Error('两次输入密码不一致!'));
            return;
        }
        callback();
    }

    //最终表单验证
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
            await this.init_form();
        }catch(err){
            console.log(err);
            return;
        }
        try{
            let res = await this.axios.put(baseApi.api1+'/v1/user/account/resetpw',qs.stringify({old_password:this.form.oldpwd,password:this.form.newpwd}));
            if(!res.data.status){
                this.$message.error(res.data.msg);
                return;
            }
            this.$message.success('密码修改成功');
        }catch(err){
            console.log(err);
        }
    }
}