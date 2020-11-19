import { baseApi } from '@/axios/axios'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'
@Component
export default class NewsInfoCom extends Vue {
    @State('language') language!: string;
    public newsInfo: any = "";
    public upLoadPhoto: boolean = false;
    //是否展示下载附件弹框
    public showDownLoad: boolean = false;
    //是否展示收藏夹
    public showCollection: boolean = false;
    //收藏夹列表
    public favoriteList: any[] = [];
    //创建新书签
    public createNewCollection: boolean = false;
    //字体大小
    public fontSize: number = 16;
    //要上传的文件
    public upimg: any = "";
    //图片预览路径
    public img_pv:string = "";
    //创建的收藏夹名称
    public collection_name:string = "";
    public created(): void {
        this.getData();
        this.getCollection();
    }
    @Watch('language')
    public listenLanguage(newVal: string, oldVal: string): void {
        this.getData();

    }

    private getCollection(): void {
        this.axios.get(baseApi.api2 + '/v1/user/favorite/').then(res => {
            console.log(res.data);
            this.favoriteList = res.data.data;
        }).catch(err => {
            console.log(err);
        })
    }

    private getData(): void {
        this.axios.post(baseApi.api2 + '/v1/cmd/', {
            cmd: 'news_detail',
            paras: {
                news_id: this.$route.query.id,
                language: this.language
            }
        }).then(res => {
            //console.log(res.data);
            this.newsInfo = res.data.data;
        }).catch(err => {
            console.log(err);
        })
    }
    /**
     * 获取视频字幕
     * @param xml 输入的xml字符串
     * @returns html标签集合
     */
    public getYouTubeText(xml: string): any {
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(xml, "text/xml");
        return xmlDoc.getElementsByTagName('text') as any;
    }

    //获取新闻内容
    public getNewsContent(): string {
        let str = "";
        for (let i of this.newsInfo.html) {
            if (i.content) {
                str += `<${i.tag}>${i.content}</${i.tag}>`
            }
            if (i.id) {
                for (let j of this.newsInfo.attachments) {
                    if (j.position == i.id) {
                        str += `<img style="display:block;margin:39px auto;" src="${j.url}" />`
                    }
                }
            }
        }
        return str;
    }
    //收藏
    public toCollection(item: any): void {
        this.axios.post(baseApi.api2 + '/v1/cmd/', {
            cmd: 'favorite_news',
            paras: {
                name: item.name,
                news_id: this.$route.query.id,
                news_oper: 'do'
            }
        }).then(res => {
            this.newsInfo.favorited = true;
            this.showCollection = false;
        }).catch(err => {
            console.log(err);
        })
    }

    //不感兴趣或取消不感兴趣
    public notInterested(): void {
        this.axios
            .post(baseApi.api2 + '/v1/cmd/', {
                cmd: 'not_interest_news',
                paras: {
                    news_id: this.$route.query.id,
                    news_oper: this.newsInfo.not_interested ? 'undo' : 'do',
                },
            })
            .then(res => {
                console.log(res.data);
                this.newsInfo.not_interested = !this.newsInfo.not_interested;
            })
            .catch(err => {
                console.log(err)
            })
    }

    //点赞或取消点赞
    public likes(): void {
        this.axios.post(baseApi.api2 + '/v1/cmd/', {
            cmd: 'like_news',
            paras: {
                news_id: this.$route.query.id,
                news_oper: this.newsInfo.liked ? 'undo' : 'do'
            }
        }).then(res => {
            console.log(res.data);
            this.newsInfo.liked = !this.newsInfo.liked;
        }).catch(err => {
            console.log(err);
        })
    }

    //关注或取消关注
    public tofollow(): void {
        this.axios.post(baseApi.api2 + '/v1/user/sub/', {
            sub_id: this.$route.query.md_id,
            sub_type: 'media',
            sub_oper_type: this.newsInfo.subscribed ? 'unsub' : 'sub',
        }).then(res => {
            this.newsInfo.subscribed = !this.newsInfo.subscribed;
        }).catch(err => {
            console.log(err);
        })
    }

    //附件下载
    public todownLoad(item: any): void {
        window.open(item.url)
    }

    //导出world
    public downloadWord(): void {

    }
    //显示收藏按钮
    public showCollBtn(index: number): void {
        this.$set(this.favoriteList[index], 'show', true);
    }
    //隐藏收藏按钮
    public hideCollBtn(index: number): void {
        this.$delete(this.favoriteList[index], 'show')
    }

    public upFile(): void {
        let file = this.$refs.upFile as HTMLInputElement;
        if (!file.files?.length) {
            return;
        } else {
            this.upimg = file.files[0];
            this.upLoadPhoto = true;
        }
        file.value = "";
    }

    //文件上传返回结果
    public upRes(n:any):void{
        if(n){
            this.upimg = n;
            this.img_pv = URL.createObjectURL(n);
        }else{
            this.upimg = "";
            this.img_pv = "";
        }
        this.upLoadPhoto = false;
    }
    //创建并收藏
    public async createCollection(){
        if(!this.collection_name){
            this.$message.error("请输入书签名称");
            return;
        }
        if(!this.upimg){
            this.$message.error("请上传封面");
            return;
        }
        let formdata = new FormData();
        formdata.append('name',this.collection_name);
        formdata.append('cover',this.upimg);
        try{
            await this.axios.post(baseApi.api2+'/v1/user/favorite/',formdata);
        }catch(err){
            console.log(err);
            return;
        }
        try{
            await this.axios.post(baseApi.api2 + '/v1/cmd/', {
                cmd: 'favorite_news',
                paras: {
                    name: this.collection_name,
                    news_id: this.$route.query.id,
                    news_oper: 'do'
                }
            })
            this.$message.success("操作成功");
            this.newsInfo.favorited = true
            this.showCollection = false;
            this.getCollection();
        }catch(err){
            console.log(err);
        }
        
    }

    //取消创建
    public extCreateCollection():void{
        this.collection_name = "";
        this.upimg = "";
        this.createNewCollection = false;
    }
}