import { baseApi } from '@/axios/axios';
import { AxiosResponse } from 'axios';
import echarts, { ECharts } from 'echarts'
import { Component, Vue } from 'vue-property-decorator'
import Table2Xlsx from '@/libs/Table2xlsx';
@Component
export default class RegisteredUserCom extends Vue {
    public search_user: string = "";
    public dates: Date[] = [];
    public date_data: string[] = [];
    public result_data: any = "";
    private chart: ECharts | null = null;
    private charts_option = {
        title: {
            text: '注册数量走势图',
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
        grid:{
            left:50,
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
    public mounted(): void {
        let myChart2 = <HTMLDivElement>this.$refs.myChart3;
        this.chart = echarts.init(myChart2);
        this.getData();

    }
    public tableData = [{
        accountnumber: '张三',
        name: 'Seekingalpha.com',
        phone: '13011825913',
        time: '2016-05-02 10:10:00',
        wechatnickname: 'Tc.Wang',
        // address: '上海市普陀区金沙江路 1518 弄'
    }, {
        accountnumber: '张三',
        name: 'Seekingalpha.com',
        phone: '13011825913',
        time: '2016-05-02 10:10:00',
        wechatnickname: 'Tc.Wang',
    }, {
        accountnumber: '张三',
        name: 'Seekingalpha.com',
        phone: '13011825913',
        time: '2016-05-02 10:10:00',
        wechatnickname: 'Tc.Wang',
    }, {
        accountnumber: '张三',
        name: 'Seekingalpha.com',
        phone: '13011825913',
        time: '2016-05-02 10:10:00',
        wechatnickname: 'Tc.Wang',
    },
    {
        accountnumber: '张三',
        name: 'Seekingalpha.com',
        phone: '13011825913',
        time: '2016-05-02 10:10:00',
        wechatnickname: 'Tc.Wang',
    }, {
        accountnumber: '张三',
        name: 'Seekingalpha.com',
        phone: '13011825913',
        time: '2016-05-02 10:10:00',
        wechatnickname: 'Tc.Wang',
    }, {
        accountnumber: '张三',
        name: 'Seekingalpha.com',
        phone: '13011825913',
        time: '2016-05-02 10:10:00',
        wechatnickname: 'Tc.Wang',
    }, {
        accountnumber: '张三',
        name: 'Seekingalpha.com',
        phone: '13011825913',
        time: '2016-05-02 10:10:00',
        wechatnickname: 'Tc.Wang',
    }, {
        accountnumber: '张三',
        name: 'Seekingalpha.com',
        phone: '13011825913',
        time: '2016-05-02 10:10:00',
        wechatnickname: 'Tc.Wang',
    }, {
        accountnumber: '张三',
        name: 'Seekingalpha.com',
        phone: '13011825913',
        time: '2016-05-02 10:10:00',
        wechatnickname: 'Tc.Wang',
    }
    ]

    private getData(): void {
        let data: any = {};
        for (let i in this.search_form) {
            if (this.search_form[i]) {
                data[i] = this.search_form[i]
            }
        }
        this.axios
            .post(baseApi.api2 + '/v1/cmd/', {
                cmd: 'reg_user_stat',
                paras: data
            }).then(res => {
                console.log(res.data);
                this.result_data = res.data.data;
                this.setChartsData();
            }).catch(err => {
                console.log(err);
            })
    }

    //今天，7天，30天
    public setDay(type: string): void {
        this.search_form.stat_type = type;
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
        let ch = /[\u4E00-\u9FA5]+/;
        let nm = /[0-9]+/
        if (~user.nickname.indexOf(this.search_user)) {
            flag = true;
        }
        if (!ch.test(this.search_user)) {
            if (nm.test(this.search_user)) {
                if (user.phone_number == this.search_user||user.account==this.search_user) {
                    flag = true;
                }
            } else {
                if (user.account == this.search_user) {
                    flag = true;
                }
            }
        }
        return flag;
    }
    //导出xlsx
    public toExport(): void {
        let outdata:any[] = [];
        for(let i of this.result_data.users){
            let obj = {
                '账号':i.account,
                '昵称':i.nickname,
                '手机号':i.phone_number,
                '微信昵称':i.wechat_info.binding ? i.wechat_info.nickname : "未绑定",
                '注册时间':new Date(i.registration_date).toLocaleString() ,
            }
            outdata.push(obj);
        }
        new Table2Xlsx(outdata,"注册用户名单-"+new Date().toLocaleDateString());
    }
}