import { baseApi } from '@/axios/axios';
import { AxiosResponse } from 'axios';
import echarts from 'echarts'
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class PlatformAccessCom extends Vue {
  

    public value1: string = "";
    public value2: string = "";
    public mounted(): void {

        this.fetchDataInfo();
        this.fetchDataInfo1();


        // this.tableRowClassName();

    }
    //采集数据趋势图
    private fetchDataInfo(): void {
        let myChart2 = this.$refs.myChart2;
        let myChart = echarts.init((myChart2 as HTMLDivElement));
        let option: any = {
            title: {
                text: '采集数据趋势图',
                subtext: '',
                textStyle: {
                    color: 'white'
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['浏览量', '同期对比'],
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
                name: '浏览量',
                type: 'line',
                symbol: 'circle',     //设定为实心点
                symbolSize: 10,   //设定实心点的大小
                smooth: true,
                data: [90000, 10000, 30000, 70000, 25000, 83000, 100000],
                color: "#19d1ff"
            },
            {
                name: '同期对比',
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

    private fetchDataInfo1(): void {
        let myChart3 = this.$refs.myChart3;
        let myChart4 = echarts.init((myChart3 as HTMLDivElement));
        let option1: any = {
            title: {
                text: '采集数据趋势图',
                subtext: '',
                textStyle: {
                    color: 'white'
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['浏览量', '同期对比'],
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
                name: '浏览量',
                type: 'line',
                symbol: 'circle',     //设定为实心点
                symbolSize: 10,   //设定实心点的大小
                smooth: true,
                data: [90000, 10000, 30000, 70000, 25000, 83000, 100000],
                color: "#19d1ff"
            },
            {
                name: '同期对比',
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