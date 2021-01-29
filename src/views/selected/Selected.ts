
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Mutation, State } from 'vuex-class';
@Component
export default class SelectedCom extends Vue {
    @State('language') language!: string;
    @State('mainPageLoading') mainPageLoading!: boolean;
    public list: any[] = [];
    public initData: boolean = true;
    public isfinished: boolean = false;
    public chooseNav: string = '詹姆斯·科登今晚秀';
 

    public menu_list = [
        // 'The Late Late Show with James Corden',
        // 'Late Night with Seth Meyers',
        // 'The Tonight Show Starring Jimmy Fallon'
        // '詹姆斯·科登今晚秀',
        // '塞思·迈耶斯今晚秀 ',
        // '吉米·法伦今晚秀'
        {
            zh_name: '詹姆斯·科登今晚秀',
            name: 'The Late Late Show with James Corden',
        },
        {
            zh_name: '塞思·迈耶斯今晚秀',
            name: 'Late Night with Seth Meyers',
        },
        {
            zh_name: '吉米·法伦今晚秀',
            name: 'The Tonight Show Starring Jimmy Fallon',

        }
    ]

    public filters = {
        start: 0,
        size: 10
    }

    public chooseNav: string = 'The Late Late Show with James Corden';
    @Mutation('setMainPageLoading') setMainPageLoading!: any;

    @Watch('mainPageLoading')
    public loadingChange(newVal: boolean, oldVal: boolean): void {
        if (newVal && !this.isfinished) {
            this.getList();
        }
    }

    public listenChooseNav(newVal: string): void {
        console.log(newVal);
        this.chooseNav = newVal;
        this.filters.start = 0;
        this.getList();
    }

    public created(): void {
        this.getList();
    }


    //获取列表
    private getList(): void {
        this.axios.post('/v1/cmd/', {
            cmd: 'ytb_featured_news',
            paras: { author: this.chooseNav, start: this.filters.start, size: this.filters.size }
        }).then(res => {
            console.log(res.data);
            this.initData = false;
            if (this.filters.start != 0) {
                this.list = this.list.concat(res.data.data);
                console.log(this.list)
            } else {
                this.list = res.data.data;
            }
            if (!res.data.data.length) {
                this.isfinished = true;
            }
            this.filters.start += 10;
            this.setMainPageLoading(false);
        }).catch(err => {
            console.log(err);
        })
    }

    public toNewsInfo(item: any): void {
        // window.open('#/newsinfo?id=' + item.news_id+'&md_id='+item.media_id);
    }
}