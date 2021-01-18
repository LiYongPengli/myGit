
import { Component, Vue, Watch } from 'vue-property-decorator'
import qs from 'qs'
@Component
export default class phoneLoginCom extends Vue {
    //验证码发送状态(正在发送为true)
    public send_code: boolean = false;
    //手机号错误提示
    public phoneerr: string = "";
    //验证码错误提示
    public vcerr: string = "";
    //手机号是否通过验证
    private is_init_phone: boolean = false;
    public show_vc_code: boolean = false;
    //base64图片验证码
    public img_vc: string = "";
    //存放图片验证码
    public img_vc_code: string = "";
    public time: number = 59;
    //手机号登录提交数据
    public phone_form = {
        tel: '',
        tel_vc: ''
    }

    public rules = {
        tel: [{ validator: this.inittel, trigger: 'blur' }],
        tel_vc: [{ required: true, message: '请输入手机验证码', trigger: 'blur' }]
    }

    @Watch('phone_form.tel')
    public listenTel(newVal:string,oldVal:string):void{
        let num = /^[0-9]*$/;
        if(!num.test(newVal)){
            this.phone_form.tel = oldVal;
            return;
        }
    }
    @Watch('phone_form.tel_vc')
    public listenTel_vc(newVal:string,oldVal:string):void{
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


    //获取图片验证码
    public async getImgCode(): Promise<void> {
        try {
            let res = await this.axios.get('/v1/verify/img?t=' + new Date().getTime());
            this.img_vc = res.data.data;
        } catch (err) {
            console.log(err);
        }
    }

    //点击确认校验图片验证码
    public async img_srue(): Promise<void> {
        try {
            await this.imgCodeSure(this.img_vc_code)
        } catch (err) {
            if (err == 'Verification code is uncorrect.') {
                this.$message.error('图片验证码错误');
            }
            this.getImgCode();
            console.log(err);
            return;
        }
        this.getPhoneCode(this.phone_form.tel);
    }

    //获取手机验证码
    private getPhoneCode(phoneNumber: string): void {
        this.img_vc_code = "";
        this.axios.get('/v1/verify/telphone?tel=' + phoneNumber).then(res => {
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
            console.log(err);
        })
    }

    //图片验证码确认
    public async imgCodeSure(img_code: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                await this.axios.put('/v1/verify/img', qs.stringify({ vc: img_code }),{headers:{'content-type': 'application/x-www-form-urlencoded'}});
                resolve(true)
            } catch (code_err) {
                reject(code_err.response.data.message);
            }
        })
    }

    //点击获取手机验证码
    public async get_code(): Promise<void> {
        if (this.send_code) {
            return;
        }
        if (!this.is_init_phone) {
            if (!this.phone_form.tel) {
                this.phoneerr = "请输入手机号";
            }
            return;
        }
        this.show_vc_code = true;
        await this.getImgCode();
    }

    //手机验证码确认
    private async phoneCodeSure(phoneNumber: string, vc: string): Promise<boolean> {
        let data = qs.stringify({
            tel: phoneNumber,
            vc: vc,
            type: 1
        })
        return new Promise(async (resolve, reject) => {
            try {
                let res = await this.axios.put('/v1/verify/telphone', data,{headers:{'content-type': 'application/x-www-form-urlencoded'}});
                if (!res.data.status) {
                    reject(new Error(res.data.msg))
                    return false;
                }
                resolve(true);
            } catch (code_err) {
                if (code_err.response.status == 401 && code_err.response.data.message) {
                    if (code_err.response.data.message == 'Verification code is uncorrect.') {
                        reject(new Error('手机验证码有误'))
                        return false;
                    }
                    if (code_err.response.data.message == 'Verification code is out of date.') {
                        reject(new Error('手机验证码已过期,请重新发送'))
                        return false;
                    }
                }
                if (code_err.response.status == 429) {
                    reject(new Error('验证码已经发送,请一分钟后再试'));
                    return false;
                }
                reject(new Error(''));
                throw code_err;
            }
        })
    }

    private init_form(): Promise<string> {
        return new Promise((resolve, reject) => {
            (this.$refs['phone_form'] as any).validate(async (valid: any) => {
                if (!valid) {
                    reject(new Error(''));
                    return;
                }
                try {
                    await this.phoneCodeSure(this.phone_form.tel, this.phone_form.tel_vc);
                } catch (phone_err) {
                    reject(new Error(phone_err.message));
                    return;
                }
                resolve('');
            })
        })
    }

    //手机号登录(发送请求)
    public async phong_login(): Promise<void> {
        try {
            await this.init_form();
        } catch (formerr) {
            if (formerr.message) {
                this.vcerr = "";
                setTimeout(() => {
                    this.vcerr = formerr.message;
                }, 100)
            }
            return;
        }
        try {
            let res = await this.axios.post('/v1/user/login/telphone', qs.stringify({ tel: this.phone_form.tel,remember:0 }),{headers:{'content-type': 'application/x-www-form-urlencoded'}});
            if (!res.data.status) {
                this.$message.error(res.data.msg);
                return;
            }
            this.$message.success('登录成功');
            this.$router.push('/');
        } catch (err) {
            console.log(err);
        }
    }
}