import { Component, Vue } from 'vue-property-decorator'
@Component
export default class UserAccountCom extends Vue{
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

     //更换头像
     public changeheadportrait():void{
        
    }
}
