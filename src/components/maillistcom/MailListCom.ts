
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
import { Mutation } from 'vuex-class';
@Component
export default class MailListCom extends Vue {
    @Prop({}) visable!: boolean;
    public newFriendList: any[] = [];
    //是否有新朋友
    public hasNewFriends: boolean = false;
    public cardList: any = "";
    public letterSearch: string = "";
    //搜索好友关键字
    public keyword: string = "";
    //是否修改备注
    public remark: boolean = false;
    public userlists: any[] = [];
    //请求添加的用户信息
    public inv_userInfo: any = "";
    public userInfo: any = "";
    //备注
    public remark_name: string = "";

    @Mutation("setTopicUrl") setTopicUrl: any;
    @Mutation("setTopicStatus") setTopicStatus: any;

    public zmlist = [
        { name: 'A', value: 'A' },
        { name: 'B', value: 'B' },
        { name: 'C', value: 'C' },
        { name: 'D', value: 'D' },
        { name: 'E', value: 'E' },
        { name: 'F', value: 'F' },
        { name: 'G', value: 'G' },
        { name: 'H', value: 'H' },
        { name: 'I', value: 'I' },
        { name: 'J', value: 'J' },
        { name: 'K', value: 'K' },
        { name: 'L', value: 'L' },
        { name: 'M', value: 'M' },
        { name: 'N', value: 'N' },
        { name: 'O', value: 'O' },
        { name: 'P', value: 'P' },
        { name: 'Q', value: 'Q' },
        { name: 'R', value: 'R' },
        { name: 'S', value: 'S' },
        { name: 'T', value: 'T' },
        { name: 'U', value: 'U' },
        { name: 'V', value: 'V' },
        { name: 'W', value: 'W' },
        { name: 'X', value: 'X' },
        { name: 'Y', value: 'Y' },
        { name: 'Z', value: 'Z' },
        { name: '其他 ', value: 'Other' }]

    public created(): void {
        this.getNewFriendsList();
        this.getCardList();
        this.getMailList();
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
    //拼音首字母筛选
    public setLetterSearch(letter: { name: string; value: string }): void {
        if (letter.value == this.letterSearch) {
            this.letterSearch = "";
        } else {
            this.letterSearch = letter.value;
        }
    }
    public keyPress(e:KeyboardEvent):void{
        if(e.keyCode==13){
            this.searchFriends();
        }
    }

    //搜索好友
    public searchFriends(): void {
        if (!this.keyword) {
            this.getMailList();
            return;
        }
        this.axios
            .post('/v1/cmd/', {
                cmd: 'search_friend',
                paras: { keyword: this.keyword }
            }).then(res => {
                this.userlists = res.data.data;
            }).catch(err => {
                console.log(err);
            })
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

    //获取通讯录列表
    private getMailList(): void {
        this.axios
            .post('/v1/cmd/', {
                cmd: 'my_friends',
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
                let now = new Date().getTime();
                for (let i = 0; i < this.newFriendList.length; i++) {
                    let date = new Date(this.newFriendList[i].request_time).getTime();
                    if (now - date > 7 * 24 * 60 * 60 * 1000) {
                        this.newFriendList[i].overdue = true;
                    }
                    if (this.newFriendList[i].status == 'pending') {
                        this.hasNewFriends = true;
                    }
                }
            }).catch(err => {
                console.log(err);
            })
    }

    //获取名片列表
    private getCardList(): void {
        this.axios
            .post('/v1/cmd/', {
                cmd: 'recommended_friends',
            }).then(res => {
                console.log(res.data);
                this.cardList = res.data.data;
                let now = new Date().getTime();
                for (let i in this.cardList) {
                    let date = new Date(this.cardList[i].recommend_time).getTime();
                    if (now - date > 7 * 24 * 60 * 60 * 1000) {
                        this.cardList[i].overdue = true;
                    }
                    if (this.cardList[i].status == 'pending') {
                        this.hasNewFriends = true;
                    }
                }
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
                user.status = "accepted"
                this.getMailList();
            }).catch(err => {
                console.log(err);
            })
    }

    //拒绝
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
        this.remark_name = user.remark_name;
        this.remark_name = "";
        this.userInfo = user;
    }
    //请求添加好友详情显示
    public showInvInfo(user: any, key: string): void {
        this.userInfo = "";
        this.remark_name = "";
        this.inv_userInfo = user.recommended;
        this.inv_userInfo.id = key;
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

    //分享名片
    @Emit('share')
    public toShare(user: any): any {
        return user;
    }
}