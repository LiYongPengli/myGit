import { baseApi } from '@/axios/axios';
import { AxiosResponse } from 'axios';
import echarts from 'echarts'
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class RegisteredUserCom extends Vue{
    

    public value1: string = "";
    public value2: string = "";
    public mounted(): void {
        this.fetchDataInfo1();


        // this.tableRowClassName();

    }
    // <div class="list_li_accountnumber">账号</div>
    //             <div class="list_li_name">昵称</div>
    //             <div class="list_li_phone">手机号</div>
    //             <div class="list_li_count">累计登录次数</div>
    //             <div class="list_li_time">最后登录时间</div>
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

  

    //注册数量走势图
    private fetchDataInfo1(): void {
        let myChart3 = this.$refs.myChart3;
        let myChart4 = echarts.init((myChart3 as HTMLDivElement));
        let option1: any = {
            title: {
                text: '活动用户数趋势图',
                subtext: '',
                textStyle: {
                    color: 'white'
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['本周', '上周'],
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
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
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
                name: '本周',
                type: 'line',
                symbol: 'circle',     //设定为实心点
                symbolSize: 10,   //设定实心点的大小
                smooth: true,
                data: [90000, 10000, 30000, 70000, 25000, 83000, 100000],
                color: "#19d1ff"
            },
            {
                name: '上周',
                type: 'line',
                symbol: 'circle',     //设定为实心点
                symbolSize: 10,   //设定实心点的大小
                smooth: true,
                data: [30000, 18200, 43400, 79100, 39000, 30000, 90000],
                color: '#f4516c'
            }]

        }
        myChart4.setOption(option1);
    }
}