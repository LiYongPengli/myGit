
import { AxiosResponse } from 'axios';
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class';
@Component
export default class MyFollowCom extends Vue {
    @State('language') language!: string;
    public country: any[] = [];
    public people: any[] = [];
    public media: any[] = [];
    public list: any[] = [];
    public isfinished:boolean = false;

    public country_all: boolean = false;
    public media_all: boolean = false;
    public people_all: boolean = false;

    public filters = {
        search_after: [],
        size: 10,
        country: [] as any[],
        media: [] as any[],
        language: 'crawler',
        character: [] as any[]
    }

    public chooseNav: string = 'all';

    public listenChooseNav(newVal: string): void {
        this.chooseNav = newVal;
        this.filters.search_after = [];
        this.isfinished = false;
        this.list = [];
        switch (newVal) {
            case 'all':
                if(!this.country.length&&!this.media.length&&!this.people.length){
                    this.isfinished = true;
                    return;
                }
                this.getAllData();
                break;
            case 'country':
                this.filters.character = [];
                this.filters.media = [];
                this.filters.country = []
                this.country_all = true;
                if(!this.country.length){
                    this.isfinished = true;
                    return;
                }
                for (let i of this.country) {
                    this.filters.country.push(i.name);
                    i.choose = false;
                }
                this.getList();
                break;
            case 'media':
                this.filters.character = [];
                this.filters.media = [];
                this.filters.country = []
                this.media_all = true;
                if(!this.media.length){
                    this.isfinished = true;
                    return;
                }
                for (let i of this.media) {
                    this.filters.media.push(i.sub_id);
                    i.choose = false;
                }
                this.getList();
                break;
            case 'people':
                this.filters.character = [];
                this.filters.media = [];
                this.filters.country = []
                this.people_all = true;
                if(!this.people.length){
                    this.isfinished = true;
                    return;
                }
                for (let i of this.people) {
                    this.filters.character.push(i.name);
                    i.choose = false;
                }
                this.getList();
                break;
        }
    }

    //选择
    public choose(type: string,choise:boolean, index: number): void {
        switch (type) {
            case 'country':
                if(choise){
                    this.$set(this.country[index], 'choose', true);
                }else{
                    this.$set(this.country[index], 'choose', false);
                }
                this.filters.country = [];
                for (let i of this.country) {
                    if (i.choose) {
                        this.filters.country.push(i.name);
                    }
                }
                if(!this.filters.country.length){
                    this.country_all = true;
                    for(let i of this.country){
                        this.filters.country.push(i.name)
                    }
                }else{
                    this.country_all = false;
                }
                break;
            case 'media':
                if(choise){
                    this.$set(this.media[index], 'choose', true);
                }else{
                    this.$set(this.media[index], 'choose', false);
                }
                this.filters.media = [];
                for (let i of this.media) {
                    if (i.choose) {
                        this.filters.media.push(i.sub_id);
                    }
                }
                if(!this.filters.media.length){
                    this.media_all = true;
                    for(let i of this.media){
                        this.filters.media.push(i.sub_id)
                    }
                }else{
                    this.media_all = false;
                }
                break;
            case 'people':
                if(choise){
                    this.$set(this.people[index], 'choose', true);
                }else{
                    this.$set(this.people[index], 'choose', false);
                }
                this.filters.character = [];
                for (let i of this.people) {
                    if (i.choose) {
                        this.filters.character.push(i.name);
                    }
                }
                if(!this.filters.character.length){
                    this.people_all = true;
                    for(let i of this.people){
                        this.filters.character.push(i.name)
                    }
                }else{
                    this.people_all = false;
                }
                break;
        }
        this.list = [];
        this.filters.search_after = [];
        this.getList();
    }

    //设置图片高度
    public imgLoad(e:any):void{
        let img = <HTMLImageElement>e.path[0]
        if(img.offsetHeight<132){
            img.style.height = 132+'px';
        }
    }

    //资源加载失败
    public loaderr(index:number):void{
        this.$set(this.list[index],'error',true);
    }

    public created(): void {
        //获取国家列表
        this.getSubscriptions("country", "sub", (res) => {
            this.country = res.data.data;
            //获取人物列表
            this.getSubscriptions("character", "sub", (res) => {
                this.people = res.data.data;
                //获取媒体列表
                this.getSubscriptions("media", "sub", (res) => {
                    this.media = res.data.data;
                    if(this.$route.query.item){
                        let obj = JSON.parse(this.$route.query.item as string);
                        this.chooseNav = obj.type;
                        this.choose(obj.type,obj.choise,obj.index);
                        return;
                    }
                    this.getAllData();
                });
            });
        });


    }

    public showTrack(type:string,item:any):string{
        if(type=="ZH"){
            for(let i of item.attachments){
                if(i.position=='SUBTITLES_ZH'){
                    return i.url;
                }
            }
        }else{
            for(let i of item.attachments){
                if(i.position=='SUBTITLES_RAW'){
                    return i.url;
                }
            }
        }
        return '';
    }

    //获取频道等列表
    private getSubscriptions(sub_type: string, sub_oper_type: string, call: (res: AxiosResponse<any>) => void,start:number=0): void {
        this.axios.get('/v1/user/sub/?sub_type=' + sub_type + '&sub_oper_type=' + sub_oper_type + '&limit=0&start='+start).then(res => {
            call(res);
        }).catch(err => {
            console.log(err);
        })
    }

    //全部关注
    private getAllData(): void {
        this.filters.character = [];
        this.filters.media = [];
        this.filters.country = []
        for (let i of this.country) {
            this.filters.country.push(i.name)
        }
        for (let i of this.media) {
            this.filters.media.push(i.sub_id)
        }
        for (let i of this.people) {
            this.filters.character.push(i.name)
        }
        this.getList();
    }


    //获取列表
    private getList(): void {
        let filters: any = {}
        for (let i in this.filters) {
            if (this.filters[i].constructor == Array) {
                if (this.filters[i].length) {
                    filters[i] = this.filters[i];
                }
            } else {
                filters[i] = this.filters[i];
            }
        }
        this.axios.post('/v1/cmd/', {
            cmd: 'my_sub_news',
            paras: filters
        }).then(res => {
            console.log(res.data);
            this.filters.search_after = res.data.data.search_after;
            if(res.data.data.search_after.length){
                this.list = this.list.concat(res.data.data.news);
            }else{
                this.list = res.data.data.news;
            }
            if(!res.data.data.news.length){
                this.isfinished = true;
            }
        }).catch(err => {
            console.log(err);
        })
    }

    //全部
    public all(type: string): void {
        switch (type) {
            case 'country':
                this.filters.country = [];
                for (let i = 0; i < this.country.length; i++) {
                    this.country[i].choose = false;
                    this.filters.country.push(this.country[i].name);
                }
                this.country_all = true;
                break;
            case 'media':
                this.filters.media = [];
                for (let i = 0; i < this.media.length; i++) {
                    this.media[i].choose = false;
                    this.filters.media.push(this.media[i].sub_id);
                }
                this.media_all = true;
                break;
            case 'people':
                this.filters.character = [];
                for (let i = 0; i < this.people.length; i++) {
                    this.people[i].choose = false;
                    this.filters.character.push(this.people[i].name);
                }
                this.people_all = true;
                break;
        }
        this.filters.search_after = [];
        this.getList();
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
        window.open('#/newsinfo?id=' + item.news_id+'&md_id='+item.media_id);
    }
}