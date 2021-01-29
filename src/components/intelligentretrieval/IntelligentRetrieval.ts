
import IDBDriver from '@/libs/IdbDriver';
import {  Component, Vue } from 'vue-property-decorator'
import { Mutation, State } from 'vuex-class'
@Component
export default class IntelligentRetrievalCom extends Vue {
    @State("user_message") user_message: any;
    @Mutation('setShowIntelligent') setShowIntelligent: any;
    public searchText: string = "";
    //加载中
    public loading: boolean = false;
    //加载完成
    public finished: boolean = false;
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

    public searchList: any[] = [];
    public showSearchList: boolean = false;
    public timer: any = null;

    //过滤菜单
    public countryList: any[] = [];
    public mediaList: any[] = [];
    public characterList: any[] = [];

    public language: string = "crawler"
    //初次检索后的数据
    public searchData: any = "";
    public newsList: any[] = [];
    private dateTime: Date[] = [];
    public showSearch = true;
    public filterMenu = [
        { name: 'A', choose: false },
        { name: 'B', choose: false },
        { name: 'C', choose: false },
        { name: 'D', choose: false },
        { name: 'E', choose: false },
        { name: 'F', choose: false },
        { name: 'G', choose: false },
        { name: 'H', choose: false },
        { name: 'I', choose: false },
        { name: 'J', choose: false },
        { name: 'K', choose: false },
        { name: 'L', choose: false },
        { name: 'M', choose: false },
        { name: 'N', choose: false },
        { name: 'O', choose: false },
        { name: 'P', choose: false },
        { name: 'Q', choose: false },
        { name: 'R', choose: false },
        { name: 'S', choose: false },
        { name: 'T', choose: false },
        { name: 'U', choose: false },
        { name: 'V', choose: false },
        { name: 'W', choose: false },
        { name: 'X', choose: false },
        { name: 'Y', choose: false },
        { name: 'Z', choose: false },
        { name: '其他', choose: false },
    ];

    public cache_country: string[] = [];
    public cache_media: string[] = [];
    public cache_character: string[] = [];
    public filter = {
        search_after: [] as any[],
        size: 10 as number,
        country: [] as string[],
        language: 'crawler',
        sort_type: 'r',
        media: [] as string[],
        character: [] as string[],
        time_from: '',
        time_to: '',
    }

    public created(): void {

    }
    public focus():void{
        setTimeout(() => {
            this.showSearchList = true;
        }, 200)
    }
    public blur(): void {
        setTimeout(() => {
            this.showSearchList = false;
        }, 200)
    }

