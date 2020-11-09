import { baseApi } from '@/axios/axios';
import { Component, Vue } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
@Component
export default class IntelligentRetrievalCom extends Vue {
    @Mutation('setShowIntelligent') setShowIntelligent: any;
    public searchText: string = "";
    //初次检索后的数据
    public searchData: any = "";

    public showSearch = true;

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
                paras: { keywords: this.searchText.split(" "), start: 1, size: 10 },
            })
            .then((res) => {
                console.log(res.data);
                this.searchData = res.data.data;
            })
            .catch((err) => {
                console.log(err)
            })
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
}