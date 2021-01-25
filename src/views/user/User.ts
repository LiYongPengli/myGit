import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class';
@Component
export default class UserCom extends Vue {
    //用户信息
    @State('user_message') user_message!: any;
    @State('topic_show') topic_show!: boolean;
    //国家
    public country: any[] = [];
    public showUpload: boolean = false;
    public showUpload1: boolean = false;
    public headportraitupdate: boolean = false;
    //头像图片
    public headerPhoto: Blob | null = null;
    //处理后的头像地址
    public headerPhotoURL: string = "";
    //预处理头像
    public headerPhotoPrv: any = "";
    public upLoadPhoto: boolean = false;
    //
    public showWeiChatHeader:boolean = false;
    //人物
    public people: any[] = [];
    public choose_nav: string = "统计报表";
    public user_nav_list = [
        {
            path: '/user/form/fetch',
            routename:'Form',
            name: '统计报表',
            nosee: 'user'
        },
        {
            path: '/user/users',
            name: '用户管理',
            routename:'Users',
            nosee: 'user'
        },
        {
            path: '/user/follow/country',
            routename:'Follow',
            name: '我的关注'
        },
        {
            path: '/user/collection/0',
            routename:'Collection',
            name: '我的收藏'
        },
        {
            path: '/user/message',
            routename:'Message',
            name: '我的消息'
        },
        {
            path: '/user/account',
            routename:'Account',
            name: '账号管理'
        },
        {
            path: '/user/password',
            routename:'PassWord',
            name: '密码管理'
        }
    ]

    public created(): void {
        for (let i of this.user_nav_list) {
            if (this.$route.path == i.path) {
                this.choose_nav = i.name;
                break;
            }
        }

    }

    //设置用户头像
    public setHeaderPhoto(): void {
        let ipt = this.$refs.file as HTMLInputElement;
        let file = (ipt.files as FileList)[0]
        if (file) {
            this.headerPhotoPrv = file;
            this.upLoadPhoto = true;
        }
    }

    //更换头像
    public changeheadportrait(): void {
        if (!this.headerPhoto) {
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
            }).then(res => {
                this.headportraitupdate = false;
                this.$message.success('头像修改成功');
                let reader = new FileReader();
                reader.readAsDataURL(<Blob>this.headerPhoto);
                reader.onloadend = (e) => {
                    this.user_message.headimg = (<FileReader>e.target).result;
                    this.headerPhotoURL = "";
                    this.headerPhoto = null;
                }
            }).catch(err => {
                console.log(err);
            })
    }
    //使用微信头像
    public useWeiChatHeader(): void {
        let wechat = this.user_message.wechat_info;
        if (wechat.head_img) {
            let formData = new FormData()
            formData.append('cmd', 'user_modify_avatar')
            formData.append('img', this.dataURLtoBlob(wechat.head_img));
            this.axios
                .post('/v1/cmd/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }).then(res => {
                    this.headportraitupdate = false;
                    this.$message.success('头像修改成功');
                    this.user_message.headimg = wechat.head_img;
                    this.headerPhotoURL = "";
                    this.headerPhoto = null;
                    this.showWeiChatHeader = false;
                }).catch(err => {
                    console.log(err);
                })
        }
    }
    /**
     * base64转blob
     * @param dataurl base64字符串
     * @returns {Blob}
     */
    private dataURLtoBlob(dataurl: string): Blob {
        let arr = dataurl.split(',')
        let mime = (<RegExpMatchArray>arr[0].match(/:(.*?);/))[1]
        let bstr = atob(arr[1])
        let n = bstr.length
        let u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }

    public upRes(data: Blob): void {
        if (data) {
            this.headerPhoto = data;
            this.headerPhotoURL = URL.createObjectURL(this.headerPhoto);
        }
        (this.$refs.file as HTMLInputElement).value = "";
        this.upLoadPhoto = false;
    }

    public quit(): void {
        this.headportraitupdate = false;
        this.headerPhotoURL = "";
        this.headerPhoto = null;
    }

    public router_link(item: { path: string, name: string }): void {
        this.$router.push(item.path);
        this.choose_nav = item.name;
    }

    //监听当前路由变化判断当前导航选中状态
    get active_nav(): string {
        return <string>this.$route.name;
    }
}