import { baseApi } from '@/axios/axios'
import { Component, Vue } from 'vue-property-decorator'
import { Mutation, State } from 'vuex-class'
import Page2Word from '@/libs/Page2Word'
@Component
export default class NewsInfoCom extends Vue {
    @State('language') language!: string;
    @State('topic_show') topic_show!: boolean;
    public newsInfo: any = "";
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
    private getData(): void {
        this.axios.post(baseApi.api2 + '/v1/cmd/', {
            cmd: 'news_detail',
            paras: {
                news_id: this.$route.query.id,
                language: this.language
            }
        }).then(res => {
            //console.log(res.data);
            this.newsInfo = res.data.data.news_detail;
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
        //http://bj.zlbxxcj.bjceis.com/attachments/2020/12/30/b32388ac76028e80cb474809a884265795cf8756.jpg
        //http://bj.zlbxxcj.bjceis.com/attachments/2020/12/30/aba387b17b96f5b3f4eab68a224c71570fc690df.jpg
        this.axios.get(item.url,{
            responseType:'blob'
        }).then(res=>{
            let buffer:Blob = res.data;
            let url = URL.createObjectURL(buffer);
            let a = document.createElement('a');
            a.href = url;
            a.download = "aaaaaaaa";
            a.click();
            a.remove();
            console.log(res.data);
        }).catch(err=>{
            console.log(err);
        })
        
    }
    //附件下载
    public todownLoad2(item: any): void {
        //http://bj.zlbxxcj.bjceis.com/attachments/2020/12/30/b32388ac76028e80cb474809a884265795cf8756.jpg
        //http://bj.zlbxxcj.bjceis.com/attachments/2020/12/30/aba387b17b96f5b3f4eab68a224c71570fc690df.jpg
        this.axios.get('http://bj.zlbxxcj.bjceis.com/attachments/2020/12/30/b32388ac76028e80cb474809a884265795cf8756.jpg',{
            responseType:'blob'
        }).then(res=>{
            let buffer:Blob = res.data;
            let url = URL.createObjectURL(buffer);
            let a = document.createElement('a');
            a.href = url;
            a.download = 'bbbb';
            a.click();
            a.remove();
            console.log(res.data);
        }).catch(err=>{
            console.log(err);
        })
        
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
        Page2Word(this.newsInfo.title['zh-CN']+'-'+new Date().toLocaleDateString(),<HTMLElement>this.$refs['newsWrap']);
    }
}