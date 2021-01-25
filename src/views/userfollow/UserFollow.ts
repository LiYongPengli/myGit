import { Component, Vue, Watch } from 'vue-property-decorator'
@Component
export default class UserFollow extends Vue {
    public searchText:string = "";

    @Watch('pageIndex')
    public indexChange(newVal:number,oldVal:number):void{
        this.searchText = "";
    }

    public chooseItem(type:string):void{
        this.$router.push({
            name:'Follow',
            params:{
                type:type
            }
        })
    }

    public getPlaceHolder(): string {
        let str = "";
        switch (this.$route.params.type) {
            case 'country':
                str = "请输入国家名称";
                break;
            case 'media':
                str = "请输入媒体名称";
                break;
            case 'people':
                str = "请输入人物名称或简介";
                break;
            case 'channel':
                str = "请输入频道名称";
                break;
        }
        return str;
    }
}