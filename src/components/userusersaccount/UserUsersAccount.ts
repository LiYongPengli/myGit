import { Component,Prop,Vue } from 'vue-property-decorator'
@Component
export default class UserUsersAccountCom extends Vue{
    @Prop({}) user!:any;
    public resetPwd:boolean = false;
}