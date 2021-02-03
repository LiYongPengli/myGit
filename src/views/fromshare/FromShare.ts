
import { Component,Vue } from 'vue-property-decorator'
import { State } from 'vuex-class';
@Component
export default class FromShareCom extends Vue{
    @State('language') language!:string;
    public favorite:any = "";
    public collectionId:string = "";
    //是否展示收藏夹列表
    public showCollection:boolean = false;

    public created():void{
        this.getCollectionList();
    }

    //获取收藏夹列表
    private getCollectionList():void{
        this.axios
        .post('/v1/cmd/', {
          cmd: 'examine_favorite',
          paras: { rf_id: this.$route.query.rf_id }
        }).then(res=>{
            console.log(res.data);
            this.favorite = res.data.data;
        }).catch(err=>{
            console.log(err);
        })
    }

    public toNewsInfo(item:any):void{
        window.open('#/newsinfo?id=' + item.news_id+'&md_id='+item.media_id);
    }
    public toAddCollection():void{
        this.axios
        .post('/v1/cmd/', {
          cmd: 'receive_favorite',
          paras: { rf_id: this.$route.query.rf_id }
        }).then(res=>{
            console.log(res.data);
            this.favorite.status = "received";
            this.$message.success('收藏成功');
        }).catch(err=>{
            console.log(err);
        })
    }

    /**
     * 格式化时间输出格式
     * @param str 时间字符串(xxxx-xx-xx xx:xx:xx)
     * @returns {string} 格式化后的时间
     */
    public init_time(str: string): string {
        let date = new Date(str);
        let now = new Date();
        let time = parseInt((now.getTime() - date.getTime()) / 1000 + '');
        if (time < 60) {
            return '1分钟前';
        } else if (time < (60 * 60)) {
            return `${parseInt(time / 60 + '')}分钟前`
        } else if (time <= (60 * 60 * 3)) {
            return `${parseInt(time / 60 / 60 + '')}小时前`
        } else {
            let year = date.getFullYear();
            let month = date.getMonth()+1;
            let day = date.getDate();
            let hour = date.getHours();
            let minits = date.getMinutes();
            return `${year}-${month>9?month:'0'+month}-${day>9?day:'0'+day} ${hour>9?hour:'0'+hour}:${minits>9?minits:'0'+minits}`;
        }
    }

    public getCollectionStatus(status:boolean):void{
        if(status){
            this.showCollection = false;
            this.$message.success('收藏成功');
        }
    }
}