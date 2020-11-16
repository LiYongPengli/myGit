import { baseApi } from '@/axios/axios';
import { AxiosResponse } from 'axios';
import { Component, Vue, Watch } from 'vue-property-decorator'
import Swiper from 'swiper'
import { Mutation, State } from 'vuex-class';
@Component
export default class RecommendCom extends Vue {
    
    @State('index_channel_window') index_channel_window!: boolean;
    @State('mainPageLoading') mainPageLoading!: boolean;
    @State('language') language!: string;
    
    @State('topic_show') topic_show!: boolean;
    //被激活的推荐频道导航
    public active_recommend: number = 0;
    public active_recommend_name: string = '推荐';
    //国家、媒体、人物
    public media_swiper!: Swiper;
    public mediaSwiperCurrentIndex: number = 0;
    //频道列表
    public channel_swiper!: Swiper;

    //是否加载完毕
    public finished:boolean = false;
    
    //新闻列表
    public newsList: any[] = [];
    //起始页码
    public start:number = 1;
    
    //关注频道列表
    public channel: { sub_id: string; name: string }[] = [];
    //媒体列表
    public media: { sub_id: string; name: string }[] = [];
    //人物列表
    public people: { sub_id: string; name: string }[] = [];
    //国家列表
    public country: { sub_id: string; name: string }[] = [];

    @Mutation('setIndexChannelWindow') setEditChannel!: any;
    @Mutation('setTopicShow') setTopicShow!: any;
    @Mutation('setSureTop') setSureTop!: any;
    @Mutation('setMainPageLoading') setMainPageLoading!: any;

    @Watch('language')
    public language_change(): void {
        this.start = 1;
        this.finished = false;
        this.get_recommend();
    }
    /* @Watch('mainPageLoading')
    public loadingChange(newVal:boolean,oldVal:boolean):void{
        if(newVal&&!this.finished){
            this.loading();
        }
    } */

    public created(): void {
        this.setMainPageLoading(false);
        //获取国家列表
        this.getSubscriptions("country", "sub", (res) => {
            this.country = res.data.data;
        });
        //获取人物列表
        this.getSubscriptions("character", "sub", (res) => {
            this.people = res.data.data;
        });
        //获取媒体列表
        this.getSubscriptions("media", "sub", (res) => {
            this.media = res.data.data;
        });

        this.get_recommend();
    }

    public mounted(): void {
        //获取频道列表
        this.getSubscriptions("channel", "sub", (res) => {
            this.channel = res.data.data;
            this.channel_swiper = new Swiper('#swiper1', {
                slidesPerView: 4,
                freeMode: true,
                observer: true,
                observeSlideChildren: true,
            })
        });

        this.media_swiper = new Swiper('#swiper2')
    }


    public loading():void{
        this.start++;
        this.get_recommend();
    }

    

    //回到顶部
    public toTop(): void {
        this.setSureTop(true);
    }


    public mediaTab(index: number): void {
        this.media_swiper.slideTo(index);
        this.mediaSwiperCurrentIndex = index;
    }
    //到新闻详情页
    public toNewsInfo(item: any): void {
        window.open('#/newsinfo?id=' + item.news_id+'&md_id='+item.media_id);
    }


    //获取频道等列表
    public getSubscriptions(sub_type: string, sub_oper_type: string, call: (res: AxiosResponse<any>) => void): void {
        this.axios.get(baseApi.api2 + '/v1/user/sub/?sub_type=' + sub_type + '&sub_oper_type=' + sub_oper_type + '&limit=10').then(res => {
            call(res);
        }).catch(err => {
            console.log(err);
        })
    }

    

    //获取推荐文章列表
    private get_recommend(): void {
        let cmd = 'query_recommend';
        let paras: any = {};
        switch (this.active_recommend) {
            case 0:
                paras = { language: this.language, size: 10 };
                break;
            default:
                cmd = 'query_channel';
                paras = { name: this.active_recommend_name, language: this.language, size: 10 };
                break;
        }
        this.axios.post(baseApi.api2 + '/v1/cmd/', {
            cmd: cmd,
            paras: paras,
        }).then(res => {
            if(this.start==1){
                this.newsList = res.data.data;
            }else{
                if(!res.data.data.length){
                    this.finished = true;
                    return;
                }
                this.newsList = this.newsList.concat(res.data.data);
                this.setMainPageLoading(false);
            }
        }).catch(err => {
            console.log(err);
        })
    }
    
    /**
     * 推荐频道发生改变
     * @param index 所点击的索引
     * @param name 所点击频道的名字
     */
    public change_recommend(index: number, name: string): void {
        this.active_recommend = index;
        this.active_recommend_name = name;
        this.get_recommend();
    }

    /**
     * 格式化时间输出格式
     * @param str 时间字符串(xxxx-xx-xx xx:xx:xx)
     * @returns {string} 格式化后的时间
     */
    public init_time(str: string): string {
        let date = new Date(str);
        let now = new Date();
        let time = parseInt((now.getTime() - date.getTime()) / 1000 + '');
        if (time < 60) {
            return '1分钟前';
        } else if (time < (60 * 60)) {
            return `${parseInt(time / 60 + '')}分钟前`
        } else if (time < (60 * 60 * 24)) {
            return `${parseInt(time / 60 / 60 + '')}小时前`
        } else if (time < (60 * 60 * 24 * 30)) {
            return `${parseInt(time / 60 / 60 / 24 + '')}天前`
        } else if (time < (60 * 60 * 24 * 30 * 12)) {
            return `${parseInt(time / 60 / 60 / 24 / 30 + '')}月前`
        } else {
            return `${parseInt(time / 60 / 60 / 24 / 30 / 12 + '')}年前`
        }
    }
}