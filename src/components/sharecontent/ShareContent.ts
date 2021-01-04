
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class ShareContentCom extends Vue {
    @Prop({ default: '' }) type!: string;
    @Prop({}) content!: any;
    @Prop({default(){return []}}) names!: string[];
    
    
    public friend_list: any[] = [];
    public grop_list:any[] = [];
    public share_user: any = "";
    //分享类型(user/group)
    public share_type:string = "";  
    public shareWindow: boolean = false;

    public getDataList():void{
        this.getFriendList();
        this.getGropList();
    }
    //获取好友列表
    private getFriendList(): void {
        this.axios
            .post("/v1/cmd/", {
                cmd: "my_friends",
            })
            .then((res) => {
                this.friend_list = res.data.data;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //获取群组列表
    private getGropList():void{
        this.axios
        .post('/v1/cmd/', {
          cmd: 'room_ids',
        }).then(res=>{
            this.grop_list = res.data.data;
            console.log(res.data);
        })
    }
    //显示分享弹窗
    public setShare(user:{item:any,type:string}): void {
        this.share_user = user.item;
        this.share_type = user.type;
        this.shareWindow = true;
    }

   
}