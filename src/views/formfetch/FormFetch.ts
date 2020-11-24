import { Component, Vue } from 'vue-property-decorator'
import echarts from 'echarts'
import { mixin } from 'vue/types/umd';
@Component
export default class FormFetchCom extends Vue {

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
    public value1: string = "";
    public value2: string = "";



    public tableData = [{
        number: '1',
        date: '2016-05-02 10:10:00',
        name: '王小虎1',
        // address: '上海市普陀区金沙江路 1518 弄'
    }, {
        number: '2',
        date: '2016-05-04 10:10:00',
        name: '王小虎2',
        // address: '上海市普陀区金沙江路 1517 弄'
    }, {
        number: '3',
        date: '2016-05-01 10:10:00',
        name: '王小虎3',
        // address: '上海市普陀区金沙江路 1519 弄'
    }, {
        number: '4',
        date: '2016-05-03 10:10:00',
        name: '王小虎4',
        // address: '上海市普陀区金沙江路 1516 弄'
    },
    {
        number: '5',
        date: '2016-05-04 10:10:00',
        name: '王小虎5',
        // address: '上海市普陀区金沙江路 1517 弄'
    }, {
        number: '6',
        date: '2016-05-01 10:10:00',
        name: '王小虎6',
        // address: '上海市普陀区金沙江路 1519 弄'
    }, {
        number: '7',
        date: '2016-05-03 10:10:00',
        name: '王小虎7',
        // address: '上海市普陀区金沙江路 1516 弄'
    }, {
        number: '8',
        date: '2016-05-04 10:10:00',
        name: '王小虎8',
        // address: '上海市普陀区金沙江路 1517 弄'
    }, {
        number: '9',
        date: '2016-05-01 10:10:00',
        name: '王小虎9',
        // address: '上海市普陀区金沙江路 1519 弄'
    }, {
        number: '10',
        date: '2016-05-03 10:10:00',
        name: '王小虎',
        // address: '上海市普陀区金沙江路 1516 弄'
    }
    ]


    public mounted(): void {
        this.fetchDataInfo();


        // this.tableRowClassName();

    }
    //采集数据趋势图
    private fetchDataInfo(): void {
        let myChart2 = this.$refs.myChart2;
        let myChart = echarts.init((myChart2 as HTMLDivElement));
        let option: any = {
            title: {
                text: '数据采集趋势图',
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
        myChart.setOption(option);
    }










    // private tableRowClassName(row, rowIndex){
    //     if (rowIndex === 1) {
    //         return 'warning-row';
    //       } else if (rowIndex === 3) {
    //         return 'success-row';
    //       }
    //       return '';
    // }


}
