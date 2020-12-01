import { baseApi } from '@/axios/axios';
import { Component,Emit,Prop,Vue } from 'vue-property-decorator'
@Component
export default class MailListCom extends Vue{
    @Prop({}) visable!:boolean;
    public newFriendList:any[] = [];
    public cardList:any = "";
    public letterSearch:string = "";
    //搜索好友关键字
    public keyword:string = "";
    //是否修改备注
    public remark:boolean = false;
    public userlists:any[] = [];
    //请求添加的用户信息
    public inv_userInfo:any = "";
    public userInfo:any = "";
    //备注
    public remark_name:string = "";
    //验证消息
    public inv_message:string = "";

    public zmlist = [
        { name: 'A' },
        { name: 'B' },
        { name: 'C' },
        { name: 'D' },
        { name: 'E' },
        { name: 'F' },
        { name: 'G' },
        { name: 'H' },
        { name: 'I' },
        { name: 'J' },
        { name: 'K ' },
        { name: 'L' },
        { name: 'M ' },
        { name: 'N' },
        { name: 'O' },
        { name: 'P' },
        { name: ' Q ' },
        { name: 'R ' },
        { name: 'S ' },
        { name: 'T ' },
        { name: 'U ' },
        { name: 'V ' },
        { name: 'W' },
        { name: 'X' },
        { name: 'Y' },
        { name: 'Z ' },
        { name: '其他 ' }]

    public created():void{
        this.getNewFriendsList();
        this.getCardList();
        this.getMailList();
    }

    //修改备注
    public changeRemark():void{
        if(!this.remark_name){
            this.remark = false;
            return;
        }
        this.axios
        .post(baseApi.api2+'/v1/cmd/', {
          cmd: 'set_friend_remark_name',
          paras: {
            user_id: this.userInfo.user_id,
            remark_name: this.remark_name
          }
        }).then(res=>{
            this.userInfo.remark_name = this.remark_name;
            this.$message.success('设置备注成功!');
            this.remark = false;
        })
    }
    //拼音首字母筛选
    public setLetterSearch(letter:{name:string}):void{
        if(letter.name==this.letterSearch){
            this.letterSearch = "";
        }else{
            this.letterSearch = letter.name;
        }
    }

    //搜索好友
    public searchFriends():void{
        if(!this.keyword){
            this.getMailList();
            return;
        }
        this.axios
        .post(baseApi.api2+'/v1/cmd/', {
          cmd: 'search_friend',
          paras: { keyword: this.keyword }
        }).then(res=>{
            this.userlists = res.data.data;
        }).catch(err=>{
            console.log(err);
        })
    }
    //发送消息
    public sendMessage(user:any):void{
        this.axios
        .post(baseApi.api2+'/v1/cmd/', {
          cmd: 'im_create',
          paras: { account: user.account }
        }).then(res=>{
            console.log(res.data)
        }).catch(err=>{
            console.log(err);
        })
    }

    //获取通讯录列表
    private getMailList():void{
        this.axios
        .post(baseApi.api2+'/v1/cmd/', {
          cmd: 'my_friends',
        }).then(res=>{
            this.userlists = res.data.data;
        }).catch(err=>{
            console.log(err);
        })
    }
    //显示分享名片
    public showShare(index:number):void{
        this.$set(this.userlists[index],'share',true);
        this.$set(this.userlists[index],'send',true);
    }
    //隐藏分享名片
    public hideShare(index:number):void{
        this.$delete(this.userlists[index],'share')
        this.$delete(this.userlists[index],'send')
    }

    //获取新朋友列表
    private getNewFriendsList(): void {
        this.axios
            .post(baseApi.api2 + '/v1/cmd/', {
                cmd: 'new_friends'
            }).then(res => {
                this.newFriendList = res.data.data;
            }).catch(err => {
                console.log(err);
            })
    }

    //获取名片列表
    private getCardList():void{
        this.axios
        .post(baseApi.api2+'/v1/cmd/', {
          cmd: 'recommended_friends',
        }).then(res=>{
            console.log(res.data);
            this.cardList = res.data.data;
        }).catch(err=>{
            console.log(err);
        })
    }
    
    //接受
    public toAgree(user:any):void{
        this.axios
        .post(baseApi.api2+'/v1/cmd/', {
          cmd: 'process_add_friend',
          paras: { user_id: user.user_id, oper: 'accepted' },
        }).then(res=>{
            user.status="accepted"
        }).catch(err=>{
            console.log(err);
        })
    }

    //拒绝
    public toReject(user:any):void{
        this.axios
        .post(baseApi.api2+'/v1/cmd/', {
          cmd: 'process_add_friend',
          paras: { user_id: user.user_id, oper: 'rejected' },
        }).then(res=>{
            console.log(res.data);
            user.status="rejected"
        }).catch(err=>{
            console.log(err);
        })
    }

    //显示用户详细信息
    public showInfo(user:any):void{
        this.inv_userInfo = "";
        this.remark_name = user.remark_name;
        this.inv_message = "";
        this.userInfo=user;
    }
    //请求添加好友详情显示
    public showInvInfo(user:any,key:string):void{
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
                    r_id:this.inv_userInfo.id
                }
              })
              this.$message.success('验证消息发送成功');
        }catch(err){
            console.log(err);
        }
    }
    //忽略
    public igron(user:any,key:string):void{
        this.axios
            .post(baseApi.api2+'/v1/cmd/', {
              cmd: 'process_recommend_friend',
              paras: {
                r_id: key,
                oper: 'ignored',
              },
            }).then(res=>{
                user.status = 'ignored';
                this.$message.success('已忽略')
            })
    }

    //分享名片
    @Emit('share')
    public toShare(user:any):any{
        return user;
    }
}