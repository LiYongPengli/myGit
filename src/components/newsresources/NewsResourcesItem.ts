
import { Component, Prop, Vue } from 'vue-property-decorator'
import Table2Xlsx from '@/libs/Table2xlsx';
@Component
export default class NewsResourcesItemCom extends Vue {
    @Prop({}) type!: string;
    @Prop({}) cells!: string[];
    @Prop({}) title!: string;
    @Prop({ default: 1 }) page!: number;

    //判断数据是否为空
    public isnulldata: boolean = true;
    public dateState:string = 'today';
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
        if (this.page == 1) {
            this.usage_rate();
        } else {
            this.site_usage();
        }
    }
    //新闻资源使用率
    private usage_rate(): void {
        let data: any = {};
        for (let i in this.form) {
            if (this.form[i]) {
                // console.log(this.form[i])
                data[i] = this.form[i];
            }
        }
        this.axios
            .post("/v1/cmd/", {
                cmd: "news_usage_stat",
                paras: data,
            })
            .then((res) => {
                this.share_data = res.data.data;
                let arr = Object.keys(this.share_data);
                if (arr.length == 0) {
                    this.isnulldata = true;
                }
                else {
                    this.isnulldata = false;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //站点资源使用率统计
    private site_usage(): void {
        let data: any = {};
        for (let i in this.form) {
            if (this.form[i] && i != 'stat_type') {
                data[i] = this.form[i];
            }
        }
        this.axios
            .post('/v1/cmd/', {
                cmd: 'media_usage_stat',
                paras: data
            }).then(res => {
                this.share_data = res.data.data;
                let arr = Object.keys(this.share_data);
                if (arr.length == 0) {
                    this.isnulldata = true;
                }
                else {
                    this.isnulldata = false;
                }
            }).catch(err => {
                console.log(err);
            })
    }
    //新闻转发次数设置自定义时间筛选
    public setFormdate(): void {
        if (this.share_date) {
            this.form.time_from = this.share_date[0].toLocaleDateString();
            this.form.time_to = this.share_date[1].toLocaleDateString();
            this.dateState = "custom"
        } else {
            this.form.time_from = ""
            this.form.time_to = ""
            this.dateState = "today"
        }
        if (this.page == 1) {
            this.usage_rate();
        } else {
            this.site_usage();
        }
    }
    public setDate(type: string): void {
        switch (type) {
            case 'today':
                this.form.time_from = this.form.time_to = new Date().toLocaleDateString();
                this.dateState = "today"
                break;
            case 'all':
                this.form.time_from = this.form.time_to = '';
                this.dateState = "all"
                break;
        }
        this.share_date = [];
        if (this.page == 1) {
            this.usage_rate();

        } else {
            this.site_usage();
        }
    }
    //导出xlsx
    public toExport(page: number, types: string): void {
        console.log(types);
        console.log(page);
        let outdata: any[] = [];
        //page 1  新闻资源使用率  2站点资源使用率
        //types share 新闻转发次数统计    like新闻点赞次数统计    view 新闻浏览次数统计
        if (page == 1) {

            if (types == "share") {
                for (let i of this.share_data) {
                    let obj = {
                        '新闻名称': i.title ? i.title : i.name_zh,
                        '转发次数': i.count,
                    }
                    outdata.push(obj);
                }
                new Table2Xlsx(outdata, "新闻资源使用率-新闻转发次数统计-" + new Date().toLocaleDateString());
            }
            else if(types == "like"){
                for (let i of this.share_data) {
                    let obj = {
                        '新闻名称': i.title ? i.title : i.name_zh,
                        '转发次数': i.count,
                    }
                    outdata.push(obj);
                }
                new Table2Xlsx(outdata, "新闻资源使用率-新闻点赞次数统计-" + new Date().toLocaleDateString());
            }
            else{
                for (let i of this.share_data) {
                    let obj = {
                        '新闻名称': i.title ? i.title : i.name_zh,
                        '转发次数': i.count,
                    }
                    outdata.push(obj);
                }
                new Table2Xlsx(outdata, "新闻资源使用率-新闻浏览次数统计-" + new Date().toLocaleDateString());
            }
        }
        else{
            for (let i of this.share_data) {
                let obj = {
                    '新闻名称': i.title ? i.title : i.name_zh,
                    '转发次数': i.count,
                }
                outdata.push(obj);
            }
            new Table2Xlsx(outdata, "站点资源使用率-站点浏览次数统计" + new Date().toLocaleDateString());
        }



    }
}