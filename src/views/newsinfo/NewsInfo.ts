
import { Component, Vue } from 'vue-property-decorator'
import { Mutation, State } from 'vuex-class'
import Page2Word from '@/libs/Page2Word'
@Component
export default class NewsInfoCom extends Vue {
    @State('language') language!: string;
    @State('topic_show') topic_show!: boolean;
    @State("env") env!: string;
    public newsInfo: any = "";
    //中文字幕按钮选中状态
    public track_language:string = "zh-CN";
    //是否展示下载附件弹框
    public showDownLoad: boolean = false;
    //是否展示收藏夹
    public showCollection: boolean = false;
    //字体大小
    public fontSize: number = 16;
    @Mutation('setShareNews') setShareNews: any;

    public created(): void {
        this.getData();
    }
    //获取数据
    private getData(): void {
        this.axios.post('/v1/cmd/', {
            cmd: 'news_detail',
            paras: {
                news_id: this.$route.query.id,
                language: this.language
            }
        }).then(res => {
            //console.log(res.data);
            this.newsInfo = res.data.data.news_detail;
            // for(let i=0;i<this.newsInfo.attachments.length;i++){
            //     let url = <string>this.newsInfo.attachments[i].url;
            //     let urlArr = url.split('/');
            //     urlArr.splice(0,3);
            //     let lastUrl = urlArr.join('/');
            //     this.newsInfo.attachments[i].url = '/'+lastUrl;
            // }
            this.setShareNews(this.newsInfo);
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

    public showTrack(type:string):string{
        if(type=="ZH"){
            for(let i of this.newsInfo.attachments){
                if(i.position=='SUBTITLES_ZH'){
                    return i.url;
                }
            }
        }else{
            for(let i of this.newsInfo.attachments){
                if(i.position=='SUBTITLES_RAW'){
                    return i.url;
                }
            }
        }
        return '';
    }

    //获取新闻内容
    public getNewsContent(): string {
        let str = "";
        for (let i of this.newsInfo.html[this.language]) {
            if (i.content) {
                str += `<${i.tag} style="text-indent: 2em;line-height:30px;margin-bottom:20px">${i.content}</${i.tag}>`
            }
            if (i.id) {
                for (let j of this.newsInfo.attachments) {
                    if (j.position == i.id) {
                        str += `<img style="display:block;margin:39px auto;max-width:100%;" src="${j.url}" />`
                    }
                }
            }
        }
        return str;
    }

    //不感兴趣或取消不感兴趣
    public notInterested(): void {
        this.axios
            .post('/v1/cmd/', {
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
        this.axios.post('/v1/cmd/', {
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
        this.axios.post('/v1/user/sub/', {
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
        let a = document.createElement('a');
        a.href = this.axios.defaults.baseURL+item.url;
        a.download = (<string>item.name).split('.')[0];
        a.click();
        a.remove();

    }

    //获取收藏状态
    public getCollectionStatus(status: boolean): void {
        if (status) {
            this.newsInfo.favorited = true;
            this.showCollection = false;
            this.$message.success("操作成功");
        }
    }

    //导出world
    public downloadWord(): void {
        let wrap_content = <HTMLElement>(<HTMLElement>this.$refs['wrap_content']).cloneNode(true);
        //删除面包屑
        wrap_content.removeChild(wrap_content.children[0])
        //删除工具栏
        wrap_content.children[1].removeChild(wrap_content.children[1].children[1])
        //删除关注按钮
        wrap_content.children[1].children[0].removeChild(wrap_content.children[1].children[0].children[0]);
        //删除底部
        wrap_content.removeChild(wrap_content.children[3]);
        wrap_content.removeChild(wrap_content.children[3]);
        //导出word
        Page2Word(this.newsInfo.title['zh-CN'] + '-' + new Date().toLocaleDateString(), wrap_content);
    }
}