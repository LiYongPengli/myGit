
import { Component, Vue } from 'vue-property-decorator'
import { Mutation, State } from 'vuex-class';
@Component
export default class UserAccountCom extends Vue {
    @State('user_message') user_message!: any;
    public bangding: boolean = false;
	//头像图片
    public headerPhoto:Blob|null = null;
    //处理后的头像地址
    public headerPhotoURL:string = "";
    //预处理头像
    public headerPhotoPrv:any = "";
    public upLoadPhoto:boolean = false;
    //微信登录需要的信息
    public wx_data: any = "";
    // 昵称修改
    public ninameupdate: boolean = false;
    public binding: boolean = false;
    public unbinding: boolean = false;
    // 头像修改
    public headportraitupdate: boolean = false

    public niname: string = "";

    @Mutation('setUserMessage') setUserMessage!: any;
    //更换昵称
    public changeniname(): void {
        if (this.niname == "") {
            this.$message.error('昵称不能为空');
            return;
        }
        this.axios
            .post('/v1/cmd/', {
                cmd: 'user_modify_nickname',
                paras: { nickname: this.niname }
            }).then(res => {
                this.ninameupdate = false;
                this.user_message.nickname = this.niname;
                this.setUserMessage(this.user_message);
                this.$message.success("昵称修改成功!")
                this.niname = "";
            }).catch(err => {
                console.log(err);
            })

    }
    public created(): void {
        console.log(this.user_message)
    }

    //绑定微信
    public bindWechat(): void {
        this.axios.post('/v1/user/wechat/').then(res => {
            this.wx_data = res.data.data;
        }).catch(err => { })

    }

    //解绑微信号
    public unbindingWechat(): void {
        this.axios
            .delete('/v1/user/wechat/').then(res => {
                this.user_message.wechat_info = {binding:false}
                this.setUserMessage(this.user_message);
                this.unbinding = false;
                this.$message.success('解绑成功!')
            }).catch(err => {
                console.log(err);
            })
    }
	
	//设置用户头像
	public setHeaderPhoto():void{
		let ipt = this.$refs.file as HTMLInputElement;
		let file = (ipt.files as FileList)[0]
		if(file){
			this.headerPhotoPrv = file;
			this.upLoadPhoto = true;
		}
	}
	
	public upRes(data:Blob):void{
		if(data){
            this.headerPhoto = data;
            this.headerPhotoURL = URL.createObjectURL(this.headerPhoto);
        }
        (this.$refs.file as HTMLInputElement).value = "";
        this.upLoadPhoto = false;
	}

    //更换头像
    public changeheadportrait(): void {
        if(!this.headerPhoto){
            this.$message.error('请上传用户头像!');
            return;
        }
        let formData = new FormData()
        formData.append('cmd', 'user_modify_avatar')
        formData.append('img', this.headerPhoto as any);
        this.axios
        .post('/v1/cmd/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then(res=>{
            console.log(res.data);
            this.headportraitupdate = false;
            this.$message.success('头像修改成功');
            this.$router.go(0);
        }).catch(err=>{
            console.log(err);
        })
    }
}
