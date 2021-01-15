
import { Component, Vue, Watch } from 'vue-property-decorator';
import qs from 'qs';
@Component
export default class BindAccountCom extends Vue {
    //base64图片验证码
    public img_vc: string = "";
    //验证码错误提示
    public vcerr: string = "";
    //要提交的数据
    public form = {
        account: "",
        password: "",
        vc: "",
    };

    public rules = {
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ validator: this.initpassword, trigger: 'blur' }]
    }

    @Watch('form.account')
    public listenAccount(newVal: string, oldVal: string): void {
        let ch = /[\u4E00-\u9FA5]+/;
        let space = /(^\s+)|(\s+$)|\s+/g;
        if (ch.test(newVal)) {
            this.form.account = oldVal;
            return;
        }
        if (space.test(newVal)) {
            this.form.account = oldVal;
            return;
        }
        if(newVal.length>30){
            this.form.account = oldVal;
            return;
        }
    }

    @Watch('form.password')
    public listenPwd(newVal: string, oldVal: string): void {
        let space = /(^\s+)|(\s+$)|\s+/g;
        if (space.test(newVal)) {
            this.form.password = oldVal;
            return;
        }
    }
    @Watch('form.vc')
    public listenVc(newVal: string, oldVal: string): void {
        let space = /(^\s+)|(\s+$)|\s+/g;
        if (space.test(newVal)) {
            this.form.vc = oldVal;
            return;
        }
    }

    public created(): void {
        this.getImgCode();
    }

    //密码校验
    private initpassword(rule: any, value: string, callback: any): void {
        if (!value) {
            callback(new Error('请输入密码!'));
            return;
        }
        if (value.length < 8) {
            callback(new Error('密码长度不可小于8位!'));
            return;
        }
        callback();
    }

    //获取图片验证码
    public async getImgCode(): Promise<void> {
        try {
            let res = await this.axios.get("/v1/verify/img");
            this.img_vc = res.data.data;
        } catch (err) {
            console.log(err);
        }
    }
    //图片验证码确认
    public async imgCodeSure(img_code: string): Promise<boolean> {
        try {
            await this.axios.put(
                "/v1/verify/img",
                qs.stringify({ vc: img_code }),
                {headers:{'content-type': 'application/x-www-form-urlencoded'}}
            );
            this.vcerr = ""
            return true;
        } catch (code_err) {
            if (code_err.response.data.message == "Verification code is uncorrect.") {
                setTimeout(() => {
                    this.vcerr = "图片验证码有误"
                }, 100)
                this.getImgCode();
            }
            console.log(code_err);
            return false;
        }
    }

    private init_form() {
        return new Promise((resolve, reject) => {
            (this.$refs['form'] as any).validate(async (val: any) => {
                if (!val) {
                    reject('');
                    return;
                }
                if (!await this.imgCodeSure(this.form.vc)) {
                    reject('');
                    return;
                }
                resolve('');
            })
        })
    }

    //账号登录
    public async toLogin(): Promise<void> {
        try {
            await this.init_form();
        } catch (formerr) {
            console.log(formerr);
            return;
        }
        try {
            let data = {
                account: this.form.account,
                password: this.form.password,
            };
            let res = await this.axios.post(
                "/v1/user/wechat/bind",
                qs.stringify(data),
                {headers:{'content-type': 'application/x-www-form-urlencoded'}}
            );
            if (res.data.data.status == 0) {
                this.$message.error(res.data.data.msg);
                this.getImgCode();
                return;
            }
            this.$message.success("登录成功!");
            //重置登录状态
            this.axios.put("/v1/user/wechat/");
            this.$router.push("/");
        } catch (err) {
            console.log(err);
        }
    }
}