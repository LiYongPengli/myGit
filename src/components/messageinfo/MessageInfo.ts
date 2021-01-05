import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
@Component
export default class MessageInfoCom extends Vue{
    @Prop({}) message!:any;

    @Emit('ext')
    public back(message:any):any{
        return message;
    }

    public created():void{
        this.readMessage();
    }

    //读消息
    private readMessage():void{
        this.axios
        .post('/v1/cmd/', {
          cmd: 'my_messages',
          paras: {
            oper: 'read',
            msg_ids: [this.message.id],
          }
        }).then(res=>{
            this.message.status = 'read';
        }).catch(err=>{
            console.log(err);
        })
    }

    public remove():void{
        this.axios
        .post('/v1/cmd/', {
          cmd: 'my_messages',
          paras: {
            oper: 'deleted',
            msg_ids: [this.message.id],
          }
        }).then(res=>{
            this.back(this.message);
            this.$message.success('删除消息成功');
        }).catch(err=>{
            console.log(err);
        })
    }
}