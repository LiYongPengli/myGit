
import { AxiosResponse } from 'axios';
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class';
@Component
export default class UserCom extends Vue {
    //用户信息
    @State('user_message') user_message!:any;
    @State('topic_show') topic_show!:boolean;
    //国家
    public country: any[] = [];
    public showUpload:boolean = false;
    public showUpload1:boolean = false;
    public headportraitupdate:boolean = false;
    //头像图片
    public headerPhoto:Blob|null = null;
    //处理后的头像地址
    public headerPhotoURL:string = "";
    //预处理头像
    public headerPhotoPrv:any = "";
    public upLoadPhoto:boolean = false;
    //人物
    public people: any[] = [];
    public choose_nav:string = "统计报表";
    public user_nav_list = [
        {
            path: '/user/form',
            name: '统计报表',
            nosee:'user'
        },
        {
            path: '/user/users',
            name: '用户管理',
            nosee:'user'
        },
        {
            path: '/user/follow',
            name: '我的关注'
        },
        {
            path: '/user/collection',
            name: '我的收藏'
        },
        {
            path: '/user/message',
            name: '我的消息'
        },
        {
            path: '/user/account',
            name: '账号管理'
        },
        {
            path: '/user/password',
            name: '密码管理'
        }
    ]

    public created(): void {
        for(let i of this.user_nav_list){
            if(this.$route.path==i.path){
                this.choose_nav = i.name;
                break;
            }
        }
        
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
            this.headportraitupdate = false;
            this.$message.success('头像修改成功');
            setTimeout(()=>{
                this.$router.go(0);
            },500)
        }).catch(err=>{
            console.log(err);
        })
    }

    public upRes(data:Blob):void{
		if(data){
            this.headerPhoto = data;
            this.headerPhotoURL = URL.createObjectURL(this.headerPhoto);
        }
        (this.$refs.file as HTMLInputElement).value = "";
        this.upLoadPhoto = false;
    }
    
    public quit():void{
        this.headportraitupdate = false;
        this.headerPhotoURL = "";
        this.headerPhoto = null;
    }

    public router_link(item:{path:string,name:string}):void{
        this.$router.push(item.path);
        this.choose_nav = item.name;
    }

    //监听当前路由变化判断当前导航选中状态
    get active_nav(): string {
        return this.$route.path;
    }
}