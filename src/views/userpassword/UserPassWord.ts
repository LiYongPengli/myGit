
import { Component, Vue, Watch } from 'vue-property-decorator'
import qs from 'qs'
import { State } from 'vuex-class';
@Component
export default class UserPassWordCom extends Vue {
    @State('user_message') user_message!:any;
    //忘记原密码
    public fogetpwd: boolean = false;
    //否展示手机号错误信息
    public showTelError:string = "";
    //是否发送验证码
    public send_code: boolean = false;
    public img_vc_code: string = "";
    public show_vc_code: boolean = false;
    private is_send_img_code: boolean = true;
    private time: number = 59;
    //图片验证码数据
    public img_vc: string = "";
    public form = {
        oldpwd: '',
        newpwd: '',
        surenewpwd: ''
    }
    public fogetForm = {
        tel: '',
        vc: '',
        newpwd: '',
        surenewpwd: ''
    }
    public rules = {
        oldpwd: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        newpwd: [{ validator: this.initNewPwd, trigger: 'blur' }],
        surenewpwd: [{ validator: this.initSurePwd, trigger: 'blur' }],
    }
    public fogetRules = {
        vc: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
        newpwd: [{ validator: this.initNewPwd, trigger: 'blur' }],
        surenewpwd: [{ validator: this.initSurePwd, trigger: 'blur' }]
    }

    public created():void{
        let phone = this.user_message.phone_number as string;
        this.fogetForm.tel = phone.slice(0,3)+'****'+phone.slice(7,11);
    }

    @Watch('fogetpwd')
    public fogetPwdChange(newVal: boolean, oldVal: boolean): void {
        (this.$refs['form'] as any).resetFields();
        (this.$refs['fogetform'] as any).resetFields();
    }

    @Watch('form.oldpwd')
    public formoldPwdChange(newVal: string, oldVal: string): void {
        let space = /(^\s+)|(\s+$)|\s+/g;
        if (space.test(newVal)) {
            this.form.oldpwd = oldVal;
            return;
        }
    }

    @Watch('form.newpwd')
    public formNewPwdChange(newVal: string, oldVal: string): void {
        let space = /(^\s+)|(\s+$)|\s+/g;
        if (space.test(newVal)) {
            this.form.newpwd = oldVal;
            return;
        }
    }
    @Watch('form.surenewpwd')
    public formNewPwdsChange(newVal: string, oldVal: string): void {
        let space = /(^\s+)|(\s+$)|\s+/g;
        if (space.test(newVal)) {
            this.form.surenewpwd = oldVal;
            return;
        }
    }
    @Watch('fogetForm.newpwd')
    public fogetformNewPwdChange(newVal: string, oldVal: string): void {
        let space = /(^\s+)|(\s+$)|\s+/g;
        if (space.test(newVal)) {
            this.fogetForm.newpwd = oldVal;
            return;
        }
    }
    @Watch('fogetForm.surenewpwd')
    public fogetformNewPwdsChange(newVal: string, oldVal: string): void {
        let space = /(^\s+)|(\s+$)|\s+/g;
        if (space.test(newVal)) {
            this.fogetForm.surenewpwd = oldVal;
            return;
        }
    }

    @Watch('fogetForm.vc')
    public listenTel(newVal:string,oldVal:string):void{
        let space = /(^\s+)|(\s+$)|\s+/g;
        if(space.test(newVal)){
            this.fogetForm.vc = oldVal;
            return;
        }
    }

