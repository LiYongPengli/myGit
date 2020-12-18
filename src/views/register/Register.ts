import { Vue, Component, Watch } from 'vue-property-decorator';
import qs from 'qs';
import { baseApi } from '@/axios/axios';
@Component
export default class RegisterCom extends Vue {
    //图片验证码的base64数据
    public img_vc:string = "";
    //存放图片验证码
    public img_vc_code:string = "";
    public show_vc_code:boolean = false;
    //手机错误验证信息
    public phoneerr:string="";
    //验证码错误提示
    public vcerr:string = "";
    //是否可以获取验证码
    public isgetCode:boolean = false;
    public surepassword: string = "";
    //验证码发送状态(正在发送为true)
    public send_code: boolean = false;
    public time: number = 59;
    public form = {
        account: '',
        nickname: '',
        password: '',
        surepassword:'',
        tel: '',
        tel_vc: ''
    }
    public rules = {
        account:[{ required: true, message: '请输入账号', trigger: 'blur' }],
        nickname:[{ required: true, message: '请输入昵称', trigger: 'blur' }],
        password:[{ validator: this.initpassword, trigger: 'blur' }],
        surepassword:[{ validator: this.initsurepassword, trigger: 'blur' }],
        tel:[{ validator: this.inittel, trigger: 'blur' }]
    }

    @Watch('form.account')
    public listenAccount(newVal:string,oldVal:string):void{
        let space = /(^\s+)|(\s+$)|\s+/g;
        if(!/^[a-zA-Z0-9_]{0,}$/.test(newVal)){
            this.form.account = oldVal;
            return;
        }
        if(space.test(newVal)){
            this.form.account = oldVal;
            return;
        }
        if(newVal.length>30){
            this.form.account = oldVal;
            return;
        }
    }
    @Watch('form.nickname')
    public listenNickname(newVal:string,oldVal:string):void{
        this.form.nickname = newVal.trim();
        if(newVal.length>10){
            this.form.nickname = oldVal;
        }
    }

    @Watch('form.tel')
    public listenTel(newVal:string,oldVal:string):void{
        //let space = /(^\s+)|(\s+$)|\s+/g;
        let num = /^[0-9]*$/;
        if(!num.test(newVal)){
            this.form.tel = oldVal;
            return;
        }
    }

    //密码校验
    private initpassword(rule: any, value: string, callback: any):void{
        if(!value){
            callback(new Error('请输入密码'));
            return;
        }
        if(!(/^[a-zA-Z0-9_]{0,}$/.test(value))){
            callback(new Error('密码长度为8到16位且不可有汉字或其他特殊字符'));
            return;
        }
        if(value.length<8){
            callback(new Error('密码长度为8到16位且不可有汉字或其他特殊字符'));
            return;
        }
        if(value.length>16){
            callback(new Error('密码长度为8到16位且不可有汉字或其他特殊字符'));
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
        if(value!=this.form.password){
            callback(new Error('两次密码输入不一致,请重新输入'));
            return;
        }
        callback();
    }

    //手机号校验
    private inittel(rule: any, value: string, callback: any):void{
        this.isgetCode = false;
        if(!value){
            callback(new Error('请输入手机号'));
            return;
        }
        if(!/^1(3|4|5|6|7|8|9)\d{9}$/.test(value)){
            callback(new Error('手机号格式有误'))
            return;
        }
        this.isgetCode = true;
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

    //手机验证码确认
    private async phoneCodeSure(phoneNumber:string,vc:string):Promise<boolean>{
        try{
            let data = qs.stringify({
                tel:phoneNumber,
                vc:vc,
                type:1
            })
            let res = await this.axios.put(baseApi.api1+'/v1/verify/telphone',data);
            if(!res.data.status){
                this.vcerr = res.data.msg
                return false;
            }
            return true;
        }catch(code_err){
            if (code_err.response.status == 401 && code_err.response.data.message) {
                if (code_err.response.data.message == 'Verification code is uncorrect.') {
                    this.vcerr='手机验证码有误';
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

    //点击获取手机验证码
    public async get_code(): Promise<void> {
        if (this.send_code) {
            return;
        }
        if (!this.form.tel) {
            this.phoneerr = "请输入手机号"
            return;
        }
        if(!this.isgetCode){
            return;
        }
        this.show_vc_code = true;
        await this.getImgCode();
    }

    //点击确认校验图片验证码
    public async img_srue():Promise<void>{
        if(await this.imgCodeSure(this.img_vc_code)){
            this.getPhoneCode(this.form.tel);
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

    private async init_form():Promise<string>{
        return new Promise((resolve,reject)=>{
            (this.$refs['form'] as any).validate(async(val:any)=>{
                if(!val){
                    reject('');
                    return;
                }
                if(!await this.phoneCodeSure(this.form.tel,this.form.tel_vc)){
                    reject('');
                    return;
                }
                resolve('');
            })
        })
    }

    //去注册
    public async toRegister(){
        try{
            await this.init_form();
        }catch(formerr){
            console.log(formerr);
            return;
        }
        let data = {
            account:this.form.account,
            password:this.form.password,
            tel:this.form.tel,
            nickname:this.form.nickname
        }
        this.axios.post(baseApi.api1+'/v1/user/account/signup',qs.stringify(data)).then(res=>{
            if(res.data.status==0){
                this.$message.error(res.data.msg);
                return;
            }
            console.log(res.data);
            this.$message.success('注册成功!');
            this.$router.push('/login');
        }).catch(err=>{
            console.log(err);
        })
    }
}