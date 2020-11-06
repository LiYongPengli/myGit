import { baseApi } from '@/axios/axios';
import { AxiosResponse } from 'axios';
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class HomeSetCom extends Vue {
    public show = false;
    //目前所处的页码
    public pageIndex: number = 0;
    public sub_form = {
        country: [] as string[],
        media: [] as string[],
        character: [] as string[]
    }

    public country_list: any[] = [];
    public media_list: {week:any[];month:any[]} = {
        week:[],
        month:[]
    }

    public created(): void {
        this.getSubscriptions("country", "unsub", (res) => {
            console.log(res.data)
            this.country_list = res.data.data;
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

    private getMedia_list():void{
        this.getSubscriptions("media", "unsub", (res) => {
            console.log(res.data)
            let media_list = res.data.data as any[];
            for(let i=0;i<media_list.length;i++){
                if(i<8){
                    this.media_list.week.push(media_list[i])
                }else{
                    this.media_list.month.push(media_list[i])
                }
            }
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
                    this.sub_form.country.push(item.name);
                } else {
                    this.$set(this.country_list[index], 'choose', false);
                    for (let i = 0; i < this.sub_form.country.length; i++) {
                        if (item.name == this.sub_form.country[i]) {
                            this.$delete(this.sub_form.country, i)
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
    public chooseMediaItem(type:string,item: any, index: number):void{
        if(type=='week'){
            this.media_list.week[index]
        }
    }

    //下一步
    public toNext(): void {
        switch (this.pageIndex) {
            case 0:
                this.pageIndex++;
                if (!this.media_list.week.length||!this.media_list.month.length)
                this.getMedia_list()
                break;
        }
    }
}