import { Component, Vue, Watch } from 'vue-property-decorator'
import echarts, { ECharts } from 'echarts'

import Table2Xlsx from '@/libs/Table2xlsx';
import { State } from 'vuex-class';
@Component
export default class FormFetchCom extends Vue {
    @State('topic_show') topic_show!:boolean;
    public pickerOptions = {
        disabledDate(time: any) {
            return time.getTime() > Date.now();
        },
        shortcuts: [{
            text: '今天',
            onClick(picker: any) {
                picker.$emit('pick', new Date());
            }
        }, {
            text: '昨天',
            onClick(picker: any) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit('pick', date);
            }
        }, {
            text: '一周前',
            onClick(picker: any) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', date);
            }
        }]

    }
    public dates: Date[]|null = [];
    public value1: string = "";
    public value2: string = "";
    public day_data: string[] = []
    public month_data: string[] = []
    public date_data: string[] = []
    public result_data: any = "";
    private chart: ECharts | null = null;
    private charts_option = {
        title: {
            text: '数据采集趋势图',
            subtext: '',
            textStyle: {
                color: 'white'
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
        grid: {
            left: 50,
        },
        legend: {
            data: ['本期', '上期'],
            right: 100,
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
                }
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
            name: '本期',
            type: 'line',
            symbol: 'circle',     //设定为实心点
            symbolSize: 10,   //设定实心点的大小
            smooth: true,
            data: [] as any[],
            color: "#19d1ff"
        },
        {
            name: '上期',
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

    @Watch('topic_show')
    setChartSize():void{
        this.chart?.resize();
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


    private getData(): void {
        let data: any = {}
        for (let i in this.search_form) {
            if (this.search_form[i]) {
                data[i] = this.search_form[i]
            }
        }
        this.axios
            .post('/v1/cmd/', {
                cmd: 'data_gathering_stat',
                paras: data,
            }).then(res => {
                console.log(res.data.data);
                this.result_data = res.data.data;
                this.setChartsData();
            }).catch(err => {
                console.log(err);
            })
    }

    //设置echarts显示配置项
    private setChartsData(): void {
        this.charts_option.series[0].data = this.result_data.recent_detail;
        this.charts_option.series[1].data = this.result_data.last_detail;
        this.date_data = [];
        switch (this.search_form.stat_type) {
            case 'today':
                for (let i = 0; i < 24; i++) {
                    this.date_data.push((i + 1) + 'h');
                }
                break;
            case '7':
                for (let i = 0; i < 7; i++) {
                    this.date_data.push('第' + (i + 1) + '天');
                }
                break;
            case '30':
                for (let i = 0; i < 30; i++) {
                    this.date_data.push('第' + (i + 1) + '天');
                }
                break;
            case 'custom':
                for (let i = 0; i < this.result_data.last_detail.length; i++) {
                    this.date_data.push('第' + (i + 1) + '天');
                }
                break;
        }
        this.charts_option.xAxis.data = this.date_data;

        (<ECharts>this.chart).setOption(<any>this.charts_option);
    }


    public mounted(): void {
        let myChart2 = <HTMLDivElement>this.$refs.myChart2;
        this.chart = echarts.init(myChart2);
        this.getData();

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

    //导出xlsx
    public toExport(): void {
        let outdata:any[] = [];
        for(let i of this.result_data.not_updated){
            let obj = {
                '站点名称':i.name_zh,
                '最后更新时间':i.last_update
            }
            outdata.push(obj);
        }
        new Table2Xlsx(outdata,"近七天未采集数据的源站点-"+new Date().toLocaleDateString());
    }



    

   


}
