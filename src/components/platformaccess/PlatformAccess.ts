
import echarts, { ECharts } from 'echarts'
import { Component, Vue, Watch } from 'vue-property-decorator'
import Table2Xlsx from '@/libs/Table2xlsx';
import { State } from 'vuex-class';
@Component
export default class PlatformAccessCom extends Vue {
    @State('topic_show') topic_show!:boolean;
    public dates: Date[]|null = [];
    public user_status:string = 'today';
    public userdates: Date[]|null = null;
    public date_data:string[] = [];
    public userBehavior: any = "";
    public userLoginList:any[] = [];
    public search_user:string = "";
    public chart1:ECharts|null = null;
    public chart2:ECharts|null = null;
    //采集数据趋势图
    private charts1_option = {
        title: {
            text: '浏览量数据趋势图',
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
        legend: {
            data: ['本期', '上期'],
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
        grid:{
            left:50,
            right:0
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
    //活动用户数趋势图
    private charts2_option = {
        title: {
            text: '活动用户数趋势图',
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
            right:0
        },
        legend: {
            data: ['本期', '上期'],
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
    public form = {
        stat_type: 'today',
        time_from: new Date().toLocaleDateString(),
        time_to: new Date().toLocaleDateString(),
    }

    @Watch('topic_show')
    public ChartsResize():void{
        this.chart1?.resize();
        this.chart2?.resize();
    }

    public created():void{
        let date = new Date().toLocaleDateString();
        this.getUserLoginList(date,date);
    }

    public mounted(): void {
        this.fetchDataInfo();
        this.fetchDataInfo1();
        this.getUserBehavior();

    }

    //今天，7天，30天
    public setDay(type: string): void {
        this.form.stat_type = type;
        this.dates = null;
        this.form.time_from = "";
        this.form.time_to = "";
        this.getUserBehavior();
    }

    public setDate(): void {
        if (!this.dates) {
            this.setDay('today');
            return;
        }
        this.form.stat_type = 'custom'
        this.form.time_from = this.dates[0].toLocaleDateString();
        this.form.time_to = this.dates[1].toLocaleDateString();
        this.getUserBehavior();
    }

    public setUserDay(type:string):void{
        if(type=='today'){
            let date = new Date().toLocaleDateString()
            
            this.getUserLoginList(date,date);
        }else{
            this.getUserLoginList('','');
        }
        this.userdates = null;
        this.user_status = type;
    }

    public setUserDate():void{
        if(!this.userdates){
            this.user_status = 'today';
            let date = new Date().toLocaleDateString()
            this.getUserLoginList(date,date);
            return;
        }
        this.user_status = 'custom';
        this.getUserLoginList(this.userdates[0].toLocaleDateString(),this.userdates[1].toLocaleDateString())
    }

    //设置echarts显示配置项
    private setChartsData(): void {
        this.charts1_option.series[0].data = this.userBehavior.visit_recent_detail;
        this.charts1_option.series[1].data = this.userBehavior.visit_last_detail;
        this.charts2_option.series[0].data = this.userBehavior.active_recent_detail;
        this.charts2_option.series[1].data = this.userBehavior.active_last_detail;
        this.date_data = [];
        switch (this.form.stat_type) {
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
                for (let i = 0; i < this.userBehavior.visit_last_detail.length; i++) {
                    this.date_data.push('第' + (i + 1) + '天');
                }
                break;
        }
        this.charts1_option.xAxis.data = this.date_data;
        this.charts2_option.xAxis.data = this.date_data;

        (<ECharts>this.chart2).setOption(<any>this.charts2_option);
        (<ECharts>this.chart1).setOption(<any>this.charts1_option);
    }

    //获取用户行为
    private getUserBehavior(): void {
        let data: any = {};
        for (let i in this.form) {
            if (this.form[i]) {
                data[i] = this.form[i];
            }
        }
        this.axios
            .post('/v1/cmd/', {
                cmd: 'user_behavior_stat',
                paras: data,
            }).then(res => {
                this.userBehavior = res.data.data;
                this.setChartsData();
            }).catch(err => {
                console.log(err);
            })
    }

    //获取用户登录名单
    private getUserLoginList(time_from:string,time_to:string):void{
        let data:any = {};
        if(time_from){
            data.time_from = time_from;
        }
        if(time_to){
            data.time_to = time_to;
        }
        this.axios
        .post('/v1/cmd/', {
          cmd: 'user_login_stat',
          paras: data
        }).then(res=>{
            this.userLoginList = res.data.data;
        }).catch(err=>{
            console.log(err);
        })
    }

    //采集数据趋势图
    private fetchDataInfo(): void {
        let myChart1 = this.$refs.myChart1;
        this.chart1 = echarts.init(<HTMLDivElement>myChart1);
        this.chart1.setOption(<any>this.charts1_option);
    }

    //活动用户数趋势图
    private fetchDataInfo1(): void {
        let myChart2 = this.$refs.myChart2;
        this.chart2 = echarts.init(<HTMLDivElement>myChart2);
        this.chart2.setOption(<any>this.charts2_option);
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
        for(let i of this.userLoginList){
            let obj = {
                '账号':i.account,
                '昵称':i.nickname,
                '手机号':i.phone_number,
                '累计登录次数':i.login_times,
                '最后登录时间':new Date(i.last_login_date).toLocaleString(),
            }
            outdata.push(obj);
        }
        new Table2Xlsx(outdata,"用户登录名单-"+new Date().toLocaleDateString());
    }

}