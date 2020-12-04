import { baseApi } from '@/axios/axios';
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import { Mutation } from 'vuex-class';
@Component
export default class AddFriendsCom extends Vue {
    @Prop({}) visable!: number;

    public remark: boolean = false;
    public userInfo: any = "";
    public inv_userInfo: any = "";
    public remark_name: string = "";
    public inv_message: string = "";
    public cardList: any = "";
    //搜索好友关键字
    public keyword: string = "";
    public userlists: any[] = [];

    @Mutation("setTopicUrl") setTopicUrl: any;
    @Mutation("setTopicStatus") setTopicStatus: any;


    //显示用户详细信息
    public showInfo(user: any): void {

        this.remark_name = user.remark_name;
        this.inv_message = "";

        if (user.is_friend == true) {
            this.inv_userInfo = "";
            this.userInfo = user;
        }
        else {
            this.inv_userInfo=user;
            this.userInfo="";
        }
    }

    //搜索好友
    public searchFriends(): void {
        this.axios
            .post(baseApi.api2 + '/v1/cmd/', {
                cmd: 'search_user',
                paras: { keyword: this.keyword },
            }).then(res => {
                this.userlists = res.data.data;
            }).catch(err => {
                console.log(err);
            })
    }
    //显示分享名片
    public showShare(index: number): void {
        this.$set(this.userlists[index], 'share', true);
        this.$set(this.userlists[index], 'send', true);
    }

    //隐藏分享名片
    public hideShare(index: number): void {
        this.$delete(this.userlists[index], 'share')
        this.$delete(this.userlists[index], 'send')
    }

    //发送消息
    public sendMessage(user: any): void {
        this.axios
            .post(baseApi.api2 + '/v1/cmd/', {
                cmd: 'im_create',
                paras: { account: user.account }
            }).then(res => {
                console.log(res.data)
                this.setTopicUrl("http://zlbxxcj.bjceis.com/im/direct/" + res.data.data.room.rid)
                this.setTopicStatus(1);
            }).catch(err => {
                console.log(err);
            })
    }

    //请求添加好友详情显示
    public showInvInfo(user: any, key: string): void {
        this.userInfo = "";
        this.remark_name = "";
        this.inv_message = "";
        this.inv_userInfo = user;
        this.inv_userInfo.id = key;
       
    }
    //添加到通讯录
    public async toAddMaiList(){
        try{
            await this.axios.post(baseApi.api2+'/v1/cmd/', {
                cmd: 'request_add_friend',
                
                paras: { 
                    user_id: this.inv_userInfo.user_id, 
              
                    message: this.inv_message,
                    remark_name:this.remark_name,
                    r_id:''
                }
              })
              this.$message.success('验证消息发送成功');
        }catch(err){
            console.log(err);
        }
    }

    //忽略
    public igron(user: any, key: string): void {
        this.axios
            .post(baseApi.api2 + '/v1/cmd/', {
                cmd: 'process_recommend_friend',
                paras: {
                    r_id: key,
                    oper: 'ignored',
                },
            }).then(res => {
                user.status = 'ignored';
                this.$message.success('已忽略')
            })
    }

    //分享名片
    @Emit('share')
    public toShare(user: any): any {
        return user;
    }
}