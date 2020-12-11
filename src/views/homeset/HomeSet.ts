import { baseApi } from '@/axios/axios';
import { AxiosResponse } from 'axios';
import { Component, Vue, Watch } from 'vue-property-decorator'
@Component
export default class HomeSetCom extends Vue {
    public show = false;
    public searchText: string = "";
    public loadCountry:boolean = true;
    //搜索防抖
    private search_timeout: any = null;
    //目前所处的页码
    public pageIndex: number = 0;
    public sub_form = {
        country: [] as {name:string;id:string}[],
        media: [] as {name:string;id:string}[],
        character: [] as {name:string;id:string}[],
        channel: [] as {name:string;id:string}[]
    }
    private page_data = {
        country_list: [] as any[],
        character_list: [] as any[],
        channel_list: [] as any[],
        media_list: {
            week: [] as any[],
            month: [] as any[],
            other:[]  as any[]
        },
    }
    public country_list: any[] = [];
    public character_list: any[] = [];
    public channel_list: any[] = [];
    public media_list: { week: any[]; month: any[],other:any[] } = {
        week: [],
        month: [],
        other:[]
    }

    @Watch('searchText')
    public searchChange(newVal: string, oldVal: string): void {
        if (this.search_timeout) {
            clearTimeout(this.search_timeout);
        }
        this.search_timeout = setTimeout(() => {
            switch (this.pageIndex) {
                case 0:
                    this.searchCountry(newVal);
                    break;
                case 1:
                    this.searchMedia(newVal);
                    break;
                case 2:
                    this.searchCharacter(newVal);
                    break;
                case 3:
                    this.searchChannel(newVal);
                    break;
            }
        }, 1000)

    }

    public created(): void {
        this.getSubscriptions("country", "unsub", res => {
            this.country_list = res.data.data;
            this.page_data.country_list = res.data.data;
            this.loadCountry = false;
        })
    }

    //获取频道等列表
    public getSubscriptions(sub_type: string, sub_oper_type: string, call: (res: AxiosResponse<any>) => void): void {
        this.axios.get(baseApi.api2 + '/v1/user/sub/?sub_type=' + sub_type + '&sub_oper_type=' + sub_oper_type + '&limit=0').then(res => {
            call(res);
        }).catch(err => {
            console.log(err);
        })
    }

    //搜索匹配国家
    private searchCountry(str: string): void {
        let reg_zh = /[\u4e00-\u9fa5]+/g;
        let arr = [];
        if (reg_zh.test(str)) {
            for (let i of this.page_data.country_list) {
                if (~i.name_zh.indexOf(str)) {
                    arr.push(i);
                }
            }
        } else {
            for (let i of this.page_data.country_list) {
                if (~i.name.toLowerCase().indexOf(str.toLowerCase())) {
                    arr.push(i);
                }
            }
        }
        this.country_list = arr;
    }

    //搜索匹配国家
    private searchMedia(str: string): void {
        let reg_zh = /[\u4e00-\u9fa5]+/g;
        let obj = {
            week: [] as any[],
            month: [] as any[],
            other:[] as any[]
        }
        if (reg_zh.test(str)) {
            for (let i of this.page_data.media_list.week) {
                if (~i.name_zh.indexOf(str)) {
                    obj.week.push(i)
                }
            }
            for (let i of this.page_data.media_list.month) {
                if (~i.name_zh.indexOf(str)) {
                    obj.month.push(i)
                }
            }
            for (let i of this.page_data.media_list.other) {
                if (~i.name_zh.indexOf(str)) {
                    obj.other.push(i)
                }
            }
        } else {
            for (let i of this.page_data.media_list.week) {
                if (~i.name.toLowerCase().indexOf(str.toLowerCase())) {
                    obj.week.push(i)
                }
            }
            for (let i of this.page_data.media_list.month) {
                if (~i.name.toLowerCase().indexOf(str.toLowerCase())) {
                    obj.month.push(i)
                }
            }
            for (let i of this.page_data.media_list.other) {
                if (~i.name.toLowerCase().indexOf(str.toLowerCase())) {
                    obj.other.push(i)
                }
            }
        }
        this.media_list = obj;
    }

    //搜索匹配人物
    private searchCharacter(str: string): void {
        let reg_zh = /[\u4e00-\u9fa5]+/g;
        let arr = [];
        if (reg_zh.test(str)) {
            for (let i of this.page_data.character_list) {
                if (~i.name_zh.indexOf(str)) {
                    arr.push(i);
                }
            }
        } else {
            for (let i of this.page_data.character_list) {
                if (~i.name.toLowerCase().indexOf(str.toLowerCase())) {
                    arr.push(i);
                }
            }
        }
        this.character_list = arr;
    }
    //搜索匹配频道
    private searchChannel(str: string): void {
        let reg_zh = /[\u4e00-\u9fa5]+/g;
        let arr = [];
        if (reg_zh.test(str)) {
            for (let i of this.page_data.channel_list) {
                if (~i.name.indexOf(str)) {
                    arr.push(i);
                }
            }
        } else {
            for (let i of this.page_data.channel_list) {
                if (~i.name.toLowerCase().indexOf(str.toLowerCase())) {
                    arr.push(i);
                }
            }
        }
        this.channel_list = arr;
    }

