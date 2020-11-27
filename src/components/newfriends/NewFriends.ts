import { baseApi } from '@/axios/axios';
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class NewFriendsCom extends Vue{
    @Prop({}) visable!:boolean;
    public newFriendList:any[] = [];

    public userInfo:any = "";
    public inv_userInfo:any = "";
    public remark_name:string = "";
    public inv_message:string = "";
    public cardList:any = "";
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

    //
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
            console.log(res.data);
            user.status="accepted"
        }).catch(err=>{
            console.log(err);
        })
    }
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
        if(user.status=='pending'||user.status=='rejected'){
            return;
        }
        this.inv_userInfo = "";
        this.remark_name = "";
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
                paras: { user_id: this.inv_userInfo.recommended.user_id, message: this.inv_message }
              })
              this.$message.success('验证消息发送成功');
            await this.axios
            .post(baseApi.api2+'/v1/cmd/', {
              cmd: 'process_recommend_friend',
              paras: {
                r_id: this.inv_userInfo.id,
                oper: 'requested',
              },
            })
        }catch(err){
            console.log(err);
            return;
        }
        if(this.remark_name){
            try{
                await this.axios
                .post(baseApi.api2+'/v1/cmd/', {
                  cmd: 'set_friend_remark_name',
                  paras: {
                    user_id: this.inv_userInfo.user_id,
                    remark_name: this.remark_name,
                  },
                })
            }catch(err){
                console.log(err);
            }
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
}