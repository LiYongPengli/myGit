import { baseApi } from '@/axios/axios';
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class NewsResourcesItemCom extends Vue {
    @Prop({}) type!:string;
    @Prop({}) cells!:string[];
    @Prop({}) title!:string;
    @Prop({default:1}) page!:number;
    //转发次数统计
    public share_data: any[] = [];
    public share_date: Date[] = [];
    public form = {
        stat_type: "share", //类型('share','like','visit')
        time_from: new Date().toLocaleDateString(), //起始时间
        time_to: new Date().toLocaleDateString(), //结束时间
    };

    public created(): void {
        this.form.stat_type = this.type;
        if(this.page==1){
            this.usage_rate();
        }else{
            this.site_usage();
        }
    }
    //新闻资源使用率
    private usage_rate(): void {
        let data: any = {};
        for (let i in this.form) {
            if (this.form[i]) {
                data[i] = this.form[i];
            }
        }
        this.axios
            .post(baseApi.api2 + "/v1/cmd/", {
                cmd: "news_usage_stat",
                paras: data,
            })
            .then((res) => {
                this.share_data = res.data.data;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //站点资源使用率统计
    private site_usage():void{
        let data: any = {};
        for (let i in this.form) {
            if (this.form[i]&&i!='stat_type') {
                data[i] = this.form[i];
            }
        }
        this.axios
        .post(baseApi.api2+'/v1/cmd/', {
          cmd: 'media_usage_stat',
          paras: data
        }).then(res=>{
            this.share_data = res.data.data;
        }).catch(err=>{
            console.log(err);
        })
    }
    //新闻转发次数设置自定义时间筛选
    public setFormdate(): void {
        if (this.share_date) {
            this.form.time_from = this.share_date[0].toLocaleDateString();
            this.form.time_to = this.share_date[1].toLocaleDateString();
        } else {
            this.form.time_from = ""
            this.form.time_to = ""
        }
        if(this.page==1){
            this.usage_rate();
        }else{
            this.site_usage();
        }
    }
    public setDate(type: string): void {
        switch (type) {
            case 'today':
                this.form.time_from = this.form.time_to = new Date().toLocaleDateString();
                break;
            case 'all':
                this.form.time_from = this.form.time_to = '';
                break;
        }
        this.share_date = [];
        if(this.page==1){
            this.usage_rate();
        }else{
            this.site_usage();
        }
    }
}