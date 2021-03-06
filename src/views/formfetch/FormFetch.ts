import { Component, Vue, Watch } from 'vue-property-decorator'
import echarts, { ECharts } from 'echarts'

import Table2Xlsx from '@/libs/Table2xlsx';
import { State } from 'vuex-class';
@Component
export default class FormFetchCom extends Vue {
    @State('topic_show') topic_show!: boolean;
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
    public dates: Date[] | null = [];
    public value1: string = "";
    public value2: string = "";
    public day_data: string[] = []
    public month_data: string[] = []
    public date_data: string[] = []
    public result_data: any = "";
    private chart: ECharts | null = null;
    public theadLeft:number = 0;
    private charts_option = {
        title: {
            text: '数据采集趋势图',
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
        grid: {
            left: 50,
        },
        legend: {
            data: ['昨天', '今天'],
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
                },
                rotate: 25
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
    public barOption:any = {};
    public search_form = {
        stat_type: 'today',
        time_from: '',
        time_to: '',
    }

    public fetch_text = {
        last: '昨天',
        now: '今天'
    }

    @Watch('topic_show')
    setChartSize(): void {
        this.chart?.resize();
    }

    //今天，7天，30天
    public setDay(type: string): void {
        switch (type) {
            case 'today':
                this.fetch_text = {
                    last: '昨天',
                    now: '今天'
                }
                break;
            case '7':
                this.fetch_text = {
                    last: '上7天',
                    now: '近7天'
                }
                break;
            case '30':
                this.fetch_text = {
                    last: '上30天',
                    now: '近30天'
                }
                break;
        }
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
        this.fetch_text = {
            last: '上期',
            now: '本期'
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
                this.charts_option.legend.data = ['今天', '昨天'];
                this.charts_option.series[0].name = '今天';
                this.charts_option.series[1].name = '昨天';
                this.charts_option.xAxis.axisLabel.rotate = 25;
                for (let i = 0; i < 24; i++) {
                    this.date_data.push(`${i>9?i:'0'+i}:00-${i>9?i:'0'+i}:59`);
                }
                break;
            case '7':
                this.charts_option.legend.data = ['近7天', '上7天'];
                this.charts_option.series[0].name = '近7天';
                this.charts_option.series[1].name = '上7天';
                this.charts_option.xAxis.axisLabel.rotate = 0;
                for (let i = 0; i < 7; i++) {
                    this.date_data.push('第' + (i + 1) + '天');
                }
                break;
            case '30':
                this.charts_option.legend.data = ['近30天', '上30天'];
                this.charts_option.series[0].name = '近30天';
                this.charts_option.series[1].name = '上30天';
                this.charts_option.xAxis.axisLabel.rotate = 30;
                for (let i = 0; i < 30; i++) {
                    this.date_data.push('第' + (i + 1) + '天');
                }
                break;
            case 'custom':
                this.charts_option.legend.data = ['本期', '上期'];
                this.charts_option.series[0].name = '本期';
                this.charts_option.series[1].name = '上期';
                this.charts_option.xAxis.axisLabel.rotate = 30;
                for (let i = 0; i < this.result_data.last_detail.length; i++) {
                    this.date_data.push('第' + (i + 1) + '天');
                }
                break;
        }
        this.charts_option.xAxis.data = this.date_data;

        (<ECharts>this.chart).setOption(<any>this.charts_option);
    }


    public mounted(): void {
        let vuebar = this.$refs.vuebar as any;
        let scrollbarHorizontal = vuebar.osInstance().getElements('scrollbarHorizontal.handle') as HTMLElement;
        let scrollbarVertical = vuebar.osInstance().getElements('scrollbarVertical.handle') as HTMLElement;
        let scrollCss = "background: rgba(255, 255, 255,0.3);cursor: pointer;";
        scrollbarHorizontal.style.cssText = scrollCss;
        scrollbarVertical.style.cssText = scrollCss;
        let that = this;
        this.barOption = {
            callbacks:{
                onScroll(){
                    let positionx = vuebar.osInstance().scroll().position.x;
                    that.theadLeft = positionx;
                }
            }
        }
        console.log();
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
        let outdata: any[] = [];
        for (let i of this.result_data.not_updated) {
            let obj = {
                '站点名称': i.name_zh,
                '最后更新时间': i.last_update,
                '采集类型':i.source,
                '与源网站更新是否一致':i.consistency,
                '详细状态':i.remark ? i.remark : "无",
                '复检时间':i.check_time,
                '站点ID': i.media_id
            }
            outdata.push(obj);
        }
        new Table2Xlsx(outdata, "近七天未采集数据的源站点-" + new Date().toLocaleDateString());
    }








}
