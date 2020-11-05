import { Component, Vue } from 'vue-property-decorator'
import echarts from 'echarts'
@Component
export default class FormFetchCom extends Vue {

    public tableData= [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    

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
                    lineStyle:{
                        color:'red'
                    }
                },
                axisTick: {
                    show: false

                },
                boundaryGap: false,
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
                smooth: true,
                data: [10000, 120000, 40000, 60000, 70000, 83000, 100000],
                color: "#19d1ff"
            },
            {
                name: '上周',
                type: 'line',
                smooth: true,
                data: [300000, 18200, 43400, 79100, 39000, 30000, 90000],
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
