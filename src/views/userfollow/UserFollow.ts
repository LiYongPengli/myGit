import { Component, Vue, Watch } from 'vue-property-decorator'
@Component
export default class UserFollow extends Vue {
    //目前所处的页码
    public pageIndex: number = 0;
    public searchText:string = "";

    @Watch('pageIndex')
    public indexChange(newVal:number,oldVal:number):void{
        this.searchText = "";
    }

    public getPlaceHolder(): string {
        let str = "";
        switch (this.pageIndex) {
            case 0:
                str = "请输入国家名称";
                break;
            case 1:
                str = "请输入媒体名称";
                break;
            case 2:
                str = "请输入人物名称";
                break;
            case 2:
                str = "请输入频道名称";
                break;
        }
        return str;
    }
}