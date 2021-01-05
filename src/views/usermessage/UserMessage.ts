import { AxiosResponse } from 'axios';
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class UserMessageCom extends Vue{
    public showInfo:boolean = false;
    public chooseMessage:any = "";
    public messageList:any[] = []



    public created():void{
        this.queryMessageList('query',res=>{
            this.messageList = res.data.data;
        });
    }

    //到消息详情
    public toInfo(message:any):void{
        this.chooseMessage = message;
        this.showInfo = true;
    }

    public back(message:any):void{
        if(message){
            for(let i=0;i<this.messageList.length;i++){
                if(this.messageList[i].id==message.id){
                    this.messageList.splice(i,1);
                    break;
                }
            }
        }
        this.showInfo = false;
    }

    //全部已读
    public allRead():void{
        if(!this.messageList.length){
            return;
        }
        let ids = [];
        for(let i of this.messageList){
            ids.push(i.id)
        }
        this.queryMessageList('read',res=>{
            console.log(res.data);
            for(let i=0;i<this.messageList.length;i++){
                this.messageList[i].status='read'
            }
        },ids)
    }

    //全部清空
    public clearMessage():void{
        if(!this.messageList.length){
            return;
        }
        let ids = [];
        for(let i of this.messageList){
            ids.push(i.id)
        }
        this.queryMessageList('deleted',res=>{
            this.messageList = [];
        },ids)
    }


    /**
     * 对消息的操作
     * @param type 操作类型('query'查询所有消息，'read'把消息标记未已读，'deleted'删除消息)
     * @returns {void}
     */
    public queryMessageList(type:string,callback:(res:AxiosResponse<any>)=>void,ids:string[]=[]):void{
        let obj:any = {oper:type};
        if(ids.length){
            obj.msg_ids = ids;
        }
        this.axios
        .post('/v1/cmd/', {
          cmd: 'my_messages',
          paras: obj,
        }).then(res=>{
            callback(res);
        }).catch(err=>{
            console.log(err);
        })
    }
}
