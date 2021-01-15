import { Component, Vue, Watch } from 'vue-property-decorator'
import qs from 'qs'

@Component
export default class FindPasswordCom extends Vue {
    //是否经过验证
    private verified:boolean = false;
    public index:number = 0;
    public time: number = 59;
    public password:string = "";
    public show_vc_code:boolean = false;
    public send_code:boolean = false;
    public phoneerr:string = "";
    public vcerr:string = "";
    //手机号是否通过验证
    public is_init_phone: boolean = false;
    //图片验证码的base64数据
    public img_vc:string = "";
    //存放图片验证码
    public img_vc_code:string = "";
    public phone_form = {
        tel:'',
        tel_vc:''
    }
    public pwd_form = {
        password:'',
        surepassword:''
    }
    public phoneRules = {
        tel: [{ validator: this.inittel, trigger: 'blur' }],
    }

    public pwdRules = {
        password:[{ validator: this.initpassword, trigger: 'blur' }],
        surepassword:[{ validator: this.initsurepassword, trigger: 'blur' }],
    }

    @Watch('phone_form.tel')
    public listenTel(newVal:string,oldVal:string):void{
        this.verified = false;
        let num = /^[0-9]*$/;
        if(!num.test(newVal)){
            this.phone_form.tel = oldVal;
            return;
        }
    }
    @Watch('phone_form.tel_vc')
    public listenTelVc(newVal:string,oldVal:string):void{
        let space = /(^\s+)|(\s+$)|\s+/g;
        if(space.test(newVal)){
            this.phone_form.tel_vc = oldVal;
            return;
        }
    }

    //手机号校验
    private inittel(rule: any, value: string, callback: any): void {
        this.is_init_phone = false;
        if (!value) {
            callback(new Error('请输入手机号'));
            return;
        }
        if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(value)) {
            callback(new Error('手机号格式有误'));
            return;
        }
        this.is_init_phone = true;
        callback();
    }

    private initpassword(rule: any, value: string, callback: any):void{
        if(!value){
            callback(new Error('请输入密码'));
            return;
        }
        if(!(/^[a-zA-Z0-9_]{0,}$/.test(value))){
            callback(new Error('密码长度为8到16位且不可有汉字或特殊字符'));
            return;
        }
        if(value.length<8){
            callback(new Error('密码长度为8到16位且不可有汉字或特殊字符'));
            return;
        }
        if(value.length>16){
            callback(new Error('密码长度为8到16位且不可有汉字或特殊字符'));
            return;
        }
        if(!(/^(\d+[a-zA-Z]+|[a-zA-Z]+\d+)([0-9a-zA-Z]*)$/.test(value))){
            callback(new Error('密码强度过低，必须同时包含字母和数字'));
            return;
        }
        callback();
    }

    //确认密码校验
    private initsurepassword(rule: any, value: string, callback: any):void{
        if(value!=this.pwd_form.password){
            callback(new Error('两次密码输入不一致,请重新输入'));
            return;
        }
        callback();
    }

    //获取图片验证码
    private async getImgCode():Promise<void>{
        try{
            let res = await this.axios.get('/v1/verify/img');
            this.img_vc = res.data.data;
        }catch(err){
            console.log(err);
        }
    }
    //获取手机验证码
    private getPhoneCode(phoneNumber:string):void{
        this.axios.get('/v1/verify/telphone?tel='+phoneNumber).then(res=>{
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
            this.getPhoneCode(this.phone_form.tel);
        }
    }

    //图片验证码确认
    public async imgCodeSure(img_code:string): Promise<boolean> {
        if (!img_code) {
            this.$message.error('请输入图片验证码');
            return false;
        }
        try {
            await this.axios.put('/v1/verify/img', qs.stringify({ vc: img_code }),{headers:{'content-type': 'application/x-www-form-urlencoded'}});
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

    //手机验证码确认
    private async phoneCodeSure(phoneNumber:string,vc:string):Promise<boolean>{
        try{
            let data = qs.stringify({
                tel:phoneNumber,
                vc:vc,
                type:2
            })
            let res = await this.axios.put('/v1/verify/telphone',data,{headers:{'content-type': 'application/x-www-form-urlencoded'}});
            if(!res.data.status){
                this.vcerr = res.data.msg;
                return false;
            }
            return true;
        }catch(code_err){
            if (code_err.response.status == 401 && code_err.response.data.message) {
                if (code_err.response.data.message == 'Verification code is uncorrect.') {
                    this.vcerr = '手机验证码有误';
                    return false;
                }
                if (code_err.response.data.message == 'Verification code is out of date.') {
                    this.vcerr = '手机验证码已过期,请重新发送';
                    return false;
                }
            }
            if (code_err.response.status == 429) {
                this.vcerr = '验证码已经发送,请一分钟后再试';
                return false;
            }
            console.log(code_err);
            return false
        }
    }

    //点击按钮获取手机验证码
    public async get_code(): Promise<void> {
        if (this.send_code) {
            return;
        }
        if(!this.is_init_phone){
            if(!this.phone_form.tel){
                this.phoneerr = "请输入手机号";
            }
            return;
        }
        this.show_vc_code = true;
        await this.getImgCode();
    }

    private async init_phone_form(){
        return new Promise((resolve, reject) => {
            (this.$refs['phone_form'] as any).validate(async (valid: any) => {
                if (!valid) {
                    reject(new Error(''));
                    return;
                }
                if(!await this.phoneCodeSure(this.phone_form.tel, this.phone_form.tel_vc)){
                    reject(new Error(''));
                    return;
                }
                resolve('');
            })
        })
    }

    private async init_pwd_form(){
        return new Promise((resolve, reject) => {
            (this.$refs['pwdform'] as any).validate(async (valid: any) => {
                if (!valid) {
                    reject(new Error(''));
                    return;
                }
                resolve('');
            })
        })
    }
    //下一步
    public async next():Promise<void>{
        if(this.verified){
            (this.$refs['pwdform'] as any).resetFields();
            this.index = 1;
            return;
        }
        try{
            await this.init_phone_form()
        }catch(err){
            console.log(err);
            return;
        }
        this.vcerr = "";
        this.index++;
        this.verified = true;
    }
    //手机验证
    public async phong_login(){
        try{
            await this.init_pwd_form();
        }catch(err){
            console.log(err);
            return;
        }
        let data = {
            password:this.pwd_form.password
        }
        this.axios.put('/v1/user/account/resetpw',qs.stringify(data),{headers:{'content-type': 'application/x-www-form-urlencoded'}}).then(res=>{
            if(res.data.status==0){
                this.$message.error(res.data.msg);
                return;
            }
            console.log(res.data);
            this.$message.success('密码重置成功!');
            this.$router.push('/login');
        }).catch(err=>{
            if(err.response.status==403){
                this.$message.error(err.response.message);
            }
            console.log(err);
        })
    }
}