import { Component, Vue, Watch } from 'vue-property-decorator';
import { baseApi } from '@/axios/axios';
@Component
export default class LoginCom extends Vue {
    //微信登录需要的信息
    public wx_data: any = "";
    //是否显示账号登录相关组件
    public account: boolean = true;
    //显示手机登录
    public phoneLogin: boolean = false;
    //绑定微信号组件
    public bindAccount: boolean = false;
    //微信扫码登录
    public weiChatLogin: boolean = false;
    //绑定微信
    public bindWechat(): void {
        this.axios.post(baseApi.api1 + '/v1/user/wechat/').then(res => {
            this.wx_data = res.data.data;
            this.bindAccount = false;
            this.weiChatLogin = true;
        }).catch(err => { })

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
    //手机登录(导航切换)
    public toPhoneLogin(): void {
        this.phoneLogin = true;
        this.account = false;
        this.weiChatLogin = false;
    }
    
}