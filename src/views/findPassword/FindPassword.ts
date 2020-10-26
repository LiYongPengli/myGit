import { Component, Vue, Watch } from 'vue-property-decorator'
import qs from 'qs'
import { baseApi } from '@/axios/axios';
@Component
export default class FindPasswordCom extends Vue {
    //是否经过验证
    private verified:boolean = false;
    public index:number = 0;
    public time: number = 59;
    public password:string = "";
    public surepassword:string = "";
    public show_vc_code:boolean = false;
    public send_code:boolean = false;
    //图片验证码的base64数据
    public img_vc:string = "";
    //存放图片验证码
    public img_vc_code:string = "";
    public phone_form = {
        tel:'',
        tel_vc:'',
        password:''
    }

    @Watch('phone_form.tel')
    listenPhoneChanged(newVal:string,oldVal:string):void{
        this.verified = false;
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

    //手机验证码确认
    private async phoneCodeSure(phoneNumber:string,vc:string):Promise<boolean>{
        try{
            let data = qs.stringify({
                tel:phoneNumber,
                vc:vc,
                type:2
            })
            let res = await this.axios.put(baseApi.api1+'/v1/verify/telphone',data);
            if(!res.data.status){
                this.$message.error(res.data.msg);
                return false;
            }
            return true;
        }catch(code_err){
            if (code_err.response.status == 401 && code_err.response.data.message) {
                if (code_err.response.data.message == 'Verification code is uncorrect.') {
                    this.$message.error('手机验证码有误');
                    return false;
                }
                if (code_err.response.data.message == 'Verification code is out of date.') {
                    this.$message.error('手机验证码已过期,请重新发送');
                    return false;
                }
            }
            if (code_err.response.status == 429) {
                this.$message.error('验证码已经发送,请一分钟后再试');
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
        if(!this.phone_form.tel){
            this.$message.error('请输入手机号!');
            return;
        }else if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone_form.tel))){
            this.$message.error('请输入正确的手机号!');
            return;
        }
        this.show_vc_code = true;
        await this.getImgCode();
    }
    //下一步
    public async next():Promise<void>{
        if(this.verified){
            this.index = 1;
            return;
        }
        if(!this.phone_form.tel){
            this.$message.error('请输入手机号!');
            return;
        }else if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone_form.tel))){
            this.$message.error('请输入正确的手机号!');
            return;
        }
        if(!this.phone_form.tel_vc){
            this.$message.error('请输入验证码');
            return;
        }
        if(await this.phoneCodeSure(this.phone_form.tel,this.phone_form.tel_vc)){
            this.index++;
            this.verified = true;
        }
    }
    //手机验证
    public phong_login():void{
        if(!this.phone_form.password){
            this.$message.error('请输入密码!');
            return;
        }
        if(this.phone_form.password.length<8){
            this.$message.error('密码长度最小为8位!');
            return;
        }
        if(!(/^[a-zA-Z0-9_]{0,}$/.test(this.phone_form.password))){
            this.$message.error('密码中不可有汉字或其他特殊字符');
            return;
        }
        if(!(/^(\d+[a-zA-Z]+|[a-zA-Z]+\d+)([0-9a-zA-Z]*)$/.test(this.phone_form.password))){
            this.$message.error('密码强度过低，必须同时包含字母和数字');
            return;
        }
        if(!this.surepassword){
            this.$message.error('请输入确认密码!');
            return;
        }
        if(this.phone_form.password!=this.surepassword){
            this.$message.error('两次输入密码不一致');
            return;
        }
        let data = {
            password:this.phone_form.password
        }
        this.axios.put(baseApi.api1+'/v1/user/account/resetpw',qs.stringify(data)).then(res=>{
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