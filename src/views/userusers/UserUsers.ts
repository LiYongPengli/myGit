import { baseApi } from '@/axios/axios';
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class';
@Component
export default class UserUsersCom extends Vue {
    @State('user_message') user_message!:any;
    public editAccount: boolean = false;
    public userList:any[] = [];
    public eidtUser:any = "";
    public created():void{
        this.getUserList();
    }


    private getUserList(): void {
        this.axios
            .post(baseApi.api2 + '/v1/cmd/', {
                cmd: 'user_info_list',
            }).then(res => {
                console.log(res.data);
                this.userList = res.data.data;
            }).catch(err => {
                console.log(err);
            })
    }

    /**
     * 设置为管理员
     * @param user 用户
     */
    public setAdmin(user:any):void{
        let role = "";
        if(user.role=='oper'){
            role = 'user'
        }else{
            role = 'oper'
        }
        this.axios
        .post(baseApi.api2+'/v1/cmd/', {
          cmd: 'change_user_role',
          paras: {
            user_id: user.user_id,
            role: role,
          }
        }).then(res=>{
            user.role = role
        }).catch(err=>{
            console.log(err)
        })
    }    

    /**
     * 管理账号
     * @param user 用户
     */
    public toEditAccount(user:any):void{
        this.editAccount = true;
        this.eidtUser = user;
    }
}
