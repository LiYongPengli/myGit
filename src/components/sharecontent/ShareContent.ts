import { baseApi } from '@/axios/axios';
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class ShareContentCom extends Vue {
    @Prop({ default: '' }) type!: string;
    @Prop({}) content!: any;
    @Prop({default(){return []}}) names!: string[];
    
    
    public friend_list: any[] = [];
    public share_user: any = "";
    public shareWindow: boolean = false;

    public getFriendList(): void {
        this.axios
            .post(baseApi.api2 + "/v1/cmd/", {
                cmd: "my_friends",
            })
            .then((res) => {
                this.friend_list = res.data.data;
                console.log(this.friend_list);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    //显示分享弹窗
    public setShare(user: any): void {
        this.share_user = user;
        this.shareWindow = true;
    }

   
}