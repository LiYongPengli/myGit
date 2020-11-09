import { baseApi } from '@/axios/axios';
import { Component, Vue } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
@Component
export default class IntelligentRetrievalCom extends Vue {
    @Mutation('setShowIntelligent') setShowIntelligent: any;
    public searchText: string = "";
    public clearDate:boolean = false;
    //多选开关
    public multipleCountry: boolean = false;
    public multipleCharacter: boolean = false;
    public multipleMedia: boolean = false;
    //展示开关
    public showCountry: boolean = false;
    public showMedia: boolean = false;
    public showCharacter: boolean = false;
    //时间过滤
    public dayFilter: boolean = false;
    public weekFilter: boolean = false;
    public monthFilter: boolean = false;

    public language: string = "crawler"
    //初次检索后的数据
    public searchData: any = "";
    public newsList: any[] = [];
    private dateTime = {
        time_from: '',
        time_to: '',
    }
    public showSearch = true;
    public filter = {
        start: 1 as number,
        size: 10 as number,
        country: [] as string[],
        language: this.language,
        sort_type: 'r',
        media: [] as string[],
        character: [] as string[],
        time_from: '',
        time_to: '',
    }

    public created(): void {

    }

    public getSearchText(searchText: string): void {
        if (searchText) {
            this.searchText = searchText;
            this.showSearch = false;
            this.searchNews();
        }
    }

    private searchNews() {
        this.axios
            .post(baseApi.api2 + '/v1/cmd/', {
                cmd: 'search_news',
                paras: { language: this.language, keywords: this.searchText.split(" "), start: this.filter.start, size: this.filter.size },
            })
            .then((res) => {
                console.log(res.data);
                this.searchData = res.data.data;
                this.newsList = res.data.data.news;
            })
            .catch((err) => {
                console.log(err)
            })
    }
    //高级过滤
    private toFilter(): void {
        let filter: any = {}
        for (let i in this.filter) {
            if (this.filter[i].constructor == Array) {
                if (this.filter[i].length) {
                    filter[i] = this.filter[i]
                }
            } else if (this.filter[i]) {
                filter[i] = this.filter[i];
            }
        }
        filter.keywords = this.searchText.split(" ");
        this.axios.post(baseApi.api2 + '/v1/cmd/', {
            cmd: 'filter_news',
            paras: filter
        }).then(res => {
            this.newsList = res.data.data.news;
        }).catch(err => {
            console.log(err);
        })
    }

    /**
     * 
     * @param type 筛选类型
     * @param item item
     */
    public chooseitem(type: string, item: any): void {
        switch (type) {
            case 'country':
                if (!item) {
                    this.$set(this.filter, 'country', [])
                } else {
                    if (!this.multipleCountry) {
                        this.$set(this.filter.country, 0, item.name.en);
                    }
                }
                break;
            case 'media':
                if (!item) {
                    this.$set(this.filter, 'media', [])
                } else {
                    if (!this.multipleMedia) {
                        this.$set(this.filter.media, 0, item.name.en);
                    }
                }
                break;
            case 'character':
                if (!item) {
                    this.$set(this.filter, 'character', [])
                } else {
                    if (!this.multipleCharacter) {
                        this.$set(this.filter.character, 0, item);
                    }
                }
                break;
        }
        this.filter.start = 1;
        this.toFilter();
    }
    /**
     * 设置语言
     * @param language 语言参数
     */
    public setLanguage(language: string): void {
        this.language = language;
        this.filter.language = language;
        this.toFilter();
    }

    /**
     * 格式化时间
     * @param str 输入时间字符串
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

    /**
     * 
     * @param type 列表类型
     * @param list 筛选菜单列表
     * @returns {any[]}
     */
    public getFilterList(type: string, list: any[]): any[] {
        let flag = false;
        switch (type) {
            case 'country':
                if (this.showCountry) {
                    flag = true;
                }
                break;
            case 'media':
                if (this.showMedia) {
                    flag = true;
                }
                break;
            case 'character':
                if (this.showCharacter) {
                    flag = true;
                }
                break;
        }
        if (flag) {
            return list;
        } else {
            return list.slice(0, 5);
        }
    }

    //指定日期筛选
    public setFilterTime(days: number): void {
        this.clearDate = true;
        switch (days) {
            case 0:
                this.weekFilter = false;
                this.monthFilter = false;
                if (this.dayFilter) {
                    this.dayFilter = false;
                    this.filter.time_from = this.filter.time_to = "";
                } else {
                    this.dayFilter = true;
                    this.filter.time_from = this.filter.time_to = new Date().toLocaleDateString();
                }
                break;
            case 7:
                this.dayFilter = false;
                this.monthFilter = false;
                if (this.weekFilter) {
                    this.weekFilter = false;
                    this.filter.time_from = this.filter.time_to = "";
                } else {
                    this.weekFilter = true;
                    this.filter.time_to = new Date().toLocaleDateString();
                    this.filter.time_from = new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000)).toLocaleDateString();
                }
                break;
            case 30:
                this.dayFilter = false;
                this.weekFilter = false;
                if (this.monthFilter) {
                    this.monthFilter = false;
                    this.filter.time_from = this.filter.time_to = "";
                } else {
                    this.monthFilter = true;
                    this.filter.time_to = new Date().toLocaleDateString();
                    this.filter.time_from = new Date(new Date().getTime() - (30 * 24 * 60 * 60 * 1000)).toLocaleDateString();
                }
                break;

        }
        this.filter.start = 1;
        this.toFilter();
    }

    //自定义日期筛选
    public dateChange(obj:{index:string;value:Date|String}):void{
        let date = obj.value as Date;
        this.clearDate = false;
        if(obj.index=='0'){
            try{
                this.dateTime.time_from = date.toLocaleDateString();
            }catch(error){
                this.dateTime.time_from = ""
            }
        }else{
            try{
                this.dateTime.time_to = date.toLocaleDateString();
            }catch(error){
                this.dateTime.time_to = ""
            }
        }
        if(this.dateTime.time_from&&this.dateTime.time_to){
            this.filter.start = 1;
            this.dayFilter = false;
            this.weekFilter = false;
            this.monthFilter = false;
            this.filter.time_from = this.dateTime.time_from;
            this.filter.time_to = this.dateTime.time_to;
            this.toFilter();
        }else if(!this.dateTime.time_from&&!this.dateTime.time_to){
            this.filter.time_from = "";
            this.filter.time_to = "";
            this.filter.start = 1;
            this.dayFilter = false;
            this.weekFilter = false;
            this.monthFilter = false;
            this.filter.time_from = this.dateTime.time_from;
            this.filter.time_to = this.dateTime.time_to;
            this.toFilter();
        }
    }

    //相关度和时间排序
    public sortList(type:string):void{
        this.filter.sort_type = type;
        this.filter.start = 1;
        this.toFilter();
    }

    public toNewsInfo(item:any):void{
        window.open('#/newsinfo?id=' + item.news_id+'&md_id='+item.media_id);
    }
}