import { baseApi } from '@/axios/axios';
import { Component, Vue } from 'vue-property-decorator'
import { use } from 'vue/types/umd';
@Component
export default class MaybeKnowCom extends Vue {
    public dialogVisible: boolean = false;
    public userlists: any[] = []
    public sendUser: any = "";
    public message: string = "";

    public created(): void {
        this.getData();
    }

    private getData(): void {
        this.axios
            .post(baseApi.api2 + '/v1/cmd/', {
                cmd: 'people_you_may_know',
            }).then(res => {
                console.log(res.data);
                this.userlists = res.data.data;
            }).catch(err => {
                console.log(err);
            })
    }

    public sendMessage(): void {
        if (!this.message) {
            this.$message.error('请输入验证消息');
            return;
        }
        this.axios
            .post(baseApi.api2+'/v1/cmd/', {
                cmd: 'request_add_friend',
                paras: { user_id: this.sendUser.user_id, message: this.message },
            }).then(res=>{
                this.$message.success('验证消息发送成功');
                this.dialogVisible = false;
            }).catch(err=>{
                console.log(err);
            })
    }

    public toAdd(user: any): void {
        this.dialogVisible = true;
        this.sendUser = user;
    }
}