import { Component, Vue } from 'vue-property-decorator'
@Component
export default class MailList extends Vue {
    public newfriendid: number = 1;
    public share:boolean = false;
    public shareUser:any = "";

    public shareMethod(user:any):void{
        this.shareUser = user;
        this.newfriendid = 3;
    }
}