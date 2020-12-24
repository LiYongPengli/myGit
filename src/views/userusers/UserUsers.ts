import { baseApi } from '@/axios/axios';
import { Component, Vue, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class';
@Component
export default class UserUsersCom extends Vue {
    @State('user_message') user_message!:any;
    public editAccount: boolean = false;
    public userList:any[] = [];
    //搜索的用户
    public search_user:string = "";
    public eidtUser:any = "";
    public sortType:string = "up"
    public created():void{
        if(this.user_message.role=='user'){
            this.$message.warning('用户权限不足');
            this.$router.push('/user');
            return;
        }
        this.getUserList();
    }
    @Watch('sortType')
    public sortList(newVal:string,oldVal:string):void{
        if(newVal=='up'){
            this.userList.sort((a,b)=>{
                return new Date(a.registration_date).getTime()-new Date(b.registration_date).getTime()
            })
        }else{
            this.userList.sort((a,b)=>{
                return new Date(b.registration_date).getTime()-new Date(a.registration_date).getTime()
            })
        }
    }

    //过滤用户信息
    public showUsers(user: any): boolean {
        let flag = false;
        let ch = /[\u4E00-\u9FA5]+/;
        let nm = /[0-9]+/
        if (~user.nickname.indexOf(this.search_user)) {
            flag = true;
        }
        if (!ch.test(this.search_user)) {
            if (nm.test(this.search_user)) {
                if (user.phone_number == this.search_user||user.account==this.search_user) {
                    flag = true;
                }
            } else {
                if (user.account == this.search_user) {
                    flag = true;
                }
            }
        }
        return flag;
    }


    private getUserList(): void {
        this.axios
            .post(baseApi.api2 + '/v1/cmd/', {
                cmd: 'user_info_list',
            }).then(res => {
                console.log(res.data);
                this.userList = res.data.data;
                this.userList.sort((a,b)=>{
                    return new Date(a.registration_date).getTime()-new Date(b.registration_date).getTime()
                })
            }).catch(err => {
                console.log(err);
            })
    }
    //注册时间的转换 2020-01-01 12：23：24 转换为2020年-01月-01日 12：23：24
    public UserCreatetime(str:any):any{
        let time=new Date(str)
        let year=time.getFullYear()
        let month=time.getMonth()
        let date=time.getDate() 
        let hours=time.getHours()
        let minute=time.getMinutes() 
        let second=time.getSeconds() 

        return `${year}年${month+1>10?month:'0'+month}月${date+1>10?date:'0'+date}日${hours+1>10?hours:'0'+hours}:${minute+1>10?minute:'0'+minute}:${second+1>10?second:'0'+second}`;
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
