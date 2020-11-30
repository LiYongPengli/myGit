import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class';
@Component
export default class UserAccountCom extends Vue{
    @State('user_message') user_message!:any;
    public bangding:boolean=false;
    // 昵称修改
    public ninameupdate:boolean=false;
    public binding:boolean=false;
    // 头像修改
    public headportraitupdate:boolean=false

    public niname:string = "";
     //更换昵称
     public changeniname():void{
        if(this.niname==""){
            this.$message.error('昵称有误');
            return;
        }
        
    }
    public created():void{
        console.log(this.user_message)
    }

     //更换头像
     public changeheadportrait():void{
        
    }
}
