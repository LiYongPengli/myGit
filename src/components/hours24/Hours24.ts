import { baseApi } from '@/axios/axios';
import { Component, Vue, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class';
import Swiper from 'swiper'
@Component
export default class Hours24Com extends Vue {
    public eshour: boolean = true;
    //24小时列表滑动组件
    public list_24!: Swiper;
    //24小时轮播定时器
    public list_24_auto: any = null;
    public slide_index: number = 4;
    public count:number = 0;
    
    public iswheel:boolean = false;
    //24小时列表
    public hours_24: any[] = [];
    @State('topic_show') topic_show!: boolean;
    @State('language') language!: string;
    @State('mainPageScrollTop') mainPageScrollTop!: number;

    @Watch('topic_show')
    public topic_show_change(): void {
        this.eshour = !this.topic_show;

    }

    public created(): void {
        this.get24Hour();
    }

    public beforeDestroy():void{
        this.clearAutoPlay();
    }

    //获取24小时数据
    private get24Hour(): void {
        this.axios.post(baseApi.api2 + '/v1/cmd/', {
            cmd: 'hours24',
            paras: { size: 20 }
        }).then(res => {
            this.hours_24 = res.data.data;
            console.log(this.hours_24,"sss")
            setTimeout(() => {
                this.init_24HourCom();
            }, 200)
        }).catch(err => {
            console.log(err);
        })
    }

    private init_24HourCom(): void {
        if (this.list_24) {
            this.list_24.update();
            return;
        }
        this.list_24 = new Swiper('.list24', {
            direction: 'vertical',
            slidesPerView: 4,
            slidesPerGroup: 1,
            loop: true
        })
        this.autoPlay();
    }

    //清除自动播放
    public clearAutoPlay(): void {
        clearInterval(this.list_24_auto);
    }
    private slides(type:string):void{
        if(type=='next'){
            this.list_24.slideNext(1000);
        }else{
            this.list_24.slidePrev(1000);
        }
        
    }

    public autoPlay(): void {
        this.list_24_auto = setInterval(() => {
            this.slides('next');
            this.count++
            if(this.count>50){
                this.get24Hour();
                this.count = 0;
            }
        }, 3000)
    }

    //滚轮事件
    public toWheel(e:any):void{
        if(this.iswheel){
            return;
        }
        this.iswheel = true;
        if(e.wheelDelta>0){
            this.slides('up');
        }else{
            this.slides('next');
        }
        setTimeout(()=>{
            this.iswheel = false;
        },1000)
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

    public toNewsInfo(item:any):void{
        window.open('#/newsinfo?id='+item.news_id+'&md_id='+item.media_id)
    }
}