import { baseApi } from '@/axios/axios';
import { Component,Vue } from 'vue-property-decorator'
import qs from 'qs'
@Component
export default class UserPassWordCom extends Vue{
    //忘记原密码
    public fogetpwd:boolean = false;
    //是否发送验证码
    public send_code:boolean = false;
    public img_vc_code:string = "";
    public show_vc_code:boolean = false;
    private is_send_img_code:boolean = false;
    private time:number = 59;
    //图片验证码数据
    public img_vc:string = "";
    public form = {
        oldpwd:'',
        newpwd:'',
        surenewpwd:''
    }
    public fogetForm = {
        tel:'',
        vc:'',
        newpwd:'',
        surenewpwd:''
    }
    public rules = {
        oldpwd:[{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        newpwd:[{ validator: this.initNewPwd, trigger: 'blur' }],
        surenewpwd:[{ validator: this.initSurePwd, trigger: 'blur' }],
    }
    public fogetRules = {
        tel:[{ validator: this.initTel, trigger: 'blur' }],
        vc:[{ required: true, message: '请输入验证码', trigger: 'blur' }],
        newpwd:[{ validator: this.initNewPwd, trigger: 'blur' }],
        surenewpwd:[{ validator: this.initSurePwd, trigger: 'blur' }]
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


    //验证手机号
    private initTel(rule:any, value:string, callback:any):void{
        if(!value){
            this.is_send_img_code = false;
            callback(new Error('请输入手机号!'));
            return;
        }else if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(value))){
            this.is_send_img_code = false;
            callback(new Error('手机号格式有误!'));
            return;
        }
        this.is_send_img_code = true;
        callback();
    
    }

    //获取图片验证码
    private async getImgCode():Promise<void>{
        try{
            let res = await this.axios.get(baseApi.api1+'/v1/verify/img');
            this.img_vc = res.data.data;
        }catch(err){
            console.log(err);
        }
    }
    //获取手机验证码
    private getPhoneCode(phoneNumber:string):void{
        this.axios.get(baseApi.api1+'/v1/verify/telphone?tel='+phoneNumber).then(res=>{
            console.log(res.data);
            this.send_code = true;
            this.show_vc_code = false;
            this.$message.success("验证码发送成功");
            let interval = setInterval(() => {
                if (--this.time <= 0) {
                    clearInterval(interval);
                    this.time = 59;
                    this.send_code = false;
                }
            }, 1000)
        }).catch(err=>{

        })
    }

    //点击确认校验图片验证码
    public async img_srue():Promise<void>{
        if(await this.imgCodeSure(this.img_vc_code)){
            this.getPhoneCode(this.fogetForm.tel);
        }
    }

    //图片验证码确认
    public async imgCodeSure(img_code:string): Promise<boolean> {
        if (!img_code) {
            this.$message.error('请输入图片验证码');
            return false;
        }
        try {
            await this.axios.put(baseApi.api1+'/v1/verify/img', qs.stringify({ vc: img_code }));
            return true;
        } catch (code_err) {
            if (code_err.response.data.message == 'Verification code is uncorrect.') {
                this.$message.error('图片验证码错误');
                this.getImgCode();
            }
            console.log(code_err)
            return false;
        }
    }


    //点击获取手机验证码
    public get_code():void{
        if(this.is_send_img_code&&!this.send_code){
            this.show_vc_code=true;
            this.getImgCode();
        }else{

        }
        
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

    //忘记密码表单验证
    private async init_foget_form():Promise<boolean>{
        return new Promise((resolve,reject)=>{
            (this.$refs['fogetform'] as any).validate((valid:any) => {
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
            if(!this.fogetpwd){
                await this.init_form();
            }else{
                await this.init_foget_form();
            }
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