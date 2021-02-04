
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class';
@Component
export default class ZhuantiCom extends Vue{
    @Prop({}) name!:string;
    @State('language') language!:string;
    public showWarning:boolean = false;
    public loading:boolean = true;

    private deleteObj = {
        item:'' as any,
        index:0
    }
    public list:any[] = [];
    public created():void{
        this.getList();
    }

    @Watch('language')
    public languageChg(newVal:string,oldVal:string):void{
        this.getList();
    }

    private getList():void{
        this.axios.post('/v1/cmd/', {
            cmd: 'favorite_preview',
            paras: {
              name: this.name,
              language:this.language
            }
          }).then(res=>{
              console.log(res.data);
              this.list = res.data.data;
              this.loading = false;
              this.list.sort(function(a,b){
                  return new Date(b.time).getTime() - new Date(a.time).getTime();
              })
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

    public toNewsInfo(item:any):void{
        window.open('#/newsinfo?id=' + item.news_id+'&md_id='+item.media_id);
    }

    //删除
    public toDelete(item:any,index:number):void{
        this.showWarning=true;
        this.deleteObj = {
            item:item,
            index:index
        }
    }

    //确定
    public sure():void{
        this.axios.post('/v1/cmd/',{
            cmd:'favorite_news',
            paras:{
                name:this.name,
                news_id:this.deleteObj.item.news_id,
                news_oper:'undo'
            }
        }).then(res=>{
            this.list.splice(this.deleteObj.index,1);
            this.$message.success('操作成功');
            this.showWarning = false;
        }).catch(err=>{
            console.log(err);
        })
    }

    //取消
    public ext():void{
        this.showWarning = false;
    }
}