    private getMedia_list(): void {
        this.getSubscriptions("media", "unsub", (res) => {
            let media_list = res.data.data as any[];
            let week = new Date().getTime()-(7*24*60*60*1000);
            let month = new Date().getTime()-(30*24*60*60*1000);
            for (let i = 0; i < media_list.length; i++) {
                if (new Date(media_list[i].update_time).getTime()>=week) {
                    this.media_list.week.push(media_list[i])
                } else if(new Date(media_list[i].update_time).getTime()>month) {
                    this.media_list.month.push(media_list[i])
                }else{
                    this.media_list.other.push(media_list[i])
                }
            }
            this.page_data.media_list = this.media_list;
            console.log(media_list)
        })
    }

    /**
     * 选择喜好
     * @param type 类型(国家，人物，媒体 country character media)
     * @param item 该项对象
     * @param index 该项索引
     */
    public chooseItem(type: string, item: any, index: number): void {
        switch (type) {
            case 'country':
                if (!this.country_list[index].choose) {
                    this.$set(this.country_list[index], 'choose', true);
                    this.sub_form.country.push({
                        name:item.name,
                        id:item.sub_id
                    });
                } else {
                    this.$set(this.country_list[index], 'choose', false);
                    for (let i = 0; i < this.sub_form.country.length; i++) {
                        if (item.name == this.sub_form.country[i].name) {
                            this.$delete(this.sub_form.country, i)
                        }
                    }
                }
                break;
            case 'character':
                if (!this.character_list[index].choose) {
                    this.$set(this.character_list[index], 'choose', true);
                    this.sub_form.character.push({
                        name:item.name,
                        id:item.sub_id
                    });
                } else {
                    this.$set(this.character_list[index], 'choose', false);
                    for (let i = 0; i < this.sub_form.character.length; i++) {
                        if (item.name == this.sub_form.character[i].name) {
                            this.$delete(this.sub_form.character, i)
                        }
                    }
                }
                break;
            case 'channel':
                if (!this.channel_list[index].choose) {
                    this.$set(this.channel_list[index], 'choose', true);
                    this.sub_form.channel.push({
                        name:item.name,
                        id:item.sub_id
                    });
                } else {
                    this.$set(this.channel_list[index], 'choose', false);
                    for (let i = 0; i < this.sub_form.channel.length; i++) {
                        if (item.name == this.sub_form.channel[i].name) {
                            this.$delete(this.sub_form.channel, i)
                        }
                    }
                }
                break;
        }
    }
    /**
     * 
     * @param type 类型7天内活跃/30天活跃
     * @param item 该项对象
     * @param index 该项索引
     */
    public chooseMediaItem(type: string, item: any, index: number): void {
        if (type == 'week') {
            if (!this.media_list.week[index].choose) {
                this.$set(this.media_list.week[index], 'choose', true);
                this.sub_form.media.push({
                    name:item.name,
                    id:item.sub_id
                });
            } else {
                this.$set(this.media_list.week[index], 'choose', false);
                for (let i = 0; i < this.sub_form.media.length; i++) {
                    if (item.name == this.sub_form.media[i].name) {
                        this.$delete(this.sub_form.media, i)
                    }
                }
            }
        } else if(type=='month'){
            if (!this.media_list.month[index].choose) {
                this.$set(this.media_list.month[index], 'choose', !this.media_list.month[index].choose);
                this.sub_form.media.push({
                    name:item.name,
                    id:item.sub_id
                });
            } else {
                this.$set(this.media_list.month[index], 'choose', false);
                for (let i = 0; i < this.sub_form.media.length; i++) {
                    if (item.name == this.sub_form.media[i].name) {
                        this.$delete(this.sub_form.media, i)
                    }
                }
            }
        }else{
            if (!this.media_list.other[index].choose) {
                this.$set(this.media_list.other[index], 'choose', !this.media_list.other[index].choose);
                this.sub_form.media.push({
                    name:item.name,
                    id:item.sub_id
                });
            } else {
                this.$set(this.media_list.other[index], 'choose', false);
                for (let i = 0; i < this.sub_form.media.length; i++) {
                    if (item.name == this.sub_form.media[i].name) {
                        this.$delete(this.sub_form.media, i)
                    }
                }
            }
        }
    }

    //下一步
    public toNext(): void {
        switch (this.pageIndex++) {
            case 0:
                if (!this.media_list.week.length || !this.media_list.month.length)
                    this.getMedia_list()
                break;
            case 1:
                if (!this.character_list.length) {
                    this.getSubscriptions("character", "unsub", res => {
                        console.log(res.data)
                        this.character_list = res.data.data;
                        this.page_data.character_list = res.data.data;
                    })
                }

                break;
            case 2:
                if (!this.channel_list.length) {
                    this.getSubscriptions("channel", "unsub", res => {
                        console.log(res.data)
                        this.channel_list = res.data.data;
                        this.page_data.channel_list = res.data.data;
                    })
                }

                break;
        }
    }
    //完成
    public toFinish(): void {
        let sub_form:any = {
            country:[],
            media:[],
            character:[],
            channel:[]
        }
        for(let i of this.sub_form.country){
            sub_form.country.push(i.id);
        }
        for(let i of this.sub_form.media){
            sub_form.media.push(i.id);
        }
        for(let i of this.sub_form.character){
            sub_form.character.push(i.id);
        }
        for(let i of this.sub_form.channel){
            sub_form.channel.push(i.id);
        }
        this.axios.post(baseApi.api2+'/v1/cmd/',{
            cmd:'first_login_sub',
            paras:sub_form
        }).then(res=>{
            this.$router.push('/')
        }).catch(err=>{
            console.log(err);
        })
    }
}