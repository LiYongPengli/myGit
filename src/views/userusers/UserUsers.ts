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
        if(this.user_message.role=='user'){
            this.$message.warning('用户权限不足');
            this.$router.push('/user');
            return;
        }
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
    //注册时间的转换 2020-01-01 12：23：24 转换为2020年-01月-01日 12：23：24
    public UserCreatetime(str:any):any{
        let time=new Date(str)
        let year=time.getFullYear()
        let month=(time.getMonth()+1)+""
        let date=time.getDate() 
        let hours=time.getHours()+""
        let minute=time.getMinutes() 
        console.log(hours)
        console.log(String(10))
        console.log(hours<String(10))
        let second=time.getSeconds() 
        // if(month<"10"){month='0'+month}
        // if(date<10){date='0'+date}
        // if(hours<10){hours='0'+hours}
        // if(minute<10){minute='0'+minute}
        // if(second<10){second='0'+second}

        return year+"年"+month+"月"+date+"日"+hours+":"+minute+":"+second;
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
