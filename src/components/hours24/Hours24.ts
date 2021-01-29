
import { Component, Vue, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class';
const Scroll = require('vue-seamless-scroll');
Vue.component('vue-seamless-scroll',Scroll)
@Component
export default class Hours24Com extends Vue {
    
    //24小时列表
    public hours_24: any[] = [];
    //滚动配置
    public scrollOption = {
        //滚动速度
        step:0.5
    }
    @State('topic_show') topic_show!: boolean;
    @State('language') language!: string;
    @State('mainPageScrollTop') mainPageScrollTop!: number;

    public created(): void {
        this.get24Hour();
    }

    public beforeDestroy():void{
        // this.clearAutoPlay();
    }

    //获取24小时数据
    private get24Hour(): void {
        this.axios.post('/v1/cmd/', {
            cmd: 'hours24',
            paras: { size: 100 }
        }).then(res => {
            this.hours_24 = res.data.data.news;
        }).catch(err => {
            console.log(err);
        })
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

    public toNewsInfo(item:any):void{
        window.open('#/newsinfo?id='+item.news_id+'&md_id='+item.media_id)
    }

    public toFollowPage(item:any,index:number):void{
        // console.log(item);
        // return;
        // this.$router.push('/myfollow?item='+JSON.stringify({
        //     type:'media',
        //     choise:true,
        //     name:item.media_name_zh,
        // }))
    }
}