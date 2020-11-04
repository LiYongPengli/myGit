import { Component, Vue } from 'vue-property-decorator'
import echarts from 'echarts'
@Component
export default class FormFetchCom extends Vue {

    public mounted():void{
        this.fetchDataInfo();
    }
    //采集数据趋势图
    private fetchDataInfo():void{
        let myChart2 = this.$refs.myChart2;
        let myChart = echarts.init((myChart2 as HTMLDivElement));
        let option:any = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: true
            }]
        }
        myChart.setOption(option);
    }
}
