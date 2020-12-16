import { Component, Vue, Watch } from 'vue-property-decorator';
import qs from 'qs';
import { baseApi } from '@/axios/axios';
@Component
export default class LoginCom extends Vue {
    public remember_login: number = 0;
    //微信登录需要的信息
    public wx_data: any = "";
    //base64图片验证码
    public img_vc: string = "";
    //存放图片验证码
    public img_vc_code: string = "";
    //是否显示账号登录相关组件
    public account: boolean = true;
    //显示手机登录
    public phoneLogin: boolean = false;
    //绑定微信号组件
    public bindAccount: boolean = false;
    //微信扫码登录
    public weiChatLogin: boolean = false;
    //是否显示密码
    public show_password: boolean = false;
    //验证码发送状态(正在发送为true)
    public send_code: boolean = false;
    public time: number = 59;
    public show_vc_code: boolean = false;
    //要提交的数据
    public form = {
        account: "",
        password: "",
        vc: "",
    };
    //手机号登录提交数据
    public phone_form = {
        tel: '',
        tel_vc: ''
    }

    @Watch('account')
    ListenAccount(newVal: boolean, oldVal: boolean): void {
        if (newVal) {
            this.getImgCode();
        }
    }


    //获取图片验证码
    public async getImgCode(): Promise<void> {
        try {
            let res = await this.axios.get(baseApi.api1 + '/v1/verify/img?t='+new Date().getTime());
            this.img_vc = res.data.data;
        } catch (err) {
            console.log(err);
        }
    }
    //获取手机验证码
    private getPhoneCode(phoneNumber: string): void {
        this.axios.get(baseApi.api1 + '/v1/verify/telphone?tel=' + phoneNumber).then(res => {
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

    //手机验证码确认
    private async phoneCodeSure(phoneNumber: string, vc: string): Promise<boolean> {
        try {
            let data = qs.stringify({
                tel: phoneNumber,
                vc: vc,
                type: 1
            })
            let res = await this.axios.put(baseApi.api1 + '/v1/verify/telphone', data);
            if (!res.data.status) {
                this.$message.error(res.data.msg);
                return false;
            }
            return true;
        } catch (code_err) {
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
    //点击确认校验图片验证码
    public async img_srue(): Promise<void> {
        if (await this.imgCodeSure(this.img_vc_code)) {
            this.getPhoneCode(this.phone_form.tel);
        }
    }

    //图片验证码确认
    public async imgCodeSure(img_code: string): Promise<boolean> {
        if (!img_code) {
            this.$message.error('请输入图片验证码');
            return false;
        }
        try {
            await this.axios.put(baseApi.api1 + '/v1/verify/img', qs.stringify({ vc: img_code }));
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
    public async get_code(): Promise<void> {
        if (this.send_code) {
            return;
        }
        if (!this.phone_form.tel) {
            this.$message.error('请输入手机号!');
            return;
        } else if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone_form.tel))) {
            this.$message.error('请输入正确的手机号!');
            return;
        }
        this.show_vc_code = true;
        await this.getImgCode();
    }

    //绑定微信
    public bindWechat(): void {
        this.axios.post(baseApi.api1 + '/v1/user/wechat/').then(res => {
            this.wx_data = res.data.data;
            this.bindAccount = false;
            this.weiChatLogin = true;
        }).catch(err => { })

    }
    //账号登录
    public async toLogin(): Promise<void> {
        if (!this.form.account) {
            this.$message.error('请输入用户名');
            return;
        }
        if (!this.form.password) {
            this.$message.error('请输入密码');
            return;
        }
        if (this.form.password.length < 8) {
            this.$message.error('密码长度不可小于8位');
            return;
        }
        if (!this.form.vc) {
            this.$message.error('请输入验证码');
            return;
        }
        if (await this.imgCodeSure(this.form.vc)) {
            try {
                let data = {
                    account: this.form.account,
                    password: this.form.password,
                    remember:this.remember_login
                }
                let res = await this.axios.post(baseApi.api1 + '/v1/user/login/', qs.stringify(data));
                if (!res.data.status) {
                    this.$message.error(res.data.msg);
                    return;
                }
                this.$message.success('登录成功!');
                if (!res.data.data.wx_prompted) {
                    this.account = false;
                    this.bindAccount = true;
                    return;
                }
                this.$router.push('/');
            } catch (err) {
                console.log(err);
            }
        }
    }
    //不绑定微信直接账号登录
    public noBindWeichat(): void {
        this.axios.put(baseApi.api1 + '/v1/user/wechat/').then(res => {
            this.bindAccount = false;
            this.$router.push('/');
        }).catch(err => {
            console.log(err);
        })
    }
    //微信登录(导航切换)
    public toWeiChatLogin(): void {
        this.axios.post(baseApi.api1 + '/v1/user/wechat/').then(res => {
            this.wx_data = res.data.data;
            this.weiChatLogin = true;
            this.account = false;
            this.phoneLogin = false;
        }).catch(err => { })

    }
    //账号登录(导航切换)
    public toAccountLogin(): void {
        this.account = true;
        this.weiChatLogin = false;
        this.phoneLogin = false;
    }
    //去注册
    public toRegister(): void {
        this.$router.push('/register')
    }

    //手机登录(导航切换)
    public toPhoneLogin(): void {
        this.phoneLogin = true;
        this.account = false;
        this.weiChatLogin = false;
    }
    //手机号登录(发送请求)
    public async phong_login(): Promise<void> {
        if (!this.phone_form.tel) {
            this.$message.error('请输入手机号');
            return;
        }
        if (!this.phone_form.tel_vc) {
            this.$message.error('请输入手机验证码');
            return;
        }
        if (!await this.phoneCodeSure(this.phone_form.tel, this.phone_form.tel_vc)) {
            return;
        }
        try {
            let res = await this.axios.post(baseApi.api1 + '/v1/user/login/telphone', qs.stringify({ tel: this.phone_form.tel,remember:this.remember_login }));
            if (!res.data.status) {
                this.$message.success(res.data.msg);
                return;
            }
            this.$message.success('登录成功');
            this.$router.push('/');
        } catch (err) {
            console.log(err);
        }
    }
}