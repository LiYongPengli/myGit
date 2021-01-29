
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Mutation } from 'vuex-class';
@Component
export default class NewFriendsCom extends Vue {
    @Prop({}) visable!: boolean;
    public newFriendList: any[] = [];
    //是否修改备注
    public remark: boolean = false;
    public userInfo: any = "";
    public inv_userInfo: any = "";
    public remark_name: string = "";
    public inv_message: string = "";
    public cardList: any = "";

    @Mutation("setTopicUrl") setTopicUrl: any;
    @Mutation("setTopicStatus") setTopicStatus: any;

    public created(): void {
        this.getNewFriendsList();
        this.getCardList();
    }

    //修改备注
    public changeRemark(): void {
        if (!this.remark_name) {
            this.remark = false;
            return;
        }
        this.axios
            .post('/v1/cmd/', {
                cmd: 'set_friend_remark_name',
                paras: {
                    user_id: this.userInfo.user_id,
                    remark_name: this.remark_name
                }
            }).then(res => {
                this.userInfo.remark_name = this.remark_name;
                this.$message.success('设置备注成功!');
                this.remark = false;
            })
    }

    public showControl(key:string):void{
        this.$set(this.cardList[key],'mouse',true);
    }

    public hideControl(key:number):void{
        this.$set(this.cardList[key],'mouse',false);
    }


    //发送消息
    public sendMessage(user: any): void {
        this.axios
            .post('/v1/cmd/', {
                cmd: 'im_create',
                paras: { account: user.account }
            }).then(res => {
                console.log(res.data)
                this.setTopicUrl(this.axios.defaults.baseURL+"/im/direct/" + res.data.data.room.rid)
                this.setTopicStatus(1);
            }).catch(err => {
                console.log(err);
            })
    }

    //获取新朋友列表
    private getNewFriendsList(): void {
        this.axios
            .post('/v1/cmd/', {
                cmd: 'new_friends'
            }).then(res => {
                this.newFriendList = res.data.data;
                this.newFriendList.sort(function(a,b){
                    return new Date(b.request_time).getTime() - new Date(a.request_time).getTime();
                })
            }).catch(err => {
                console.log(err);
            })
    }

    //
    private getCardList(): void {
        this.axios
            .post('/v1/cmd/', {
                cmd: 'recommended_friends',
            }).then(res => {
                console.log(res.data);
                this.cardList = res.data.data;
            }).catch(err => {
                console.log(err);
            })
    }

    //接受
    public toAgree(user: any): void {
        this.axios
            .post('/v1/cmd/', {
                cmd: 'process_add_friend',
                paras: { user_id: user.user_id, oper: 'accepted' },
            }).then(res => {
                console.log(res.data);
                user.status = "accepted"
            }).catch(err => {
                console.log(err);
            })
    }
    public toReject(user: any): void {
        this.axios
            .post('/v1/cmd/', {
                cmd: 'process_add_friend',
                paras: { user_id: user.user_id, oper: 'rejected' },
            }).then(res => {
                console.log(res.data);
                user.status = "rejected"
            }).catch(err => {
                console.log(err);
            })
    }

    //显示用户详细信息
    public showInfo(user: any): void {
        this.inv_userInfo = "";
        return;
        // if (user.status == 'pending' || user.status == 'rejected') {
        //     return;
        // }
        this.inv_userInfo = "";
        this.remark_name = "";
        this.inv_message = "";
        this.userInfo = user;
    }

    //请求添加好友详情显示
    public showInvInfo(user: any, key: string): void {
        this.userInfo = "";
        this.remark_name = "";
        this.inv_message = "";
        this.inv_userInfo = user.recommended;
        this.inv_userInfo.id = key;
    }

    //添加到通讯录
    public async toAddMaiList() {
        try {
            await this.axios.post('/v1/cmd/', {
                cmd: 'request_add_friend',
                paras: {
                    user_id: this.inv_userInfo.recommended.user_id,
                    message: this.inv_message,
                    remark_name: this.remark_name,
                    r_id: this.inv_userInfo.id
                }
            })
            this.$message.success('验证消息发送成功');
            await this.axios
                .post('/v1/cmd/', {
                    cmd: 'process_recommend_friend',
                    paras: {
                        r_id: this.inv_userInfo.id,
                        oper: 'requested',
                    },
                })
            this.inv_userInfo.status = 'requested'
        } catch (err) {
            console.log(err);
            return;
        }
    }

    //忽略
    public igron(user: any, key: string): void {
        this.axios
            .post('/v1/cmd/', {
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
}