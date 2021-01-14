
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
    public start = {
        pageStart:0
    }
    
    //关注频道列表
    public channel: { sub_id: string; name: string }[] = [];
    //媒体列表
    public media: { sub_id: string; name: string }[] = [];
    //人物列表
    public people: { sub_id: string; name: string }[] = [];
    //国家列表
    public country: { sub_id: string; name: string }[] = [];

    @Mutation('setIndexChannelWindow') setEditChannel!: any;
    
    @Mutation('setMainPageLoading') setMainPageLoading!: any;
    @Watch('mainPageLoading')
    public loadingChange(newVal:boolean,oldVal:boolean):void{
        if(newVal&&!this.finished){
            this.loading();
        }
    }

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

    public imgLoad(e:any):void{
        let img = <HTMLImageElement>e.path[0]
        if(img.offsetHeight<132){
            img.style.height = 132+'px';
        }
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
        let that = this;
        this.media_swiper = new Swiper('#swiper2',{
            on:{
                slideChange(swiper){
                    that.mediaSwiperCurrentIndex = swiper.activeIndex;
                }
            }
        })
    }

    public loadErr(index:number):void{
        this.$set(this.newsList[index],'error',true);
    }


    public loading():void{
        this.start.pageStart+=10;
        this.get_recommend();
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
    public getSubscriptions(sub_type: string, sub_oper_type: string, call: (res: AxiosResponse<any>) => void,start:number=0): void {
        this.axios.get('/v1/user/sub/?sub_type=' + sub_type + '&sub_oper_type=' + sub_oper_type +'&start='+ start + '&limit=0').then(res => {
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
                paras = { start:this.start.pageStart,size: 10 };
                break;
            default:
                cmd = 'query_channel';
                paras = { start:this.start.pageStart,name: this.active_recommend_name, size: 10 };
                break;
        }
        this.axios.post('/v1/cmd/', {
            cmd: cmd,
            paras: paras,
        }).then(res => {
            if(this.start.pageStart==0){
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
        this.start.pageStart = 0;
        this.finished = false;
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
        } else if (time <= (60 * 60 * 3)) {
            return `${parseInt(time / 60 / 60 + '')}小时前`
        } else {
            let year = date.getFullYear();
            let month = date.getMonth()+1;
            let day = date.getDate();
            let hour = date.getHours();
            let minits = date.getMinutes();
            return `${year}-${month>9?month:'0'+month}-${day>9?day:'0'+day} ${hour>9?hour:'0'+hour}:${minits>9?minits:'0'+minits}`;
        }
    }

    /**
     * 
     * @param type 关注类型
     * @param choise 是否选择
     * @param index 该类型索引
     */
    public toFollowPage(type:string,index:number):void{
        this.$router.push('/myfollow?item='+JSON.stringify({
            type:type,
            choise:true,
            index:index
        }))
    }
}