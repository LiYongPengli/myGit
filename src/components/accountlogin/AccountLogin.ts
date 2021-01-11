import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import qs from 'qs'
@Component
export default class AccountLoginCom extends Vue {
    @Prop({}) account!:boolean;
    @Prop({}) bindAccount!:boolean;
    public remember_login: number = 0;
    //验证码错误提示消息
    public vc_err: string = "";
    //base64图片验证码
    public img_vc: string = "";
    //要提交的数据
    public form = {
        account: "",
        password: "",
        vc: "",
    };

    public account_rules = {
        account: [{ validator: this.initaccount, trigger: 'blur' }],
        password: [{ validator: this.initpassword, trigger: 'blur' }],
        vc: [{ validator: this.initvc, trigger: 'blur' }],
    }

    @Watch('form.account')
    public listenAccount(newVal:string,oldVal:string):void{
        let ch = /[\u4E00-\u9FA5]+/;
        let space = /(^\s+)|(\s+$)|\s+/g;
        if(ch.test(newVal)){
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

    @Watch('form.password')
    public listenPwd(newVal:string,oldVal:string):void{
        let space = /(^\s+)|(\s+$)|\s+/g;
        if(space.test(newVal)){
            this.form.password = oldVal;
            return;
        }
    }
    @Watch('form.vc')
    public listenVc(newVal:string,oldVal:string):void{
        let space = /(^\s+)|(\s+$)|\s+/g;
        if(space.test(newVal)){
            this.form.vc = oldVal;
            return;
        }
    }

    public created():void{
        this.getImgCode();
    }

    //账号校验
    private initaccount(rule: any, value: string, callback: any): void {
        if (!value) {
            callback(new Error('请输入账号!'));
            return;
        }
        callback();
    }

    //密码校验
    private initpassword(rule: any, value: string, callback: any): void {
        if (!value) {
            callback(new Error('请输入密码!'));
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
        callback();
    }

    //验证码校验
    private initvc(rule: any, value: string, callback: any): void {
        if (!value) {
            callback(new Error('请输入图片验证码!'));
            return;
        }
        if (value.length != 4) {
            callback(new Error('图片验证码错误'));
            return;
        }
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

    //账号登录表单验证
    private async init_account_form(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            (this.$refs['account_form'] as any).validate(async (valid: any) => {
                if (!valid) {
                    reject(new Error('validate error '+valid));
                    return;
                }
                try {
                    await this.axios.put('/v1/verify/img', qs.stringify({ vc: this.form.vc }));
                } catch (err) {
                    if (err.response.data.message == 'Verification code is uncorrect.') {
                        reject(new Error('图片验证码错误'))
                    }
                    this.getImgCode();
                    return;
                }
                resolve(true);
            })
        })
    }

    //账号登录
    public async toLogin(): Promise<void> {
        try {
            await this.init_account_form()
        } catch (err) {
            console.log(err.message)
            this.vc_err = "";
            if(err.message=='图片验证码错误'){
                this.vc_err = "";
                setTimeout(()=>{
                    this.vc_err = err.message;
                },100)
            }
            return;
        }
        try {
            let data = {
                account: this.form.account,
                password: this.form.password,
                remember: this.remember_login
            }
            let res = await this.axios.post('/v1/user/login/', qs.stringify(data));
            if (!res.data.status) {
                this.$message.error(res.data.msg);
                this.getImgCode();
                return;
            }
            this.$message.success('登录成功!');
            if (!res.data.data.wx_prompted) {
                this.$emit('update:account',false);
                this.$emit('update:bindAccount',true);
                return;
            }
            this.$router.push('/');
        } catch (err) {
            console.log(err);
        }
    }

    //去注册
    public toRegister(): void {
        this.$router.push('/register')
    }
}