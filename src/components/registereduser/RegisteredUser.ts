
import echarts, { ECharts } from 'echarts'
import { Component, Vue, Watch } from 'vue-property-decorator'
import Table2Xlsx from '@/libs/Table2xlsx';
import { State } from 'vuex-class';
@Component
export default class RegisteredUserCom extends Vue {
    @State('topic_show') topic_show!:boolean;
    public search_user: string = "";
    public dates: Date[]|null = [];
    public date_data: string[] = [];
    public result_data: any = "";
    private chart: ECharts | null = null;
    private charts_option = {
        title: {
            text: '注册数量走势图',
            subtext: '',
            textStyle: {
                color: 'white',
                fontWeight:'bold',
                fontSize:'20'
            }
        },
        tooltip: {
            trigger: 'axis',
            formatter(value: any) {
                if (value[1]) {
                    return `<div>
                        <div style="display:flex;align-items: center;padding:10px 0;">
                            <div style="width:15px;height:15px;background:${value[0].color};border-radius: 50%;"></div>
                            <div style="margin-left:5px;">${value[0].name.split(" ")[0]}</div>
                            <div style="margin-left:50px;">${value[0].value == 0 ? value[0].value : value[0].value ? value[0].value : '--'}</div>
                        </div>
                        <div style="display:flex;align-items: center;padding:10px 0;">
                            <div style="width:15px;height:15px;background:${value[1].color};border-radius: 50%;"></div>
                            <div style="margin-left:5px;">${value[1].name.split(" ")[0]}</div>
                            <div style="margin-left:50px;">${value[1].value}</div>
                        </div>`
                } else {
                    return `<div>
                            <div style="display:flex;align-items: center;padding:10px 0;">
                                <div style="width:15px;height:15px;background:${value[0].color};border-radius: 50%;"></div>
                                <div style="margin-left:5px;">${value[0].name.split(" ")[0]}</div>
                                <div style="margin-left:50px;">${value[0].value == 0 ? value[0].value : value[0].value ? value[0].value : '--'}</div>
                            </div>
                            </div>`

                }

            }
        },
        grid:{
            left:50,
            right:0
        },
        legend: {
            data: ['今天', '昨天'],
            right: 0,
            icon: 'rect',
            textStyle: {
                color: "white"
            }
        },
        toolbox: {
            show: false,
            feature: {
                magicType: { show: true, type: ['stack', 'tiled'] },
                saveAsImage: { show: true }
            }
        },
        xAxis: {
            type: 'category',
            axisLine: {
                show: false,
                lineStyle: {
                    color: 'red'
                }
            },
            boundaryGap: true,
            axisTick: {
                show: false

            },
            data: [] as string[],
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#cdd6e5'
                },
                rotate:25
            }

        },
        yAxis: {
            type: 'value',
            axisLine: {
                show: false
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: ['#494959'],
                    width: 1,
                    type: 'solid'
                }
            }, //去除网格线
            axisTick: {
                show: false

            }, axisLabel: {
                show: true,
                textStyle: {
                    color: '#cdd6e5'
                }
            }
        },
        series: [{
            name: '今天',
            type: 'line',
            symbol: 'circle',     //设定为实心点
            symbolSize: 10,   //设定实心点的大小
            smooth: true,
            data: [] as any[],
            color: "#19d1ff"
        },
        {
            name: '昨天',
            type: 'line',
            symbol: 'circle',     //设定为实心点
            symbolSize: 10,   //设定实心点的大小
            smooth: true,
            data: [] as any[],
            color: '#f4516c'
        }]

    }
    public search_form = {
        stat_type: 'today',
        time_from: '',
        time_to: '',
    }
    public fetch_text = {
        last:'昨日',
        now:'今日'
    }
    public mounted(): void {
        let myChart2 = <HTMLDivElement>this.$refs.myChart3;
        this.chart = echarts.init(myChart2);
        this.getData();

    }
    
    @Watch('topic_show')
    public ChartsResize():void{
        this.chart?.resize();
    }

    private getData(): void {
        let data: any = {};
        for (let i in this.search_form) {
            if (this.search_form[i]) {
                data[i] = this.search_form[i]
            }
        }
        this.axios
            .post('/v1/cmd/', {
                cmd: 'reg_user_stat',
                paras: data
            }).then(res => {
                console.log(res.data);
                this.result_data = res.data.data;
                setTimeout(()=>{
                    this.setChartsData();
                },200)
            }).catch(err => {
                console.log(err);
            })
    }

    //今天，7天，30天
    public setDay(type: string): void {
        this.search_form.stat_type = type;
        this.dates = null;
        this.search_form.time_from = "";
        this.search_form.time_to = "";
        this.getData();
    }

    public setDate(): void {
        if (!this.dates) {
            this.setDay('today');
            return;
        }
        this.search_form.stat_type = 'custom'
        this.search_form.time_from = this.dates[0].toLocaleDateString();
        this.search_form.time_to = this.dates[1].toLocaleDateString();
        this.getData();
    }

    //设置echarts显示配置项
    private setChartsData(): void {
        this.charts_option.series[0].data = this.result_data.recent_detail;
        this.charts_option.series[1].data = this.result_data.last_detail;
        this.date_data = [];
        switch (this.search_form.stat_type) {
            case 'today':
                this.fetch_text = {
                    last:'昨日',
                    now:'今日'
                }
                this.charts_option.legend.data = ['今天','昨天'];
                this.charts_option.series[0].name = '今天';
                this.charts_option.series[1].name = '昨天';
                this.charts_option.xAxis.axisLabel.rotate = 25;
                for (let i = 0; i < 24; i++) {
                    this.date_data.push(`${i>9?i:'0'+i}:00-${i>9?i:'0'+i}:59`);
                }
                break;
            case '7':
                this.fetch_text = {
                    last:'上7天',
                    now:'近7天'
                }
                this.charts_option.legend.data = ['近7天','上7天'];
                this.charts_option.series[0].name = '近7天';
                this.charts_option.series[1].name = '上7天';
                this.charts_option.xAxis.axisLabel.rotate = 0;
                for (let i = 0; i < 7; i++) {
                    this.date_data.push('第' + (i + 1) + '天');
                }
                break;
            case '30':
                this.fetch_text = {
                    last:'上30天',
                    now:'近30天'
                }
                this.charts_option.legend.data = ['近30天','上30天'];
                this.charts_option.series[0].name = '近30天';
                this.charts_option.series[1].name = '上30天';
                this.charts_option.xAxis.axisLabel.rotate = 30;
                for (let i = 0; i < 30; i++) {
                    this.date_data.push('第' + (i + 1) + '天');
                }
                break;
            case 'custom':
                this.fetch_text = {
                    last:'上期',
                    now:'本期'
                }
                this.charts_option.legend.data = ['本期','上期'];
                this.charts_option.series[0].name = '本期';
                this.charts_option.series[1].name = '上期';
                this.charts_option.xAxis.axisLabel.rotate = 25;
                for (let i = 0; i < this.result_data.last_detail.length; i++) {
                    this.date_data.push('第' + (i + 1) + '天');
                }
                break;
        }
        this.charts_option.xAxis.data = this.date_data;

        (<ECharts>this.chart).setOption(<any>this.charts_option);
    }

    //格式化数据格式
    public init_number(number: number): string {
        if (!number) {
            return "0";
        }
        let str = ""
        let num = number + '';
        if (num.length > 3) {
            for (let i = 0; i < num.length; i++) {
                if (i % 3 == 0) {
                    str += num[i] + ','
                } else {
                    str += num[i]
                }
            }
            if (str[str.length - 1] == ',') {
                str = str.slice(0, str.length - 1);
            }
        } else {
            str = num;
        }
        return str;
    }

    //过滤用户信息
    public showUsers(user: any): boolean {
        let flag = false;
        if (~user.account.indexOf(this.search_user)) {
            flag = true;
        }
        if (~user.nickname.indexOf(this.search_user)) {
            flag = true;
        }
        if (~user.phone_number.indexOf(this.search_user)) {
            flag = true;
        }
        if(user.wechat_info.binding){
            if (~user.nickname.indexOf(this.search_user)) {
                flag = true;
            }
        }
        return flag;
    }
    //导出xlsx
    public toExport(): void {
        let outdata:any[] = [];
        for(let i of this.result_data.users){
            if(this.showUsers(i)){
                let obj = {
                    '账号':i.account,
                    '昵称':i.nickname,
                    '手机号':i.phone_number,
                    '微信昵称':i.wechat_info.binding ? i.wechat_info.nickname : "未绑定",
                    '注册时间':new Date(i.registration_date).toLocaleString() ,
                }
                outdata.push(obj);
            }
        }
        new Table2Xlsx(outdata,"注册用户名单-"+new Date().toLocaleDateString());
    }
}