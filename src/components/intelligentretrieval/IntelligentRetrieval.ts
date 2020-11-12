import { baseApi } from '@/axios/axios';
import { Component, Vue } from 'vue-property-decorator'
import { Mutation, State } from 'vuex-class'
@Component
export default class IntelligentRetrievalCom extends Vue {
    @State("user_message") user_message: any;
    @Mutation('setShowIntelligent') setShowIntelligent: any;
    public searchText: string = "";
    public clearDate: boolean = false;
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

    //过滤菜单
    public countryList: any[] = [];
    public mediaList: any[] = [];
    public characterList: any[] = [];

    public language: string = "crawler"
    //初次检索后的数据
    public searchData: any = "";
    public newsList: any[] = [];
    private dateTime = {
        time_from: '',
        time_to: '',
    }
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
    ];
    public filter = {
        search_after: [] as any[],
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
                paras: { language: this.language, keywords: this.searchText.split(" "), size: this.filter.size },
            })
            .then((res) => {
                console.log(res.data);
                this.searchData = res.data.data;
                this.countryList = res.data.data.filters.country;
                this.mediaList = res.data.data.filters.media;
                this.characterList = res.data.data.filters.character;
                this.newsList = res.data.data.news;
                this.filter.search_after = res.data.data.search_after;
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
                } else if (i == 'search_after') {
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
            if (!this.filter.search_after.length) {
                this.newsList = res.data.data.news;
            } else {
                this.newsList = this.newsList.concat(res.data.data.news);
                this.filter.search_after = res.data.data.search_after
            }
            if (!res.data.data.news.length) {
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
                        this.$set(this.filter.media, 0, item.name.en);
                    } else {
                        let flag = false;
                        for (let i = 0; i < this.filter.media.length; i++) {
                            if (item.name.en == this.filter.media[i]) {
                                this.$delete(this.filter.media, i);
                                flag = true;
                                return;
                            }
                        }
                        if (!flag) {
                            this.$set(this.filter.media, this.filter.media.length, item.name.en);
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
        this.filter.language = language;
        this.filter.search_after = [];
        this.finished = false;
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
        this.filter.search_after = [];
        this.finished = false;
        this.toFilter();
    }

    //自定义日期筛选
    public dateChange(obj: { index: string; value: Date | String }): void {
        let date = obj.value as Date;
        this.clearDate = false;
        if (obj.index == '0') {
            try {
                this.dateTime.time_from = date.toLocaleDateString();
            } catch (error) {
                this.dateTime.time_from = ""
            }
        } else {
            try {
                this.dateTime.time_to = date.toLocaleDateString();
            } catch (error) {
                this.dateTime.time_to = ""
            }
        }
        if (this.dateTime.time_from && this.dateTime.time_to) {
            this.filter.search_after = [];
            this.finished = false;
            this.dayFilter = false;
            this.weekFilter = false;
            this.monthFilter = false;
            this.filter.time_from = this.dateTime.time_from;
            this.filter.time_to = this.dateTime.time_to;
            this.toFilter();
        } else if (!this.dateTime.time_from && !this.dateTime.time_to) {
            this.filter.time_from = "";
            this.filter.time_to = "";
            this.filter.search_after = [];
            this.finished = false;
            this.dayFilter = false;
            this.weekFilter = false;
            this.monthFilter = false;
            this.filter.time_from = this.dateTime.time_from;
            this.filter.time_to = this.dateTime.time_to;
            this.toFilter();
        }
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
        }
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
            language: this.language,
            sort_type: 'r',
            media: [],
            character: [],
            time_from: '',
            time_to: '',
        }
    }

    //记录搜索历史
    public setHistory(): void {
        let user_history = localStorage.getItem("user_history");
        if (user_history) {
            let user_history_parse = JSON.parse(user_history);
            if (user_history_parse[this.user_message.phone_number]) {
                if (
                    !~user_history_parse[this.user_message.phone_number].indexOf(
                        this.searchText
                    )
                ) {
                    if (user_history_parse[this.user_message.phone_number].length >= 10) {
                        user_history_parse[this.user_message.phone_number].pop();
                        user_history_parse[this.user_message.phone_number].unshift(
                            this.searchText
                        );
                    } else {
                        user_history_parse[this.user_message.phone_number].unshift(
                            this.searchText
                        );
                    }
                }
            } else {
                user_history_parse[this.user_message.phone_number] = [this.searchText];
            }
            localStorage.setItem("user_history", JSON.stringify(user_history_parse));
        } else {
            let obj: any = {};
            obj[this.user_message.phone_number] = [this.searchText];
            localStorage.setItem("user_history", JSON.stringify(obj));
        }
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
                    for (let i of this.searchData.filters.country) {
                        if (i.letter == filter.name) {
                            arr.push(i)
                        }
                    }
                    this.countryList = arr;
                    break;
                case 'media':
                    for (let i of this.searchData.filters.media) {
                        if (i.letter == filter.name) {
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

    /**
     * 多选
     * @param type 类型
     */
    public multiple(type: string): void {
        switch (type) {
            case 'country':
                this.showCountry = true;
                this.multipleCountry = true;
                break;
            case 'media':
                this.showMedia = true;
                this.multipleMedia = true;
                break;
            case 'character':
                this.showCharacter = true;
                this.multipleCharacter = true;
                break;
        }
    }

    //取消多选
    public noMultiple(type: string): void {
        switch (type) {
            case 'country':
                this.multipleCountry = false;
                this.filter.country = [];
                break;
            case 'media':
                this.multipleMedia = false;
                this.filter.media = [];
                break;
            case 'character':
                this.multipleCharacter = false;
                this.filter.character = [];
                break;
        }
        this.filter.search_after = [];
        this.finished = false;
        this.toFilter();
    }

    //多选确定
    public multipleSure(type: string): void {
        switch (type) {
            case 'country':
                this.showCountry = false;
                this.multipleCountry = false;
                break;
            case 'media':
                this.showMedia = false;
                this.multipleMedia = false;
                break;
            case 'character':
                this.showCharacter = false;
                this.multipleCharacter = false;
                break;
        }
        this.filter.search_after = [];
        this.finished = false;
        this.toFilter();
    }
}