    /**
     * 验证新密码
     * @param rule 校验规则 
     * @param value 新密码
     * @param callback 回调函数
     */
    private initNewPwd(rule: any, value: string, callback: any): void {
        if (!value) {
            callback(new Error('请输入新密码!'));
            return;
        }
        if (value.length < 8) {
            callback(new Error('密码长度最小为8位!'));
            return;
        }
        if (!(/^[a-zA-Z0-9_]{0,}$/.test(value))) {
            callback(new Error('密码中不可有汉字或其他特殊字符'));
            return;
        }
        if (!(/^(\d+[a-zA-Z]+|[a-zA-Z]+\d+)([0-9a-zA-Z]*)$/.test(value))) {
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
    private initSurePwd(rule: any, value: string, callback: any): void {
        if (!value) {
            callback(new Error('请输入确认密码!'));
            return;
        }
        if(this.fogetpwd){
            if(value!=this.fogetForm.newpwd){
                callback(new Error('两次输入密码不一致!'));
                return;
            }
        }else{
            if (value != this.form.newpwd) {
                callback(new Error('两次输入密码不一致!'));
                return;
            }
        }
        callback();
    }

    //获取图片验证码
    private async getImgCode(): Promise<void> {
        try {
            let res = await this.axios.get('/v1/verify/img');
            this.img_vc = res.data.data;
        } catch (err) {
            console.log(err);
        }
    }
    //获取手机验证码
    private getPhoneCode(phoneNumber: string): void {
        this.axios.get('/v1/verify/telphone?tel=' + phoneNumber).then(res => {
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
        }).catch(err => {

        })
    }

    //点击确认校验图片验证码
    public async img_srue(): Promise<void> {
        if (await this.imgCodeSure(this.img_vc_code)) {
            this.getPhoneCode(this.user_message.phone_number);
        }
    }

    //图片验证码确认
    public async imgCodeSure(img_code: string): Promise<boolean> {
        if (!img_code) {
            this.$message.error('请输入图片验证码');
            return false;
        }
        try {
            await this.axios.put('/v1/verify/img', qs.stringify({ vc: img_code }));
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
    public get_code(): void {
        if(!this.is_send_img_code){
            this.showTelError = "手机号格式有误!";
        }
        if (this.is_send_img_code && !this.send_code) {
            this.show_vc_code = true;
            this.getImgCode();
        } else {

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
            let res = await this.axios.put('/v1/verify/telphone',data);
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

    //最终表单验证
    private async init_form(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            (this.$refs['form'] as any).validate((valid: any) => {
                if (valid) {
                    resolve(true);
                } else {
                    reject(false);
                }
            })
        })
    }

    //忘记密码表单验证
    private async init_foget_form(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            (this.$refs['fogetform'] as any).validate((valid: any) => {
                if (valid) {
                    resolve(true);
                } else {
                    reject(false);
                }
            })
        })
    }
    //确认修改密码
    public async toEditPassword() {
        try {
            if (!this.fogetpwd) {
                await this.init_form();
            } else {
                await this.init_foget_form();
            }
        } catch (err) {
            console.log(err);
            return;
        }
        try {
            if (!this.fogetpwd) {
                await this.axios.post('/v1/cmd/', {
                    cmd: 'user_modify_pw_by_pw',
                    paras: { old_pw: this.form.oldpwd, new_pw: this.form.newpwd },
                })
                this.form.newpwd = "";
                this.form.oldpwd = "";
                this.form.surenewpwd = "";
                this.$message.success('密码修改成功');
            } else {
                let phone_vc = await this.phoneCodeSure(this.user_message.phone_number,this.fogetForm.vc);
                if(phone_vc){
                    let data = {
                        password:this.fogetForm.newpwd
                    }
                    this.axios.put('/v1/user/account/resetpw',qs.stringify(data)).then(res=>{
                        if(res.data.status==0){
                            this.$message.error(res.data.msg);
                            return;
                        }
                        this.$message.success('密码修改成功!');
                        this.fogetForm = {
                            tel:'',
                            vc:'',
                            newpwd:'',
                            surenewpwd:''
                        }
                    }).catch(err=>{
                        if(err.response.status==403){
                            this.$message.error(err.response.message);
                        }
                        console.log(err);
                    })
                }
            }

        } catch (err) {
            console.log(err);
        }
    }
}