    public listenSearch(): void {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            this.getSearchList(this.searchText);
        }, 600);
    }

    private getSearchList(val: string): void {
        if (!val) {
            return;
        }
        this.axios
            .post("/v1/cmd/", {
                cmd: "search_suggestion",
                paras: { keyword: val },
            })
            .then((res) => {
                this.searchList = res.data.data;
                if(this.searchList.length){
                    this.showSearchList = true;
                }else{
                    this.showSearchList = false;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
    public clickList(item: string): void {
        this.filter.search_after = [];
        this.searchText = item;
        this.setHistory();
        this.searchNews();
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
            .post('/v1/cmd/', {
                cmd: 'search_news',
                paras: { keywords: this.searchText.split(" ")},
            })
            .then((res) => {
                console.log(res.data);
                this.searchData = res.data.data;
                this.countryList = res.data.data.filters.country;
                this.mediaList = res.data.data.filters.media;
                this.characterList = res.data.data.filters.character;
                this.toFilter();
                // this.newsList = res.data.data.news;
                // this.filter.search_after = res.data.data.search_after;
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
                    filter[i] = this.filter[i].slice(0)
                } else if (i == 'search_after') {
                    filter[i] = this.filter[i]
                }
            } else if (this.filter[i]) {
                filter[i] = this.filter[i];
            }
        }
        if (filter.country) {
            this.cache_country = filter.country.slice(0);
        } else {
            this.cache_country = [];
        }
        if (filter.media) {
            this.cache_media = filter.media.slice(0);
        } else {
            this.cache_media = [];
        }
        if (filter.character) {
            this.cache_character = filter.character.slice(0);
        } else {
            this.cache_character = [];
        }
        filter.keywords = this.searchText.split(" ");
        this.axios.post('/v1/cmd/', {
            cmd: 'filter_news',
            paras: filter
        }).then(res => {
            if (!this.filter.search_after.length) {
                this.newsList = res.data.data.news;
            } else {
                console.log(res.data.data.search_after)
                let arr = [];
                let news = res.data.data.news as any[];
                for(let i of news){
                    let flag = false;
                    for(let j of this.newsList){
                        if(i.news_id==j.news_id){
                            flag = true;
                        }
                    }
                    if(!flag){
                        arr.push(i)
                    }
                }
                this.newsList = this.newsList.concat(arr);
            }
            this.filter.search_after = res.data.data.search_after
            if (res.data.data.over) {
                this.finished = true;
            }
            this.loading = false;
            
        }).catch(err => {
            console.log(err);
        })
    }
    //加载更多
    public loadMore(): void {
        if (this.loading) {
            return;
        }
        if (this.finished) {
            return;
        }
        this.loading = true;
        this.toFilter();
    }

    public getFilterMedia():string{
        let arr:string[] = [];
        for(let i of this.filter.media){
            for(let j of this.mediaList){
                if(i==j.media_id){
                    arr.push(j.name.en)
                }
            }
        }
        return arr.join('、');
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
                    } else {
                        let flag = false;
                        for (let i = 0; i < this.filter.country.length; i++) {
                            if (item.name.en == this.filter.country[i]) {
                                this.$delete(this.filter.country, i);
                                flag = true;
                                return;
                            }
                        }
                        if (!flag) {
                            this.$set(this.filter.country, this.filter.country.length, item.name.en);
                        }
                        return;
                    }
                }
                break;
            case 'media':
                if (!item) {
                    this.$set(this.filter, 'media', [])
                } else {
                    if (!this.multipleMedia) {
                        this.$set(this.filter.media, 0, item.media_id);
                    } else {
                        let flag = false;
                        for (let i = 0; i < this.filter.media.length; i++) {
                            if (item.media_id == this.filter.media[i]) {
                                this.$delete(this.filter.media, i);
                                flag = true;
                                return;
                            }
                        }
                        if (!flag) {
                            this.$set(this.filter.media, this.filter.media.length, item.media_id);
                        }
                        return;
                    }
                }
                break;
            case 'character':
                if (!item) {
                    this.$set(this.filter, 'character', [])
                } else {
                    if (!this.multipleCharacter) {
                        this.$set(this.filter.character, 0, item);
                    } else {
                        let flag = false;
                        for (let i = 0; i < this.filter.character.length; i++) {
                            if (item == this.filter.character[i]) {
                                this.$delete(this.filter.character, i);
                                flag = true;
                                return;
                            }
                        }
                        if (!flag) {
                            this.$set(this.filter.character, this.filter.character.length, item);
                        }
                        return;
                    }
                }
                break;
        }
        this.filter.search_after = [];
        this.finished = false;
        this.toFilter();
    }
    /**
     * 设置语言
     * @param language 语言参数
     */
    public setLanguage(language: string): void {
        this.language = language;

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

    //指定日期筛选
    public setFilterTime(days: number): void {
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
        this.filter.search_after = [];
        this.finished = false;
        this.toFilter();
    }

    //自定义日期筛选
    public dateChange(): void {
        if (!this.dateTime) {
            this.filter.time_from = this.filter.time_to = "";
        } else {
            this.filter.time_from = this.dateTime[0].toLocaleDateString();
            this.filter.time_to = this.dateTime[1].toLocaleDateString();
        }
        this.filter.search_after = [];
        this.finished = false;
        this.dayFilter = false;
        this.weekFilter = false;
        this.monthFilter = false;
        this.toFilter();
    }

    //相关度和时间排序
    public sortList(type: string): void {
        this.filter.sort_type = type;
        this.filter.search_after = [];
        this.finished = false;
        this.toFilter();
    }

    public toNewsInfo(item: any): void {
        window.open('#/newsinfo?id=' + item.news_id + '&md_id=' + item.media_id);
    }

    //去搜索
    public toSearch(e: KeyboardEvent): void {
        if (e.keyCode == 13) {
            if (!this.searchText) {
                return;
            }
            this.setHistory();
            this.clearFilter();
            this.searchNews();
            this.showSearchList = false;
        }
    }
    //去搜索
    public toClickSearch(): void {
        if (!this.searchText) {
            return;
        }
        this.setHistory();
        this.clearFilter();
        this.searchNews();
    }

    //清空过滤条件
    private clearFilter(): void {
        this.weekFilter = false;
        this.dayFilter = false;
        this.monthFilter = false;
        this.filter = {
            search_after: [],
            size: 10,
            country: [],
            language: 'crawler',
            sort_type: 'r',
            media: [],
            character: [],
            time_from: '',
            time_to: '',
        }
    }

    //记录搜索历史
    public setHistory(): void {
        let idbdriver = IDBDriver.getInstance();
        idbdriver.read(this.user_message.phone_number).then(res=>{
            let historyList = <string[]>res?.historys;
            for(let i of historyList){
                if(i==this.searchText){
                  return;
                }
              }
              if(historyList.length>=10){
                historyList.pop();
              }
              historyList.unshift(this.searchText);
              idbdriver.put(this.user_message.phone_number,historyList).catch(err=>{
                console.log(err);
              })
        })
    }

    /**
     * 对过滤菜单进行筛选
     * @param type 菜单类型
     * @param filter 筛选拼音首字母
     * @returns {void}
     */
    public toFilterMenu(type: string, filter: { name: string; choose: boolean }): void {
        for (let i = 0; i < this.filterMenu.length; i++) {
            if (this.filterMenu[i].name != filter.name) {
                this.filterMenu[i].choose = false;
            }
        }
        if (!filter.choose) {
            let arr: any[] = [];
            switch (type) {
                case 'country':
                    console.log(this.searchData.filters.country)
                    for (let i of this.searchData.filters.country) {
                        if (~i.letter.indexOf(filter.name)) {
                            arr.push(i)
                        }
                    }
                    this.countryList = arr;
                    break;
                case 'media':
                    for (let i of this.searchData.filters.media) {
                        if (~i.letter.indexOf(filter.name)) {
                            arr.push(i)
                        }
                    }
                    this.mediaList = arr;
                    break;
            }
        } else {
            switch (type) {
                case 'country':
                    this.countryList = this.searchData.filters.country;
                    break;
                case 'media':
                    this.mediaList = this.searchData.filters.media;
                    break;
            }
        }
        filter.choose = !filter.choose;
    }

    private clearFilterMenu(): void {
        for (let i = 0; i < this.filterMenu.length; i++) {
            this.filterMenu[i].choose = false;
        }
        this.countryList = this.searchData.filters.country;
        this.mediaList = this.searchData.filters.media;
    }

    /**
     * 多选
     * @param type 类型
     */
    public multiple(type: string): void {
        switch (type) {
            case 'country':
                this.showCountry = true;
                this.multipleCountry = true;
                this.showMedia = false;
                this.multipleMedia = false;
                this.showCharacter = false;
                this.multipleCharacter = false;
                break;
            case 'media':
                this.showMedia = true;
                this.multipleMedia = true;
                this.showCountry = false;
                this.multipleCountry = false;
                this.showCharacter = false;
                this.multipleCharacter = false;
                break;
            case 'character':
                this.showCharacter = true;
                this.multipleCharacter = true;
                this.showMedia = false;
                this.multipleMedia = false;
                this.showCountry = false;
                this.multipleCountry = false;
                break;
        }
        this.clearFilterMenu();
    }
    //更多
    public showMore(type: string): void {
        switch (type) {
            case 'country':
                this.showCountry = !this.showCountry;
                this.showMedia = false;
                this.showCharacter = false;
                break;
            case 'media':
                this.showMedia = !this.showMedia;
                this.showCountry = false;
                this.showCharacter = false;
                break;
            case 'character':
                this.showCharacter = !this.showCharacter;
                this.showCountry = false;
                this.showMedia = false;
                break;
        }
        this.clearFilterMenu();
    }

    //取消多选
    public noMultiple(type: string): void {
        this.showCountry = false;
        this.multipleCountry = false;
        this.showMedia = false;
        this.multipleMedia = false;
        this.showCharacter = false;
        this.multipleCharacter = false;
        switch (type) {
            case 'country':
                this.filter.country = this.cache_country.slice(0);
                break;
            case 'media':
                this.filter.media = this.cache_media.slice(0);
                break;
            case 'character':
                this.filter.character = this.cache_character.slice(0);
                break;
        }
        this.clearFilterMenu();
        // this.filter.search_after = [];
        // this.finished = false;
        // this.toFilter();
    }
    //清空多选
    public clearMultiple(type: string): void {
        switch (type) {
            case 'country':
                this.multipleCountry = false;
                this.showCountry = false;
                this.filter.country = [];
                break;
            case 'media':
                this.multipleMedia = false;
                this.showMedia = false;
                this.filter.media = [];
                break;
            case 'character':
                this.multipleCharacter = false;
                this.showCharacter = false;
                this.filter.character = [];
                break;
        }
        this.filter.search_after = [];
        this.finished = false;
        this.clearFilterMenu();
        this.toFilter();
    }

    //多选确定
    public multipleSure(type: string): void {
        this.showCountry = false;
        this.multipleCountry = false;
        this.showMedia = false;
        this.multipleMedia = false;
        this.showCharacter = false;
        this.multipleCharacter = false;
        this.filter.search_after = [];
        this.finished = false;
        this.toFilter();
        this.clearFilterMenu();
    }
}